import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

async function generateHandler(request: NextRequest) {
  try {
    const { prompt, apiKey: customApiKey, apiUrl: customApiUrl, model: customModel } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: '请提供描述' }, { status: 400 })
    }

    // 优先使用前端传来的自定义配置，否则使用环境变量
    const apiKey = customApiKey || process.env.MAYNOR_API_KEY
    const apiUrl = customApiUrl || process.env.MAYNOR_API_URL || 'https://apipro.maynor1024.live'

    if (!apiKey) {
      return NextResponse.json({ error: 'API配置缺失，请在页面右上角配置 API 密钥' }, { status: 500 })
    }

    // 模型映射：将前端模型名映射到实际的API模型名
    const modelMap: { [key: string]: string } = {
      'gemini-3-pro-image-preview': 'gemini-3-pro-image-preview',
      'gemini': 'gemini-2.5-flash-image',
      'gemini-2.5-flash-image': 'gemini-2.5-flash-image'
    }

    // 优先使用前端传递的模型，否则使用环境变量，最后使用默认值
    const model = customModel ? modelMap[customModel] || customModel : (process.env.GEMINI_MODEL || 'gemini-2.5-flash-image')

    console.log('使用 API URL:', apiUrl)
    console.log('使用模型:', model)

    // 使用正确的API格式
    const response = await fetch(
      `${apiUrl}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [{
            role: "user",
            content: [
              { type: "text", text: `Create a picture: ${prompt}` }
            ]
          }],
          temperature: 0.7,
          max_tokens: 4096
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API错误:', errorData)
      return NextResponse.json({ 
        error: errorData.error?.message || '生成失败',
        details: errorData 
      }, { status: response.status })
    }

    const data = await response.json()
    console.log('API响应:', JSON.stringify(data, null, 2))
    
    // 解析 OpenAI 格式响应
    if (data.choices && data.choices[0]) {
      const choice = data.choices[0]
      const message = choice.message
      
      console.log('Message对象:', JSON.stringify(message, null, 2))
      
      if (message && message.content) {
        // 检查是否有图片内容
        if (Array.isArray(message.content)) {
          const imagePart = message.content.find((part: any) => part.type === 'image_url')
          const textPart = message.content.find((part: any) => part.type === 'text')
          
          if (imagePart && imagePart.image_url) {
            return NextResponse.json({ 
              imageUrl: imagePart.image_url.url,
              content: textPart?.text || '图片已生成',
              message: '成功生成图片'
            })
          }
        } else if (typeof message.content === 'string') {
          // 文本响应，尝试从文本中提取URL或base64图片
          const text = message.content
          
          // 检查是否包含base64图片数据
          const base64Match = text.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
          if (base64Match) {
            return NextResponse.json({ 
              imageData: base64Match[1],
              mimeType: 'image/jpeg',
              content: text,
              message: '成功生成图片'
            })
          }
          
          // 检查是否包含图片URL
          const imageUrlMatch = text.match(/!\[.*?\]\((.*?)\)/);
          const urlMatch = text.match(/https?:\/\/[^\s]+/);
          
          if (imageUrlMatch && imageUrlMatch[1]) {
            return NextResponse.json({ 
              imageUrl: imageUrlMatch[1],
              content: text 
            })
          } else if (urlMatch) {
            return NextResponse.json({ 
              imageUrl: urlMatch[0],
              content: text 
            })
          } else {
            return NextResponse.json({ 
              message: '模型响应了文本内容',
              content: text
            })
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
    
    // 更详细的错误信息
    let errorMessage = '生成失败'
    let errorDetails = '未知错误'
    
    if (error instanceof Error) {
      errorDetails = error.message
      if (error.message.includes('fetch')) {
        errorMessage = 'API连接失败，请稍后重试'
      } else if (error.message.includes('timeout')) {
        errorMessage = '请求超时，请使用简短描述重试'
      }
    }
    
    return NextResponse.json({
      error: errorMessage,
      details: errorDetails,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return generateHandler(request)
}