'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Microsoft: any
  }
}

interface MicrosoftAdsProps {
  adId: string
  adFormat?: string
  width?: number
  height?: number
  style?: React.CSSProperties
  className?: string
}

export default function MicrosoftAds({
  adId,
  adFormat = "auto",
  width,
  height,
  style,
  className
}: MicrosoftAdsProps) {
  useEffect(() => {
    // Microsoft Ads 脚本加载和初始化
    if (typeof window !== 'undefined') {
      try {
        // Microsoft Advertising UET tag 通常是加载 UET (Universal Event Tracking)
        const uq_params = window.uq_params || [];
        window.uq_params = uq_params;

        // 如果 UET 脚本未加载，则加载它
        if (!document.querySelector('script[src*="bat.bing.com"]')) {
          const script = document.createElement('script');
          script.async = true;
          script.src = `//bat.bing.com/bat.js`;
          script.onload = () => {
            console.log('Microsoft Ads UET script loaded');
          };
          document.head.appendChild(script);
        }
      } catch (err) {
        console.error('Microsoft Ads 加载失败:', err)
      }
    }
  }, [])

  // 检查 Microsoft Ads 配置
  const microsoftAdsId = process.env.NEXT_PUBLIC_MICROSOFT_ADS_ID
  const isDevMode = process.env.NODE_ENV === 'development'

  // 在开发环境显示占位符，生产环境需要有效的 Microsoft Ads ID
  if (!microsoftAdsId || microsoftAdsId === 'your-microsoft-ads-id') {
    if (isDevMode) {
      return (
        <div
          className={className || ''}
          style={{
            display: 'block',
            textAlign: 'center',
            minHeight: '100px',
            backgroundColor: '#1a1a1a',
            border: '2px dashed #0078d4',
            borderRadius: '0.5rem',
            color: '#666',
            fontSize: '0.9rem',
            padding: '2rem',
            ...style
          }}
        >
          <div style={{ marginBottom: '0.5rem', color: '#0078d4' }}>🔵 Microsoft Ads (开发环境)</div>
          <div style={{ fontSize: '0.8rem' }}>
            配置 Microsoft Ads ID 后在生产环境显示真实广告
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div
      className={`microsoft-ads ${className || ''}`}
      style={{
        display: 'block',
        textAlign: 'center',
        minHeight: '100px',
        backgroundColor: '#111',
        border: '1px solid '#333',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Microsoft Ads 容器 */}
      <div
        id={`ms-ad-${adId}`}
        data-ad-id={adId}
        data-ad-format={adFormat}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          display: 'inline-block'
        }}
      >
        {/* Microsoft Ads 将在这里渲染 */}
        <noscript>
          <img
            src="//bat.bing.com/action/0?ti=TRACKER_ID&Ver=2"
            height="0"
            width="0"
            style={{display:'none',visibility:'hidden'}}
            alt="Microsoft Advertising"
          />
        </noscript>
      </div>
    </div>
  )
}

// 不同尺寸的 Microsoft Ads 组件
export function MicrosoftBannerAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <MicrosoftAds
      adId="banner-ad"
      adFormat="banner"
      width={728}
      height={90}
      className={className}
      style={style}
    />
  )
}

export function MicrosoftRectangleAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <MicrosoftAds
      adId="rectangle-ad"
      adFormat="rectangle"
      width={300}
      height={250}
      className={className}
      style={style}
    />
  )
}

export function MicrosoftSkyscraperAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <MicrosoftAds
      adId="skyscraper-ad"
      adFormat="skyscraper"
      width={160}
      height={600}
      className={className}
      style={style}
    />
  )
}

// 自适应广告
export function MicrosoftResponsiveAd({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <MicrosoftAds
      adId="responsive-ad"
      adFormat="auto"
      className={className}
      style={style}
    />
  )
}

// Microsoft Advertising UET (Universal Event Tracking) 标签组件
interface UETTagProps {
  uetId: string
}

export function MicrosoftUETTag({ uetId }: UETTagProps) {
  useEffect(() => {
    // Microsoft UET 标签设置
    if (typeof window !== 'undefined') {
      (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:uetId, enableAutoSpaTracking: true};w[u].push(o)},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null,w[u]=push)};i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
    }
  }, [uetId])

  return (
    <noscript>
      <img
        src="//bat.bing.com/action/0?ti=" + uetId + "&Ver=2"
        height="0"
        width="0"
        style={{display:'none',visibility:'hidden'}}
      />
    </noscript>
  )
}