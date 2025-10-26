# Adsterra 广告集成说明

## 已添加的 Adsterra 广告

### Direct Link 广告
- **链接**: `https://www.effectivegatecpm.com/vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5`
- **类型**: Direct Link / Popunder
- **位置**: 全局加载（在 layout.tsx 中）
- **触发**: 页面加载时自动触发

## 本地测试

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 查看调试信息

在开发环境下，你会看到：
- 页面右下角有一个红色的提示框，显示 "🔴 Adsterra Direct Link (开发模式)"
- 浏览器控制台会输出：
  ```
  🔴 Adsterra Direct Link: 开发环境
  链接: https://www.effectivegatecpm.com/vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5
  启用状态: 已启用 或 未启用
  ```

### 3. 环境变量配置

在 `.env.local` 文件中添加：

```env
# 启用 Adsterra（开发环境测试时可以设置为 true）
NEXT_PUBLIC_ADSTERRA_ENABLED=true

# 可选：其他广告位 Key
NEXT_PUBLIC_ADSTERRA_BANNER_KEY=your-banner-key
NEXT_PUBLIC_ADSTERRA_RECTANGLE_KEY=your-rectangle-key
NEXT_PUBLIC_ADSTERRA_NATIVE_KEY=your-native-key
```

### 4. 生产环境测试

要在生产环境测试，运行：

```bash
npm run build
npm start
```

在生产环境中：
- 不会显示右下角的调试信息
- 广告脚本会实际加载
- 浏览器控制台会显示 "✅ Adsterra Direct Link 加载成功"

## 广告组件位置

### 全局广告（已集成）
- **文件**: `app/layout.tsx`
- **组件**: `<AdsterraDirectLink />`
- **说明**: 这个广告会在所有页面加载

### 其他可用的广告组件

在 `app/components/AdsterraAds.tsx` 中，你可以使用：

```tsx
import {
  AdsterraBannerAd,
  AdsterraRectangleAd,
  AdsterraNativeAd,
  AdsterraResponsiveAd,
  AdsterraDirectLinkAd  // 也可以直接使用这个
} from './components/AdsterraAds'

// 在页面中使用
<AdsterraBannerAd />
<AdsterraRectangleAd />
<AdsterraNativeAd />
```

## 查看广告配置状态

访问 `/ads-dashboard` 页面查看：
- Google AdSense 配置状态
- Adsterra 配置状态
- 广告位数量
- 收入分析（模拟数据）
- 设置指南

## 文件清单

以下文件已更新或新建：

1. ✅ `app/components/AdsterraAds.tsx` - Adsterra 广告组件
2. ✅ `app/components/AdsterraDirectLink.tsx` - Direct Link 专用组件
3. ✅ `app/layout.tsx` - 集成了全局 Direct Link 广告
4. ✅ `app/ads-dashboard/page.tsx` - 显示 Adsterra 配置
5. ✅ `app/components/AdAnalytics.tsx` - 支持 Adsterra 数据
6. ✅ `app/api/ads/analytics/route.ts` - API 支持 Adsterra
7. ✅ `app/components/AdExample.tsx` - 广告示例页面

## 注意事项

⚠️ **重要提醒**：
- Direct Link 广告通常会在用户点击页面时触发弹窗或跳转
- 请确保符合网站政策和用户体验要求
- 生产环境部署前请仔细测试
- 建议先在测试环境验证广告效果

## 测试检查清单

- [ ] 开发环境能看到右下角的红色提示框
- [ ] 浏览器控制台显示正确的日志信息
- [ ] `.env.local` 已正确配置 `NEXT_PUBLIC_ADSTERRA_ENABLED=true`
- [ ] 访问 `/ads-dashboard` 能看到 Adsterra 配置状态
- [ ] 生产构建后广告脚本正确加载

## 问题排查

如果广告没有显示：
1. 检查 `.env.local` 文件是否存在且配置正确
2. 重启开发服务器（修改环境变量后需要重启）
3. 检查浏览器控制台是否有错误信息
4. 确认网络能访问 effectivegatecpm.com 域名