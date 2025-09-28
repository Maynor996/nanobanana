// Gemini 图片编辑功能正确实现示例
const API_KEY = 'sk-uq5N8kDcsnbGcskR0PknOVLecd5LWYCBzsJLHiHDZ0gLGoU5';
const MODEL = 'gemini-2.5-flash-image-preview';

// 示例：正确的图片编辑API调用
async function editImageWithGemini(imageBase64, editPrompt) {
  console.log('开始图片编辑测试...');
  console.log('编辑指令:', editPrompt);
  console.log('-------------------');

  try {
    const response = await fetch(
      `https://apipro.maynor1024.live/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: editPrompt
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64
                  }
                }
              ]
            }
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"], // 关键配置：必须包含IMAGE
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ API调用失败:', response.status, response.statusText);
      console.error('错误详情:', data);
      return null;
    }

    console.log('✅ API调用成功');
    
    // 提取生成的图片数据
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const parts = data.candidates[0].content.parts;
      
      // 查找图片部分
      const imagePart = parts.find(part => part.inline_data && part.inline_data.mime_type.startsWith('image/'));
      if (imagePart) {
        console.log('✅ 图片编辑成功');
        return {
          success: true,
          imageData: imagePart.inline_data.data,
          mimeType: imagePart.inline_data.mime_type
        };
      }
      
      // 查找文本回复
      const textPart = parts.find(part => part.text);
      if (textPart) {
        console.log('📝 模型回复:', textPart.text);
      }
    }
    
    console.warn('⚠️ 响应中未找到图片数据');
    return { success: false, error: '未生成图片' };
    
  } catch (error) {
    console.error('❌ 请求异常:', error.message);
    return { success: false, error: error.message };
  }
}

// 示例：文生图（对比用）
async function generateImageWithGemini(prompt) {
  console.log('开始文生图测试...');
  console.log('生成指令:', prompt);
  console.log('-------------------');

  try {
    const response = await fetch(
      `https://apipro.maynor1024.live/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            responseModalities: ["IMAGE"], // 文生图只需要IMAGE
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ 文生图失败:', response.status, response.statusText);
      console.error('错误详情:', data);
      return null;
    }

    console.log('✅ 文生图成功');
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const parts = data.candidates[0].content.parts;
      const imagePart = parts.find(part => part.inline_data && part.inline_data.mime_type.startsWith('image/'));
      
      if (imagePart) {
        return {
          success: true,
          imageData: imagePart.inline_data.data,
          mimeType: imagePart.inline_data.mime_type
        };
      }
    }
    
    return { success: false, error: '未生成图片' };
    
  } catch (error) {
    console.error('❌ 文生图异常:', error.message);
    return { success: false, error: error.message };
  }
}

// 测试用的小图片 - 1x1红色像素
const TEST_IMAGE = "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

// 运行测试
async function runTests() {
  console.log('🧪 开始Gemini图片功能测试\n');
  
  // 测试1: 文生图
  console.log('=== 测试1: 文生图 ===');
  const textToImageResult = await generateImageWithGemini("一只可爱的小猫咪坐在花园里");
  console.log('文生图结果:', textToImageResult ? '✅ 成功' : '❌ 失败');
  console.log('');
  
  // 测试2: 图片编辑
  console.log('=== 测试2: 图片编辑 ===');
  const editResult = await editImageWithGemini(
    TEST_IMAGE, 
    "请为这张图片添加一个可爱的蝴蝶在右上角"
  );
  console.log('图片编辑结果:', editResult?.success ? '✅ 成功' : '❌ 失败');
  
  // 总结
  console.log('\n📊 测试总结:');
  console.log('文生图:', textToImageResult?.success ? '✅ 正常' : '❌ 异常');
  console.log('图片编辑:', editResult?.success ? '✅ 正常' : '❌ 异常');
  
  if (!editResult?.success && textToImageResult?.success) {
    console.log('\n🔍 分析: 文生图成功但图片编辑失败的可能原因:');
    console.log('1. responseModalities配置不正确');
    console.log('2. inline_data格式问题');
    console.log('3. 图片数据损坏或格式不支持');
    console.log('4. API权限限制');
    console.log('5. 模型对编辑功能的限制');
  }
}

// 如果在 Node.js 环境中运行
if (typeof require !== 'undefined' && require.main === module) {
  runTests();
}

module.exports = {
  editImageWithGemini,
  generateImageWithGemini,
  runTests
};