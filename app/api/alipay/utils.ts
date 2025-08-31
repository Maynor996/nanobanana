import crypto from 'crypto'

export interface AlipayConfig {
  app_id: string
  private_key: string
  alipay_public_key: string
  gateway_url: string
  notify_url: string
}

export interface PaymentOrder {
  out_trade_no: string
  subject: string
  total_amount: string
  timeout_express?: string
}

export class AlipayService {
  private config: AlipayConfig

  constructor(config: AlipayConfig) {
    this.config = config
  }

  // Generate signature for Alipay requests
  private generateSign(params: Record<string, any>): string {
    // Sort parameters by key
    const sortedParams = Object.keys(params)
      .filter(key => params[key] !== '' && key !== 'sign')
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')

    // Create signature using RSA-SHA256
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(sortedParams, 'utf8')
    return sign.sign(this.config.private_key, 'base64')
  }

  // Verify Alipay callback signature
  verifySign(params: Record<string, any>): boolean {
    const { sign, sign_type, ...otherParams } = params
    
    if (sign_type !== 'RSA2') {
      return false
    }

    const sortedParams = Object.keys(otherParams)
      .sort()
      .map(key => `${key}=${otherParams[key]}`)
      .join('&')

    const verify = crypto.createVerify('RSA-SHA256')
    verify.update(sortedParams, 'utf8')
    
    try {
      return verify.verify(this.config.alipay_public_key, sign, 'base64')
    } catch (error) {
      console.error('Signature verification failed:', error)
      return false
    }
  }

  // Create face-to-face payment QR code
  async createF2FPay(order: PaymentOrder): Promise<string> {
    const params = {
      app_id: this.config.app_id,
      method: 'alipay.trade.precreate',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      version: '1.0',
      notify_url: this.config.notify_url,
      biz_content: JSON.stringify({
        out_trade_no: order.out_trade_no,
        total_amount: order.total_amount,
        subject: order.subject,
        timeout_express: order.timeout_express || '30m'
      })
    }

    params.sign = this.generateSign(params)

    const response = await fetch(this.config.gateway_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    })

    const result = await response.text()
    return result
  }

  // Query payment status
  async queryPay(out_trade_no: string): Promise<string> {
    const params = {
      app_id: this.config.app_id,
      method: 'alipay.trade.query',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      version: '1.0',
      biz_content: JSON.stringify({
        out_trade_no: out_trade_no
      })
    }

    params.sign = this.generateSign(params)

    const response = await fetch(this.config.gateway_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    })

    const result = await response.text()
    return result
  }
}

// Get Alipay configuration from environment variables
export function getAlipayConfig(): AlipayConfig {
  return {
    app_id: process.env.ALIPAY_APP_ID || '',
    private_key: process.env.ALIPAY_PRIVATE_KEY || '',
    alipay_public_key: process.env.ALIPAY_PUBLIC_KEY || '',
    gateway_url: process.env.ALIPAY_GATEWAY_URL || 'https://openapi.alipay.com/gateway.do',
    notify_url: process.env.ALIPAY_NOTIFY_URL || ''
  }
}