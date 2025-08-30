# Gemini 2.5 Flash 图片生成器 MVP 🎨

使用 MaynorAPI 提供的 Gemini 2.5 Flash Image Preview 模型的极简图片生成器

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 运行开发服务器：
```bash
npm run dev
```

3. 访问应用：
   - 经典界面: http://localhost:3000
   - MVP 界面: http://localhost:3000/mvp
   - 🍌 **Nano 界面**: http://localhost:3000/nano (全新暗黑主题)

## 功能特点

- 🚀 使用 MaynorAPI 提供的 Gemini 2.5 Flash Image Preview 模型
- 🎨 输入文字描述请求图片生成
- ⚡ 简洁的用户界面
- 🔧 基于 Next.js 14 构建
- 📝 支持查看模型响应内容
- 🍌 **新增 Nano Banana 现代化界面**

## API 配置

本项目已预配置 MaynorAPI：
- API地址: https://apipro.maynor1024.live/v1
- 模型: gemini-2.5-flash-image-preview

## 注意事项

- 每次生成会消耗 API 额度
- Gemini 模型可能返回文本描述而非直接图片
- 模型响应格式可能包含 Markdown 或 URL

## 部署

支持一键部署到 Vercel：

```bash
npm run build
npm start
```

环境变量已在 .env.local 中配置完成。

## 🍌 Nano Banana 界面

全新的现代化暗黑主题界面，提供更优雅的用户体验：

### 特色功能
- **双模式支持**：图片编辑模式 & 文生图模式
- **快速风格**：增强细节、艺术风格、动漫风格、写实照片
- **灵感启发**：8 个预设提示词快速开始
- **批量生成**：支持 1-4 张图片同时生成
- **暗黑主题**：护眼的深色界面设计

### 访问方式
- Next.js 应用：http://localhost:3000/nano
- 独立测试页：直接打开 `nano-test.html`

### 界面预览
- 🎨 现代化的卡片式布局
- 🌙 优雅的暗黑配色方案
- ✨ 流畅的交互动画
- 📱 完美的响应式设计