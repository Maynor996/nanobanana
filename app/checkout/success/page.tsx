'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取支付详情 (可选)
    const fetchPaymentDetails = async () => {
      if (paymentIntentId) {
        try {
          // 这里可以调用API获取支付详情
          // const response = await fetch(`/api/stripe/payment-details?id=${paymentIntentId}`)
          // const data = await response.json()
          // setPaymentDetails(data)
          
          // 暂时使用模拟数据
          setPaymentDetails({
            planName: '专业版',
            credits: 500,
            amount: '$23.99'
          })
        } catch (error) {
          console.error('获取支付详情失败:', error)
        }
      }
      setLoading(false)
    }

    fetchPaymentDetails()
  }, [paymentIntentId])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚙️</div>
          <p>正在确认支付...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        borderBottom: '1px solid #1a1a1a'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🍌 Nano Banana
        </h1>
      </header>

      {/* Success Content */}
      <div style={{
        maxWidth: '600px',
        margin: '4rem auto',
        padding: '0 2rem',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '120px',
          height: '120px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '3rem'
        }}>
          ✅
        </div>

        {/* Success Message */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          支付成功！
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#888',
          marginBottom: '2rem'
        }}>
          感谢你的购买！你的AI积分已经到账，现在可以开始创作了。
        </p>

        {/* Payment Details */}
        {paymentDetails && (
          <div style={{
            backgroundColor: '#111111',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #333',
            marginBottom: '2rem'
          }}>
            <h3 style={{ 
              color: '#10b981', 
              marginBottom: '1.5rem',
              fontSize: '1.3rem'
            }}>
              📋 购买详情
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>套餐:</span>
                <span style={{ fontWeight: 'bold' }}>{paymentDetails.planName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>积分:</span>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                  💎 {paymentDetails.credits} 积分
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>支付金额:</span>
                <span style={{ fontWeight: 'bold' }}>{paymentDetails.amount}</span>
              </div>
              {paymentIntentId && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#888' }}>交易ID:</span>
                  <span style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {paymentIntentId.substring(0, 20)}...
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.href = '/nano'}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981'
              e.currentTarget.style.transform = 'none'
            }}
          >
            🎨 开始创作
          </button>

          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: '#888',
              border: '1px solid #333',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10b981'
              e.currentTarget.style.color = '#10b981'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.color = '#888'
            }}
          >
            🏠 返回首页
          </button>
        </div>

        {/* Receipt Info */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          backgroundColor: '#1a1a1a',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <p style={{ marginBottom: '0.5rem' }}>
            📧 支付收据已发送到你的邮箱
          </p>
          <p>
            💡 如有任何问题，请联系客服或查看帮助文档
          </p>
        </div>
      </div>
    </div>
  )
} 