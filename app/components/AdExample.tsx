'use client'

import { useState } from 'react'
import GoogleAds, { BannerAd, RectangleAd, ResponsiveAd } from './GoogleAds'
import AdsterraAds, { AdsterraBannerAd, AdsterraRectangleAd, AdsterraResponsiveAd } from './AdsterraAds'

export default function AdExample() {
  const [activePlatform, setActivePlatform] = useState<'google' | 'adsterra' | 'both'>('both')
  const [adFormat, setAdFormat] = useState<'banner' | 'rectangle' | 'responsive'>('responsive')

  const renderAd = () => {
    switch (activePlatform) {
      case 'google':
        return adFormat === 'banner' ? <BannerAd /> : adFormat === 'rectangle' ? <RectangleAd /> : <ResponsiveAd />
      case 'adsterra':
        return adFormat === 'banner' ? <AdsterraBannerAd /> : adFormat === 'rectangle' ? <AdsterraRectangleAd /> : <AdsterraResponsiveAd />
      case 'both':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>🔍 Google AdSense</div>
            {adFormat === 'banner' ? <BannerAd /> : adFormat === 'rectangle' ? <RectangleAd /> : <ResponsiveAd />}
            <div style={{ textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>🔴 Adsterra</div>
            {adFormat === 'banner' ? <AdsterraBannerAd /> : adFormat === 'rectangle' ? <AdsterraRectangleAd /> : <AdsterraResponsiveAd />}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={{
      backgroundColor: '#111',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid #333'
    }}>
      {/* 控制面板 */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
          color: '#10b981',
          fontSize: '1.3rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🎯 广告组件示例
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#888', fontSize: '0.9rem', marginRight: '1rem' }}>广告平台:</label>
          <select
            value={activePlatform}
            onChange={(e) => setActivePlatform(e.target.value as 'google' | 'adsterra' | 'both')}
            style={{
              backgroundColor: '#222',
              border: '1px solid #333',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              marginRight: '1rem'
            }}
          >
            <option value="both">全部平台</option>
            <option value="google">仅 Google AdSense</option>
            <option value="adsterra">仅 Adsterra</option>
          </select>

          <select
            value={adFormat}
            onChange={(e) => setAdFormat(e.target.value as 'banner' | 'rectangle' | 'responsive')}
            style={{
              backgroundColor: '#222',
              border: '1px solid #333',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.25rem'
            }}
          >
            <option value="responsive">自适应</option>
            <option value="banner">横幅 (728x90)</option>
            <option value="rectangle">矩形 (300x250)</option>
          </select>
        </div>
      </div>

      {/* 广告展示区域 */}
      <div style={{
        backgroundColor: '#0a0a0a',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid #333',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {renderAd()}
      </div>

      {/* 使用说明 */}
      <div style={{
        marginTop: '2rem',
        backgroundColor: '#0a0a0a',
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #333'
      }}>
        <h4 style={{
          color: '#ffa500',
          fontSize: '1rem',
          marginBottom: '0.5rem'
        }}>
          💡 使用说明
        </h4>
        <div style={{ color: '#ccc', fontSize: '0.8rem', lineHeight: '1.4' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Google AdSense:</strong> 配置 <code>NEXT_PUBLIC_GOOGLE_ADSENSE_ID</code>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Adsterra:</strong> 配置 <code>NEXT_PUBLIC_ADSTERRA_ENABLED=true</code> 及相应的 Ad Keys
          </div>
          <div>
            <strong>导入使用:</strong> <code>import GoogleAds from './GoogleAds'</code> | <code>import AdsterraAds from './AdsterraAds'</code>
          </div>
        </div>
      </div>
    </div>
  )
}