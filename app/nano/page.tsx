'use client'

import { useState, useEffect } from 'react'
import './nano.css'
import { BannerAd, ResponsiveAd } from '../components/GoogleAds'
import BrowserWarning from '../components/BrowserWarning'
import { useLanguage } from '../i18n/LanguageContext'

type Mode = 'upload' | 'text'
type Style = 'none' | 'enhance' | 'artistic' | 'anime' | 'photo'
type Model = 'gemini' | 'doubao'

export default function NanoPage() {
  const { language, setLanguage, t } = useLanguage()
  const [mode, setMode] = useState<Mode>('text')
  const [prompt, setPrompt] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [style, setStyle] = useState<Style>('none')
  const [model, setModel] = useState<Model>('gemini')
  const [imageSize, setImageSize] = useState<string>('1k')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
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


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setIsUploading(true)

      try {
        // 同步更新文件列表
        const newImageFiles = [...imageFiles, ...files]
        
        // 批量处理所有文件的预览
        const previewPromises = files.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              resolve(reader.result as string)
            }
            reader.readAsDataURL(file)
          })
        })

        // 等待所有预览完成后一次性更新状态
        const newPreviews = await Promise.all(previewPromises)
        
        // 确保状态同步更新
        setImageFiles(newImageFiles)
        setImagePreviews(prev => [...prev, ...newPreviews])
        
        console.log('图片上传完成:', { 
          newFilesCount: files.length, 
          totalFiles: newImageFiles.length,
          totalPreviews: imagePreviews.length + newPreviews.length
        })
      } catch (error) {
        console.error('图片上传失败:', error)
        showError('上传失败', '图片上传失败，请重试')
      } finally {
        setIsUploading(false)
      }
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

  const handleDrop = async (e: React.DragEvent) => {
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

      setIsUploading(true)

      try {
        // 同步更新文件列表
        const newImageFiles = [...imageFiles, ...files]
        
        // 批量处理所有文件的预览
        const previewPromises = files.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              resolve(reader.result as string)
            }
            reader.readAsDataURL(file)
          })
        })

        // 等待所有预览完成后一次性更新状态
        const newPreviews = await Promise.all(previewPromises)
        
        // 确保状态同步更新
        setImageFiles(newImageFiles)
        setImagePreviews(prev => [...prev, ...newPreviews])
        
        console.log('拖拽上传完成:', { 
          newFilesCount: files.length, 
          totalFiles: newImageFiles.length,
          totalPreviews: imagePreviews.length + newPreviews.length
        })
      } catch (error) {
        console.error('拖拽上传失败:', error)
        showError('上传失败', '图片上传失败，请重试')
      } finally {
        setIsUploading(false)
      }
    } else {
      showError('文件类型错误', '请上传图片文件')
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

  // 显示错误弹窗的函数
  const showError = (title: string, message: string) => {
    setErrorModalTitle(title)
    setErrorModalMessage(message)
    setShowErrorModal(true)
  }

  const handleGenerate = async () => {
    if (mode === 'text' && prompt.length < 3) {
      showError('输入提示', '请输入至少3个字符的描述')
      return
    }
    if (mode === 'upload' && imageFiles.length === 0) {
      showError('上传提示', '请先上传图片')
      return
    }
    
    if (isUploading) {
      showError('上传提示', '图片正在上传中，请稍候...')
      return
    }

    setLoading(true)
    setResult(null)
    setError('')

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

      // 根据选择的模型决定API端点
      let apiEndpoint = '/api/gemini'
      if (model === 'doubao') {
        apiEndpoint = '/api/doubao'
      } else if (model === 'gemini' && mode === 'text') {
        apiEndpoint = '/api/generate'
      }
      
      const requestBody = mode === 'text'
        ? { prompt: finalPrompt }
        : { prompt: finalPrompt, imageDataArray }

      // 添加用户标识到请求
      const requestData: any = {
        ...requestBody
      }

      // 如果是豆包模型，添加尺寸参数
      if (model === 'doubao') {
        requestData.size = imageSize
      }

      // 使用时间戳作为用户标识
      requestData.timestamp = Date.now()

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('JSON解析错误:', parseError)
        showError('API解析错误', `API响应解析失败，请稍后重试。使用的模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`)
        return
      }

      if (!response.ok) {
        if (response.status === 524) {
          const errorMsg = `服务器响应超时，请稍后重试。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`
          showError('服务器超时', errorMsg)
          return
        } else if (response.status === 500) {
          const errorMsg = `服务器内部错误：${data.error || '未知错误'}。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`
          showError('服务器错误', errorMsg)
          return
        }
        const errorMsg = `生成失败：${data.error || '未知错误'}。模型：${model === 'doubao' ? '豆包模型(待开发)' : 'Gemini 2.5 Flash'}`
        showError('生成失败', errorMsg)
        return
      } else {
        setResult(data)
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
      showError('提示', '图片链接已复制到剪贴板')
    }).catch(() => {
      showError('提示', '复制失败，请手动复制')
    })
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 浏览器兼容性警告 */}
      <BrowserWarning />
      {/* Header */}
      <header style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #1a1a1a'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.5rem',
          width: '100%',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #10b981, #00a3ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {t.header.title}
          </h1>

          {/* Language Switcher */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            backgroundColor: '#1a1a1a',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #333'
          }}>
            <button
              onClick={() => setLanguage('zh')}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: language === 'zh' ? '#10b981' : 'transparent',
                color: language === 'zh' ? 'white' : '#888',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              中文
            </button>
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: language === 'en' ? '#10b981' : 'transparent',
                color: language === 'en' ? 'white' : '#888',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Subtitle Features */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          fontSize: '0.9rem',
          color: '#888',
          marginTop: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#10b981',
            fontWeight: '500'
          }}>
            ✨ {t.header.subtitle}
          </span>
          <span style={{ color: '#666' }}>•</span>
          <span>{t.header.poweredBy}</span>
          <span style={{ color: '#666' }}>•</span>
          <span>{t.header.noLogin}</span>
          <span style={{ color: '#666' }}>•</span>
          <span>{t.header.unlimited}</span>
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
          {t.mode.upload}
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
          {t.mode.text}
        </button>
      </div>


      {/* Model Selector */}
      <div className="model-selector" style={{ display: 'flex', gap: '1rem', padding: '0 2rem 2rem', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>{t.model.label}</span>
          <button
            onClick={() => setModel('gemini')}
            style={{
              padding: '0.5rem 1rem',
              background: model === 'gemini'
                ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                : 'transparent',
              border: model === 'gemini' ? 'none' : '1px solid #6366f1',
              color: model === 'gemini' ? 'white' : '#6366f1',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              boxShadow: model === 'gemini'
                ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                : 'none'
            }}
          >
            {t.model.gemini}
          </button>
          <button
            onClick={() => {
              showError(t.model.doubao.replace('🚧 ', ''), t.model.doubaoTip)
            }}
            style={{
              padding: '0.5rem 1rem',
              background: '#666',
              border: '1px solid #555',
              color: '#ccc',
              borderRadius: '0.5rem',
              cursor: 'not-allowed',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              opacity: 0.6
            }}
            disabled
          >
            {t.model.doubao}
          </button>
        </div>
        
        {/* Size Selector for Doubao */}
        {model === 'doubao' && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: '#888', fontSize: '0.9rem' }}>{t.model.size}</span>
            {['1k', '2k', '4k'].map((size) => (
              <button
                key={size}
                onClick={() => setImageSize(size)}
                style={{
                  padding: '0.4rem 0.8rem',
                  background: imageSize === size
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'transparent',
                  border: imageSize === size ? 'none' : '1px solid #f59e0b',
                  color: imageSize === size ? 'white' : '#f59e0b',
                  borderRadius: '0.4rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease',
                  boxShadow: imageSize === size
                    ? '0 2px 8px rgba(245, 158, 11, 0.3)'
                    : 'none'
                }}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        )}
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
              {isUploading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📤</div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#10b981' }}>
                    正在上传图片...
                  </h3>
                  <p style={{ color: '#888' }}>请稍候，正在处理您的图片</p>
                </div>
              ) : imagePreviews.length > 0 ? (
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

          {/* Quick Editing Styles for Upload Mode */}
          {mode === 'upload' && (
            <div style={{
              background: 'linear-gradient(135deg, #111111, #1a1a1a)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              marginTop: '1rem',
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
                🎨 编辑风格
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                选择编辑方式快速处理图片
              </p>

              <div className="quick-prompts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                {editingQuickPrompts.map((item, index) => (
                  <button
                    className="quick-prompt-button"
                    key={index}
                    onClick={() => setPrompt(item.value)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      backgroundColor: 'transparent',
                      border: '1px solid #333',
                      borderRadius: '0.75rem',
                      color: '#888',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#10b981'
                      e.currentTarget.style.color = '#10b981'
                      e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
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
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </button>
                ))}
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
              {/* 免费服务提示 */}
              <div style={{
                backgroundColor: '#0f2419',
                border: '1px solid #10b981',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {t.freeService.title}
                </div>
                <p style={{ color: '#ccc', fontSize: '0.8rem', margin: '0' }}>
                  {t.freeService.description}
                </p>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
                {t.aiOptions.tip}
              </p>
            </div>

            <button
              className={`generate-button ${loading ? 'loading' : 'button-glow'}`}
              onClick={handleGenerate}
              disabled={loading || isUploading}
              style={{
                width: '100%',
                padding: '1rem',
                background: (loading || isUploading)
                  ? 'linear-gradient(135deg, #6b7280, #4b5563)'
                  : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: (loading || isUploading) ? 'not-allowed' : 'pointer',
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
                  <span className="rotating">⚙️</span> {t.generate.generating}
                </>
              ) : isUploading ? (
                <>
                  <span className="rotating">📤</span> {t.generate.uploading}
                </>
              ) : (
                <>
                  {t.generate.button}
                  <span style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.9rem'
                  }}>
                    {t.generate.badge}
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
              {mode === 'text' ? t.generate.requirement : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-section" style={{
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            border: '1px solid #ef4444'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❌</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>
              生成失败
            </h3>
            <p style={{ color: '#fecaca', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {error}
            </p>
            <button
              onClick={() => setError('')}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              关闭
            </button>
          </div>
        </div>
      )}

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
            {t.result.title}
          </h3>
          </div>

          {/* 图片显示 */}
          {result.imageData || result.imageUrl ? (
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
                  {t.result.download}
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
                          showError('复制成功', '图片链接已复制到剪贴板')
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
                  {t.result.share}
                </button>
                <button
                  onClick={() => {
                    const img = document.getElementById('generated-image') as HTMLImageElement
                    if (img) {
                      navigator.clipboard.writeText(img.src)
                      showError(t.result.copied, t.result.copiedMessage)
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
                  {t.result.copy}
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
                  showError('复制成功', '文本已复制到剪贴板！')
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
                  showError('复制成功', '文本已复制到剪贴板！')
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

      {/* 底部自适应广告 */}
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <ResponsiveAd style={{ maxWidth: '1200px', width: '100%' }} />
      </div>
      
      {/* 赞赏码部分 */}
      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        backgroundColor: '#0a0a0a',
        borderRadius: '1.5rem',
        border: '1px solid #222',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          💝 支持开发者
        </h2>
        <p style={{
          color: '#888',
          fontSize: '1rem',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          如果您觉得这个工具有帮助，欢迎扫码支持开发者！<br />
          您的支持是我继续开发的最大动力 😊
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <img
            src="/appreciation-code.jpg"
            alt="赞赏码"
            style={{
              maxWidth: '400px',
              width: '100%',
              height: 'auto',
              borderRadius: '1rem',
              boxShadow: '0 10px 30px rgba(251, 191, 36, 0.2)',
              border: '2px solid rgba(251, 191, 36, 0.3)'
            }}
          />
        </div>
      </div>

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

      {/* Error Modal */}
      {showErrorModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            border: '1px solid #ef4444',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                ⚠️
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#ef4444',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                {errorModalTitle}
              </h3>
              <p style={{
                color: '#ccc',
                fontSize: '1rem',
                lineHeight: '1.5',
                margin: 0
              }}>
                {errorModalMessage}
              </p>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444'
                }}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
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