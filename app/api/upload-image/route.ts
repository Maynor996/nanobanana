import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 30

async function uploadImageHandler(request: NextRequest) {
  try {
    const { imageData, mimeType } = await request.json()

    if (!imageData) {
      return NextResponse.json({ error: '请提供图片数据' }, { status: 400 })
    }

    // ImgBB API配置
    const apiKey = process.env.IMGBB_API_KEY || 'f4e662f6c1f44d6c8c8a2b8e8f9c0d1e' // 临时测试key
    const apiUrl = 'https://api.imgbb.com/1/upload'

    // 准备表单数据
    const formData = new FormData()
    formData.append('key', apiKey)
    formData.append('image', imageData) // base64数据（不带前缀）

    // 设置过期时间（可选，单位：秒，最大365天）
    // formData.append('expiration', '2592000') // 30天

    // 上传到ImgBB
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('ImgBB API错误:', errorData)

      // 如果是免费额度用完，返回特定错误
      if (response.status === 429) {
        return NextResponse.json({
          error: '上传服务暂时不可用，请稍后再试',
          code: 'RATE_LIMIT'
        }, { status: 429 })
      }

      return NextResponse.json({
        error: errorData.error?.message || '图片上传失败',
        details: errorData
      }, { status: response.status })
    }

    const data = await response.json()

    if (data.success && data.data) {
      // 返回图片信息
      return NextResponse.json({
        success: true,
        url: data.data.url,          // 图片直链
        displayUrl: data.data.display_url, // 显示链接
        deleteUrl: data.data.delete_url,   // 删除链接
        imageId: data.data.id,
        title: data.data.title,
        size: data.data.size,
        expiration: data.data.expiration,
        width: data.data.width,
        height: data.data.height
      })
    }

    return NextResponse.json({
      error: '图片上传失败，返回数据格式错误',
      raw_response: data
    }, { status: 500 })

  } catch (error) {
    console.error('上传错误:', error)

    let errorMessage = '图片上传失败'
    let errorDetails = '未知错误'

    if (error instanceof Error) {
      errorDetails = error.message
      if (error.message.includes('fetch')) {
        errorMessage = '无法连接到图片服务器，请检查网络'
      } else if (error.message.includes('timeout')) {
        errorMessage = '上传超时，请重试'
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
  return uploadImageHandler(request)
}
