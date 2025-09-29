'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface GoogleAdsProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function GoogleAds({ 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true,
  style,
  className 
}: GoogleAdsProps) {
  useEffect(() => {
    // 确保 AdSense 脚本已加载
    if (typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error('AdSense 加载失败:', err)
      }
    }
  }, [])

  // 检查 AdSense ID 配置
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID
  const isDevMode = process.env.NODE_ENV === 'development'
  
  // 在开发环境显示占位符，生产环境需要有效的 AdSense ID
  if (!adsenseId || adsenseId === 'ca-pub-xxxxxxxxxxxxxxxxx') {
    if (isDevMode) {
      return (
        <div 
          className={className || ''}
          style={{
            display: 'block',
            textAlign: 'center',
            minHeight: '100px',
            backgroundColor: '#1a1a1a',
            border: '2px dashed #333',
            borderRadius: '0.5rem',
            color: '#666',
            fontSize: '0.9rem',
            padding: '2rem',
            ...style
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>📱 广告位 (开发环境)</div>
          <div style={{ fontSize: '0.8rem' }}>
            配置 AdSense ID 后在生产环境显示真实广告
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ins
      className={`adsbygoogle ${className || ''}`}
      style={{
        display: 'block',
        textAlign: 'center',
        minHeight: '100px',
        backgroundColor: '#111',
        border: '1px solid #333',
        borderRadius: '0.5rem',
        ...style
      }}
      data-ad-client={adsenseId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  )
}

// 不同尺寸的广告组件
export function BannerAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <GoogleAds
      adSlot="1234567890"
      adFormat="horizontal"
      className={className}
      style={{ height: '90px', ...style }}
    />
  )
}

export function RectangleAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <GoogleAds
      adSlot="0987654321"
      adFormat="rectangle"
      className={className}
      style={{ height: '250px', ...style }}
    />
  )
}

export function VerticalAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <GoogleAds
      adSlot="1122334455"
      adFormat="vertical"
      className={className}
      style={{ height: '600px', width: '160px', ...style }}
    />
  )
}

// 自适应广告
export function ResponsiveAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <GoogleAds
      adSlot="5566778899"
      adFormat="auto"
      fullWidthResponsive={true}
      className={className}
      style={style}
    />
  )
}