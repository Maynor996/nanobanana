// API状态测试脚本
const testAPIStatus = async () => {
  console.log('🔍 开始测试API状态...\n');

  // 测试API端点
  const endpoints = [
    { name: 'Gemini API', url: 'http://localhost:3000/api/gemini' },
    { name: 'Doubao API', url: 'http://localhost:3000/api/doubao' },
    { name: 'Generate API', url: 'http://localhost:3000/api/generate' }
  ];

  const testData = {
    prompt: '测试提示词',
    sessionId: 'test-session-' + Date.now()
  };

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 测试 ${endpoint.name}...`);
      
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
      });

      const data = await response.json();
      
      console.log(`   状态码: ${response.status}`);
      console.log(`   响应: ${response.ok ? '✅ 成功' : '❌ 失败'}`);
      
      if (!response.ok) {
        console.log(`   错误: ${data.error || '未知错误'}`);
      }
      
      console.log('');
    } catch (error) {
      console.log(`   ❌ 网络错误: ${error.message}\n`);
    }
  }

  // 测试页面访问
  console.log('🌐 测试页面访问...');
  const pages = [
    { name: '主页', url: 'http://localhost:3000/' },
    { name: 'Nano页面', url: 'http://localhost:3000/nano' },
    { name: 'MVP页面', url: 'http://localhost:3000/mvp' }
  ];

  for (const page of pages) {
    try {
      const response = await fetch(page.url);
      console.log(`   ${page.name}: ${response.ok ? '✅ 可访问' : '❌ 不可访问'} (${response.status})`);
    } catch (error) {
      console.log(`   ${page.name}: ❌ 网络错误`);
    }
  }

  console.log('\n✨ 测试完成！');
};

// 如果在Node.js环境中运行
if (typeof window === 'undefined') {
  // 需要安装 node-fetch: npm install node-fetch
  try {
    const fetch = require('node-fetch');
    global.fetch = fetch;
    testAPIStatus();
  } catch (error) {
    console.log('请先安装 node-fetch: npm install node-fetch');
    console.log('或者在浏览器控制台中运行此脚本');
  }
} else {
  // 浏览器环境
  console.log('在浏览器控制台中运行: testAPIStatus()');
  window.testAPIStatus = testAPIStatus;
}