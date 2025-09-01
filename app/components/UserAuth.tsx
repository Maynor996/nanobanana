'use client'

import { useState, useEffect } from 'react'

interface UserAuthProps {
  onAuth: (email: string) => void
  onCreditsUpdate?: (credits: number, isUnlimited: boolean) => void
}

export default function UserAuth({ onAuth, onCreditsUpdate }: UserAuthProps) {
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credits, setCredits] = useState(0)
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'google'>('email')

  useEffect(() => {
    // 检查本地存储是否有登录信息
    const savedEmail = localStorage.getItem('nano_user_email')
    if (savedEmail) {
      setEmail(savedEmail)
      setIsLoggedIn(true)
      onAuth(savedEmail)
      fetchCredits(savedEmail)
    }
  }, [])

  const fetchCredits = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/user/credits?email=${encodeURIComponent(userEmail)}`)
      const data = await response.json()
      if (response.ok) {
        setCredits(data.credits)
        setIsUnlimited(data.isUnlimited)
        onCreditsUpdate?.(data.credits, data.isUnlimited)
      }
    } catch (error) {
      console.error('获取积分失败:', error)
    }
  }

  const handleLogin = () => {
    if (email && email.includes('@')) {
      localStorage.setItem('nano_user_email', email)
      setIsLoggedIn(true)
      setShowModal(false)
      onAuth(email)
      fetchCredits(email)
    }
  }

  const handleGoogleLogin = () => {
    // 这里可以集成Google登录
    alert('Google登录功能开发中，暂时使用邮箱登录')
    setLoginMethod('email')
  }

  const handleLogout = () => {
    localStorage.removeItem('nano_user_email')
    setIsLoggedIn(false)
    setEmail('')
    setCredits(0)
    setIsUnlimited(false)
    onCreditsUpdate?.(0, false)
  }

  if (isLoggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#1a1a1a',
          borderRadius: '2rem',
          border: '1px solid #333'
        }}>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>
            {email.split('@')[0]}
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#10b98120',
            borderRadius: '1rem'
          }}>
            <span style={{ color: '#10b981', fontSize: '0.9rem' }}>💎</span>
            <span style={{
              color: '#10b981',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {isUnlimited ? '∞' : credits}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'transparent',
            color: '#888',
            border: '1px solid #333',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          退出
        </button>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.9rem',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)'
          }}
        >
          🚀 开始使用
        </button>
      </div>

      {/* 登录模态框 */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            backgroundColor: '#111111',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            border: '1px solid #333',
            maxWidth: '450px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            {/* 关闭按钮 */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#888',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#888'
              }}
            >
              ×
            </button>

            {/* 标题 */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{
                color: '#10b981',
                marginBottom: '0.5rem',
                fontSize: '1.8rem',
                fontWeight: '600'
              }}>
                登录
              </h2>
              <p style={{
                color: '#888',
                fontSize: '1rem',
                margin: '0'
              }}>
                登录您的账户
              </p>
            </div>

            {/* 免费试用提示 */}
            <div style={{
              backgroundColor: '#0f2419',
              border: '1px solid #10b981',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                color: '#10b981',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.25rem'
              }}>
                🎁 免费试用
              </div>
              <p style={{
                color: '#ccc',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                登录之后可免费试用 <span style={{ color: '#10b981', fontWeight: 'bold' }}>3次</span> AI图像生成
              </p>
            </div>

            {/* 登录方式切换 */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setLoginMethod('google')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: loginMethod === 'google' ? '#1a1a1a' : 'transparent',
                  border: loginMethod === 'google' ? '1px solid #10b981' : '1px solid #333',
                  borderRadius: '0.5rem',
                  color: loginMethod === 'google' ? '#10b981' : '#888',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                🌐 使用 Google 登录
              </button>
              <button
                onClick={() => setLoginMethod('email')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: loginMethod === 'email' ? '#1a1a1a' : 'transparent',
                  border: loginMethod === 'email' ? '1px solid #10b981' : '1px solid #333',
                  borderRadius: '0.5rem',
                  color: loginMethod === 'email' ? '#10b981' : '#888',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                📧 使用邮箱登录
              </button>
            </div>

            {/* 登录表单 */}
            {loginMethod === 'email' ? (
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontSize: '1rem',
                    marginBottom: '1.5rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#10b981'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#333'
                  }}
                  autoFocus
                />
                <button
                  onClick={handleLogin}
                  disabled={!email.includes('@')}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: email.includes('@') ? '#10b981' : '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: email.includes('@') ? 'pointer' : 'not-allowed',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    if (email.includes('@')) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (email.includes('@')) {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  🚀 开始免费试用
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleGoogleLogin}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#4285f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(66, 133, 244, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🌐</span>
                  使用 Google 登录
                </button>
              </div>
            )}

            {/* 服务条款 */}
            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #333'
            }}>
              <p style={{
                color: '#666',
                fontSize: '0.8rem',
                margin: '0',
                lineHeight: '1.4'
              }}>
                继续即表示您同意我们的{' '}
                <a href="#" style={{ color: '#10b981', textDecoration: 'none' }}>服务条款</a>
                {' '}和{' '}
                <a href="#" style={{ color: '#10b981', textDecoration: 'none' }}>隐私政策</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
