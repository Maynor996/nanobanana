'use client'

import { useState } from 'react'

export default function StripeTestPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [customerEmail, setCustomerEmail] = useState('test@example.com')

  const testCreatePaymentIntent = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: 'pro',
          customerEmail: customerEmail,
          customerName: 'Test User'
        }),
      })

      const data = await response.json()
      setResult(data)

      if (response.ok) {
        console.log('✅ 支付意图创建成功:', data)
      } else {
        console.error('❌ 创建失败:', data)
      }
    } catch (error) {
      console.error('❌ 请求失败:', error)
      setResult({ error: '网络请求失败' })
    }

    setLoading(false)
  }

  const testWebhook = async () => {
    setLoading(true)
    try {
      // 本地测试模式：直接测试webhook逻辑
      const response = await fetch('/api/stripe/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 本地测试不发送stripe-signature
        },
        body: JSON.stringify({
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_test_123',
              metadata: {
                customerEmail: customerEmail,
                planId: 'pro',
                credits: '500'
              }
            }
          }
        })
      })

      const data = await response.json()
      setResult({ 
        webhookTest: true,
        ...data,
        message: 'Webhook处理逻辑测试完成'
      })
      console.log('✅ Webhook测试结果:', data)
    } catch (error) {
      console.error('❌ Webhook测试失败:', error)
      setResult({ error: 'Webhook测试失败', details: error })
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#10b981',
          textAlign: 'center'
        }}>
          🧪 Stripe支付系统测试
        </h1>

        {/* Test Controls */}
        <div style={{
          backgroundColor: '#111111',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#10b981', marginBottom: '1.5rem' }}>🔧 测试控制</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#888', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              测试邮箱:
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem'
              }}
              placeholder="输入测试邮箱"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={testCreatePaymentIntent}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: loading ? '#666' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {loading ? '测试中...' : '🧪 测试创建支付意图'}
            </button>

            <button
              onClick={testWebhook}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: loading ? '#666' : '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {loading ? '测试中...' : '🔗 测试Webhook'}
            </button>
          </div>
        </div>

        {/* Environment Check */}
        <div style={{
          backgroundColor: '#111111',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#10b981', marginBottom: '1.5rem' }}>🔍 环境检查</h2>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>Stripe公开密钥:</span>
              <span style={{ 
                color: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '#10b981' : '#ef4444',
                fontFamily: 'monospace',
                fontSize: '0.8rem'
              }}>
                {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
                  ? `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 20)}...` 
                  : '❌ 未配置'}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>应用URL:</span>
              <span style={{ color: '#10b981', fontSize: '0.9rem' }}>
                {typeof window !== 'undefined' ? window.location.origin : 'localhost:3001'}
              </span>
            </div>
          </div>
        </div>

        {/* Test Results */}
        {result && (
          <div style={{
            backgroundColor: '#111111',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h2 style={{ 
              color: result.error ? '#ef4444' : '#10b981', 
              marginBottom: '1.5rem' 
            }}>
              {result.error ? '❌ 测试失败' : '✅ 测试结果'}
            </h2>
            
            <pre style={{
              backgroundColor: '#1a1a1a',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.8rem',
              color: '#ccc',
              whiteSpace: 'pre-wrap'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>

            {result.clientSecret && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#0f2419',
                border: '1px solid #10b981',
                borderRadius: '0.5rem'
              }}>
                <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  🎉 支付意图创建成功！
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                  Client Secret: {result.clientSecret.substring(0, 30)}...
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                  套餐: {result.planInfo?.name} ({result.planInfo?.credits} 积分)
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1.5rem',
          backgroundColor: '#1a1a1a',
          borderRadius: '0.5rem'
        }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            💡 测试通过后，可以集成到定价页面
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            🏠 返回首页
          </button>
        </div>
      </div>
    </div>
  )
} 