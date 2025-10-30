import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

async function geminiHandler(request: NextRequest) {
  try {
    const { prompt, imageData, imageDataArray, apiKey: customApiKey, apiUrl: customApiUrl } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: '请提供描述' }, { status: 400 })
    }

    // 优先使用前端传来的自定义配置，否则使用环境变量
    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.MAYNOR_API_KEY
    const apiUrl = customApiUrl || process.env.MAYNOR_API_URL || 'https://apipro.maynor1024.live'
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-image'

    if (!apiKey) {
      return NextResponse.json({ error: 'API配置缺失，请在页面右上角配置 API 密钥' }, { status: 500 })
    }

    console.log('Gemini 使用 API URL:', apiUrl)
    console.log('使用模型:', model)

    // 构建请求内容 - 根据maynor API文档格式
    const parts: any[] = []

    // 处理多图片输入
    if (imageDataArray && Array.isArray(imageDataArray) && imageDataArray.length > 0) {
      // 多图片模式
      parts.push({ text: prompt })
      imageDataArray.forEach((base64Data) => {
        parts.push({
          inline_data: {
            mime_type: "image/jpeg",
            data: base64Data
          }
        })
      })
    } else if (imageData) {
      // 单图片模式（向后兼容）
      parts.push({ text: prompt })
      parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: imageData
        }
      })
    } else {
      // 纯文生图模式
      parts.push({ text: `Create a picture: ${prompt}` })
    }

    // 构建OpenAI兼容格式的消息
    const messages = [{
      role: "user",
      content: [] as any[]
    }]

    // 添加文本内容
    if (imageDataArray && Array.isArray(imageDataArray) && imageDataArray.length > 0) {
      messages[0].content.push({ type: "text", text: prompt })
      imageDataArray.forEach((base64Data) => {
        messages[0].content.push({
          type: "image_url",
          image_url: { url: `data:image/jpeg;base64,${base64Data}` }
        })
      })
    } else if (imageData) {
      messages[0].content.push({ type: "text", text: prompt })
      messages[0].content.push({
        type: "image_url",
        image_url: { url: `data:image/jpeg;base64,${imageData}` }
      })
    } else {
      messages[0].content.push({ type: "text", text: `Create a picture: ${prompt}` })
    }

    // 根据是否有图片选择合适的API格式
    let response: Response
    
    if (imageData || (imageDataArray && imageDataArray.length > 0)) {
      // 图片编辑使用 Gemini 原生格式
      response = await fetch(
        `${apiUrl}/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: parts
            }],
            generationConfig: {
              responseModalities: ["TEXT", "IMAGE"],
              temperature: 0.7,
              maxOutputTokens: 1000
            }
          })
        }
      )
    } else {
      // 文生图使用 OpenAI 兼容格式
      response = await fetch(
        `${apiUrl}/v1/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 4096
          })
        }
      )
    }

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API错误:', errorData)
      return NextResponse.json({ 
        error: errorData.error?.message || '生成失败',
        details: errorData 
      }, { status: response.status })
    }

    const data = await response.json()
    console.log('Gemini API响应:', JSON.stringify(data, null, 2))
    
    // 根据请求类型解析不同格式的响应
    if (imageData || (imageDataArray && imageDataArray.length > 0)) {
      // 解析 Gemini 原生格式响应
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const content = data.candidates[0].content
        
        if (content.parts) {
          const imagePart = content.parts.find((part: any) => part.inlineData || part.inline_data)
          const textPart = content.parts.find((part: any) => part.text)
          
          if (imagePart) {
            const imageData = imagePart.inlineData || imagePart.inline_data
            return NextResponse.json({ 
              imageData: imageData.data,
              mimeType: imageData.mimeType || imageData.mime_type || 'image/png',
              text: textPart?.text || '图片编辑已完成',
              success: true
            })
          } else if (textPart) {
            return NextResponse.json({ 
              text: textPart.text,
              message: '模型返回了文本响应，但没有生成图片'
            })
          }
        }
      }
    } else {
      // 解析 OpenAI 格式响应
      if (data.choices && data.choices[0]) {
        const choice = data.choices[0]
        const message = choice.message
        
        if (message && message.content) {
          if (Array.isArray(message.content)) {
            // 多部分内容
            const imagePart = message.content.find((part: any) => part.type === 'image_url')
            const textPart = message.content.find((part: any) => part.type === 'text')
            
            if (imagePart && imagePart.image_url) {
              return NextResponse.json({ 
                imageUrl: imagePart.image_url.url,
                text: textPart?.text || '图片已生成'
              })
            }
          } else if (typeof message.content === 'string') {
            // 文本内容，检查是否包含base64图片
            const text = message.content
            const base64Match = text.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
            
            if (base64Match) {
              return NextResponse.json({ 
                imageData: base64Match[1],
                mimeType: 'image/jpeg',
                text: text
              })
            } else {
              return NextResponse.json({ 
                text: text,
                message: '模型返回了文本响应'
              })
            }
          }
        }
      }
    }

    return NextResponse.json({ 
      error: '未能从响应中提取内容',
      raw_response: data 
    }, { status: 500 })
  } catch (error) {
    console.error('生成错误:', error)
    return NextResponse.json({
      error: '生成失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return geminiHandler(request)
}