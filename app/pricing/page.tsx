'use client'

import { useState } from 'react'
import { PRICING_PLANS } from '../lib/pricing-plans'

export default function PricingPage() {
  const [customerEmail, setCustomerEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState('')
  const [loading, setLoading] = useState('')

  const handlePurchase = async (planId: string) => {
    if (!customerEmail) {
      setShowEmailInput(planId)
      return
    }

    setLoading(planId)
    
    // 跳转到结账页面
    const checkoutUrl = `/checkout?plan=${planId}&email=${encodeURIComponent(customerEmail)}`
    window.location.href = checkoutUrl
  }

  const plans = Object.values(PRICING_PLANS)

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              onClick={() => window.location.href = '/nano'}
              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              功能特点
            </button>
            <button style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer' }}>
              定价
            </button>
            <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
              案例展示
            </button>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>中文</span>
          <button style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid #333',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            登录
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '4rem 2rem 2rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #10b981, #00a3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          选择适合你的套餐
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#888', maxWidth: '600px', margin: '0 auto' }}>
          专业AI图像生成工具，支持文生图和图片编辑，让创意无限可能
        </p>
      </div>

      {/* Pricing Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              backgroundColor: plan.popular ? '#111111' : '#0f0f0f',
              border: plan.popular ? '2px solid #10b981' : '1px solid #333',
              borderRadius: '1.5rem',
              padding: '2rem',
              position: 'relative',
              transform: plan.popular ? 'scale(1.05)' : 'none',
              boxShadow: plan.popular 
                ? '0 20px 60px rgba(16, 185, 129, 0.3)' 
                : '0 10px 30px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#10b981',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '1rem',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {plan.badge}
              </div>
            )}

            {/* Plan Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: plan.popular ? '#10b981' : '#ffffff'
              }}>
                {plan.name}
              </h3>
              
              {plan.id === 'unlimited' && (
                <div style={{
                  backgroundColor: '#1a1a1a',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ color: '#888', fontSize: '0.9rem' }}>年付特惠</div>
                  <div style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    ¥399 / 年
                  </div>
                  <div style={{ color: '#666', fontSize: '0.8rem' }}>
                    约 ${(plan.price / 100).toFixed(2)} USD
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: plan.popular ? '3rem' : '2.5rem',
                  fontWeight: 'bold',
                  color: plan.popular ? '#10b981' : '#ffffff'
                }}>
                  ${(plan.price / 100).toFixed(2)}
                </span>
                <span style={{ color: '#888', fontSize: '1rem' }}>
                  {plan.billing === 'yearly' ? '/年' : plan.billing === 'monthly' ? '/月' : '一次性'}
                </span>
              </div>

              {plan.originalPrice && (
                <div style={{
                  color: '#666',
                  fontSize: '1rem',
                  textDecoration: 'line-through',
                  marginTop: '0.5rem'
                }}>
                  原价: ${(plan.originalPrice / 100).toFixed(2)}
                </div>
              )}

              {'savings' in plan && plan.savings && (
                <div style={{
                  color: '#10b981',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  marginTop: '0.5rem'
                }}>
                  💰 {plan.savings}
                </div>
              )}
            </div>

            {/* Features */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#888', marginBottom: '1rem', fontSize: '0.9rem' }}>
                包含功能：
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                    color: '#ccc'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '1.1rem' }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Credits Display */}
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '1rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                获得积分
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#10b981'
              }}>
                {plan.credits === -1 ? '∞' : plan.credits} 
                <span style={{ fontSize: '1rem', color: '#888', marginLeft: '0.5rem' }}>
                  {plan.credits === -1 ? '无限积分' : '积分'}
                </span>
              </div>
              {plan.credits === -1 && (
                <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  永不过期 · 无限使用
                </div>
              )}
            </div>

            {/* Purchase Button */}
            <button
              onClick={() => handlePurchase(plan.id)}
              disabled={loading === plan.id}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: plan.popular 
                  ? (loading === plan.id ? '#666' : '#10b981')
                  : (loading === plan.id ? '#666' : 'transparent'),
                color: plan.popular ? 'white' : '#10b981',
                border: plan.popular ? 'none' : '2px solid #10b981',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading === plan.id ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (loading !== plan.id) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (loading !== plan.id) {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = plan.popular ? '0 20px 60px rgba(16, 185, 129, 0.3)' : 'none'
                }
              }}
            >
              {loading === plan.id ? (
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
                  🚀 立即{plan.billing === 'yearly' ? '年付' : plan.billing === 'monthly' ? '订阅' : '购买'}
                </>
              )}
            </button>

            {/* Special Notes */}
            {plan.id === 'unlimited' && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#0f2419',
                border: '1px solid #10b981',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  💰 超值优惠
                </div>
                <div style={{ color: '#888' }}>
                  相当于每月仅需 $4.67，比月付节省70%
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Email Input Modal */}
      {showEmailInput && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#111111',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #333',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>
              📧 输入邮箱地址
            </h3>
            <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              我们将向此邮箱发送购买确认和收据
            </p>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowEmailInput('')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: 'transparent',
                  color: '#888',
                  border: '1px solid #333',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (customerEmail) {
                    handlePurchase(showEmailInput)
                    setShowEmailInput('')
                  }
                }}
                disabled={!customerEmail}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: customerEmail ? '#10b981' : '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: customerEmail ? 'pointer' : 'not-allowed'
                }}
              >
                继续支付
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#10b981'
        }}>
          💡 常见问题
        </h2>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{
            backgroundColor: '#111111',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
              🤔 什么是无限积分？
            </h4>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              无限积分意味着你可以无限次使用AI图像生成和编辑功能，没有使用次数限制，让你的创意无界限。
            </p>
          </div>

          <div style={{
            backgroundColor: '#111111',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
              💳 支持哪些支付方式？
            </h4>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              我们通过Stripe支持所有主要信用卡、借记卡、Apple Pay、Google Pay等安全支付方式。
            </p>
          </div>

          <div style={{
            backgroundColor: '#111111',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
              🔄 可以随时取消吗？
            </h4>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              年付套餐为一次性付费，无自动续费。如有问题可联系客服处理退款申请。
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
} 