import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../server-config'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    let event

    // 本地测试环境跳过签名验证
    if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.NODE_ENV === 'development') {
      console.log('本地测试模式：跳过webhook签名验证')
      try {
        event = JSON.parse(body)
      } catch (err) {
        console.error('解析webhook数据失败:', err)
        return NextResponse.json({ error: '数据格式错误' }, { status: 400 })
      }
    } else {
      // 生产环境验证签名
      if (!signature) {
        console.error('缺少Stripe签名')
        return NextResponse.json({ error: '缺少签名' }, { status: 400 })
      }

      try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET!
        )
      } catch (err) {
        console.error('Webhook签名验证失败:', err)
        return NextResponse.json({ error: '签名验证失败' }, { status: 400 })
      }
    }

    console.log('收到Stripe事件:', event.type, event.id)

    // 处理不同类型的事件
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object)
        break
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object)
        break
        
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break
        
      default:
        console.log(`未处理的事件类型: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook处理错误:', error)
    return NextResponse.json({ 
      error: '处理失败' 
    }, { status: 500 })
  }
}

// 处理支付成功
async function handlePaymentSuccess(paymentIntent: any) {
  try {
    const { metadata } = paymentIntent
    const { customerEmail, planId, credits } = metadata

    console.log(`支付成功: 客户 ${customerEmail}, 套餐 ${planId}, 积分 ${credits}`)

    // 这里你需要实现:
    // 1. 更新用户积分到数据库
    // 2. 记录支付成功日志
    // 3. 发送确认邮件 (可选)
    // 4. 触发其他业务逻辑

    // 示例实现 (需要根据你的数据库结构调整):
    /*
    await updateUserCredits({
      email: customerEmail,
      creditsToAdd: parseInt(credits),
      paymentIntentId: paymentIntent.id,
      planId: planId
    })
    */

    console.log(`积分已添加: ${customerEmail} +${credits}积分`)

  } catch (error) {
    console.error('处理支付成功事件失败:', error)
  }
}

// 处理支付失败
async function handlePaymentFailed(paymentIntent: any) {
  try {
    const { metadata } = paymentIntent
    const { customerEmail, planId } = metadata

    console.log(`支付失败: 客户 ${customerEmail}, 套餐 ${planId}`)

    // 这里你可以实现:
    // 1. 记录支付失败日志
    // 2. 发送支付失败通知 (可选)
    // 3. 分析失败原因

  } catch (error) {
    console.error('处理支付失败事件失败:', error)
  }
}

// 处理结账完成 (如果使用Stripe Checkout)
async function handleCheckoutCompleted(session: any) {
  try {
    console.log('结账会话完成:', session.id)
    
    // 处理结账完成逻辑
    
  } catch (error) {
    console.error('处理结账完成事件失败:', error)
  }
} 