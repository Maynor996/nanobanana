'use client'

import { useState, useEffect } from 'react'
import { generateSessionId } from '../lib/credits'
import UserAuth from './UserAuth'

interface AnonymousUserProps {
  onSessionReady: (sessionId: string) => void
  forceShowLogin?: boolean
}

export default function AnonymousUser({ onSessionReady, forceShowLogin }: AnonymousUserProps) {
  const [sessionId, setSessionId] = useState<string>('')
  const [remainingUses, setRemainingUses] = useState<number>(3)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    // 初始化会话
    let savedSessionId = localStorage.getItem('nano_session_id')

    if (!savedSessionId) {
      savedSessionId = generateSessionId()
      localStorage.setItem('nano_session_id', savedSessionId)
    }

    setSessionId(savedSessionId)
    onSessionReady(savedSessionId)

    // 获取剩余使用次数
    updateRemainingUses(savedSessionId)
  }, [])

  // 监听forceShowLogin变化
  useEffect(() => {
    if (forceShowLogin) {
      setShowLoginPrompt(true)
    }
  }, [forceShowLogin])

  const updateRemainingUses = async (sid: string) => {
    try {
      const response = await fetch(`/api/anonymous/credits?sessionId=${encodeURIComponent(sid)}`)
      const data = await response.json()

      if (response.ok && data.success) {
        setRemainingUses(data.remainingFreeUses)

        // 如果免费次数用完了，显示登录提示
        if (data.remainingFreeUses <= 0 && !localStorage.getItem('nano_user_email')) {
          setShowLoginPrompt(true)
        }
      } else {
        console.error('获取剩余使用次数失败:', data.error)
        // 如果API调用失败，默认设置为3次免费试用
        setRemainingUses(3)
      }
    } catch (error) {
      console.error('获取剩余使用次数网络错误:', error)
      // 如果网络错误，默认设置为3次免费试用
      setRemainingUses(3)
    }
  }

  const handleShowLogin = () => {
    setShowAuth(true)
    setShowLoginPrompt(false)
  }

  const handleAuthSuccess = (email: string) => {
    setShowAuth(false)
    setShowLoginPrompt(false)
    // 重新初始化会话，因为现在是注册用户
    const newSessionId = generateSessionId()
    setSessionId(newSessionId)
    localStorage.setItem('nano_session_id', newSessionId)
    onSessionReady(newSessionId)
  }

  if (showAuth) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
      }}>
        <UserAuth onAuth={handleAuthSuccess} />
      </div>
    )
  }

  // 登录提示弹窗
  if (showLoginPrompt) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          backgroundColor: '#111111',
          padding: '2rem',
          borderRadius: '1.5rem',
          border: '1px solid #333',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            🎁
          </div>

          <h2 style={{
            color: '#10b981',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            免费试用已结束
          </h2>

          <p style={{
            color: '#ccc',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            您的3次免费试用机会已用完！<br/>
            登录账号继续享受更多AI图像生成功能。
          </p>

          <div style={{
            backgroundColor: '#0f2419',
            border: '1px solid #10b981',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              color: '#10b981',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              🚀 登录后可享受：
            </div>
            <ul style={{
              color: '#ccc',
              textAlign: 'left',
              margin: '0',
              paddingLeft: '1.2rem'
            }}>
              <li>5个免费积分</li>
              <li>批量生成多张图片</li>
              <li>专业级AI引擎</li>
              <li>高速处理速度</li>
            </ul>
          </div>

          <button
            onClick={handleShowLogin}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            🚀 立即登录
          </button>

          <button
            onClick={() => window.location.href = '/pricing'}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'transparent',
              color: '#888',
              border: '1px solid #333',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📊 查看套餐价格
          </button>
        </div>
      </div>
    )
  }

  // 显示剩余免费次数的状态栏
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: remainingUses > 0 ? '#0f2419' : '#2a0f0f',
      border: `1px solid ${remainingUses > 0 ? '#10b981' : '#dc2626'}`,
      borderRadius: '2rem',
      fontSize: '0.9rem'
    }}>
      <span style={{ color: remainingUses > 0 ? '#10b981' : '#dc2626' }}>
        {remainingUses > 0 ? '🎁' : '⚠️'}
      </span>
      <span style={{ color: '#fff', fontWeight: '500' }}>
        免费试用: {remainingUses}/3 次
      </span>
      {remainingUses > 0 && (
        <span style={{ color: '#888', fontSize: '0.8rem' }}>
          (无需登录)
        </span>
      )}
    </div>
  )
}
