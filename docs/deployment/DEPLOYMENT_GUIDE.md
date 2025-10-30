# 🚀 项目部署指南

## 📋 部署清单

在开始之前，请确保：

- [ ] 项目代码已提交到 Git 仓库
- [ ] 所有环境变量已配置
- [ ] 本地测试通过
- [ ] Adsterra 账号已注册

## 🔗 第一步：上传到 GitHub

### 1. 初始化 Git 仓库（如果还没有）
```bash
git init
git add .
git commit -m "Initial commit: 完整的 AI 图像编辑应用"
```

### 2. 创建 GitHub 仓库
1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 填写仓库名称（如：`gemini-nanobanana-plus-7`）
4. 选择 Public 或 Private
5. 不要初始化 README（因为我们已经有代码了）
6. 点击 "Create repository"

### 3. 推送代码到 GitHub
```bash
# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/gemini-nanobanana-plus-7.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 🌐 第二步：部署到 Vercel

### 1. 连接 GitHub 到 Vercel
1. 登录 [Vercel](https://vercel.com)
2. 点击 "Add New..." → "Project"
3. 导入你的 GitHub 仓库
4. 选择 `gemini-nanobanana-plus-7` 项目

### 2. 配置环境变量
在 Vercel 项目设置中添加以下环境变量：

```env
# AI API 配置
GEMINI_API_KEY=sk-Hlu8Y9c68cy7dvQ8FO92B77MQy6xP6H0aihMERwMhMjIeLL6
GEMINI_PRO_API_KEY=sk-Hlu8Y9c68cy7dvQ8FO92B77MQy6xP6H0aihMERwMhMjIeLL6
MAYNOR_API_KEY=sk-Hlu8Y9c68cy7dvQ8FO92B77MQy6xP6H0aihMERwMhMjIeLL6
MAYNOR_API_URL=https://for.shuo.bar

# 图片上传
IMGBB_API_KEY=605099c929a5034c2af79747a11d0844

# 邮箱配置
SMTP_HOST=smtp.qq.com
SMTP_PORT=587
SMTP_USER=349781457@qq.com
SMTP_PASS=lzoyezizpsxccjfd
EMAIL_DEV_MODE=false

# Adsterra 广告配置
NEXT_PUBLIC_ADSTERRA_ENABLED=true
NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_KEY=vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5
```

### 3. 部署设置
- **Framework Preset**: Next.js
- **Root Directory**: `./`（保持默认）
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. 点击 "Deploy"
Vercel 会自动构建和部署你的项目。

## 📊 第三步：配置 Adsterra 广告

### 1. Adsterra 账号设置
1. 注册 [Adsterra](https://adsterra.com)
2. 获取你的广告代码
3. 确保账户已通过审核

### 2. Vercel 中 Adsterra 环境变量配置

在 Vercel 项目设置 → Environment Variables 中添加：

```env
# 启用 Adsterra 广告
NEXT_PUBLIC_ADSTERRA_ENABLED=true

# Direct Link 广告（已配置）
NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_KEY=vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5

# 其他广告位（可选）
NEXT_PUBLIC_ADSTERRA_BANNER_KEY=your_banner_key
NEXT_PUBLIC_ADSTERRA_RECTANGLE_KEY=your_rectangle_key
NEXT_PUBLIC_ADSTERRA_NATIVE_KEY=your_native_key
```

### 3. 广告验证
部署完成后：
1. 访问 `https://your-domain.vercel.app/ads-dashboard`
2. 检查 Adsterra 配置状态
3. 确认广告是否正常加载

## 🔍 验证部署

### 1. 检查网站功能
- [ ] 主页能正常访问
- [ ] 图像编辑功能可用
- [ ] 用户注册登录正常
- [ ] API 响应正常

### 2. 检查广告配置
- [ ] 访问 `/ads-dashboard` 页面
- [ ] 查看广告配置状态
- [ ] 检查浏览器控制台日志
- [ ] 确认广告脚本加载

### 3. 检查环境变量
在 Vercel 函数日志中查看：
```bash
# 在 Vercel Dashboard → Functions → Logs 中查看
# 确认所有环境变量正确加载
```

## 🛠️ 常见问题解决

### Q: 广告没有显示？
**解决方案：**
1. 检查 Vercel 环境变量是否正确设置
2. 确认 `NEXT_PUBLIC_ADSTERRA_ENABLED=true`
3. 重新部署项目
4. 检查浏览器控制台错误信息

### Q: API 调用失败？
**解决方案：**
1. 检查 API 密钥是否正确
2. 确认 MAYNOR_API_URL 是否可访问
3. 查看Vercel函数日志

### Q: 构建失败？
**解决方案：**
1. 检查 `package.json` 依赖
2. 确认所有环境变量已设置
3. 查看构建日志中的错误信息

## 📱 移动端优化检查

部署后确保：
- [ ] 移动端布局正常
- [ ] 触摸操作响应灵敏
- [ ] 图片上传功能正常
- [ ] 广告不影响用户体验

## 🔐 安全注意事项

1. **API 密钥安全**：
   - 所有敏感信息都存储在环境变量中
   - 不要在前端代码中暴露 API 密钥

2. **CORS 配置**：
   - 确保跨域请求正确配置
   - 检查 API 路由的 CORS 设置

3. **域名配置**：
   - 在 Adsterra 中添加你的域名
   - 在其他服务中更新域名白名单

## 📈 监控和分析

### 1. Vercel Analytics
- 在 Vercel Dashboard 中启用 Analytics
- 监控网站性能和用户行为

### 2. Adsterra 收入监控
- 定期登录 Adsterra 后台
- 查看广告收入和表现

### 3. 错误监控
- 查看 Vercel 函数日志
- 监控 API 错误率

## 🔄 更新部署

### 更新代码流程：
```bash
# 1. 本地修改和测试
git add .
git commit -m "更新描述"
git push origin main

# 2. Vercel 会自动重新部署
# 3. 检查部署状态和功能
```

### 更新环境变量：
1. 在 Vercel Dashboard 中修改环境变量
2. 触发重新部署
3. 验证更新生效

---

## 🎉 部署完成！

恭喜！你的项目现在已经成功部署到 Vercel，并且 Adsterra 广告已经配置完成。

**接下来可以：**
- 监控网站性能
- 优化广告收入
- 根据用户反馈改进功能
- 定期更新依赖库

如有问题，请查看 Vercel 的构建日志或联系技术支持。