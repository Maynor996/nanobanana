import { NextRequest, NextResponse } from 'next/server'
import { AlipayService, getAlipayConfig, PaymentOrder } from '../utils'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { out_trade_no, subject, total_amount, timeout_express } = await request.json()

    // Validate required parameters
    if (!out_trade_no || !subject || !total_amount) {
      return NextResponse.json({ 
        error: '缺少必要参数: out_trade_no, subject, total_amount' 
      }, { status: 400 })
    }

    // Validate amount format
    const amount = parseFloat(total_amount)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ 
        error: '金额格式错误' 
      }, { status: 400 })
    }

    // Get Alipay configuration
    const config = getAlipayConfig()
    if (!config.app_id || !config.private_key || !config.alipay_public_key) {
      return NextResponse.json({ 
        error: '支付宝配置缺失' 
      }, { status: 500 })
    }

    // Create Alipay service instance
    const alipayService = new AlipayService(config)

    // Prepare order data
    const order: PaymentOrder = {
      out_trade_no,
      subject,
      total_amount: total_amount.toString(),
      timeout_express: timeout_express || '30m'
    }

    // Create face-to-face payment
    const result = await alipayService.createF2FPay(order)
    
    // Parse the response
    try {
      const jsonStart = result.indexOf('{')
      const jsonEnd = result.lastIndexOf('}') + 1
      const jsonStr = result.substring(jsonStart, jsonEnd)
      const responseData = JSON.parse(jsonStr)

      const tradeResponse = responseData.alipay_trade_precreate_response

      if (tradeResponse.code === '10000') {
        // Success - return QR code
        return NextResponse.json({
          success: true,
          qr_code: tradeResponse.qr_code,
          out_trade_no: tradeResponse.out_trade_no,
          msg: '二维码生成成功'
        })
      } else {
        // Failed
        return NextResponse.json({
          success: false,
          error: tradeResponse.msg || tradeResponse.sub_msg || '创建支付订单失败',
          code: tradeResponse.code
        }, { status: 400 })
      }
    } catch (parseError) {
      console.error('解析支付宝响应失败:', parseError)
      console.error('原始响应:', result)
      return NextResponse.json({
        success: false,
        error: '解析支付宝响应失败',
        raw_response: result
      }, { status: 500 })
    }

  } catch (error) {
    console.error('创建支付订单错误:', error)
    return NextResponse.json({
      success: false,
      error: '创建支付订单失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}