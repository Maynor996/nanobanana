'use client'

import { useEffect, useState } from 'react'

/**
 * Adsterra Direct Link / Popunder 广告组件
 * 这是一个全局广告，通常在页面加载时触发
 */
export default function AdsterraDirectLink() {
  const [showDevInfo, setShowDevInfo] = useState(false)

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true'

    // 在开发环境显示调试信息
    if (!isProduction) {
      setShowDevInfo(true)
      console.log('🔴 Adsterra Direct Link: 开发环境')
      console.log('链接: https://www.effectivegatecpm.com/vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5')
      console.log('启用状态:', adsterraEnabled ? '已启用' : '未启用')
      return
    }

    if (!adsterraEnabled) {
      console.log('Adsterra Direct Link: 未启用')
      return
    }

    // 创建并添加 Adsterra Direct Link 脚本
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.effectivegatecpm.com/vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5'
    script.async = true
    script.setAttribute('data-cfasync', 'false')

    // 添加错误处理
    script.onerror = () => {
      console.error('Adsterra Direct Link 加载失败')
    }

    script.onload = () => {
      console.log('✅ Adsterra Direct Link 加载成功')
    }

    document.body.appendChild(script)

    // 清理函数
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // 开发环境显示信息
  if (showDevInfo) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        backgroundColor: '#ff6b6b',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        maxWidth: '300px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>🔴 Adsterra Direct Link (开发模式)</div>
        <div style={{ fontSize: '10px', opacity: 0.9 }}>
          生产环境将加载: effectivegatecpm.com/vdsi8t1uj
        </div>
        <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
          启用: {process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true' ? '✓' : '✗'}
        </div>
      </div>
    )
  }

  // 生产环境不渲染任何可见内容
  return null
}

/**
 * Adsterra Social Bar 广告组件
 * 可以在页面底部显示一个固定的广告栏
 */
export function AdsterraSocialBar() {
  const adKey = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY || 'vdsi8t1uj'

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true'

    if (!isProduction || !adsterraEnabled) {
      return
    }

    // Social Bar 广告脚本
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.src = `https://www.effectivegatecpm.com/${adKey}?key=ef0ced4cde2c993dd97e189dd4946cf5`

    const container = document.getElementById('adsterra-social-bar')
    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script)
      }
    }
  }, [adKey])

  const isProduction = process.env.NODE_ENV === 'production'
  const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true'

  if (!isProduction || !adsterraEnabled) {
    return null
  }

  return <div id="adsterra-social-bar"></div>
}