import { NextRequest, NextResponse } from 'next/server'
import { AlipayService, getAlipayConfig } from '../utils'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Get form data from Alipay callback
    const formData = await request.formData()
    // 解析表单数据
    const params: Record<string, string> = {}
    
    // 修复TypeScript编译错误 - 使用Array.from处理FormData
    const entries = Array.from(formData.entries())
    for (const [key, value] of entries) {
      params[key] = value.toString()
    }

    console.log('收到支付宝回调:', params)

    // Get Alipay configuration
    const config = getAlipayConfig()
    if (!config.app_id || !config.private_key || !config.alipay_public_key) {
      console.error('支付宝配置缺失')
      return new Response('fail', { status: 500 })
    }

    // Create Alipay service instance
    const alipayService = new AlipayService(config)

    // Verify signature
    const isValid = alipayService.verifySign(params)
    if (!isValid) {
      console.error('签名验证失败')
      return new Response('fail', { status: 400 })
    }

    // Check if payment is successful
    if (params.trade_status === 'TRADE_SUCCESS' || params.trade_status === 'TRADE_FINISHED') {
      const paymentData = {
        out_trade_no: params.out_trade_no,
        trade_no: params.trade_no,
        buyer_id: params.buyer_id,
        seller_id: params.seller_id,
        trade_status: params.trade_status,
        total_amount: params.total_amount,
        receipt_amount: params.receipt_amount,
        gmt_payment: params.gmt_payment,
        subject: params.subject
      }

      console.log('支付成功:', paymentData)

      // Here you would typically:
      // 1. Update your database with payment status
      // 2. Send confirmation emails/notifications
      // 3. Process the order
      // 4. Update user account/credits

      // For MVP, just log the successful payment
      console.log(`订单 ${params.out_trade_no} 支付成功，金额：${params.total_amount}`)

      // Return success to Alipay
      return new Response('success')
    } else {
      console.log('支付状态未完成:', params.trade_status)
      return new Response('success') // Still return success to acknowledge receipt
    }

  } catch (error) {
    console.error('处理支付宝回调错误:', error)
    return new Response('fail', { status: 500 })
  }
}

// Handle GET requests (for testing)
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  // 解析URL参数
  const params: Record<string, string> = {}
  
  // 修复TypeScript编译错误 - 使用Array.from处理URLSearchParams
  const urlEntries = Array.from(url.searchParams.entries())
  for (const [key, value] of urlEntries) {
    params[key] = value
  }

  console.log('收到支付宝GET回调:', params)

  // Get Alipay configuration
  const config = getAlipayConfig()
  if (!config.app_id || !config.private_key || !config.alipay_public_key) {
    console.error('支付宝配置缺失')
    return new Response('fail', { status: 500 })
  }

  // Create Alipay service instance
  const alipayService = new AlipayService(config)

  // Verify signature
  const isValid = alipayService.verifySign(params)
  if (!isValid) {
    console.error('签名验证失败')
    return new Response('fail', { status: 400 })
  }

  return new Response('success')
}