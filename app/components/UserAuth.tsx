'use client'

import { useState, useEffect } from 'react'

interface UserAuthProps {
  onAuth: (email: string) => void
  onCreditsUpdate?: (credits: number, isUnlimited: boolean) => void
  triggerText?: string
  hideTrigger?: boolean
  autoOpen?: boolean
  onClose?: () => void
}

export default function UserAuth({ onAuth, onCreditsUpdate, triggerText = '🚀 开始使用', hideTrigger = false, autoOpen = false, onClose }: UserAuthProps) {
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credits, setCredits] = useState(0)
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [showModal, setShowModal] = useState(autoOpen)
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

  useEffect(() => {
    if (autoOpen) setShowModal(true)
  }, [autoOpen])

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
      {!hideTrigger && (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1rem',
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
            {triggerText}
          </button>
        </div>
      )}

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
              onClick={() => { setShowModal(false); onClose?.() }}
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

            {/* 顶部图标与标题 */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(16,185,129,0.35)'
              }}>
                ✨
              </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{
                color: '#ffffff',
                marginBottom: '0.5rem',
                fontSize: '1.8rem',
                fontWeight: '600'
              }}>
                登录
              </h2>
              <p style={{
                color: '#9ca3af',
                fontSize: '1rem',
                margin: '0'
              }}>
                登录您的账户
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'linear-gradient(135deg, #0a2a1f, #0f2419)',
                  border: '1px solid #10b981',
                  color: '#c8ffe6',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem'
                }}>
                  🎁 登录之后可免费试用
                </span>
              </div>
            </div>



            {/* 登录方式：大按钮样式 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setLoginMethod('google')}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.75rem',
                  color: '#f3f4f6',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1f2937'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <span style={{ 
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#4285f4'
                }}>G</span>
                使用 Google 登录
              </button>
              <button
                onClick={() => setLoginMethod('email')}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.75rem',
                  color: '#f3f4f6',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1f2937'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>✉️</span>
                使用邮箱登录
              </button>
            </div>

            {/* 登录表单 */}
            {loginMethod === 'email' ? (
              <div>
                <div style={{
                  marginBottom: '1rem'
                }}>
                  <label style={{
                    display: 'block',
                    color: '#9ca3af',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    邮箱
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#10b981' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#374151' }}
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleLogin}
                  disabled={!email.includes('@')}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    background: email.includes('@') ? 'linear-gradient(135deg, #10b981, #059669)' : '#374151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: email.includes('@') ? 'pointer' : 'not-allowed',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => { 
                    if (email.includes('@')) {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => { 
                    if (email.includes('@')) {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  ✉️ 发送验证码
                </button>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                  <button
                    onClick={() => setLoginMethod('google')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6b7280',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline'
                    }}
                  >
                    返回
                  </button>
                </div>
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
