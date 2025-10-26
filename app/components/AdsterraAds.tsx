'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    atOptions: any
  }
}

interface AdsterraAdsProps {
  adKey: string
  adFormat?: 'banner' | 'popunder' | 'native' | 'social-bar' | 'direct-link'
  width?: number
  height?: number
  style?: React.CSSProperties
  className?: string
}

export default function AdsterraAds({
  adKey,
  adFormat = 'banner',
  width,
  height,
  style,
  className
}: AdsterraAdsProps) {
  useEffect(() => {
    // Adsterra 广告加载
    if (typeof window !== 'undefined') {
      try {
        // 对于某些广告格式，需要设置 atOptions
        if (adFormat === 'banner' || adFormat === 'native') {
          const atOptions = {
            key: adKey,
            format: adFormat,
            height: height || 250,
            width: width || 300,
            params: {}
          }

          // 创建脚本元素
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`
          script.async = true

          const adContainer = document.getElementById(`adsterra-${adKey}`)
          if (adContainer && !adContainer.querySelector('script')) {
            adContainer.appendChild(script)
          }
        }
      } catch (err) {
        console.error('Adsterra 加载失败:', err)
      }
    }
  }, [adKey, adFormat, width, height])

  // 检查 Adsterra 配置
  const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true'
  const isDevMode = process.env.NODE_ENV === 'development'

  // 在开发环境显示占位符
  if (!adsterraEnabled || isDevMode) {
    return (
      <div
        className={className || ''}
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: height ? `${height}px` : '100px',
          width: width ? `${width}px` : '100%',
          backgroundColor: '#1a1a1a',
          border: '2px dashed #ff6b6b',
          borderRadius: '0.5rem',
          color: '#666',
          fontSize: '0.9rem',
          padding: '2rem',
          ...style
        }}
      >
        <div style={{ marginBottom: '0.5rem', color: '#ff6b6b' }}>🔴 Adsterra 广告 (开发环境)</div>
        <div style={{ fontSize: '0.8rem' }}>
          配置 NEXT_PUBLIC_ADSTERRA_ENABLED=true 后在生产环境显示
        </div>
        <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', color: '#888' }}>
          Ad Key: {adKey}
        </div>
      </div>
    )
  }

  return (
    <div
      id={`adsterra-${adKey}`}
      className={`adsterra-ads ${className || ''}`}
      style={{
        display: 'block',
        textAlign: 'center',
        minHeight: height ? `${height}px` : '100px',
        width: width ? `${width}px` : '100%',
        backgroundColor: '#111',
        border: '1px solid #333',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Adsterra 广告将在这里渲染 */}
    </div>
  )
}

// Banner 广告 (728x90 或 468x60)
export function AdsterraBannerAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const adKey = process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY || 'your-banner-key'

  return (
    <AdsterraAds
      adKey={adKey}
      adFormat="banner"
      width={728}
      height={90}
      className={className}
      style={style}
    />
  )
}

// 矩形广告 (300x250)
export function AdsterraRectangleAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const adKey = process.env.NEXT_PUBLIC_ADSTERRA_RECTANGLE_KEY || 'your-rectangle-key'

  return (
    <AdsterraAds
      adKey={adKey}
      adFormat="banner"
      width={300}
      height={250}
      className={className}
      style={style}
    />
  )
}

// Native 广告
export function AdsterraNativeAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const adKey = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY || 'your-native-key'

  return (
    <AdsterraAds
      adKey={adKey}
      adFormat="native"
      width={300}
      height={250}
      className={className}
      style={style}
    />
  )
}

// Social Bar 广告
export function AdsterraSocialBarAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const adKey = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY || 'your-social-key'

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true') {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `//pl22089466.highrevenuenetwork.com/${adKey}/invoke.js`
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [adKey])

  return (
    <div
      id={`container-${adKey}`}
      className={className}
      style={style}
    />
  )
}

// 自适应广告
export function AdsterraResponsiveAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const adKey = process.env.NEXT_PUBLIC_ADSTERRA_RESPONSIVE_KEY || 'your-responsive-key'

  return (
    <AdsterraAds
      adKey={adKey}
      adFormat="banner"
      className={className}
      style={style}
    />
  )
}

// Popunder 广告（通常在页面加载时触发）
export function AdsterraPopunder() {
  const adKey = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_KEY || 'your-popunder-key'

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true') {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };
      `
      document.body.appendChild(script)

      const invokeScript = document.createElement('script')
      invokeScript.type = 'text/javascript'
      invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`
      invokeScript.async = true
      document.body.appendChild(invokeScript)

      return () => {
        document.body.removeChild(script)
        document.body.removeChild(invokeScript)
      }
    }
  }, [adKey])

  return null // Popunder 不需要可见的 DOM 元素
}

// Direct Link 广告（使用提供的链接）
export function AdsterraDirectLinkAd() {
  const directLinkUrl = 'https://www.effectivegatecpm.com/vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5'

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true'

    if (!isProduction || !adsterraEnabled) {
      console.log('Adsterra Direct Link: 开发环境或未启用，跳过加载')
      return
    }

    // 创建 Direct Link 广告脚本
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = directLinkUrl
    script.async = true
    script.setAttribute('data-cfasync', 'false')

    script.onerror = () => {
      console.error('Adsterra Direct Link 加载失败')
    }

    script.onload = () => {
      console.log('Adsterra Direct Link 加载成功')
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return null // Direct Link 不需要可见的 DOM 元素
}