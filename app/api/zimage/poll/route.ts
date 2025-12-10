import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 300 // 增加到 5 分钟，与主 API 一致

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskUuid = searchParams.get('taskUuid')

    if (!taskUuid) {
      return NextResponse.json({ error: '缺少任务UUID' }, { status: 400 })
    }

    console.log('轮询 Z-Image 任务状态:', taskUuid)

    // 轮询 z-image 结果 - 使用环境变量配置
    const baseUrl = process.env.ZIMAGE_API_URL || 'http://154.12.24.179:8000'
    const pollUrl = `${baseUrl}/v1/images/${taskUuid}`

    // 添加重试机制处理 504 错误
    let response: Response | null = null
    let lastError: any = null
    const maxRetries = 3

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Z-Image 轮询尝试 ${attempt}/${maxRetries}`)

        response = await fetch(pollUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: AbortSignal.timeout(60000) // 60秒超时
        })

        if (response.ok || !response.status.toString().startsWith('5')) {
          // 成功或者不是服务器错误，跳出重试循环
          break
        }

        lastError = { status: response.status, statusText: response.statusText }
        console.log(`Z-Image 轮询尝试 ${attempt} 失败:`, lastError)

        // 如果不是最后一次尝试，等待一段时间再重试
        if (attempt < maxRetries) {
          const waitTime = attempt * 2000 // 递增等待时间：2s, 4s, 6s
          console.log(`等待 ${waitTime/1000} 秒后重试...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
        }
      } catch (error) {
        lastError = error
        console.log(`Z-Image 轮询尝试 ${attempt} 异常:`, error)

        // 如果不是最后一次尝试，等待一段时间再重试
        if (attempt < maxRetries) {
          const waitTime = attempt * 2000
          console.log(`等待 ${waitTime/1000} 秒后重试...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
        }
      }
    }

    // ��查最终响应
    if (!response || !response.ok) {
      const errorStatus = response?.status || 500
      const errorText = response?.statusText || lastError?.message || '轮询失败'
      console.error('Z-Image 轮询最终失败:', errorStatus, errorText)

      // 对于 504 错误，返回特殊状态码让前端继续轮询
      if (errorStatus === 504) {
        return NextResponse.json({
          status: 'processing',
          message: '服务器处理中，请继续轮询',
          progress: 50
        })
      }

      return NextResponse.json({
        error: '轮询失败',
        status: errorStatus,
        statusText: errorText
      }, { status: errorStatus })
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