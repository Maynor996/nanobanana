// 客户端定价计划配置 - 不包含服务器端环境变量
export const PRICING_PLANS = {
  unlimited: {
    id: 'unlimited',
    name: '无限年付版',
    price: 5599, // $55.99 in cents (399 CNY ≈ $55.99)
    priceCny: 39900, // 399.00 CNY in cents
    currency: 'usd',
    credits: -1, // -1 表示无限积分
    billing: 'yearly',
    originalPrice: 11999, // $119.99 原价
    features: [
      '🚀 无限AI生成积分',
      '⚡ 最高优先级处理',
      '🎨 所有风格和模型', 
      '📸 无限图片编辑',
      '💾 永久云端存储',
      '🌍 全球CDN加速',
      '📞 7×24专属客服',
      '💼 完整商业授权',
      '🔄 自动更新新功能',
      '📊 使用数据分析'
    ],
    badge: '🔥 超值年付 - 省70%',
    popular: true,
    savings: '相比月付节省 $64/年'
  },
  pro: {
    id: 'pro',
    name: '专业月付版',
    price: 999, // $9.99 in cents
    currency: 'usd', 
    credits: 500,
    billing: 'monthly',
    originalPrice: 1999, // $19.99 原价
    features: [
      '500个AI生成积分',
      '优先处理速度',
      '高生成成功率', 
      '高级编辑功能',
      '多图参考生成',
      '高速下载通道',
      '优先客服支持',
      '扩展商业许可'
    ],
    badge: '按月灵活付费',
    popular: false
  },
  starter: {
    id: 'starter',
    name: '体验版',
    price: 299, // $2.99 in cents
    currency: 'usd',
    credits: 50,
    billing: 'one-time',
    originalPrice: 599, // $5.99 原价
    features: [
      '50个AI生成积分',
      'Nano Banana高质量模型', 
      '文本生成图像',
      '图像编辑功能',
      '标准生成速度',
      '标准客服支持'
    ],
    badge: '新用户体验价',
    popular: false
  }
} as const

export type PlanId = keyof typeof PRICING_PLANS

export function getPlan(planId: string) {
  if (!isValidPlanId(planId)) {
    throw new Error(`无效的套餐ID: ${planId}`)
  }
  return PRICING_PLANS[planId]
}

export function isValidPlanId(planId: string): planId is PlanId {
  return planId in PRICING_PLANS
} 