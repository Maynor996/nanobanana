'use client'

import { useState } from 'react'

export default function AlipayTest() {
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [orderNo, setOrderNo] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')

  const createPayment = async () => {
    setLoading(true)
    try {
      const out_trade_no = 'test_' + Date.now()
      setOrderNo(out_trade_no)

      const response = await fetch('/api/alipay/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          out_trade_no,
          subject: '测试订单',
          total_amount: '0.01',
          timeout_express: '30m'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setQrCode(data.qr_code)
        setPaymentStatus('二维码已生成，请扫码支付')
      } else {
        setPaymentStatus(`创建支付失败: ${data.error}`)
      }
    } catch (error) {
      setPaymentStatus(`请求失败: ${error}`)
    }
    setLoading(false)
  }

  const queryPayment = async () => {
    if (!orderNo) {
      setPaymentStatus('请先创建订单')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/alipay/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          out_trade_no: orderNo
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setPaymentStatus(`订单状态: ${data.trade_status}`)
        if (data.trade_status === 'TRADE_SUCCESS') {
          setPaymentStatus(`支付成功！金额: ${data.total_amount}`)
        }
      } else {
        setPaymentStatus(`查询失败: ${data.error}`)
      }
    } catch (error) {
      setPaymentStatus(`查询失败: ${error}`)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>支付宝当面付测试</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={createPayment} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '创建中...' : '创建支付订单'}
        </button>

        <button 
          onClick={queryPayment} 
          disabled={loading || !orderNo}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !orderNo ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '查询中...' : '查询支付状态'}
        </button>
      </div>

      {orderNo && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <strong>订单号：</strong> {orderNo}
        </div>
      )}

      {qrCode && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h3>支付二维码</h3>
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'white', 
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCode)}`}
              alt="支付二维码"
              style={{ width: '200px', height: '200px' }}
            />
          </div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            使用支付宝扫码支付 ¥0.01
          </p>
        </div>
      )}

      {paymentStatus && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: paymentStatus.includes('成功') ? '#f6ffed' : '#fff7e6', 
          border: `1px solid ${paymentStatus.includes('成功') ? '#b7eb8f' : '#ffd591'}`,
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          <strong>状态：</strong> {paymentStatus}
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>使用说明</h3>
        <ol style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>确保在 .env.local 中配置了正确的支付宝参数</li>
          <li>点击"创建支付订单"生成支付二维码</li>
          <li>使用支付宝扫码支付（测试金额 ¥0.01）</li>
          <li>点击"查询支付状态"检查支付结果</li>
        </ol>
        
        <h4 style={{ marginTop: '20px' }}>配置参数</h4>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>ALIPAY_APP_ID：支付宝应用ID</li>
          <li>ALIPAY_PRIVATE_KEY：应用私钥</li>
          <li>ALIPAY_PUBLIC_KEY：支付宝公钥</li>
          <li>ALIPAY_NOTIFY_URL：支付回调地址</li>
        </ul>
      </div>
    </div>
  )
}