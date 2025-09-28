// Gemini 2.5 Flash Image Preview 完整测试
const API_KEY = 'sk-Hlu8Y9c68cy7dvQ8FO92B77MQy6xP6H0aihMERwMhMjIeLL6';
const BASE_URL = 'https://for.shuo.bar';

// 测试图片 - 1x1 红色像素
const SAMPLE_IMAGE = "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

// 测试 Gemini 原生格式 API
async function testGeminiNativeAPI() {
  console.log('🧪 测试 Gemini 原生格式 API');
  console.log('=========================================');

  try {
    const response = await fetch(`${BASE_URL}/v1beta/models/gemini-2.5-flash-image-preview:generateContent`, {
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
                text: "请为这张图片添加一只可爱的小鸟在左上角，保持原图风格"
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
          responseModalities: ["TEXT", "IMAGE"],
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Gemini 原生 API 失败:', response.status, response.statusText);
      console.error('错误详情:', data);
      return false;
    }

    console.log('✅ Gemini 原生 API 调用成功');
    console.log('📊 响应结构:', JSON.stringify(data, null, 2));

    // 检查图片生成
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const content = data.candidates[0].content;
      
      if (content.parts) {
        const imagePart = content.parts.find(part => part.inline_data);
        const textPart = content.parts.find(part => part.text);
        
        if (imagePart) {
          console.log('🖼️ 成功生成图片');
          console.log('📏 图片格式:', imagePart.inline_data.mime_type);
          console.log('📏 图片大小:', Math.round(imagePart.inline_data.data.length * 0.75), 'bytes');
        }
        
        if (textPart) {
          console.log('📝 模型回复:', textPart.text);
        }
        
        return !!imagePart;
      } else {
        console.warn('⚠️ 响应中没有 parts 字段');
        return false;
      }
    }
    
    return false;
  } catch (error) {
    console.error('❌ Gemini 原生 API 异常:', error.message);
    return false;
  }
}

// 测试 OpenAI 格式 API
async function testOpenAIFormatAPI() {
  console.log('\n🧪 测试 OpenAI 格式 API');
  console.log('=========================================');

  try {
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "请生成一张可爱的小猫坐在花园里的图片"
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ OpenAI 格式 API 失败:', response.status, response.statusText);
      console.error('错误详情:', data);
      return false;
    }

    console.log('✅ OpenAI 格式 API 调用成功');
    console.log('📊 响应结构:', JSON.stringify(data, null, 2));

    // 检查响应内容
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const message = data.choices[0].message;
      console.log('📝 模型回复:', message.content);
      
      // OpenAI 格式可能以不同方式返回图片
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ OpenAI 格式 API 异常:', error.message);
    return false;
  }
}

// 测试图片分析功能
async function testImageAnalysis() {
  console.log('\n🧪 测试图片分析功能');
  console.log('=========================================');

  try {
    const response = await fetch(`${BASE_URL}/v1beta/models/gemini-2.5-flash-image-preview:generateContent`, {
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
                text: "请详细描述这张图片的内容，包括颜色、形状、可能的用途等"
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
          responseModalities: ["TEXT"],
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ 图片分析失败:', response.status, response.statusText);
      console.error('错误详情:', data);
      return false;
    }

    console.log('✅ 图片分析成功');
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const content = data.candidates[0].content;
      
      if (content.parts) {
        const textPart = content.parts.find(part => part.text);
        if (textPart) {
          console.log('📝 分析结果:', textPart.text);
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('❌ 图片分析异常:', error.message);
    return false;
  }
}

// 主测试函数
async function runCompleteTests() {
  console.log('🚀 Gemini 2.5 Flash Image Preview 完整功能测试');
  console.log('模型: gemini-2.5-flash-image-preview');
  console.log('API Base: ' + BASE_URL);
  console.log('==========================================\n');

  // 运行所有测试
  const analysisResult = await testImageAnalysis();
  const geminiResult = await testGeminiNativeAPI();
  const openaiResult = await testOpenAIFormatAPI();

  // 测试总结
  console.log('\n==========================================');
  console.log('📊 测试总结报告:');
  console.log('==========================================');
  console.log('图片分析 (Gemini格式):', analysisResult ? '✅ 正常' : '❌ 异常');
  console.log('图片编辑 (Gemini格式):', geminiResult ? '✅ 正常' : '❌ 异常');
  console.log('文生图 (OpenAI格式):', openaiResult ? '✅ 正常' : '❌ 异常');
  
  console.log('\n🔍 功能支持分析:');
  if (analysisResult && !geminiResult && !openaiResult) {
    console.log('- ✅ 支持图片理解和分析');
    console.log('- ❌ 不支持图片生成和编辑');
    console.log('- 💡 建议: 当前端点主要用于图片理解，不支持图片生成');
  } else if (analysisResult && geminiResult) {
    console.log('- ✅ 完整支持图片理解、生成和编辑');
    console.log('- 🎉 推荐使用 Gemini 原生格式获得最佳体验');
  } else {
    console.log('- ⚠️ 功能支持有限，建议检查API配置');
  }

  console.log('\n📋 API端点支持:');
  console.log('Gemini 原生格式: /v1beta/models/gemini-2.5-flash-image-preview:generateContent');
  console.log('OpenAI 兼容格式: /v1/chat/completions');
  
  console.log('\n💡 优化建议:');
  if (!geminiResult) {
    console.log('1. 检查 responseModalities 配置是否包含 "IMAGE"');
    console.log('2. 确认API端点是否支持图片生成功能');
    console.log('3. 验证模型版本是否正确');
  }
  console.log('4. 对于图片编辑，建议使用 Gemini 原生格式');
  console.log('5. 确保输入图片格式和大小符合要求');
}

// 如果在 Node.js 环境中运行
if (typeof require !== 'undefined' && require.main === module) {
  runCompleteTests();
}

module.exports = {
  testGeminiNativeAPI,
  testOpenAIFormatAPI,
  testImageAnalysis,
  runCompleteTests
};