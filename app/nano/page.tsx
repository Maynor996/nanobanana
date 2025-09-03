'use client'

import { useState, useEffect } from 'react'
import './nano.css'
import AnonymousUser from '../components/AnonymousUser'
import UserAuth from '../components/UserAuth'

type Mode = 'upload' | 'text'
type Style = 'none' | 'enhance' | 'artistic' | 'anime' | 'photo'

export default function NanoPage() {
  const [mode, setMode] = useState<Mode>('text')
  const [prompt, setPrompt] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [style, setStyle] = useState<Style>('none')
  const [imageCount, setImageCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [userCredits, setUserCredits] = useState<number>(0)
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [forceShowLogin, setForceShowLogin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const quickPrompts = [
    { icon: '🏔️', text: '风景', value: '美丽的自然风景' },
    { icon: '👥', text: '人像', value: '专业人像摄影' },
    { icon: '🏛️', text: '建筑', value: '现代建筑设计' },
    { icon: '🎨', text: '艺术', value: '抽象艺术作品' },
    { icon: '🚀', text: '科幻', value: '科幻场景' },
    { icon: '🌿', text: '自然', value: '自然生态' },
    { icon: '🐾', text: '动物', value: '可爱的动物' },
    { icon: '💡', text: '创意', value: '创意设计' }
  ]

  // 获取用户积分信息
  const handleCreditsUpdate = (credits: number, unlimited: boolean) => {
    setUserCredits(credits)
    setIsUnlimited(unlimited)
  }

  // 处理会话就绪
  const handleSessionReady = (sid: string) => {
    setSessionId(sid)
    // 会话就绪后立即检查用户状态
    checkUserStatus()
  }

  // 检查用户状态和积分
  const checkUserStatus = async () => {
    if (isAnonymous && sessionId) {
      try {
        const response = await fetch(`/api/anonymous/credits?sessionId=${encodeURIComponent(sessionId)}`)
        const data = await response.json()

        if (response.ok && data.success) {
          setUserCredits(Math.max(0, data.remainingFreeUses))
          if (data.remainingFreeUses <= 0 && !localStorage.getItem('nano_user_email')) {
            setForceShowLogin(true)
          }
        }
      } catch (error) {
        console.error('检查用户状态失败:', error)
      }
    }
  }

  // 处理用户认证成功
  const handleUserAuth = (email: string) => {
    setUserEmail(email)
    setIsAnonymous(false)
    setForceShowLogin(false) // 重置强制登录提示状态
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      // 检查是否超过最大限制（最多10张图片）
      const totalFiles = [...imageFiles, ...files]
      if (totalFiles.length > 10) {
        alert('最多只能上传10张图片')
        // 重置input值以允许重新选择相同的文件
        e.target.value = ''
        return
      }

      setImageFiles(prev => [...prev, ...files])

      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }

    // 重置input值以允许重新选择相同的文件
    e.target.value = ''
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
    if (files.length > 0) {
      // 检查是否超过最大限制（最多10张图片）
      const totalFiles = [...imageFiles, ...files]
      if (totalFiles.length > 10) {
        alert('最多只能上传10张图片')
        return
      }

      setImageFiles(prev => [...prev, ...files])

      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    } else {
      alert('请上传图片文件')
    }
  }

  const compressImage = (file: File, maxWidth = 1024, maxHeight = 1024, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        const { width, height } = img
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        
        canvas.width = width * ratio
        canvas.height = height * ratio
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            resolve(file)
          }
        }, 'image/jpeg', quality)
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  const convertToBase64 = async (file: File): Promise<string> => {
    // Compress large images first
    const maxSizeMB = 2
    let processedFile = file

    if (file.size > maxSizeMB * 1024 * 1024) {
      processedFile = await compressImage(file)
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(processedFile)
      reader.onload = () => {
        const base64 = reader.result as string
        const base64Data = base64.split(',')[1]
        resolve(base64Data)
      }
      reader.onerror = error => reject(error)
    })
  }

  const convertMultipleToBase64 = async (files: File[]): Promise<string[]> => {
    const promises = files.map(file => convertToBase64(file))
    return Promise.all(promises)
  }

  const handleGenerate = async () => {
    if (!sessionId) {
      alert('正在初始化，请稍候...')
      return
    }

    if (mode === 'text' && prompt.length < 3) {
      alert('请输入至少3个字符的描述')
      return
    }
    if (mode === 'upload' && imageFiles.length === 0) {
      alert('请先上传图片')
      return
    }

    // 现在匿名用户可以无限使用，不需要检查积分
    if (!isAnonymous && !isUnlimited && userCredits <= 0) {
      alert('积分不足，请先购买套餐')
      window.location.href = '/pricing'
      return
    }

    setLoading(true)
    setResult(null)

    try {
      let imageDataArray = null
      let finalPrompt = prompt

      if (mode === 'upload' && imageFiles.length > 0) {
        imageDataArray = await convertMultipleToBase64(imageFiles)
        const stylePrompt = getStylePrompt(style)
        const imageCountText = imageFiles.length > 1 ? `基于${imageFiles.length}张图片` : '基于上传的图片'
        finalPrompt = stylePrompt ? `${stylePrompt} ${imageCountText} ${prompt || '优化这些图片'}` : (prompt || '优化这些图片')
      } else {
        // 文生图模式不需要图片数据
        imageDataArray = null
        const stylePrompt = getStylePrompt(style)
        finalPrompt = stylePrompt ? `${stylePrompt} ${prompt}` : prompt
      }

      const apiEndpoint = mode === 'text' ? '/api/generate' : '/api/gemini'
      const requestBody = mode === 'text'
        ? { prompt: finalPrompt }
        : { prompt: finalPrompt, imageDataArray }

      // 添加用户标识到请求
      const requestData: any = {
        ...requestBody,
        count: imageCount
      }

      // 如果是注册用户，使用邮箱；如果是匿名用户，使用sessionId
      if (!isAnonymous && userEmail) {
        requestData.email = userEmail
      } else if (isAnonymous && sessionId) {
        requestData.sessionId = sessionId
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 402) {
          if (data.loginRequired) {
            // 匿名用户积分用完，更新积分显示为0并触发登录提示
            setUserCredits(0)
            setIsAnonymous(false) // 设置为非匿名用户以触发登录提示
            setForceShowLogin(true) // 强制显示登录提示
            alert(data.error || '您的免费试用次数已用完，请登录账号继续使用')
            return
          } else {
            alert(data.error || '积分不足')
            window.location.href = '/pricing'
            return
          }
        } else if (response.status === 401) {
          alert(data.error || '请先登录')
          return
        }
        alert(data.error || '生成失败')
        return
      } else {
        setResult(data)
        // 更新剩余积分（仅对注册用户）
        if (data.remainingCredits !== undefined && !isAnonymous) {
          setUserCredits(data.remainingCredits)
        }
        // 匿名用户现在无限使用，不需要更新积分显示
      }
    } catch (err) {
      alert('网络错误，请重试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStylePrompt = (style: Style): string => {
    const styles = {
      none: '',
      enhance: '增强细节，提高画质',
      artistic: '艺术风格，油画效果',
      anime: '动漫风格，二次元',
      photo: '写实照片，真实感'
    }
    return styles[style]
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        borderBottom: '1px solid #1a1a1a'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🍌 Nano Banana
          </h1>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>功能特点</button>
            <button 
              onClick={() => window.location.href = '/pricing'}
              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              定价
            </button>
            <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>案例展示</button>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {!userEmail ? (
            <>
              <button
                onClick={() => {
                  console.log('登录按钮被点击')
                  setShowLoginModal(true)
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: '#888',
                  border: '1px solid #333',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
                  e.currentTarget.style.borderColor = '#10b981'
                  e.currentTarget.style.color = '#10b981'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#333'
                  e.currentTarget.style.color = '#888'
                }}
              >
                登录
              </button>
              <AnonymousUser 
                onSessionReady={handleSessionReady} 
                forceShowLogin={forceShowLogin}
                onLoginComplete={() => setForceShowLogin(false)}
              />
              {/* 直接显示的登录弹窗 */}
              {showLoginModal && (
                <UserAuth
                  onAuth={(email) => {
                    handleUserAuth(email)
                    setShowLoginModal(false)
                  }}
                  onCreditsUpdate={handleCreditsUpdate}
                  autoOpen={true}
                  hideTrigger={true}
                  onClose={() => setShowLoginModal(false)}
                />
              )}
            </>
          ) : (
            <UserAuth
              onAuth={handleUserAuth}
              onCreditsUpdate={handleCreditsUpdate}
              triggerText="登录"
              hideTrigger
            />
          )}
        </div>
      </header>

      {/* Mode Selector */}
      <div className="mode-selector" style={{ display: 'flex', gap: '1rem', padding: '2rem', justifyContent: 'center' }}>
        <button
          className="mode-button"
          onClick={() => setMode('upload')}
          style={{
            flex: 1,
            maxWidth: '400px',
            padding: '1rem 2rem',
            background: mode === 'upload'
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : 'transparent',
            border: mode === 'upload' ? 'none' : '1px solid #10b981',
            color: mode === 'upload' ? 'white' : '#10b981',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            boxShadow: mode === 'upload'
              ? '0 8px 25px rgba(16, 185, 129, 0.3)'
              : 'none',
            transform: mode === 'upload' ? 'translateY(-2px)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (mode !== 'upload') {
              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.2)'
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'upload') {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          📷 通过对话编辑图像
        </button>
        <button
          className="mode-button"
          onClick={() => setMode('text')}
          style={{
            flex: 1,
            maxWidth: '400px',
            padding: '1rem 2rem',
            background: mode === 'text'
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : 'transparent',
            border: mode === 'text' ? 'none' : '1px solid #10b981',
            color: mode === 'text' ? 'white' : '#10b981',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            boxShadow: mode === 'text'
              ? '0 8px 25px rgba(16, 185, 129, 0.3)'
              : 'none',
            transform: mode === 'text' ? 'translateY(-2px)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (mode !== 'text') {
              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.2)'
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'text') {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          ✨ 文生图模式
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ display: 'flex', gap: '2rem', padding: '0 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Left Panel */}
        <div className="left-panel" style={{ flex: 1 }}>
          {mode === 'upload' ? (
            <div
              className="upload-area"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                background: 'linear-gradient(135deg, #111111, #1a1a1a)',
                border: '2px dashed rgba(16, 185, 129, 0.3)',
                borderRadius: '1.5rem',
                padding: '2rem',
                textAlign: 'center',
                minHeight: '400px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (imagePreviews.length === 0) {
                  document.getElementById('file-upload')?.click()
                }
              }}
            >
              {imagePreviews.length > 0 ? (
                <div>
                  <div className="image-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: imagePreviews.length === 1 ? '1fr' : imagePreviews.length === 2 ? '1fr 1fr' : 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={{ position: 'relative' }}>
                        <img
                          className="image-preview"
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '0.5rem',
                            border: '2px solid #10b981'
                          }}
                        />
                        <button
                          className="close-button"
                          onClick={(e) => {
                            e.stopPropagation()
                            const newFiles = imageFiles.filter((_, i) => i !== index)
                            const newPreviews = imagePreviews.filter((_, i) => i !== index)
                            setImageFiles(newFiles)
                            setImagePreviews(newPreviews)
                          }}
                          style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                        <div className="image-number" style={{
                          position: 'absolute',
                          bottom: '5px',
                          left: '5px',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '0.25rem',
                          fontSize: '12px'
                        }}>
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="action-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <label
                      className="action-button"
                      htmlFor="file-upload"
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'inline-block',
                        boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      ➕ 添加更多图片
                    </label>
                    <button
                      className="action-button"
                      onClick={() => {
                        setImageFiles([])
                        setImagePreviews([])
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      🗑️ 清空全部
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }}>📸</div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#10b981' }}>拖拽图片到此处或点击上传</h3>
                  <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.5' }}>
                    💡 支持多图上传，最多10张<br />
                    📏 单个文件最大 10MB<br />
                    🎨 支持 PNG, JPG, JPEG, WebP, GIF 格式<br />
                    🔄 上传后可通过对话描述编辑需求
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      padding: '0.75rem 2rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      display: 'inline-block',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                      transition: 'all 0.3s ease',
                      fontWeight: '500'
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
                    📁 选择图片文件
                  </label>
                </>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '2rem' }}>
              {/* Quick Prompts */}
              <div style={{
                background: 'linear-gradient(135deg, #111111, #1a1a1a)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                minWidth: '200px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(16, 185, 129, 0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  ⚡ 灵感启发
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  点击下方标签快速开始创作
                </p>
                <div className="quick-prompts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {quickPrompts.map((item, index) => (
                    <button
                      className="quick-prompt-button"
                      key={index}
                      onClick={() => setPrompt(item.value)}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: 'transparent',
                        border: '1px solid #333',
                        borderRadius: '0.75rem',
                        color: '#888',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#10b981'
                        e.currentTarget.style.color = '#10b981'
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#333'
                        e.currentTarget.style.color = '#888'
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Area */}
              <div style={{ flex: 1 }}>
                <div className="text-input-area" style={{
                  background: 'linear-gradient(135deg, #111111, #1a1a1a)',
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  minHeight: '400px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(16, 185, 129, 0.1)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    AI 图像生成
                  </h3>
                  <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#888' }}>
                    描述你想要生成的图像
                  </h4>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="例如: 一只可爱的卡通猫咪，坐在彩虹上，梦幻风格，柔和的色彩..."
                    style={{
                      width: '100%',
                      minHeight: '200px',
                      background: 'linear-gradient(135deg, #1a1a1a, #222222)',
                      border: '1px solid #333',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      color: 'white',
                      fontSize: '1rem',
                      resize: 'vertical',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#10b981'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#333'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <div style={{ 
                    marginTop: '0.5rem', 
                    textAlign: 'right',
                    color: '#666',
                    fontSize: '0.9rem'
                  }}>
                    {prompt.length}/5000
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Options for Upload Mode */}
          {mode === 'upload' && (
            <div style={{
              background: 'linear-gradient(135deg, #111111, #1a1a1a)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              marginTop: '1rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(16, 185, 129, 0.1)'
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>🎨 多图智能编辑</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                ✨ 支持上传最多10张图片作为参考<br />
                🎯 通过自然对话描述编辑需求<br />
                🚀 AI智能理解并合成创意内容<br />
                📸 可进行风格迁移、合成创作等多种操作
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  style={{ ...tagStyle }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981'
                    e.currentTarget.style.color = '#10b981'
                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333'
                    e.currentTarget.style.color = '#888'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'none'
                  }}
                >✨ 多图编辑</button>
                <button
                  style={{ ...tagStyle }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981'
                    e.currentTarget.style.color = '#10b981'
                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333'
                    e.currentTarget.style.color = '#888'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'none'
                  }}
                >🎨 风格迁移</button>
                <button
                  style={{ ...tagStyle }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981'
                    e.currentTarget.style.color = '#10b981'
                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333'
                    e.currentTarget.style.color = '#888'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'none'
                  }}
                >🖼️ 图片合成</button>
                <button
                  style={{ ...tagStyle }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981'
                    e.currentTarget.style.color = '#10b981'
                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333'
                    e.currentTarget.style.color = '#888'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'none'
                  }}
                >🚀 AI增强</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - AI Options */}
        <div className="right-panel" style={{ width: '350px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #111111, #1a1a1a)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(16, 185, 129, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '1.5rem',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ✨ AI 图像编辑
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#888' }}>快速风格</h4>
              <div className="style-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  className="style-button"
                  onClick={() => setStyle(style === 'enhance' ? 'none' : 'enhance')}
                  style={{
                    ...styleButtonStyle,
                    backgroundColor: style === 'enhance' ? '#10b98120' : 'transparent',
                    borderColor: style === 'enhance' ? '#10b981' : '#333',
                    color: style === 'enhance' ? '#10b981' : '#888'
                  }}
                >
                  🔍 增强细节
                </button>
                <button
                  className="style-button"
                  onClick={() => setStyle(style === 'artistic' ? 'none' : 'artistic')}
                  style={{
                    ...styleButtonStyle,
                    backgroundColor: style === 'artistic' ? '#10b98120' : 'transparent',
                    borderColor: style === 'artistic' ? '#10b981' : '#333',
                    color: style === 'artistic' ? '#10b981' : '#888'
                  }}
                >
                  🎨 艺术风格
                </button>
                <button
                  className="style-button"
                  onClick={() => setStyle(style === 'anime' ? 'none' : 'anime')}
                  style={{
                    ...styleButtonStyle,
                    backgroundColor: style === 'anime' ? '#10b98120' : 'transparent',
                    borderColor: style === 'anime' ? '#10b981' : '#333',
                    color: style === 'anime' ? '#10b981' : '#888'
                  }}
                >
                  ✨ 动漫风格
                </button>
                <button
                  className="style-button"
                  onClick={() => setStyle(style === 'photo' ? 'none' : 'photo')}
                  style={{
                    ...styleButtonStyle,
                    backgroundColor: style === 'photo' ? '#10b98120' : 'transparent',
                    borderColor: style === 'photo' ? '#10b981' : '#333',
                    color: style === 'photo' ? '#10b981' : '#888'
                  }}
                >
                  📷 写实照片
                </button>
              </div>
            </div>

            {mode === 'upload' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                  例如: 将图片转换为油画风格，增加暖色调，让画面更加生动...
                </p>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述你想要的编辑效果..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    background: 'linear-gradient(135deg, #1a1a1a, #222222)',
                    border: '1px solid #333',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#10b981'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#333'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>🎯 生成数量</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#10b981' }}>{imageCount} 张</span>
                  {userEmail && (
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '0.3rem',
                      backgroundColor: isUnlimited ? '#10b981' : '#8b5cf6',
                      color: 'white'
                    }}>
                      {isUnlimited ? '无限版' : '专业版'}
                    </span>
                  )}
              </div>
              </div>

              {/* 免费用户提示 */}
              {!userEmail && (
                <div style={{
                  backgroundColor: '#0f2419',
                  border: '1px solid #10b981',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    🔓 免费体验
                  </div>
                  <p style={{ color: '#ccc', fontSize: '0.8rem', margin: '0' }}>
                    登录后可免费试用 3 次，付费用户可生成多张图片
                  </p>
                </div>
              )}

              <input
                type="range"
                min="1"
                max={(!isAnonymous && userEmail) ? (isUnlimited ? 10 : 4) : 1}
                value={imageCount}
                onChange={(e) => setImageCount(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '6px',
                  background: 'linear-gradient(90deg, #1a1a1a, #2a2a2a)',
                  outline: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer'
                }}
                className="custom-slider"
              />

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                color: '#666'
              }}>
                <span>1 张</span>
                {(!isAnonymous && userEmail) && (
                  <>
                <span>2 张</span>
                <span>3 张</span>
                    <span>{isUnlimited ? 10 : 4} 张</span>
                  </>
                )}
              </div>

              {userEmail && imageCount > 1 && (
                <div style={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid #8b5cf6',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    color: '#8b5cf6',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>⭐</span>
                    高级功能已启用
                  </div>
                  <p style={{ color: '#ccc', fontSize: '0.8rem', margin: '0' }}>
                    使用专业级AI引擎生成 {imageCount} 张多样化图片
                  </p>
                </div>
              )}

              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                💡 提示：描述越详细，生成的图像越接近你的想象
              </p>
            </div>

            <button
              className={`generate-button ${loading ? 'loading' : 'button-glow'}`}
              onClick={handleGenerate}
              disabled={loading || !sessionId}
              style={{
                width: '100%',
                padding: '1rem',
                background: loading
                  ? 'linear-gradient(135deg, #6b7280, #4b5563)'
                  : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: loading
                  ? 'none'
                  : '0 8px 25px rgba(16, 185, 129, 0.3)',
                transform: loading ? 'none' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)'
                }
              }}
            >
              {loading ? (
                <>
                  <span className="rotating">⚙️</span> 生成中...
                </>
              ) : (
                <>
                                    🎨 {isAnonymous ? '免费生成' : '开始生成'} ({imageCount} 张)
                  <span style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.9rem'
                  }}>
                    💎 {isUnlimited ? '∞' : isAnonymous ? '无限' : userCredits} {isAnonymous ? '免费' : '积分'}
                  </span>
                </>
              )}
            </button>

            <p style={{ 
              textAlign: 'center', 
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#ef4444'
            }}>
              {mode === 'text' ? '请输入至少 3 个字符的描述' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="result-section" style={{
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #10b981, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
            🎉 生成结果
          </h3>

            {/* 批量生成统计 */}
            {result.images && result.images.length > 0 && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: '#1a1a1a',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                border: '1px solid #10b981',
                marginTop: '1rem'
              }}>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>✨</div>
                                  <div>
                    <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      生成成功 {result.totalGenerated}/{result.requestedCount} 张
                    </div>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>
                      {isAnonymous ? '免费生成 · 无限制使用' : `消耗 ${result.creditsDeducted} 积分 · 剩余 ${result.remainingCredits} 积分`}
                    </div>
                  </div>
              </div>
            )}
          </div>

          {/* 批量图片显示 */}
          {result.images && result.images.length > 0 ? (
            <div className="result-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {result.images.map((image: any, index: number) => (
                <div key={index} style={{
                  backgroundColor: '#111111',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid #333',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{
                    position: 'relative',
                    backgroundColor: '#0a0a0a',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #333'
                  }}>
                    <span style={{
                      color: '#10b981',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      图片 {image.index}
                    </span>
                  </div>

                  <img
                    className="result-image"
                    src={`data:${image.mimeType};base64,${image.imageData}`}
                    alt={`Generated ${image.index}`}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  <div style={{
                    padding: '1rem',
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    <button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = `data:${image.mimeType};base64,${image.imageData}`
                        link.download = `nano-banana-${Date.now()}-${image.index}.png`
                        link.click()
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      💾 下载
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`data:${image.mimeType};base64,${image.imageData}`)
                        alert('图片已复制到剪贴板！')
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      📋 复制
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : result.imageData || result.imageUrl ? (
            /* 单图片显示（向后兼容） */
            <div style={{ textAlign: 'center' }}>
              <img
                id="generated-image"
                className="result-image"
                src={result.imageUrl || `data:${result.mimeType};base64,${result.imageData}`}
                alt="Generated"
                style={{
                  maxWidth: '100%',
                  maxHeight: '600px',
                  borderRadius: '1.5rem',
                  boxShadow: '0 15px 50px rgba(0,0,0,0.6)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.7)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.6)'
                }}
              />
              <div style={{
                marginTop: '1rem',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => {
                    const img = document.getElementById('generated-image') as HTMLImageElement
                    if (img) {
                      const canvas = document.createElement('canvas')
                      const ctx = canvas.getContext('2d')
                      canvas.width = img.naturalWidth
                      canvas.height = img.naturalHeight
                      ctx?.drawImage(img, 0, 0)

                      canvas.toBlob((blob) => {
                        if (blob) {
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `nano-banana-${Date.now()}.png`
                          document.body.appendChild(a)
                          a.click()
                          document.body.removeChild(a)
                          URL.revokeObjectURL(url)
                        }
                      }, 'image/png')
                    }
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease'
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
                  💾 下载图片
                </button>
                <button
                  onClick={() => {
                    const img = document.getElementById('generated-image') as HTMLImageElement
                    if (img && navigator.share) {
                      fetch(img.src)
                        .then(res => res.blob())
                        .then(blob => {
                          const file = new File([blob], 'gemini-generated.png', { type: 'image/png' })
                          navigator.share({
                            title: 'Gemini 生成的图片',
                            text: '分享我的AI生成图片',
                            files: [file]
                          })
                        })
                        .catch(err => {
                          console.error('分享失败:', err)
                          // 如果分享失败，回退到复制链接
                          navigator.clipboard.writeText(img.src)
                          alert('图片链接已复制到剪贴板')
                        })
                    } else {
                      // 复制图片URL到剪贴板
                      navigator.clipboard.writeText(img.src)
                      alert('图片链接已复制到剪贴板')
                    }
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  📤 分享图片
                </button>
                <button
                  onClick={() => {
                    const img = document.getElementById('generated-image') as HTMLImageElement
                    if (img) {
                      navigator.clipboard.writeText(img.src)
                      alert('图片链接已复制到剪贴板！')
                    }
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  🔗 复制链接
                </button>
              </div>
            </div>
          ) : result.text || result.content || result.message ? (
            /* 文本响应显示 */
            <div style={{
              backgroundColor: '#111111',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{ color: '#10b981', fontSize: '2rem', marginBottom: '1rem' }}>💭</div>
              <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.6' }}>
                {result.text || result.content || result.message}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.text || result.content || result.message)
                  alert('文本已复制到剪贴板！')
                }}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                📋 复制文本
              </button>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#111111',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '1.1rem' }}>{result.text || result.content || result.message}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.text || result.content || result.message)
                  alert('文本已复制到剪贴板！')
                }}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                📋 复制文本
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* 使用示例部分 */}
      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        backgroundColor: '#0a0a0a',
        borderRadius: '1.5rem',
        border: '1px solid #222'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #00d4aa, #00a3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎨 使用示例
        </h2>
        
        <div className="examples-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* 文生图示例 */}
          <div style={{
            backgroundColor: '#111',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h3 style={{
              color: '#00d4aa',
              fontSize: '1.2rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ✨ 文生图示例
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#888' }}>提示词：</strong>
              <p style={{ 
                color: '#ccc', 
                fontFamily: 'monospace',
                backgroundColor: '#222',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                margin: '0.5rem 0'
              }}>
                "一只可爱的橘猫坐在窗台上，阳光透过窗户洒在它身上，温暖的午后时光"
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#888' }}>风格：</strong>
              <span style={{ color: '#00d4aa', marginLeft: '0.5rem' }}>写实照片</span>
            </div>
            <div>
              <strong style={{ color: '#888' }}>生成数量：</strong>
              <span style={{ color: '#00d4aa', marginLeft: '0.5rem' }}>2张</span>
            </div>
          </div>

          {/* 图片编辑示例 */}
          <div style={{
            backgroundColor: '#111',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid #333'
          }}>
            <h3 style={{
              color: '#00a3ff',
              fontSize: '1.2rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🖼️ 图片编辑示例
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#888' }}>操作：</strong>
              <p style={{ color: '#ccc', margin: '0.5rem 0' }}>
                1. 上传一张人物照片
              </p>
              <p style={{ 
                color: '#ccc', 
                fontFamily: 'monospace',
                backgroundColor: '#222',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                margin: '0.5rem 0'
              }}>
                2. 输入："把背景换成星空，添加魔法光效"
              </p>
            </div>
            <div>
              <strong style={{ color: '#888' }}>风格：</strong>
              <span style={{ color: '#00a3ff', marginLeft: '0.5rem' }}>艺术风格</span>
            </div>
          </div>
        </div>

        {/* 提示词技巧 */}
        <div style={{
          backgroundColor: '#111',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            color: '#ffa500',
            fontSize: '1.2rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            💡 提示词技巧
          </h3>
          <div className="tips-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <strong style={{ color: '#ffa500' }}>✅ 好的提示词：</strong>
              <ul style={{ color: '#ccc', marginTop: '0.5rem', paddingLeft: '1rem' }}>
                <li>描述具体细节：颜色、光线、构图</li>
                <li>指定风格：写实、动漫、油画等</li>
                <li>添加情感：温暖、神秘、活力等</li>
                <li>描述环境：室内、户外、特定场景</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: '#ff6b6b' }}>❌ 避免：</strong>
              <ul style={{ color: '#ccc', marginTop: '0.5rem', paddingLeft: '1rem' }}>
                <li>过于简单："猫"</li>
                <li>过于复杂：超长描述</li>
                <li>模糊概念：没有具体描述</li>
                <li>敏感内容：违规或不当内容</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 常用提示词模板 */}
        <div style={{
          backgroundColor: '#111',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #333'
        }}>
          <h3 style={{
            color: '#9d4edd',
            fontSize: '1.2rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📝 常用提示词模板
          </h3>
          <div className="templates-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ padding: '1rem', backgroundColor: '#222', borderRadius: '0.5rem' }}>
              <strong style={{ color: '#9d4edd' }}>🏞️ 风景类：</strong>
              <p style={{ 
                color: '#ccc', 
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
                lineHeight: '1.4'
              }}>
                "壮丽的山脉日出，金色阳光穿透云层，前景有清澈的湖水倒影，4K超高清"
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#222', borderRadius: '0.5rem' }}>
              <strong style={{ color: '#9d4edd' }}>👤 人像类：</strong>
              <p style={{ 
                color: '#ccc', 
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
                lineHeight: '1.4'
              }}>
                "专业商务女性肖像，自然光线，现代办公室背景，专业摄影，高清细节"
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#222', borderRadius: '0.5rem' }}>
              <strong style={{ color: '#9d4edd' }}>🎨 艺术类：</strong>
              <p style={{ 
                color: '#ccc', 
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
                lineHeight: '1.4'
              }}>
                "抽象几何艺术，鲜艳色彩搭配，现代艺术风格，高对比度，创意构图"
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#222', borderRadius: '0.5rem' }}>
              <strong style={{ color: '#9d4edd' }}>🚀 科幻类：</strong>
              <p style={{ 
                color: '#ccc', 
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
                lineHeight: '1.4'
              }}>
                "未来城市天际线，霓虹灯光，飞行汽车，赛博朋克风格，夜景，高科技感"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const tagStyle: React.CSSProperties = {
  padding: '0.25rem 0.75rem',
  backgroundColor: 'transparent',
  border: '1px solid #333',
  borderRadius: '1.5rem',
  color: '#888',
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden'
}

const styleButtonStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: '1px solid',
  borderRadius: '0.75rem',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden'
}