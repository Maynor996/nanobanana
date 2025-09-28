// 简单的 Gemini API 测试脚本
const API_KEY = 'sk-Hlu8Y9c68cy7dvQ8FO92B77MQy6xP6H0aihMERwMhMjIeLL6';
const MODEL = 'gemini-2.5-flash-image-preview';

// 🔧 尝试不同的API端点来测试图片功能
const API_ENDPOINTS = [
  'https://for.shuo.bar/v1beta', 
  'https://apipro.maynor1024.live/v1beta',
  'https://generativelanguage.googleapis.com/v1beta'
];

// 测试图片 - 1x1 红色像素
const SAMPLE_IMAGE = "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

// 测试图像分析功能
async function testImageAnalysis() {
  console.log('=== 测试图像分析 ===');
  console.log('模型:', MODEL);

  try {
    const response = await fetch(
      `https://for.shuo.bar/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "这是一张测试图片，请描述你看到的内容。"
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: SAMPLE_IMAGE
                  }
                }
              ]
            }
          ],
          generationConfig: {
            responseModalities: ["TEXT"], // 只要文本回复
            temperature: 0.7,
            maxOutputTokens: 500
          }
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ 图像分析失败:', data);
      return false;
    } else {
      console.log('✅ 图像分析成功');
      
      // 提取文本响应
      if (data.candidates && data.candidates[0] && 
          data.candidates[0].content && data.candidates[0].content.parts) {
        const textPart = data.candidates[0].content.parts.find(p => p.text);
        if (textPart) {
          console.log('📝 模型回复:', textPart.text);
        }
      }
      return true;
    }
  } catch (error) {
    console.error('❌ 图像分析异常:', error.message);
    return false;
  }
}

// 测试文生图功能
async function testTextToImage() {
  console.log('\n=== 测试文生图 ===');

  try {
    const response = await fetch(
      `https://for.shuo.bar/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "生成一张可爱的小猫咪坐在花园里的图片"
                }
              ]
            }
          ],
          generationConfig: {
            responseModalities: ["IMAGE"], // 只要图片
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ 文生图失败:', data);
      return false;
    } else {
      console.log('✅ 文生图API调用成功');
      console.log('🔍 完整响应结构:', JSON.stringify(data, null, 2));
      
      // 检查是否生成了图片
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const content = data.candidates[0].content;
        console.log('📋 content字段:', Object.keys(content));
        
        // 检查parts是否存在
        if (!content.parts) {
          console.warn('⚠️ 响应中没有parts字段 - 可能模型不支持图片生成或配置错误');
          return false;
        }
        
        const parts = content.parts;
        console.log('📋 响应parts数量:', parts.length);
        
        parts.forEach((part, index) => {
          console.log(`Part ${index}:`, Object.keys(part));
          if (part.inline_data) {
            console.log(`  - mime_type: ${part.inline_data.mime_type}`);
            console.log(`  - data长度: ${part.inline_data.data.length}`);
          }
          if (part.text) {
            console.log(`  - text: ${part.text.substring(0, 100)}...`);
          }
        });
        
        const imagePart = parts.find(part => part.inline_data && part.inline_data.mime_type.startsWith('image/'));
        
        if (imagePart) {
          console.log('🖼️ 找到图片数据');
          console.log('📏 图片格式:', imagePart.inline_data.mime_type);
          console.log('📏 图片数据大小:', Math.round(imagePart.inline_data.data.length * 0.75), 'bytes');
          return true;
        } else {
          console.warn('⚠️ 响应中未找到图片数据');
          return false;
        }
      }
      return false;
    }
  } catch (error) {
    console.error('❌ 文生图异常:', error.message);
    return false;
  }
}

// 测试图片编辑功能
async function testImageEdit() {
  console.log('\n=== 测试图片编辑 ===');

  try {
    const response = await fetch(
      `https://for.shuo.bar/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "请为这张图片添加一个可爱的蝴蝶在右上角，保持原图的风格"
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: SAMPLE_IMAGE
                  }
                }
              ]
            }
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"], // 关键：必须包含IMAGE
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ 图片编辑失败:', response.status, response.statusText);
      console.error('详细错误:', data);
      return false;
    } else {
      console.log('✅ 图片编辑API调用成功');
      
      // 检查响应内容
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const parts = data.candidates[0].content.parts;
        
        // 查找编辑后的图片
        const imagePart = parts.find(part => part.inline_data && part.inline_data.mime_type.startsWith('image/'));
        const textPart = parts.find(part => part.text);
        
        if (imagePart) {
          console.log('🖼️ 编辑成功，生成新图片');
          console.log('📏 编辑后图片格式:', imagePart.inline_data.mime_type);
          console.log('📏 编辑后图片大小:', Math.round(imagePart.inline_data.data.length * 0.75), 'bytes');
          return true;
        } else if (textPart) {
          console.log('📝 模型文字回复:', textPart.text);
          console.warn('⚠️ 只收到文字回复，未生成编辑后的图片');
          return false;
        } else {
          console.warn('⚠️ 响应中既无图片也无文字');
          return false;
        }
      }
      return false;
    }
  } catch (error) {
    console.error('❌ 图片编辑异常:', error.message);
    return false;
  }
}

// 主测试函数
async function testGeminiAPI() {
  console.log('🧪 开始Gemini API完整功能测试');
  console.log('模型:', MODEL);
  console.log('==========================================\n');

  // 运行所有测试
  const analysisResult = await testImageAnalysis();
  const textToImageResult = await testTextToImage();
  const imageEditResult = await testImageEdit();

  // 测试总结
  console.log('\n==========================================');
  console.log('📊 测试总结:');
  console.log('图像分析:', analysisResult ? '✅ 正常' : '❌ 异常');
  console.log('文生图:', textToImageResult ? '✅ 正常' : '❌ 异常');
  console.log('图片编辑:', imageEditResult ? '✅ 正常' : '❌ 异常');
  
  // 问题诊断
  if (textToImageResult && !imageEditResult) {
    console.log('\n🔍 问题诊断: 文生图成功但图片编辑失败');
    console.log('可能原因:');
    console.log('1. responseModalities配置：图片编辑需要["TEXT", "IMAGE"]');
    console.log('2. inline_data格式：确保mime_type和data正确');
    console.log('3. 模型限制：编辑功能可能有特定限制');
    console.log('4. API权限：编辑功能可能需要特殊权限');
    console.log('5. 图片质量：输入图片可能不满足编辑要求');
  } else if (!textToImageResult && !imageEditResult) {
    console.log('\n🔍 问题诊断: 图像生成功能完全不可用');
    console.log('可能原因:');
    console.log('1. API密钥权限不足');
    console.log('2. 网络连接问题');
    console.log('3. 模型服务异常');
  } else if (analysisResult && textToImageResult && imageEditResult) {
    console.log('\n🎉 所有功能正常！');
  }
}

// 如果在 Node.js 环境中运行
if (typeof require !== 'undefined' && require.main === module) {
  testGeminiAPI();
}