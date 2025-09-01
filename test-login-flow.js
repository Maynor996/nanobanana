// 测试登录提示流程
const https = require('https');
const http = require('http');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

async function testLoginFlow() {
  console.log('🚀 开始测试登录提示流程...\n');

  const baseUrl = 'http://localhost:3002';
  const sessionId = 'test-session-' + Date.now();

  // 步骤1: 检查初始积分
  console.log('📊 步骤1: 检查初始积分');
  try {
    const response = await makeRequest(`${baseUrl}/api/anonymous/credits?sessionId=${sessionId}`);
    console.log('✅ 初始积分:', response.data);

    if (response.data.remainingFreeUses !== 3) {
      console.log('❌ 初始积分不正确');
      return;
    }
  } catch (error) {
    console.log('❌ 获取初始积分失败:', error.message);
    return;
  }

  // 步骤2: 模拟3次API调用，使用完免费试用
  console.log('\n🎨 步骤2: 模拟3次API调用');

  for (let i = 1; i <= 3; i++) {
    console.log(`   尝试第${i}次生成...`);

    try {
      const response = await makeRequest(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `测试图片生成 ${i}`,
          sessionId: sessionId
        })
      });

      if (response.status === 402) {
        console.log(`✅ 第${i}次调用失败 - 积分不足:`, response.data);
        if (i < 3) {
          console.log('❌ 应该还有剩余积分，但API返回了积分不足');
          return;
        }
      } else if (response.status === 200) {
        console.log(`✅ 第${i}次调用成功，剩余积分:`, response.data.remainingCredits);
      } else {
        console.log(`ℹ️ 第${i}次调用返回状态码:`, response.status);
      }

    } catch (error) {
      console.log(`❌ 第${i}次调用网络错误:`, error.message);
    }
  }

  // 步骤3: 第4次调用应该触发登录提示
  console.log('\n🔒 步骤3: 测试第4次调用（应该触发登录提示）');
  try {
    const response = await makeRequest(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: '测试第4次调用',
        sessionId: sessionId
      })
    });

    if (response.status === 402 && response.data.loginRequired) {
      console.log('✅ 成功触发登录提示:', response.data);
    } else {
      console.log('❌ 没有正确触发登录提示:', response);
    }

  } catch (error) {
    console.log('❌ 第4次调用网络错误:', error.message);
  }

  console.log('\n🎉 测试完成！');
}

// 只有在直接运行此脚本时才执行测试
if (require.main === module) {
  testLoginFlow().catch(console.error);
}

module.exports = { testLoginFlow };

