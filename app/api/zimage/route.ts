import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5分钟超时，z-image 可能需要更长时间

async function zimageHandler(request: NextRequest) {
  try {
    const { prompt, imageData, imageDataArray, size = '1k', guidance_scale = 7, seed = -1, steps = 8, negative_prompt = '', batch_size = 1 } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: '请提供描述' }, { status: 400 })
    }

    // z-image API 端点 - 使用环境变量配置
    const apiUrl = process.env.ZIMAGE_API_URL
      ? `${process.env.ZIMAGE_API_URL}/v1/chat/completions`
      : 'https://zimage2.nanobanana-free.top/v1/chat/completions'

    console.log('Z-Image API 请求:', {
      prompt,
      hasImage: !!(imageDataArray && imageDataArray.length > 0) || !!imageData,
      size,
      steps,
      guidance_scale,
      batch_size
    })

    // 构建请求体 - 使用 OpenAI 兼容格式
    const requestBody: any = {
      model: 'zimage-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      extra_body: {
        prompt: prompt,
        negative_prompt: negative_prompt || process.env.ZIMAGE_DEFAULT_NEGATIVE_PROMPT || '模糊,水印,低质量,变形',
        batch_size: batch_size,
        width: size === '1k' ? 1024 : size === '2k' ? 2048 : 1360,
        height: size === '1k' ? 1024 : size === '2k' ? 2048 : 1024,
        steps: steps || parseInt(process.env.ZIMAGE_DEFAULT_STEPS || '8'),
        cfg_scale: guidance_scale || parseFloat(process.env.ZIMAGE_DEFAULT_GUIDANCE_SCALE || '7')
      }
    }

    // 如果有图片，添加到请求中（注意：z-image 主要支持文生图，图生图功能有限）
    if (imageDataArray && Array.isArray(imageDataArray) && imageDataArray.length > 0) {
      // z-image 的图生图支持可能有限，这里我们只传递第一张图作为参考
      console.log('检测到输入图片，但 z-image 主要支持文生图')
      // 可以在这里添加 img2img 的支持，如果 z-image 支持
    } else if (imageData) {
      console.log('检测到单张输入图片，但 z-image 主要支持文生图')
    }

    console.log('发送 Z-Image 请求:', JSON.stringify(requestBody, null, 2))

    // 添加重试机制
    let response: Response | null = null
    let lastError: any = null
    const maxRetries = 3 // z-image 可能需要更多重试

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Z-Image API 尝试 ${attempt}/${maxRetries}`)

        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // z-image 不需要 API Key
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(300000) // 5分钟超时
        })

        if (response.ok) {
          break // 成功，跳出重试循环
        }

        lastError = { status: response.status, statusText: response.statusText }
        console.log(`Z-Image API 尝试 ${attempt} 失败:`, lastError)

        // 如果不是最后一次尝试，等待一段时间再重试
        if (attempt < maxRetries) {
          const waitTime = attempt * 5000 // 递增等待时间：5s, 10s, 15s
          console.log(`等待 ${waitTime/1000} 秒后重试...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
        }
      } catch (error) {
        lastError = error
        console.log(`Z-Image API 尝试 ${attempt} 异常:`, error)

        // 如果不是最后一次尝试，等待一段时间再重试
        if (attempt < maxRetries) {
          const waitTime = attempt * 5000
          console.log(`等待 ${waitTime/1000} 秒后重试...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
        }
      }
    }

    // 检查最终响应
    if (!response || !response.ok) {
      let errorData: any = {}
      try {
        if (response) {
          errorData = await response.json()
        }
      } catch (e) {
        errorData = { error: { message: lastError?.message || '网络请求失败' } }
      }

      console.error('Z-Image API错误:', errorData)

      return NextResponse.json({
        error: errorData.error?.message || '生成失败',
        details: errorData,
        suggestion: '建议：1) 稍后重试 2) 使用更简短的提示词 3) 尝试减少生成数量'
      }, { status: response?.status || 500 })
    }

    const data = await response.json()
    console.log('Z-Image API响应:', data)

    // 解析 z-image 响应格式
    if (data.choices && data.choices.length > 0) {
      const taskUuid = data.choices[0].message?.content || data.choices[0].message?.task_uuid

      if (taskUuid) {
        // 返回任务 UUID，前端需要轮询获取结果
        return NextResponse.json({
          taskUuid: taskUuid,
          pollUrl: `https://zimage2.nanobanana-free.top/api/v1/images/${taskUuid}`,
          model: 'zimage-turbo',
          usage: data.usage
        })
      }
    }

    return NextResponse.json({
      error: '未能从响应中提取任务UUID',
      raw_response: data
    }, { status: 500 })

  } catch (error) {
    console.error('Z-Image生成错误:', error)
    return NextResponse.json({
      error: '生成失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return zimageHandler(request)
}