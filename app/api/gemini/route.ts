import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageData } = await request.json()
    
    if (!prompt) {
      return NextResponse.json({ error: '请提供描述' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.MAYNOR_API_KEY
    const apiUrl = process.env.MAYNOR_API_URL || 'https://apipro.maynor1024.live'
    const model = 'gemini-2.5-flash-image-preview'

    if (!apiKey) {
      return NextResponse.json({ error: 'API配置缺失' }, { status: 500 })
    }

    // 构建请求内容 - 根据maynor API文档格式
    const parts: any[] = []

    if (imageData) {
      // 图片编辑模式
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

    // 使用正确的 maynor API 格式
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
            parts: parts
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
    
    // 解析 Gemini 响应
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0]
      const content = candidate.content
      
      if (content && content.parts) {
        // 检查是否有生成的图片
        for (const part of content.parts) {
          if (part.inlineData) {
            // 返回生成的图片数据
            return NextResponse.json({ 
              imageData: part.inlineData.data,
              mimeType: part.inlineData.mimeType,
              text: content.parts.find((p: any) => p.text)?.text || ''
            })
          }
        }
        
        // 如果只有文本响应
        const textPart = content.parts.find((p: any) => p.text)
        if (textPart) {
          return NextResponse.json({ 
            text: textPart.text,
            message: '模型返回了文本响应'
          })
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