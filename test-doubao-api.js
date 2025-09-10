// 测试豆包 API 集成
const testDoubaoAPI = async () => {
  try {
    console.log('测试豆包 API...')
    
    const response = await fetch('http://localhost:3000/api/doubao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: '一只可爱的橘猫坐在彩虹桥上，梦幻风格，柔和光线',
        sessionId: 'test-session-' + Date.now(),
        size: 'adaptive',
        guidance_scale: 5.5,
        watermark: true
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ 豆包 API 测试成功!')
      console.log('响应数据:', {
        hasImageData: !!data.imageData,
        model: data.model,
        usage: data.usage
      })
    } else {
      console.error('❌ 豆包 API 测试失败:', data.error)
      console.error('详细信息:', data.details)
    }
  } catch (error) {
    console.error('❌ 测试过程中出错:', error.message)
  }
}

// 测试图片编辑功能
const testDoubaoImageEdit = async () => {
  try {
    console.log('测试豆包图片编辑 API...')
    
    // 使用一个示例 base64 图片数据（1x1像素的透明PNG）
    const sampleImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    
    const response = await fetch('http://localhost:3000/api/doubao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: '将这张图片转换为油画风格，增加温暖色调',
        imageData: sampleImageBase64,
        sessionId: 'test-session-' + Date.now(),
        size: 'adaptive',
        guidance_scale: 6.0,
        watermark: true
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ 豆包图片编辑 API 测试成功!')
      console.log('响应数据:', {
        hasImageData: !!data.imageData,
        model: data.model,
        usage: data.usage
      })
    } else {
      console.log('❌ 豆包图片编辑 API 测试失败:', data.error)
      console.log('详细信息:', data.details)
    }
  } catch (error) {
    console.error('❌ 图片编辑测试过程中出错:', error.message)
  }
}

// 运行测试
if (typeof window === 'undefined') {
  // Node.js 环境
  const fetch = require('node-fetch')
  testDoubaoAPI()
  setTimeout(testDoubaoImageEdit, 2000)
} else {
  // 浏览器环境
  console.log('在浏览器控制台中运行以下命令来测试:')
  console.log('testDoubaoAPI()')
  console.log('testDoubaoImageEdit()')
  
  window.testDoubaoAPI = testDoubaoAPI
  window.testDoubaoImageEdit = testDoubaoImageEdit
}