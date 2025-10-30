# API 配置使用说明

## 功能说明

在 `/nano` 页面提供了 API 配置功能，允许用户配置自己的 API 密钥和中转服务地址。

## 使用步骤

### 1. 打开配置面板

访问 `http://localhost:3000/nano`，点击页面右上角的 **⚙️ API配置** 按钮

### 2. 配置 API 信息

在弹出的配置窗口中，可以配置：

#### Gemini API
- **API Key**: 从 https://apipro.maynor1024.live 获取的 API 密钥
- **API URL**: API 中转地址（默认: https://apipro.maynor1024.live）

#### Doubao API
- **API Key**: 从 https://apipro.maynor1024.live 获取的 API 密钥
- **API URL**: API 中转地址（默认: https://apipro.maynor1024.live）

### 获取 API Key 的步骤：

1. 访问 [https://apipro.maynor1024.live](https://apipro.maynor1024.live)
2. 注册账户或登录
3. 在控制台或设置页面找到 API Key
4. 复制 API Key（通常以 `sk-` 开头）
5. 在配置页面粘贴 API Key

**注意**: 如果是第一次使用，可能需要充值或获取免费额度。

### 3. 保存配置

点击 **保存配置** 按钮，配置会保存到浏览器本地存储（localStorage）

### 4. 使用配置

保存后，系统会自动使用你配置的 API 密钥和服务地址进行图像生成。

## 配置优先级

系统会按以下优先级使用配置：

1. **用户自定义配置**（localStorage 中保存的）
2. **环境变量配置**（.env.local 文件中的）
3. **默认服务**（如果都未配置）

## 技术实现

### 前端部分

配置保存在浏览器 localStorage 中：
- **存储键**: `nanobanana_api_config`
- **数据格式**: JSON 对象

```typescript
interface ApiConfig {
  geminiApiKey: string;
  geminiApiUrl: string;
  doubaoApiKey: string;
  doubaoApiUrl: string;
}
```

### 后端部分

API 路由会接收前端传来的配置参数：

```typescript
// 前端发送请求时包含配置
const requestData = {
  prompt: '...',
  apiKey: userConfig.geminiApiKey,  // 可选
  apiUrl: userConfig.geminiApiUrl   // 可选
}

// 后端优先使用自定义配置
const apiKey = customApiKey || process.env.MAYNOR_API_KEY
const apiUrl = customApiUrl || process.env.MAYNOR_API_URL
```

## 安全说明

1. **本地存储**: API 密钥保存在浏览器本地，不会上传到服务器
2. **密码输入**: API Key 输入框使用密码类型，防止旁观
3. **清除数据**: 清除浏览器数据会清除保存的配置

## 注意事项

1. 配置仅在当前浏览器生效
2. 不同浏览器/设备需要分别配置
3. 隐私模式下的配置可能在关闭窗口后丢失
4. API 密钥请妥善保管，不要泄露给他人

## 文件说明

- `app/lib/api-config.ts` - API 配置管理模块
- `app/nano/page.tsx` - 前端页面和配置UI
- `app/api/generate/route.ts` - Gemini 文生图 API
- `app/api/gemini/route.ts` - Gemini 图生图 API
- `app/api/doubao/route.ts` - Doubao API
