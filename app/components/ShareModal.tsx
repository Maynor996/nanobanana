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

  // 上传图片获取永久链接
  const uploadAndGetLink = async (): Promise<string | null> => {
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

  // 下载图片
  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = `data:${mimeType};base64,${imageData}`
    link.download = `nano-banana-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 分享到X (Twitter)
  const shareToX = async () => {
    const url = shareUrl || await uploadAndGetLink()
    if (!url) {
      alert(t?.share?.uploadFailedMsg || '上传失败，请重试')
      return
    }
    const text = encodeURIComponent('使用 Nano Banana 免费生成的AI图片！🍌✨\n\n100% 免费 | 无需登录 | 无限生成')
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank')
  }

  // 分享到TikTok（提示下载后上传）
  const shareToTikTok = () => {
    alert(t?.share?.tiktokTip || '请下载图片后，在TikTok中手动上传发布')
    downloadImage()
  }

  // 分享到Instagram（提示下载后上传）
  const shareToInstagram = () => {
    alert(t?.share?.instagramTip || '请下载图片后，在Instagram中手动上传发布')
    downloadImage()
  }

  // 分享到小红书（提示下载后上传）
  const shareToXiaohongshu = () => {
    alert(t?.share?.xiaohongshuTip || '请下载图片后，在小红书中手动上传发布')
    downloadImage()
  }

  // 分享到B站（提示下载后上传）
  const shareToBilibili = () => {
    alert(t?.share?.bilibiliTip || '请下载图片后，在B站动态中手动上传发布')
    downloadImage()
  }

  // 分享到微信（生成二维码）
  const shareToWeChat = async () => {
    const url = shareUrl || await uploadAndGetLink()
    if (!url) {
      alert(t?.share?.uploadFailedMsg || '上传失败，请重试')
      return
    }
    // 使用在线二维码服务生成
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`
    window.open(qrUrl, '_blank', 'width=500,height=500')
  }

  // 复制链接
  const copyLink = async () => {
    const url = shareUrl || await uploadAndGetLink()
    if (!url) {
      alert(t?.share?.uploadFailedMsg || '上传失败，请重试')
      return
    }
    await navigator.clipboard.writeText(url)
    alert(t?.share?.linkCopied || '链接已复制到剪贴板！')
  }

  const socialButtons = [
    {
      name: 'X (Twitter)',
      icon: '𝕏',
      color: '#000000',
      action: shareToX,
      description: '分享图片链接到X'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      color: '#000000',
      action: shareToTikTok,
      description: '下载后上传到TikTok'
    },
    {
      name: 'Instagram',
      icon: '📷',
      color: '#E4405F',
      action: shareToInstagram,
      description: '下载后上传到Instagram'
    },
    {
      name: t?.share?.xiaohongshu || '小红书',
      icon: '📕',
      color: '#FF2442',
      action: shareToXiaohongshu,
      description: '下载后上传到小红书'
    },
    {
      name: t?.share?.bilibili || 'B站',
      icon: '📺',
      color: '#00A1D6',
      action: shareToBilibili,
      description: '下载后上传到B站'
    },
    {
      name: t?.share?.wechat || '微信',
      icon: '💬',
      color: '#07c160',
      action: shareToWeChat,
      description: '生成二维码分享'
    }
  ]

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
          maxWidth: '550px',
          width: '100%',
          border: '1px solid #333',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxHeight: '90vh',
          overflowY: 'auto'
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
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

        {/* 快速操作 */}
        <div style={{ marginBottom: '2rem' }}>
          <h4
            style={{
              fontSize: '0.9rem',
              color: '#888',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {t?.share?.quickActions || '快速操作'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              onClick={downloadImage}
              style={{
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              💾 {t?.share?.download || '下载图片'}
            </button>
            <button
              onClick={copyLink}
              disabled={isUploading}
              style={{
                padding: '0.75rem',
                background: isUploading
                  ? '#444'
                  : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color: isUploading ? '#888' : 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: isUploading ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isUploading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isUploading) {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              🔗 {t?.share?.copyLink || '复制链接'}
            </button>
          </div>
        </div>

        {/* 社交平台分享 */}
        <div>
          <h4
            style={{
              fontSize: '0.9rem',
              color: '#888',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {t?.share?.socialPlatforms || '分享到社交平台'}
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem'
            }}
          >
            {socialButtons.map((social) => (
              <button
                key={social.name}
                onClick={social.action}
                disabled={isUploading}
                title={social.description}
                style={{
                  padding: '0.75rem 0.5rem',
                  backgroundColor: isUploading ? '#333' : '#222',
                  color: isUploading ? '#666' : 'white',
                  border: `2px solid ${isUploading ? '#444' : social.color}`,
                  borderRadius: '0.75rem',
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  opacity: isUploading ? 0.5 : 1,
                  minHeight: '80px'
                }}
                onMouseEnter={(e) => {
                  if (!isUploading) {
                    e.currentTarget.style.backgroundColor = social.color
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 4px 12px ${social.color}40`
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUploading) {
                    e.currentTarget.style.backgroundColor = '#222'
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
                <span style={{ fontSize: '0.8rem', textAlign: 'center', lineHeight: 1.2 }}>
                  {social.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 提示信息 */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#0f2419',
            border: '1px solid #10b981',
            borderRadius: '0.75rem'
          }}
        >
          <p
            style={{
              fontSize: '0.85rem',
              color: '#888',
              margin: 0,
              lineHeight: 1.5
            }}
          >
            💡 {t?.share?.tip || '提示：X平台和微信支持直接分享链接，其他平台需下载后手动上传图片。'}
          </p>
        </div>
      </div>
    </div>
  )
}
