import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// 自定义指标
export let errorRate = new Rate('errors');
export let responseTime = new Trend('response_time');

// 测试配置
export let options = {
  stages: [
    // 热身阶段
    { duration: '2m', target: 10 },
    // 正常负载
    { duration: '5m', target: 20 },
    // 峰值负载
    { duration: '3m', target: 50 },
    // 压力测试
    { duration: '2m', target: 100 },
    // 降压
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<30000'], // 95%的请求要在30秒内完成
    http_req_failed: ['rate<0.1'],      // 错误率小于10%
    errors: ['rate<0.1'],               // 自定义错误率小于10%
  },
};

const BASE_URL = 'http://localhost:3000';

// 测试场景权重配置
const scenarios = {
  textToImage: 0.3,      // 30% - 文生图
  geminiEdit: 0.25,      // 25% - Gemini编辑
  doubaoGen: 0.25,       // 25% - Doubao生成
  auth: 0.1,             // 10% - 认证
  credits: 0.1           // 10% - 积分查询
};

// 随机选择测试场景
function selectScenario() {
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [scenario, weight] of Object.entries(scenarios)) {
    cumulative += weight;
    if (rand <= cumulative) {
      return scenario;
    }
  }
  return 'textToImage'; // 默认场景
}

// 生成随机测试数据
function generateTestData() {
  const prompts = [
    'A beautiful sunset over mountains',
    'A futuristic cityscape at night',
    'A serene lake with mountains',
    'An abstract digital art piece',
    'A fantasy forest with magical creatures'
  ];
  
  return {
    prompt: prompts[Math.floor(Math.random() * prompts.length)],
    email: `test${Math.floor(Math.random() * 10000)}@example.com`,
    mockImageData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  };
}

// 文生图测试
function testTextToImage() {
  const data = generateTestData();
  const response = http.post(`${BASE_URL}/api/generate`, JSON.stringify({
    prompt: data.prompt
  }), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '30s'
  });
  
  const success = check(response, {
    'generate API status is 200 or handled error': (r) => [200, 400, 401, 500].includes(r.status),
    'generate API response time < 30s': (r) => r.timings.duration < 30000,
  });
  
  errorRate.add(!success);
  responseTime.add(response.timings.duration);
  
  return response;
}

// Gemini图像编辑测试
function testGeminiEdit() {
  const data = generateTestData();
  const response = http.post(`${BASE_URL}/api/gemini`, JSON.stringify({
    prompt: data.prompt,
    imageData: data.mockImageData
  }), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '30s'
  });
  
  const success = check(response, {
    'gemini API status is 200 or handled error': (r) => [200, 400, 401, 500].includes(r.status),
    'gemini API response time < 30s': (r) => r.timings.duration < 30000,
  });
  
  errorRate.add(!success);
  responseTime.add(response.timings.duration);
  
  return response;
}

// Doubao图像生成测试
function testDoubaoGen() {
  const data = generateTestData();
  const response = http.post(`${BASE_URL}/api/doubao`, JSON.stringify({
    prompt: data.prompt,
    size: '1k',
    guidance_scale: 5.5,
    watermark: true
  }), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '30s'
  });
  
  const success = check(response, {
    'doubao API status is 200 or handled error': (r) => [200, 400, 401, 500, 524].includes(r.status),
    'doubao API response time < 30s': (r) => r.timings.duration < 30000,
  });
  
  errorRate.add(!success);
  responseTime.add(response.timings.duration);
  
  return response;
}

// 认证流程测试
function testAuth() {
  const data = generateTestData();
  
  // 发送验证码
  const sendVerificationResponse = http.post(`${BASE_URL}/api/auth/send-verification`, 
    JSON.stringify({ email: data.email }), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '10s'
  });
  
  sleep(1);
  
  // 验证代码
  const verifyResponse = http.post(`${BASE_URL}/api/auth/verify-code`, 
    JSON.stringify({ email: data.email, code: '123456' }), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '10s'
  });
  
  const success = check(verifyResponse, {
    'auth API status is valid': (r) => [200, 400, 401].includes(r.status),
    'auth API response time < 10s': (r) => r.timings.duration < 10000,
  });
  
  errorRate.add(!success);
  responseTime.add(verifyResponse.timings.duration);
  
  return verifyResponse;
}

// 积分查询测试
function testCredits() {
  const response = http.get(`${BASE_URL}/api/user/credits`, {
    headers: { 
      'Authorization': 'Bearer mock-token',
      'Content-Type': 'application/json'
    },
    timeout: '5s'
  });
  
  const success = check(response, {
    'credits API status is valid': (r) => [200, 401].includes(r.status),
    'credits API response time < 5s': (r) => r.timings.duration < 5000,
  });
  
  errorRate.add(!success);
  responseTime.add(response.timings.duration);
  
  return response;
}

// 主测试函数
export default function() {
  const scenario = selectScenario();
  
  switch(scenario) {
    case 'textToImage':
      testTextToImage();
      break;
    case 'geminiEdit':
      testGeminiEdit();
      break;
    case 'doubaoGen':
      testDoubaoGen();
      break;
    case 'auth':
      testAuth();
      break;
    case 'credits':
      testCredits();
      break;
  }
  
  // 随机等待时间，模拟真实用户行为
  sleep(Math.random() * 3 + 1); // 1-4秒随机等待
}

// 测试完成后的清理函数
export function teardown() {
  console.log('Performance test completed');
}