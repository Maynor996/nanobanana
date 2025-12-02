import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskUuid = searchParams.get('taskUuid')

    if (!taskUuid) {
      return NextResponse.json({ error: '缺少任务UUID' }, { status: 400 })
    }

    console.log('轮询 Z-Image 任务状态:', taskUuid)

    // 轮询 z-image 结果 - 使用环境变量配置
    const baseUrl = process.env.ZIMAGE_API_URL || 'https://zimage.nanobanana-free.top'
    const pollUrl = `${baseUrl}/v1/images/${taskUuid}`

    const response = await fetch(pollUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Z-Image 轮询失败:', response.status, response.statusText)
      return NextResponse.json({
        error: '轮询失败',
        status: response.status,
        statusText: response.statusText
      }, { status: response.status })
    }

    const data = await response.json()
    console.log('Z-Image 轮询响应:', data)

    // 根据实际测试，z-image 返回的是包含 image_urls 字段的对象
    if (data.status === 'completed' && data.image_urls && data.image_urls.length > 0) {
      // 如果返回的是包含 image_urls 字段的对象
      return NextResponse.json({
        status: 'completed',
        images: data.image_urls,
        imageUrls: data.image_urls
      })
    } else if (Array.isArray(data) && data.length > 0) {
      // 如果返回的是图片数组（备用）
      return NextResponse.json({
        status: 'completed',
        images: data,
        imageUrls: data
      })
    } else if (data.images && Array.isArray(data.images)) {
      // 如果返回的是包含 images 字段的对象（备用）
      return NextResponse.json({
        status: 'completed',
        images: data.images,
        imageUrls: data.images
      })
    } else if (data.status === 'processing' || data.status === 'pending') {
      // 如果还在处理中
      return NextResponse.json({
        status: 'processing',
        progress: data.progress || 0,
        message: data.message || '正在处理中...'
      })
    } else if (data.status === 'failed' || data.error) {
      // 如果处理失败
      return NextResponse.json({
        status: 'failed',
        error: data.error || '生成失败'
      })
    } else {
      // 其他情况，尝试直接返回
      return NextResponse.json(data)
    }

  } catch (error) {
    console.error('Z-Image 轮询错误:', error)
    return NextResponse.json({
      error: '轮询失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}