import Stripe from 'stripe'
import { PRICING_PLANS, getPlan, isValidPlanId } from '../../lib/pricing-plans'
export type { PlanId } from '../../lib/pricing-plans'

// 服务器端Stripe配置
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('❌ STRIPE_SECRET_KEY 环境变量未配置！请在 .env.local 中添加你的Stripe密钥')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const isTestMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') || false
console.log(`🔧 Stripe模式: ${isTestMode ? '测试环境' : '生产环境'}`)

// 导出定价计划相关功能
export { PRICING_PLANS, getPlan, isValidPlanId }

// Stripe产品ID映射 (需要在Stripe Dashboard中创建对应产品)
export const STRIPE_PRICE_IDS = {
  unlimited: 'price_unlimited_yearly', // 年付无限版
  pro: 'price_pro_monthly',           // 月付专业版
  starter: 'price_starter_onetime'    // 一次性体验版
} 