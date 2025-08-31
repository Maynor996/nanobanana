'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'

// 初始化Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutPageProps {
  searchParams: {
    plan?: string
    email?: string
    name?: string
  }
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [planInfo, setPlanInfo] = useState<any>(null)

  const planId = searchParams.plan || 'pro'
  const customerEmail = searchParams.email || ''
  const customerName = searchParams.name || ''

  useEffect(() => {
    // 创建支付意图
    const createPaymentIntent = async () => {
      try {
        if (!customerEmail) {
          setError('请提供邮箱地址')
          setLoading(false)
          return
        }

        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId,
            customerEmail,
            customerName
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || '创建支付失败')
        }

        setClientSecret(data.clientSecret)
        setPlanInfo(data.planInfo)
        setLoading(false)

      } catch (err) {
        setError(err instanceof Error ? err.message : '创建支付失败')
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [planId, customerEmail, customerName])

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#10b981',
      colorBackground: '#111111',
      colorText: '#ffffff',
      colorDanger: '#ef4444',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      spacingUnit: '6px',
      borderRadius: '8px'
    },
    rules: {
      '.Input': {
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        color: '#ffffff'
      },
      '.Input:focus': {
        borderColor: '#10b981',
        boxShadow: '0 0 0 1px #10b981'
      },
      '.Label': {
        color: '#888888',
        fontSize: '14px'
      }
    }
  }

  const options = {
    clientSecret,
    appearance,
  }

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
          <p>正在准备支付...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #ef4444'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>❌</div>
          <h2>支付初始化失败</h2>
          <p style={{ color: '#888', marginBottom: '1rem' }}>{error}</p>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            返回
          </button>
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
        <div style={{ color: '#888' }}>
          安全支付 🔒
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* 订单摘要 */}
          <div style={{
            backgroundColor: '#111111',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem',
              color: '#10b981'
            }}>
              📋 订单摘要
            </h2>
            
            {planInfo && (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #333'
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {planInfo.name}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981' }}>
                    ${(planInfo.amount || 0) / 100}
                  </span>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#888', marginBottom: '0.5rem' }}>包含功能:</h4>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    color: '#ccc'
                  }}>
                    {planInfo.features?.map((feature: string, index: number) => (
                      <li key={index} style={{ 
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ color: '#10b981' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  backgroundColor: '#1a1a1a',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#888', fontSize: '0.9rem' }}>购买后立即获得</div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    color: '#10b981',
                    margin: '0.5rem 0'
                  }}>
                    💎 {planInfo.credits} 积分
                  </div>
                  <div style={{ color: '#666', fontSize: '0.8rem' }}>
                    永不过期 · 立即可用
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 支付表单 */}
          <div style={{
            backgroundColor: '#111111',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem',
              color: '#10b981'
            }}>
              💳 安全支付
            </h2>
            
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm 
                  customerEmail={customerEmail}
                  planInfo={planInfo}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 