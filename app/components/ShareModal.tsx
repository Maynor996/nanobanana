'use client'

import { useState } from 'react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  imageData: string
  mimeType: string
  t: any
}

export default function ShareModal({ isOpen, onClose, imageData, mimeType, t }: ShareModalProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [uploadError, setUploadError] = useState<string>('')

  if (!isOpen) return null

  // 下载图片
  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = `data:${mimeType};base64,${imageData}`
    link.download = `nano-banana-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 上传图片并获取链接（内部辅助函数）
  const uploadAndGetLink = async (): Promise<string | null> => {
    if (shareUrl) {
      return shareUrl
    }

    setIsUploading(true)
    setUploadError('')

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageData: imageData,
          mimeType: mimeType
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setShareUrl(data.url)
        return data.url
      } else {
        setUploadError(data.error || '上传失败')
        return null
      }
    } catch (error) {
      console.error('上传失败:', error)
      setUploadError(t?.share?.uploadFailed || '上传失败，请重试')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  // 生成分享链接（复制到剪贴板）
  const generateShareLink = async () => {
    const url = await uploadAndGetLink()
    if (url) {
      await navigator.clipboard.writeText(url)
      alert(t?.share?.linkCopied || '链接已复制到剪贴板！')
    }
  }

  // 分享到X (Twitter)
  const shareToTwitter = async () => {
    const url = await uploadAndGetLink()
    if (!url) {
      alert(t?.share?.uploadFailed || '上传失败，请重试')
      return
    }
    const text = encodeURIComponent('使用 Nano Banana 免费生成的AI图片！🍌✨\n\n100% 免费 | 无需登录 | 无限生成')
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank')
  }

  // 分享到即刻
  const shareToJike = async () => {
    const url = await uploadAndGetLink()
    if (!url) {
      alert(t?.share?.uploadFailed || '上传失败，请重试')
      return
    }
    // 即刻的分享方式：直接打开即刻并附带图片链接
    const text = encodeURIComponent(`使用 Nano Banana 免费生成的AI图片！🍌✨\n\n${url}\n\n100% 免费 | 无需登录 | 无限生成`)
    // 即刻支持网页版发布，打开发布页面
    window.open(`https://web.okjike.com/post?text=${text}`, '_blank')
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '1.5rem',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          border: '1px solid #333',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              color: '#10b981',
              margin: 0,
              fontWeight: 'bold'
            }}
          >
            📤 {t?.share?.title || '分享图片'}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>

        {/* 分享链接显示区域 */}
        {shareUrl && (
          <div
            style={{
              backgroundColor: '#0f2419',
              border: '1px solid #10b981',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>
                ✅ {t?.share?.linkReady || '链接已生成'}
              </span>
            </div>
            <p
              style={{
                color: '#10b981',
                fontSize: '0.85rem',
                margin: 0,
                wordBreak: 'break-all',
                lineHeight: 1.5,
                fontFamily: 'monospace'
              }}
            >
              {shareUrl}
            </p>
          </div>
        )}

        {/* 上传状态 */}
        {isUploading && (
          <div
            style={{
              backgroundColor: '#1a2a3a',
              border: '1px solid #3b82f6',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}
          >
            <span className="rotating" style={{ fontSize: '1.5rem' }}>⚙️</span>
            <p style={{ color: '#3b82f6', margin: '0.5rem 0 0 0' }}>
              {t?.share?.uploading || '正在上传图片...'}
            </p>
          </div>
        )}

        {/* 错误提示 */}
        {uploadError && (
          <div
            style={{
              backgroundColor: '#2a1a1a',
              border: '1px solid #ef4444',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <p style={{ color: '#ef4444', margin: 0, fontSize: '0.9rem' }}>
              ⚠️ {uploadError}
            </p>
          </div>
        )}

        {/* 主要操作按钮 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={downloadImage}
            style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
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
            <span style={{ fontSize: '2rem' }}>💾</span>
            <span>{t?.share?.download || '下载图片'}</span>
          </button>

          <button
            onClick={generateShareLink}
            disabled={isUploading}
            style={{
              padding: '1rem',
              background: isUploading
                ? '#444'
                : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: isUploading ? '#888' : 'white',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isUploading ? 0.6 : 1,
              boxShadow: isUploading ? 'none' : '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isUploading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isUploading) {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)'
              }
            }}
          >
            <span style={{ fontSize: '2rem' }}>🔗</span>
            <span>{t?.share?.generateLink || '生成分享链接'}</span>
          </button>
        </div>

        {/* 直接分享到平台 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t?.share?.directShare || '直接分享到'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              onClick={shareToTwitter}
              disabled={isUploading}
              style={{
                padding: '0.75rem',
                background: isUploading ? '#333' : 'linear-gradient(135deg, #000000, #333333)',
                color: isUploading ? '#666' : 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: isUploading ? 0.5 : 1,
                boxShadow: isUploading ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isUploading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isUploading) {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)'
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>𝕏</span>
              <span>{t?.share?.twitter || 'X (Twitter)'}</span>
            </button>

            <button
              onClick={shareToJike}
              disabled={isUploading}
              style={{
                padding: '0.75rem',
                background: isUploading ? '#333' : 'linear-gradient(135deg, #FFE411, #FFC700)',
                color: isUploading ? '#666' : '#000',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: isUploading ? 0.5 : 1,
                boxShadow: isUploading ? 'none' : '0 2px 8px rgba(255, 228, 17, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isUploading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 228, 17, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isUploading) {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 228, 17, 0.3)'
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🟡</span>
              <span>{t?.share?.jike || '即刻'}</span>
            </button>
          </div>
        </div>

        {/* 使用说明 */}
        <div
          style={{
            backgroundColor: '#0f2419',
            border: '1px solid #10b981',
            borderRadius: '0.75rem',
            padding: '1.25rem'
          }}
        >
          <h4
            style={{
              fontSize: '0.95rem',
              color: '#10b981',
              margin: '0 0 1rem 0',
              fontWeight: 'bold'
            }}
          >
            💡 {t?.share?.howToUse || '使用说明'}
          </h4>

          <div style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 0.75rem 0' }}>
              <strong style={{ color: '#10b981' }}>📥 {t?.share?.downloadFor || '下载图片后可分享到：'}</strong>
            </p>
            <p style={{ margin: '0 0 1rem 0', paddingLeft: '1rem', color: '#aaa' }}>
              {t?.share?.downloadPlatforms || '小红书、抖音、B站、Instagram、TikTok 等平台'}
            </p>

            <p style={{ margin: '0 0 0.75rem 0' }}>
              <strong style={{ color: '#10b981' }}>🔗 {t?.share?.linkFor || '生成链接后可用于：'}</strong>
            </p>
            <p style={{ margin: '0', paddingLeft: '1rem', color: '#aaa' }}>
              {t?.share?.linkPlatforms || 'X(Twitter)、微信、网页、论坛 等支持链接的平台'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
