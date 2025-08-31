'use client'

import { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement
} from '@stripe/react-stripe-js'

interface CheckoutFormProps {
  customerEmail: string
  planInfo: {
    name: string
    credits: number
    features: string[]
  }
}

export default function CheckoutForm({ customerEmail, planInfo }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // 确认支付
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          receipt_email: customerEmail,
        },
        redirect: 'if_required'
      })

      if (error) {
        // 支付失败
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message || '支付信息有误，请检查后重试')
        } else {
          setMessage('支付过程中出现错误，请稍后重试')
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 支付成功
        setPaymentSuccess(true)
        setMessage('支付成功！积分已到账，正在跳转...')
        
        // 3秒后跳转到成功页面
        setTimeout(() => {
          window.location.href = `/checkout/success?payment_intent=${paymentIntent.id}`
        }, 3000)
      }
    } catch (err) {
      setMessage('支付过程中出现未知错误')
      console.error('支付错误:', err)
    }

    setLoading(false)
  }

  if (paymentSuccess) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#0f2419',
        border: '1px solid #10b981',
        borderRadius: '1rem'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>支付成功！</h3>
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          恭喜！你已成功购买 {planInfo.name}
        </p>
        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          <div style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold' }}>
            💎 +{planInfo.credits} 积分已到账
          </div>
        </div>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          正在跳转到成功页面...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {/* 客户信息显示 */}
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          支付邮箱
        </div>
        <div style={{ color: '#10b981', fontWeight: 'bold' }}>
          {customerEmail}
        </div>
      </div>

      {/* 支付方式 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ 
          color: '#888', 
          marginBottom: '1rem',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          支付方式
        </h4>
        <PaymentElement />
      </div>

      {/* 账单地址 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ 
          color: '#888', 
          marginBottom: '1rem',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          账单地址
        </h4>
        <AddressElement 
          options={{
            mode: 'billing',
            allowedCountries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'CN'],
          }}
        />
      </div>

      {/* 错误信息 */}
      {message && (
        <div style={{
          backgroundColor: paymentSuccess ? '#0f2419' : '#2d1b1b',
          border: `1px solid ${paymentSuccess ? '#10b981' : '#ef4444'}`,
          color: paymentSuccess ? '#10b981' : '#ef4444',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          {message}
        </div>
      )}

      {/* 安全提示 */}
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem',
        fontSize: '0.8rem',
        color: '#666'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span>🔒</span>
          <span>安全支付由Stripe提供</span>
        </div>
        <div>• 你的支付信息经过加密保护</div>
        <div>• 我们不存储你的银行卡信息</div>
        <div>• 支持所有主要信用卡和借记卡</div>
      </div>

      {/* 支付按钮 */}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: loading ? '#666' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? (
          <>
            <span style={{ 
              width: '16px', 
              height: '16px', 
              border: '2px solid #ffffff40',
              borderTop: '2px solid #ffffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></span>
            处理中...
          </>
        ) : (
                     <>
             🔒 立即支付
           </>
        )}
      </button>

      {/* CSS动画 */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  )
} 