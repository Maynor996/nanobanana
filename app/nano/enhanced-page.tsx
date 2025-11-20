'use client'

import { useState, useEffect } from 'react'
import './nano.css'
import AnonymousUser from '../components/AnonymousUser'
import UserAuth from '../components/UserAuth'

type Mode = 'upload' | 'text'
type Style = 'none' | 'enhance' | 'artistic' | 'anime' | 'photo'
type Model = 'gemini-3-pro-image-preview' | 'gemini' | 'doubao'

export default function EnhancedNanoPage() {
  const [mode, setMode] = useState<Mode>('text')
  const [prompt, setPrompt] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [style, setStyle] = useState<Style>('none')
  const [imageCount, setImageCount] = useState(1)
  const [model, setModel] = useState<Model>('gemini-3-pro-image-preview')
  const [imageSize, setImageSize] = useState<string>('1k')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [userCredits, setUserCredits] = useState<number>(0)
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [forceShowLogin, setForceShowLogin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorModalTitle, setErrorModalTitle] = useState('')
  const [errorModalMessage, setErrorModalMessage] = useState('')

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

  // 图像编辑专用快速操作
  const editingQuickPrompts = [
    { icon: '✨', text: '智能美化', value: '智能美化图片，增强细节，提高画质，保持原有风格和色调' },
    { icon: '🎭', text: '风格转换', value: '将图片转换为艺术风格，如油画、水彩或素描效果，保持主要内容不变' },
    { icon: '🐛', text: '添加元素', value: '请为这张图片添加一个可爱的小动物在合适的位置，保持原图的风格和色调' },
    { icon: '🌈', text: '色彩优化', value: '优化图片色彩饱和度和对比度，使画面更加生动明亮' },
    { icon: '🌅', text: '光影增强', value: '优化图片的光影效果，增强层次感和立体感，使画面更有深度' },
    { icon: '🔧', text: '智能修复', value: '修复图片中的瑕疵和噪点，优化整体视觉效果' },
    { icon: '👗', text: '穿搭分析', value: '分析图片中的服装搭配，在原图基础上添加标注和建议' },
    { icon: '🔍', text: '详细分析', value: '在原图基础上添加详细的标注说明，分析图片内容和关键元素' }
  ]

  // 处理图片上传
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files).slice(0, 10) // 最多10张
    setImageFiles(fileArray)
    setIsUploading(true)

    // 生成预览
    const previews: string[] = []
    let loadedCount = 0

    fileArray.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          previews[index] = e.target.result as string
          loadedCount++
          
          if (loadedCount === fileArray.length) {
            setImagePreviews(previews)
            setIsUploading(false)
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // 生成图片
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showError('提示错误', '请输入生成提示')
      return
    }

    if (mode === 'upload' && imageFiles.length === 0) {
      showError('图片错误', '请先上传图片')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      let requestData: any = {
        prompt: prompt.trim(),
        style: getStylePrompt(style),
        imageCount,
        imageSize,
        model
      }

      // 处理图片数据
      if (mode === 'upload' && imageFiles.length > 0) {
        const imageDataArray: string[] = []
        
        for (const file of imageFiles) {
          const base64 = await fileToBase64(file)
          const base64Data = base64.split(',')[1] // 移除data:image/...;base64,前缀
          imageDataArray.push(base64Data)
        }
        
        if (imageDataArray.length === 1) {
          requestData.imageData = imageDataArray[0]
        } else {
          requestData.imageDataArray = imageDataArray
        }
        requestData.mode = 'upload'
      }

      const endpoint = model === 'doubao' ? '/api/doubao' : '/api/gemini'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId || '',
          'x-user-email': userEmail || ''
        },
        body: JSON.stringify(requestData)
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 402) {
          showError('积分不足', '您的积分已用完，请购买积分继续使用')
          return
        }
        const errorMsg = `生成失败：${data.error || '未知错误'}。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`
        showError('生成失败', errorMsg)
        return
      } else {
        setResult(data)
        if (data.remainingCredits !== undefined && !isAnonymous) {
          setUserCredits(data.remainingCredits)
        }
      }
    } catch (err) {
      console.error('请求错误:', err)
      if (err instanceof Error) {
        if (err.message.includes('fetch')) {
          showError('网络错误', `网络连接失败，请检查网络后重试。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`)
        } else if (err.message.includes('timeout')) {
          showError('请求超时', `请求超时，请稍后重试。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`)
        } else {
          showError('发生错误', `发生错误：${err.message}。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`)
        }
      } else {
        showError('未知错误', `未知错误，请重试。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`)
      }
    } finally {
      setLoading(false)
    }
  }

  // 辅助函数
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const showError = (title: string, message: string) => {
    setErrorModalTitle(title)
    setErrorModalMessage(message)
    setShowErrorModal(true)
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

  // 下载图片
  const downloadImage = (imageData: string, mimeType: string = 'image/png') => {
    const link = document.createElement('a')
    link.href = `data:${mimeType};base64,${imageData}`
    link.download = `generated-${Date.now()}.${mimeType.split('/')[1]}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 分享图片
  const shareImage = async (imageData: string, mimeType: string = 'image/png') => {
    if (navigator.share && navigator.canShare) {
      try {
        const blob = await (await fetch(`data:${mimeType};base64,${imageData}`)).blob()
        const file = new File([blob], `generated-${Date.now()}.${mimeType.split('/')[1]}`, { type: mimeType })
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'AI生成的图片',
            text: '查看这张AI生成的图片'
          })
        }
      } catch (error) {
        console.error('分享失败:', error)
        // 降级到复制链接
        copyToClipboard(`data:${mimeType};base64,${imageData}`)
      }
    } else {
      // 降级到复制链接
      copyToClipboard(`data:${mimeType};base64,${imageData}`)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('图片链接已复制到剪贴板')
    }).catch(() => {
      alert('复制失败，请手动复制')
    })
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
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        backgroundColor: '#111',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #00d4aa, #00a3ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            🍌 Nano Banana Plus 5
          </h1>
          
          {/* 用户信息 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {!isAnonymous && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#222',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #333'
              }}>
                <span style={{ color: '#888' }}>积分:</span>
                <span style={{ 
                  color: isUnlimited ? '#00d4aa' : userCredits > 10 ? '#00d4aa' : userCredits > 5 ? '#ffa500' : '#ff4444',
                  fontWeight: 'bold'
                }}>
                  {isUnlimited ? '∞' : userCredits}
                </span>
              </div>
            )}
            
            <button
              onClick={() => setShowLoginModal(true)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: isAnonymous ? '#00a3ff' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {isAnonymous ? '登录' : userEmail}
            </button>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* 模式选择 */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => setMode('text')}
              style={{
                padding: '1rem 2rem',
                backgroundColor: mode === 'text' ? '#00a3ff' : '#333',
                color: mode === 'text' ? 'white' : '#ccc',
                border: 'none',
                borderRadius: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🎨 文生图
            </button>
            <button
              onClick={() => setMode('upload')}
              style={{
                padding: '1rem 2rem',
                backgroundColor: mode === 'upload' ? '#00d4aa' : '#333',
                color: mode === 'upload' ? 'white' : '#ccc',
                border: 'none',
                borderRadius: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🖼️ 图片编辑
            </button>
          </div>
          
          <p style={{ color: '#888', margin: 0 }}>
            {mode === 'text' 
              ? '🎨 通过文字描述生成全新的图片内容' 
              : '🖼️ 上传图片进行智能编辑、美化或风格转换'
            }
          </p>
        </div>

        {/* 图片上传区域 (仅在upload模式显示) */}
        {mode === 'upload' && (
          <div style={{
            backgroundColor: '#111',
            border: '2px dashed #333',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            transition: 'all 0.3s ease'
          }}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
              style={{ display: 'none' }}
              id="image-upload"
            />
            
            {imagePreviews.length === 0 ? (
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
                <h3 style={{ color: '#00d4aa', marginBottom: '1rem' }}>上传图片进行编辑</h3>
                <p style={{ color: '#888', marginBottom: '2rem' }}>
                  支持 JPG、PNG 格式，最多可上传 10 张图片
                </p>
                <label
                  htmlFor="image-upload"
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    backgroundColor: '#00d4aa',
                    color: 'white',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isUploading ? '上传中...' : '选择图片'}
                </label>
              </div>
            ) : (
              <div>
                <h3 style={{ color: '#00d4aa', marginBottom: '1rem' }}>
                  已上传 {imagePreviews.length} 张图片
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '0.5rem',
                          border: '2px solid #333'
                        }}
                      />
                      <button
                        onClick={() => {
                          const newFiles = imageFiles.filter((_, i) => i !== index)
                          const newPreviews = imagePreviews.filter((_, i) => i !== index)
                          setImageFiles(newFiles)
                          setImagePreviews(newPreviews)
                        }}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          background: 'rgba(255, 68, 68, 0.9)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <label
                    htmlFor="image-upload"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#333',
                      color: 'white',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      border: '1px solid #555'
                    }}
                  >
                    添加更多
                  </label>
                  <button
                    onClick={() => {
                      setImageFiles([])
                      setImagePreviews([])
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    清空所有
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 快速提示词 */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            color: '#00a3ff', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {mode === 'text' ? '⚡ 快速提示词' : '🔥 智能编辑操作'}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem'
          }}>
            {(mode === 'text' ? quickPrompts : editingQuickPrompts).map((item, index) => (
              <button
                key={index}
                onClick={() => setPrompt(item.value)}
                style={{
                  padding: '1rem',
                  backgroundColor: '#222',
                  border: '1px solid #333',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333'
                  e.currentTarget.style.borderColor = mode === 'text' ? '#00a3ff' : '#00d4aa'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#222'
                  e.currentTarget.style.borderColor = '#333'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {item.text}
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#888',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.value.length > 40 ? item.value.substring(0, 40) + '...' : item.value}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 提示词输入 */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#888',
            fontWeight: 'bold'
          }}>
            {mode === 'text' ? '📝 描述你想要的图片' : '✏️ 描述你想要的编辑效果'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={mode === 'text' 
              ? '例如：一只可爱的小猫坐在花园里，阳光明媚，油画风格...' 
              : '例如：请为这张图片添加美丽的光影效果，增强色彩饱和度...'
            }
            style={{
              width: '100%',
              height: '120px',
              padding: '1rem',
              backgroundColor: '#222',
              border: '1px solid #333',
              borderRadius: '0.75rem',
              color: '#fff',
              fontSize: '1rem',
              resize: 'vertical',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = mode === 'text' ? '#00a3ff' : '#00d4aa'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#333'
            }}
          />
        </div>

        {/* 生成按钮 */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || (mode === 'upload' && imageFiles.length === 0)}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              backgroundColor: loading ? '#666' : (mode === 'text' ? '#00a3ff' : '#00d4aa'),
              color: 'white',
              border: 'none',
              borderRadius: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #ffffff40',
                  borderTop: '2px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                生成中...
              </>
            ) : (
              <>
                {mode === 'text' ? '🎨 生成图片' : '✨ 编辑图片'}
              </>
            )}
          </button>
        </div>

        {/* 结果展示 */}
        {result && (
          <div style={{
            backgroundColor: '#111',
            padding: '2rem',
            borderRadius: '1.5rem',
            border: '1px solid #333'
          }}>
            <h3 style={{
              color: '#00d4aa',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontSize: '1.5rem'
            }}>
              🎉 生成完成
            </h3>

            {/* 图片显示 */}
            {result.imageData && (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <img
                  src={`data:${result.mimeType || 'image/png'};base64,${result.imageData}`}
                  alt="Generated"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '600px',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                  }}
                />
                
                {/* 操作按钮 */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  marginTop: '1.5rem'
                }}>
                  <button
                    onClick={() => downloadImage(result.imageData, result.mimeType)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#00a3ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    💾 下载图片
                  </button>
                  <button
                    onClick={() => shareImage(result.imageData, result.mimeType)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#00d4aa',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    📤 分享图片
                  </button>
                </div>
              </div>
            )}

            {/* 文字结果 */}
            {result.text && (
              <div style={{
                backgroundColor: '#222',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginTop: '1rem'
              }}>
                <h4 style={{ color: '#888', marginBottom: '1rem' }}>AI 描述：</h4>
                <p style={{ color: '#ccc', lineHeight: '1.6', margin: 0 }}>
                  {result.text}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 错误模态框 */}
        {showErrorModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#222',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid #444',
              maxWidth: '500px',
              width: '90%'
            }}>
              <h3 style={{ color: '#ff4444', marginBottom: '1rem' }}>
                {errorModalTitle}
              </h3>
              <p style={{ color: '#ccc', marginBottom: '2rem', lineHeight: '1.5' }}>
                {errorModalMessage}
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#00a3ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                确定
              </button>
            </div>
          </div>
        )}

        {/* 登录模态框 */}
        {showLoginModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#222',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid #444',
              maxWidth: '400px',
              width: '90%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: '#00a3ff', margin: 0 }}>用户认证</h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#888',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
              
              {isAnonymous ? (
                <AnonymousUser
                  onSessionReady={(sessionId) => {
                    setSessionId(sessionId)
                  }}
                  forceShowLogin={forceShowLogin}
                  onLoginComplete={() => setShowLoginModal(false)}
                />
              ) : (
                <UserAuth
                  onAuth={(email) => {
                    setUserEmail(email)
                    setIsAnonymous(false)
                    setShowLoginModal(false)
                  }}
                  onCreditsUpdate={(credits, unlimited) => {
                    setUserCredits(credits)
                    setIsUnlimited(unlimited)
                  }}
                  hideTrigger={true}
                  onClose={() => setShowLoginModal(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}