import { NextRequest, NextResponse } from 'next/server'
import https from 'https'

export const runtime = 'nodejs'
export const maxDuration = 300 // 增加到 5 分钟，与主 API 一致

// 自定义 fetch 函数，支持自定义 agent
async function fetchWithAgent(url: string, options: any = {}): Promise<Response> {
  // 对于 HTTPS URL，使用自定义 agent
  if (url.startsWith('https://')) {
    const https = await import('https')
    const urlModule = await import('url')
    
    return new Promise((resolve, reject) => {
      const parsedUrl = new urlModule.URL(url)
      const requestOptions: any = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: options.method || 'GET',
        headers: options.headers || {},
        rejectUnauthorized: false, // 忽略 SSL 证书验证
      }

      const req = https.request(requestOptions, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          // 构造类似 fetch Response 的对象
          const response = {
            ok: res.statusCode! >= 200 && res.statusCode! < 300,
            status: res.statusCode!,
            statusText: res.statusMessage || '',
            headers: new Headers(res.headers as any),
            json: async () => JSON.parse(data),
            text: async () => data,
            clone: function() { return this }
          } as Response
          resolve(response)
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      if (options.body) {
        req.write(options.body)
      }
      req.end()
    })
  } else {
    // 对于 HTTP URL，使用标准 fetch
    return fetch(url, options)
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskUuid = searchParams.get('taskUuid')

    if (!taskUuid) {
      return NextResponse.json({ error: '缺少任务UUID' }, { status: 400 })
    }

    console.log('轮询 Z-Image 任务状态:', taskUuid)

    // 轮询 z-image 结果 - 使用环境变量配置
    const baseUrl = process.env.ZIMAGE_API_URL || 'https://zimage.run'
    const pollUrl = `${baseUrl}/api/z-image/task/${taskUuid}`

    // 添加重试机制处理 504 错误
    let response: Response | null = null
    let lastError: any = null
    const maxRetries = 3

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Z-Image 轮询尝试 ${attempt}/${maxRetries}`)

        // 使用自定义 fetch 函数来处理 SSL 问题
        response = await fetchWithAgent(pollUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
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

      // 检查是否是任务 ID 格式错误
      if (response && response.status === 400) {
        try {
          const errorData = await response.clone().json()
          if (errorData.message && errorData.message.includes('Invalid task ID format')) {
            return NextResponse.json({
              status: 'failed',
              error: '服务器返回的任务ID格式无效，请联系管理员',
              code: 'INVALID_TASK_ID_FORMAT',
              taskUuid: taskUuid
            })
          }
        } catch (e) {
          // 忽略解析错误
        }
      }

      return NextResponse.json({
        error: '轮询失败',
        status: errorStatus,
        statusText: errorText
      }, { status: errorStatus })
    }

    const data = await response.json()
    console.log('Z-Image 轮询响应:', data)

    // 解析 zimage.run 响应格式
    // 响应格式: { success: true, data: { task: { taskStatus: "completed", resultUrl: "..." } } }
    if (data.success && data.data && data.data.task) {
      const task = data.data.task
      
      if (task.taskStatus === 'completed' && task.resultUrl) {
        // 任务完成，返回图片 URL
        return NextResponse.json({
          status: 'completed',
          images: [task.resultUrl],
          imageUrls: [task.resultUrl],
          task: task
        })
      } else if (task.taskStatus === 'processing' || task.taskStatus === 'pending') {
        // 任务处理中
        return NextResponse.json({
          status: 'processing',
          progress: task.progress || 0,
          message: '正在处理中...',
          task: task
        })
      } else if (task.taskStatus === 'failed') {
        // 任务失败
        return NextResponse.json({
          status: 'failed',
          error: task.errorMessage || '生成失败',
          task: task
        })
      }
    }

    // 兼容旧格式
    if (data.status === 'completed' && data.image_urls && data.image_urls.length > 0) {
      return NextResponse.json({
        status: 'completed',
        images: data.image_urls,
        imageUrls: data.image_urls
      })
    } else if (data.status === 'processing' || data.status === 'pending') {
      return NextResponse.json({
        status: 'processing',
        progress: data.progress || 0,
        message: data.message || '正在处理中...'
      })
    } else if (data.status === 'failed' || data.error) {
      return NextResponse.json({
        status: 'failed',
        error: data.error || '生成失败'
      })
    }

    // 其他情况，尝试直接返回
    return NextResponse.json(data)

  } catch (error) {
    console.error('Z-Image 轮询错误:', error)
    return NextResponse.json({
      error: '轮询失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}