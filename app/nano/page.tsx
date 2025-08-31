'use client'

import { useState } from 'react'
import './nano.css'

type Mode = 'upload' | 'text'
type Style = 'none' | 'enhance' | 'artistic' | 'anime' | 'photo'

// SVG图标组件
const SVGIcon = ({ type, size = 16 }: { type: string; size?: number }) => {
  const icons: Record<string, JSX.Element> = {
    landscape: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 6L10.25 11L13.1 14.8L11.5 16C9.81 13.75 7 10 7 10L1 18H23L14 6Z" fill="currentColor"/>
        <circle cx="17" cy="8" r="2" fill="currentColor"/>
      </svg>
    ),
    portrait: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
      </svg>
    ),
    building: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 12H5V20H19V12H22L12 3ZM12 7.69L17 12.19V18H15V14H9V18H7V12.19L12 7.69Z" fill="currentColor"/>
      </svg>
    ),
    art: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10 11.62 10 12.13V13.5C10 14.33 10.67 15 11.5 15H13C13.55 15 14 14.55 14 14V12.5L19.5 7H21ZM7.91 17.91C7.91 17.91 4.91 15.91 2 18.82L3.41 20.23L6.5 17.14L7.91 17.91Z" fill="currentColor"/>
      </svg>
    ),
    scifi: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
      </svg>
    ),
    nature: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.17 22L6.58 19.58C8.81 20.81 11.55 21.5 14.5 21.5C19.14 21.5 22.5 18.36 22.5 14.5C22.5 11.1 20.59 8.5 17 8Z" fill="currentColor"/>
        <path d="M12.5 7C12.5 7 14 1.5 9 1.5S6.5 7 6.5 7C6.5 7 1 5.5 1 10.5S6.5 12.5 6.5 12.5C6.5 12.5 5 18 10 18S12.5 12.5 12.5 12.5C12.5 12.5 18 14 18 9S12.5 7 12.5 7Z" fill="currentColor"/>
      </svg>
    ),
    animal: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4.5" cy="9.5" r="2.5" fill="currentColor"/>
        <circle cx="9" cy="5.5" r="2.5" fill="currentColor"/>
        <circle cx="15" cy="5.5" r="2.5" fill="currentColor"/>
        <circle cx="19.5" cy="9.5" r="2.5" fill="currentColor"/>
        <path d="M17.34 14.86C16.44 13.73 15.09 13 13.5 13H10.5C8.91 13 7.56 13.73 6.66 14.86C6.12 15.58 6 16.5 6 17.5C6 19.43 7.57 21 9.5 21H14.5C16.43 21 18 19.43 18 17.5C18 16.5 17.88 15.58 17.34 14.86Z" fill="currentColor"/>
      </svg>
    ),
    creative: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 21C9 21 3.5 15.5 3.5 9.5C3.5 5.91 6.41 3 10 3C13.59 3 16.5 5.91 16.5 9.5C16.5 15.5 11 21 11 21H9ZM6.5 9.5C6.5 7.29 8.29 5.5 10.5 5.5C12.71 5.5 14.5 7.29 14.5 9.5C14.5 11.71 12.71 13.5 10.5 13.5C8.29 13.5 6.5 11.71 6.5 9.5Z" fill="currentColor"/>
        <circle cx="10.5" cy="9.5" r="2.5" fill="currentColor"/>
      </svg>
    )
  }
  
  return icons[type] || <span>💡</span>
}

export default function NanoPage() {
  const [mode, setMode] = useState<Mode>('text')
  const [prompt, setPrompt] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [style, setStyle] = useState<Style>('none')
  const [imageCount, setImageCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [credits] = useState(4)

  const quickPrompts = [
    { icon: 'landscape', text: '风景', value: '美丽的自然风景' },
    { icon: 'portrait', text: '人像', value: '专业人像摄影' },
    { icon: 'building', text: '建筑', value: '现代建筑设计' },
    { icon: 'art', text: '艺术', value: '抽象艺术作品' },
    { icon: 'scifi', text: '科幻', value: '科幻场景' },
    { icon: 'nature', text: '自然', value: '自然生态' },
    { icon: 'animal', text: '动物', value: '可爱的动物' },
    { icon: 'creative', text: '创意', value: '创意设计' }
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
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

  const handleGenerate = async () => {
    if (mode === 'text' && prompt.length < 3) {
      alert('请输入至少3个字符的描述')
      return
    }
    if (mode === 'upload' && !imageFile) {
      alert('请先上传图片')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      let imageData = null
      let finalPrompt = prompt

      if (mode === 'upload' && imageFile) {
        imageData = await convertToBase64(imageFile)
        const stylePrompt = getStylePrompt(style)
        finalPrompt = stylePrompt ? `${stylePrompt} ${prompt || '优化这张图片'}` : (prompt || '优化这张图片')
      } else {
        // 文生图模式不需要图片数据
        imageData = null
        const stylePrompt = getStylePrompt(style)
        finalPrompt = stylePrompt ? `${stylePrompt} ${prompt}` : prompt
      }

      const apiEndpoint = mode === 'text' ? '/api/generate' : '/api/gemini'
      const requestBody = mode === 'text' 
        ? { prompt: finalPrompt }
        : { prompt: finalPrompt, imageData }
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || '生成失败')
      } else {
        setResult(data)
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
            <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>定价</button>
            <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>案例展示</button>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>中文</span>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            获取 Nano Banana →
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid #333',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            登录
          </button>
        </div>
      </header>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '1rem', padding: '2rem', justifyContent: 'center' }}>
        <button
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
      <div style={{ display: 'flex', gap: '2rem', padding: '0 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Left Panel */}
        <div style={{ flex: 1 }}>
          {mode === 'upload' ? (
            <div style={{
              background: 'linear-gradient(135deg, #111111, #1a1a1a)',
              border: '2px dashed rgba(16, 185, 129, 0.3)',
              borderRadius: '1.5rem',
              padding: '4rem 2rem',
              textAlign: 'center',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              {imagePreview ? (
                <div>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '300px',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}
                  />
                  <button
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview('')
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    删除图片
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }}>⬆️</div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>拖拽或点击上传图片</h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    支持 PNG, JPG, JPEG, WebP, GIF 格式<br />
                    单个文件最大 10MB，还可上传 10 张
                  </p>
                  <input
                    type="file"
                    accept="image/*"
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
                    选择文件
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {quickPrompts.map((item, index) => (
                    <button
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
                      <SVGIcon type={item.icon} />
                      <span>{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Area */}
              <div style={{ flex: 1 }}>
                <div style={{
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
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>🎨 对话式图像编辑</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                上传多张参考图（最多10张），通过自然对话描述编辑需求，AI 智能理解并精准执行。
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
                >✨ 对话编辑</button>
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
                >🎯 多图参考</button>
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
                >🚀 智能理解</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - AI Options */}
        <div style={{ width: '350px' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
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
                <span style={{ fontSize: '0.9rem', color: '#10b981' }}>{imageCount} 张</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
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
                <span>2 张</span>
                <span>3 张</span>
                <span>4 张</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                💡 提示：描述越详细，生成的图像越接近你的想象
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={loading ? 'loading' : 'button-glow'}
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
                  🎨 开始生成 ({imageCount} 张)
                  <span style={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.9rem'
                  }}>
                    💎 {credits} 积分
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
        <div style={{ 
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
            🎉 生成结果
          </h3>
          {(result.imageData || result.imageUrl) ? (
            <div style={{ textAlign: 'center' }}>
              <img 
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
            </div>
          ) : (
            <div style={{
              backgroundColor: '#111111',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '1.1rem' }}>{result.text || result.content || result.message}</p>
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
        
        <div style={{
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
          <div style={{
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
          <div style={{
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