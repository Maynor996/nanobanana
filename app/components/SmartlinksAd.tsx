'use client'

import { useEffect, useState } from 'react'

/**
 * Smartlinks 智能广告组件
 * Smartlinks 是一种自动优化的广告系统，可以根据用户画像和地理位置
 * 自动选择最优的广告进行展示
 */
export default function SmartlinksAd() {
  const [showDevInfo, setShowDevInfo] = useState(false)

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const smartlinksEnabled = process.env.NEXT_PUBLIC_SMARTLINKS_ENABLED === 'true'

    // 检查是否配置了有效的 Smartlinks URL
    const smartlinksUrl = process.env.NEXT_PUBLIC_SMARTLINKS_URL
    const smartlinksId = process.env.NEXT_PUBLIC_SMARTLINKS_ID
    const hasValidConfig = smartlinksUrl &&
                          smartlinksUrl !== 'your_smartlink_url_here' &&
                          smartlinksUrl.trim() !== '' &&
                          smartlinksId &&
                          smartlinksId !== 'your_smartlink_id_here' &&
                          smartlinksId.trim() !== ''

    // 在开发环境显示调试信息
    if (!isProduction) {
      setShowDevInfo(true)
      console.log('🔗 Smartlinks: 开发环境')
      console.log('启用状态:', smartlinksEnabled ? '已启用' : '未启用')
      console.log('URL配置:', hasValidConfig ? '已配置' : '未配置')
      console.log('Smartlinks ID:', smartlinksId || '未配置')
      return
    }

    if (!smartlinksEnabled) {
      console.log('Smartlinks: 广告未启用')
      return
    }

    if (!hasValidConfig) {
      console.warn('Smartlinks: 缺少有效的配置')
      return
    }

    // 构建完整的 Smartlinks URL
    const fullUrl = `${smartlinksUrl}?key=${smartlinksId}`

    // 创建 Smartlinks 广告脚本
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = fullUrl
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.setAttribute('data-smartlinks-id', smartlinksId)

    // 添加错误处理
    script.onerror = (error) => {
      console.error('Smartlinks 加载失败:', error)
      console.warn('请检查 Smartlinks URL 和 ID 配置是否正确')
    }

    script.onload = () => {
      console.log('✅ Smartlinks 加载成功')
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
        left: '10px',
        backgroundColor: '#4a90e2',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        maxWidth: '320px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>🔗 Smartlinks (开发模式)</div>
        <div style={{ fontSize: '10px', opacity: 0.9 }}>
          状态: {process.env.NEXT_PUBLIC_SMARTLINKS_ENABLED === 'true' ? '已启用' : '已禁用'}
        </div>
        <div style={{ fontSize: '10px', opacity: 0.9 }}>
          配置: {process.env.NEXT_PUBLIC_SMARTLINKS_URL &&
                 process.env.NEXT_PUBLIC_SMARTLINKS_URL !== 'your_smartlink_url_here' ?
                 '已配置' : '未配置'}
        </div>
        <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
          ID: {process.env.NEXT_PUBLIC_SMARTLINKS_ID?.slice(0, 8) || '未配置'}...
        </div>
        <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
          URL: {process.env.NEXT_PUBLIC_SMARTLINKS_URL?.split('/')[2] || '未配置'}
        </div>
      </div>
    )
  }

  // 生产环境不渲染任何可见内容
  return null
}

/**
 * Smartlinks 横幅广告组件
 * 用于在页面特定位置展示 Smartlinks 横幅广告
 */
export function SmartlinksBanner({
  className,
  style
}: {
  className?: string
  style?: React.CSSProperties
}) {
  const smartlinksEnabled = process.env.NEXT_PUBLIC_SMARTLINKS_ENABLED === 'true'
  const isProduction = process.env.NODE_ENV === 'production'
  const smartlinksUrl = process.env.NEXT_PUBLIC_SMARTLINKS_URL

  // 检查配置
  const hasValidConfig = smartlinksUrl &&
                        smartlinksUrl !== 'your_smartlink_url_here' &&
                        smartlinksUrl.trim() !== ''

  // 在开发环境或配置无效时显示占位符
  if (!isProduction || !smartlinksEnabled || !hasValidConfig) {
    return (
      <div
        className={className || ''}
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '250px',
          width: '100%',
          backgroundColor: '#1a1a1a',
          border: '2px dashed #4a90e2',
          borderRadius: '0.5rem',
          color: '#666',
          fontSize: '0.9rem',
          padding: '2rem',
          ...style
        }}
      >
        <div style={{ marginBottom: '0.5rem', color: '#4a90e2' }}>🔗 Smartlinks 横幅广告</div>
        <div style={{ fontSize: '0.8rem' }}>
          {isProduction ?
            (smartlinksEnabled ? '配置 NEXT_PUBLIC_SMARTLINKS_URL 后��示' : 'Smartlinks 已禁用') :
            '开发环境占位符'
          }
        </div>
      </div>
    )
  }

  return (
    <div
      className={`smartlinks-banner ${className || ''}`}
      style={{
        display: 'block',
        textAlign: 'center',
        minHeight: '250px',
        width: '100%',
        backgroundColor: '#111',
        border: '1px solid #333',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        ...style
      }}
      data-smartlinks-banner="true"
    >
      {/* Smartlinks 广告将在这里渲染 */}
    </div>
  )
}

/**
 * Smartlinks 弹窗广告组件
 * 通常在页面加载或用户交互时触发
 */
export function SmartlinksPopunder() {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const smartlinksEnabled = process.env.NEXT_PUBLIC_SMARTLINKS_ENABLED === 'true'
    const smartlinksUrl = process.env.NEXT_PUBLIC_SMARTLINKS_URL
    const smartlinksId = process.env.NEXT_PUBLIC_SMARTLINKS_ID

    const hasValidConfig = smartlinksUrl &&
                          smartlinksUrl !== 'your_smartlink_url_here' &&
                          smartlinksUrl.trim() !== '' &&
                          smartlinksId &&
                          smartlinksId !== 'your_smartlink_id_here' &&
                          smartlinksId.trim() !== ''

    if (!isProduction || !smartlinksEnabled || !hasValidConfig) {
      return
    }

    // 延迟加载弹窗广告，避免影响页面加载性能
    const timer = setTimeout(() => {
      try {
        // 构建完整的 Smartlinks URL
        const fullUrl = `${smartlinksUrl}?key=${smartlinksId}`

        // 创建弹窗广告脚本
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.innerHTML = `
          (function() {
            var smartlinks = document.createElement('script');
            smartlinks.type = 'text/javascript';
            smartlinks.async = true;
            smartlinks.src = '${fullUrl}';
            smartlinks.setAttribute('data-smartlinks-id', '${smartlinksId}');
            smartlinks.setAttribute('data-ad-type', 'popunder');
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(smartlinks, s);
          })();
        `
        document.body.appendChild(script)
      } catch (error) {
        console.error('Smartlinks 弹窗广告加载失败:', error)
      }
    }, 3000) // 3秒后加载

    return () => clearTimeout(timer)
  }, [])

  return null // 弹窗广告不需要可见的 DOM 元素
}