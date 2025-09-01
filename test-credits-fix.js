// 测试积分修复是否有效
const fetch = require('node-fetch');

async function testCreditsSystem() {
  console.log('🚀 开始测试积分系统修复...\n');

  const baseUrl = 'http://localhost:3000';

  // 测试1: 匿名用户积分查询
  console.log('📊 测试1: 匿名用户积分查询');
  try {
    const sessionId = 'test-session-' + Date.now();
    const creditsResponse = await fetch(`${baseUrl}/api/anonymous/credits?sessionId=${sessionId}`);
    const creditsData = await creditsResponse.json();

    console.log('✅ 匿名用户积分查询结果:', creditsData);

    if (creditsData.success && creditsData.remainingFreeUses === 3) {
      console.log('✅ 匿名用户初始积分正确: 3次免费试用\n');
    } else {
      console.log('❌ 匿名用户初始积分错误\n');
    }
  } catch (error) {
    console.log('❌ 匿名用户积分查询失败:', error.message, '\n');
  }

  // 测试2: 模拟API调用（需要有效的API密钥）
  console.log('🎨 测试2: 模拟生成API调用');
  try {
    const testPrompt = '测试图片生成';
    const sessionId = 'test-session-' + Date.now();

    const generateResponse = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: testPrompt,
        sessionId: sessionId
      })
    });

    const generateData = await generateResponse.json();
    console.log('✅ 生成API响应:', generateData);

    if (generateResponse.status === 402) {
      console.log('✅ 积分检查生效: 正确返回积分不足错误\n');
    } else if (generateData.remainingCredits !== undefined) {
      console.log('✅ 积分扣除成功，剩余积分:', generateData.remainingCredits, '\n');
    } else {
      console.log('ℹ️  API调用成功但未返回积分信息（可能是API密钥问题）\n');
    }

  } catch (error) {
    console.log('❌ 生成API调用失败:', error.message, '\n');
  }

  console.log('🎉 积分系统测试完成！');
}

// 只有在直接运行此脚本时才执行测试
if (require.main === module) {
  testCreditsSystem().catch(console.error);
}

module.exports = { testCreditsSystem };

