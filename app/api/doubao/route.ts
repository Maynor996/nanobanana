import { NextRequest, NextResponse } from 'next/server'
import { withCreditsCheck } from '../../lib/credits-middleware'

export const runtime = 'nodejs'
export const maxDuration = 60

async function doubaoHandler(request: NextRequest, userEmail: string) {
  try {
    const { prompt, imageData, imageDataArray, size = 'adaptive', guidance_scale = 5.5, watermark = true, seed = -1 } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: '请提供描述' }, { status: 400 })
    }

    const apiKey = process.env.MAYNOR_API_KEY
    const apiUrl = process.env.MAYNOR_API_URL || 'https://apipro.maynor1024.live'

    if (!apiKey) {
      return NextResponse.json({ error: 'Doubao API配置缺失' }, { status: 500 })
    }

    // 构建 doubao API 请求体
    const requestBody: any = {
      model: 'doubao-seedream-4-0-250828',
      prompt: prompt,
      response_format: 'url',
      size: size === 'adaptive' ? '1k' : size, // 将 adaptive 转换为 1k
      seed: seed,
      guidance_scale: guidance_scale,
      watermark: watermark
    }

    // 处理输入图像 - 豆包API只支持单图片输入
    let inputImageData = null
    if (imageDataArray && Array.isArray(imageDataArray) && imageDataArray.length > 0) {
      // 如果有多图片，使用第一张
      inputImageData = imageDataArray[0]
    } else if (imageData) {
      // 单图片模式（向后兼容）
      inputImageData = imageData
    }

    if (inputImageData) {
      // 确保 base64 数据格式正确
      const base64Data = inputImageData.startsWith('data:') ? inputImageData : `data:image/jpeg;base64,${inputImageData}`
      requestBody.image = base64Data
    } else {
      // 豆包API要求必须有image参数，对于文生图模式，我们创建一个1x1像素的透明图片
      const emptyImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      requestBody.image = emptyImageBase64
    }

    console.log('Doubao API 请求:', {
      url: `${apiUrl}/v1/images/generations`,
      model: requestBody.model,
      hasImage: !!inputImageData,
      requestBody: JSON.stringify(requestBody, null, 2)
    })

    // 添加重试机制
    let response: Response
    let lastError: any = null
    const maxRetries = 2
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Doubao API 尝试 ${attempt}/${maxRetries}`)
        response = await fetch(`${apiUrl}/v1/images/generations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(180000) // 3分钟超时
        })
        
        // 如果成功或者不是超时错误，跳出重试循环
        if (response.ok || response.status !== 524) {
          break
        }
        
        lastError = { status: response.status, statusText: response.statusText }
        console.log(`Doubao API 尝试 ${attempt} 失败:`, lastError)
        
        // 如果不是最后一次尝试，等待一段时间再重试
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 5000)) // 等待5秒
        }
      } catch (error) {
        lastError = error
        console.log(`Doubao API 尝试 ${attempt} 异常:`, error)
        
        // 如果不是最后一次尝试，等待一段时间再重试
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 5000)) // 等待5秒
        }
      }
    }

    // 检查最终响应
    if (!response! || !response.ok) {
      let errorData: any = {}
      try {
        if (response) {
          errorData = await response.json()
        }
      } catch (e) {
        errorData = { error: { message: lastError?.message || '网络请求失败' } }
      }
      
      console.error('Doubao API错误:', errorData)
      
      // 特殊处理524错误
      if (response?.status === 524) {
        return NextResponse.json({ 
          error: '服务器响应超时，请稍后重试。豆包模型可能正在处理大量请求。',
          details: errorData,
          suggestion: '建议：1) 稍后重试 2) 使用更简短的提示词 3) 尝试Gemini模型'
        }, { status: 524 })
      }
      
      return NextResponse.json({ 
        error: errorData.error?.message || '生成失败',
        details: errorData 
      }, { status: response?.status || 500 })
    }

    const data = await response.json()
    console.log('Doubao API响应:', data)
    
    // 解析 doubao 响应格式
    if (data.data && data.data.length > 0) {
      const imageUrl = data.data[0].url
      
      if (imageUrl) {
        // 下载图片并转换为 base64
        try {
          const imageResponse = await fetch(imageUrl)
          if (imageResponse.ok) {
            const imageBuffer = await imageResponse.arrayBuffer()
            const base64Image = Buffer.from(imageBuffer).toString('base64')
            
            return NextResponse.json({ 
              imageData: base64Image,
              mimeType: 'image/jpeg',
              originalUrl: imageUrl,
              model: 'doubao-seedream-4-0-250828',
              usage: data.usage
            })
          }
        } catch (downloadError) {
          console.error('图片下载失败:', downloadError)
          // 如果下载失败，返回原始URL
          return NextResponse.json({ 
            imageUrl: imageUrl,
            model: 'doubao-seedream-4-0-250828',
            usage: data.usage,
            note: '返回图片URL，下载失败'
          })
        }
      }
    }

    return NextResponse.json({ 
      error: '未能从响应中提取图片',
      raw_response: data 
    }, { status: 500 })
  } catch (error) {
    console.error('Doubao生成错误:', error)
    return NextResponse.json({
      error: '生成失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return withCreditsCheck(request, doubaoHandler)
}