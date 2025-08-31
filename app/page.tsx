'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 自动重定向到nano页面
    router.replace('/nano')
  }, [router])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #00d4aa, #00a3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🍌 Nano Banana
        </div>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          正在跳转到 AI 图像生成平台...
        </p>
        <div style={{
          marginTop: '2rem',
          width: '40px',
          height: '40px',
          border: '3px solid #333',
          borderTop: '3px solid #00d4aa',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}