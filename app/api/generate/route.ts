import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json({ error: '请提供描述' }, { status: 400 })
    }

    const apiKey = process.env.MAYNOR_API_KEY
    const apiUrl = process.env.MAYNOR_API_URL || 'https://apipro.maynor1024.live'

    if (!apiKey) {
      return NextResponse.json({ error: 'API配置缺失' }, { status: 500 })
    }

    // 使用 Gemini 2.5 Flash Image Preview 模型
    const model = 'gemini-2.5-flash-image-preview'
    
    // 根据maynor API文档格式构建请求
    const response = await fetch(
      `${apiUrl}/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [
              { text: `Create a picture: ${prompt}` }
            ]
          }],
          generationConfig: {
            responseModalities: ["IMAGE"]  // 只要求图片输出
          }
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
    console.log('API响应:', data)
    
    // 解析 Gemini 响应格式
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0]
      const content = candidate.content
      
      if (content && content.parts) {
        // 查找生成的图片 - 注意API返回的是 inlineData (驼峰命名)
        const imagePart = content.parts.find((part: any) => part.inlineData)
        const textPart = content.parts.find((part: any) => part.text)
        
        if (imagePart && imagePart.inlineData) {
          // 将 base64 图片转换为 data URL
          const imageUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
          return NextResponse.json({ 
            imageUrl: imageUrl,
            content: textPart?.text || '图片已生成',
            message: '成功生成图片'
          })
        } else if (textPart) {
          // 只有文本响应，尝试从文本中提取URL
          const text = textPart.text
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