# 🚀 Vercel部署指南 - Stripe支付集成

## 📋 部署前准备

### 1. 确认GitHub代码已推送
✅ 代码已推送到: https://github.com/xianyu110/gemini-nanobanana-plus.git

### 2. 准备环境变量
你需要以下环境变量：

```bash
# Gemini API 配置
MAYNOR_API_KEY=sk-uq5N8kDcsnbGcskR0PknOVLecd5LWxxx
MAYNOR_API_URL=https://apipro.maynor1024.live/v1

# Stripe 支付配置 (生产环境)
STRIPE_SECRET_KEY=sk_live_51RntB9Hi9Tn75TtgjJk8xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51RntB9Hi9Tn75Ttgjxxx
STRIPE_WEBHOOK_SECRET=whsec_xxx (部署后在Stripe Dashboard配置)

# 应用配置
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

## 🌐 Vercel部署步骤

### 步骤1: 登录Vercel
1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 授权Vercel访问你的GitHub仓库

### 步骤2: 导入项目
1. 点击 "New Project"
2. 选择 `gemini-nanobanana-plus` 仓库
3. 点击 "Import"

### 步骤3: 配置项目设置
```
Project Name: gemini-nano-banana (或你喜欢的名字)
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 步骤4: 配置环境变量
在Vercel项目设置中添加以下环境变量：

| 变量名 | 值 | 环境 |
|--------|----|----- |
| `MAYNOR_API_KEY` | 你的Gemini API密钥 | Production, Preview |
| `MAYNOR_API_URL` | https://apipro.maynor1024.live/v1 | Production, Preview |
| `STRIPE_SECRET_KEY` | sk_live_你的Stripe密钥 | Production |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | pk_live_你的公开密钥 | Production, Preview |
| `NEXT_PUBLIC_APP_URL` | https://你的域名.vercel.app | Production, Preview |

**注意**: `STRIPE_WEBHOOK_SECRET` 先留空，部署后再配置

### 步骤5: 部署
1. 点击 "Deploy"
2. 等待构建完成 (约2-3分钟)
3. 获取部署URL

## 🔗 Stripe Webhook配置

### 部署完成后配置Webhook:

1. **登录Stripe Dashboard**
   - 访问 https://dashboard.stripe.com
   - 进入 "Developers" → "Webhooks"

2. **创建Webhook端点**
   ```
   端点URL: https://你的域名.vercel.app/api/stripe/webhook
   监听事件: 
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - checkout.session.completed
   ```

3. **获取Webhook密钥**
   - 创建后点击Webhook端点
   - 复制 "Signing secret" (whsec_xxx)
   - 在Vercel环境变量中添加 `STRIPE_WEBHOOK_SECRET`

4. **重新部署**
   - 在Vercel Dashboard点击 "Redeploy"

## 🧪 部署后测试

### 1. 访问应用
- 主页: https://你的域名.vercel.app
- 定价页: https://你的域名.vercel.app/pricing
- 测试页: https://你的域名.vercel.app/stripe-test

### 2. 测试支付流程
1. 访问定价页面
2. 选择"无限年付版" (¥399/年)
3. 输入真实邮箱地址
4. 使用Stripe测试卡号测试: `4242 4242 4242 4242`

### 3. 验证Webhook
- 在Stripe Dashboard的Webhook页面查看事件日志
- 确认事件能正确发送到你的应用

## 🔒 安全检查清单

- ✅ .env.local 已添加到 .gitignore
- ✅ 使用生产环境Stripe密钥
- ✅ Webhook签名验证已启用
- ✅ 客户端/服务器端配置已分离
- ✅ 敏感信息不暴露到前端

## 📱 功能验证

部署后确认以下功能正常：
- [ ] 定价页面加载
- [ ] AI图像生成功能
- [ ] Stripe支付流程
- [ ] 邮件收据发送
- [ ] Webhook事件处理

## 🎯 生产环境优化

### 性能优化
- 启用Vercel Edge Functions
- 配置CDN缓存策略
- 优化图像加载

### 监控配置
- 设置Vercel Analytics
- 配置错误监控
- 添加性能监控

---

**🎉 恭喜！你的AI图像生成应用现在具备完整的商业化支付能力！** 