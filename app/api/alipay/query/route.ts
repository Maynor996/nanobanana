import { NextRequest, NextResponse } from 'next/server'
import { AlipayService, getAlipayConfig } from '../utils'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { out_trade_no } = await request.json()

    // Validate required parameters
    if (!out_trade_no) {
      return NextResponse.json({ 
        error: '缺少必要参数: out_trade_no' 
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

    // Query payment status
    const result = await alipayService.queryPay(out_trade_no)
    
    // Parse the response
    try {
      const jsonStart = result.indexOf('{')
      const jsonEnd = result.lastIndexOf('}') + 1
      const jsonStr = result.substring(jsonStart, jsonEnd)
      const responseData = JSON.parse(jsonStr)

      const queryResponse = responseData.alipay_trade_query_response

      if (queryResponse.code === '10000') {
        // Success - return payment status
        return NextResponse.json({
          success: true,
          trade_status: queryResponse.trade_status,
          trade_no: queryResponse.trade_no,
          out_trade_no: queryResponse.out_trade_no,
          buyer_logon_id: queryResponse.buyer_logon_id,
          total_amount: queryResponse.total_amount,
          receipt_amount: queryResponse.receipt_amount,
          send_pay_date: queryResponse.send_pay_date,
          msg: '查询成功'
        })
      } else if (queryResponse.code === '40004') {
        // Trade not exist
        return NextResponse.json({
          success: false,
          error: '交易不存在',
          code: queryResponse.code
        }, { status: 404 })
      } else {
        // Other error
        return NextResponse.json({
          success: false,
          error: queryResponse.msg || queryResponse.sub_msg || '查询支付状态失败',
          code: queryResponse.code
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
    console.error('查询支付状态错误:', error)
    return NextResponse.json({
      success: false,
      error: '查询支付状态失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

// Handle GET requests for query
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const out_trade_no = url.searchParams.get('out_trade_no')

  if (!out_trade_no) {
    return NextResponse.json({ 
      error: '缺少必要参数: out_trade_no' 
    }, { status: 400 })
  }

  // Convert to POST-like body format and reuse POST handler
  const mockRequest = {
    ...request,
    json: async () => ({ out_trade_no })
  } as NextRequest

  return POST(mockRequest)
}