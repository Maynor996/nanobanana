import { NextRequest, NextResponse } from 'next/server'
import { withCreditsCheck } from '../../lib/credits-middleware'

export const runtime = 'nodejs'
export const maxDuration = 60

async function mockGeminiHandler(request: NextRequest, userEmail: string) {
  try {
    const { prompt, imageData, imageDataArray } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: '请提供描述' }, { status: 400 })
    }

    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 创建一个简单的SVG图片作为模拟结果
    const svgImage = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#geminiGrad)"/>
        <polygon points="256,100 300,200 256,250 212,200" fill="#fff" opacity="0.9"/>
        <circle cx="256" cy="175" r="25" fill="#4285f4"/>
        <text x="256" y="350" text-anchor="middle" font-family="Arial" font-size="24" fill="#fff">
          Gemini 模拟图片
        </text>
        <text x="256" y="380" text-anchor="middle" font-family="Arial" font-size="16" fill="#fff" opacity="0.8">
          ${prompt.substring(0, 20)}${prompt.length > 20 ? '...' : ''}
        </text>
        <text x="256" y="450" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff" opacity="0.6">
          模型: gemini-2.5-flash-image-preview
        </text>
      </svg>
    `

    // 将SVG转换为base64
    const base64Image = Buffer.from(svgImage).toString('base64')
    const dataUrl = `data:image/svg+xml;base64,${base64Image}`

    return NextResponse.json({
      imageData: base64Image,
      imageUrl: dataUrl,
      mimeType: 'image/svg+xml',
      model: 'gemini-2.5-flash-image-preview',
      text: '图片生成成功',
      message: '✅ Gemini 模型模拟生成成功！',
      note: '这是一个模拟响应，用于测试前端功能'
    })
  } catch (error) {
    console.error('Mock Gemini生成错误:', error)
    return NextResponse.json({
      error: '模拟生成失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return withCreditsCheck(request, mockGeminiHandler)
}