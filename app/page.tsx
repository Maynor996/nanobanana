'use client'

import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [responseContent, setResponseContent] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    setImageUrl('')
    setMessage('')
    setResponseContent('')
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      const data = await response.json()
      
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      } else if (data.message) {
        setMessage(data.message)
        setResponseContent(data.content || '')
      } else if (data.error) {
        setMessage(`错误: ${data.error}`)
        if (data.details) {
          console.error('详细错误:', data.details)
        }
      }
    } catch (error) {
      console.error('生成失败:', error)
      setMessage('请求失败，请检查网络连接')
    } finally {
      setLoading(false)
    }
  }

  const examplePrompts = [
    {
      category: "🎨 艺术风格",
      examples: [
        "一只可爱的橘猫坐在窗台上，水彩画风格",
        "未来城市的夜景，赛博朋克风格，霓虹灯闪烁",
        "古代中国山水画，水墨风格，远山如黛"
      ]
    },
    {
      category: "📸 写实照片",
      examples: [
        "一杯热咖啡在木桌上，阳光透过窗户洒进来",
        "海边日落，波浪轻拍沙滩，天空呈现橙红色",
        "现代办公室内部，简约设计，自然光线"
      ]
    },
    {
      category: "🌟 创意概念",
      examples: [
        "漂浮在云端的城堡，梦幻色彩",
        "机械与花朵融合的艺术装置",
        "时空隧道中的星际旅行者"
      ]
    },
    {
      category: "🎭 角色设计",
      examples: [
        "可爱的动漫女孩，大眼睛，粉色头发",
        "威严的中世纪骑士，银色盔甲，红色斗篷",
        "神秘的魔法师，紫色长袍，手持法杖"
      ]
    }
  ]

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>
        Gemini 2.5 Flash 图片生成器 🎨
      </h1>
      
      <div style={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="输入你的图片描述..."
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '1rem',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            resize: 'vertical'
          }}
        />
        
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          style={{
            padding: '1rem 2rem',
            fontSize: '18px',
            backgroundColor: loading ? '#ccc' : '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {loading ? '生成中...' : '生成图片'}
        </button>
      </div>
      
      {imageUrl && (
        <div style={{
          marginTop: '2rem',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <img 
            src={imageUrl} 
            alt="Generated image"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
      )}
      
      {message && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: message.includes('错误') ? '#fee' : '#eef',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%'
        }}>
          <p style={{ margin: 0, color: '#333' }}>{message}</p>
          {responseContent && (
            <pre style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '14px'
            }}>{responseContent}</pre>
          )}
        </div>
      )}

      {/* 使用示例部分 */}
      <div style={{
        marginTop: '4rem',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <h2 style={{
          color: '#333',
          fontSize: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          ✨ 使用示例
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {examplePrompts.map((category, categoryIndex) => (
            <div key={categoryIndex} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e1e1e1'
            }}>
              <h3 style={{
                color: '#4285f4',
                fontSize: '1.2rem',
                marginBottom: '1rem',
                borderBottom: '2px solid #f0f0f0',
                paddingBottom: '0.5rem'
              }}>
                {category.category}
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                {category.examples.map((example, exampleIndex) => (
                  <div
                    key={exampleIndex}
                    onClick={() => handleExampleClick(example)}
                    style={{
                      padding: '0.8rem',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      transition: 'all 0.2s ease',
                      fontSize: '14px',
                      lineHeight: '1.4'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e3f2fd'
                      e.currentTarget.style.borderColor = '#4285f4'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa'
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 功能特点介绍 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            color: '#333',
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            🚀 功能特点
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                lineHeight: '1'
              }}>🎨</div>
              <div>
                <h4 style={{ color: '#4285f4', margin: '0 0 0.5rem 0' }}>AI智能生成</h4>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                  基于Google Gemini 2.5 Flash模型，支持多种风格的高质量图片生成
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                lineHeight: '1'
              }}>⚡</div>
              <div>
                <h4 style={{ color: '#4285f4', margin: '0 0 0.5rem 0' }}>快速响应</h4>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                  优化的API调用，通常在10-30秒内完成图片生成
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                lineHeight: '1'
              }}>🎯</div>
              <div>
                <h4 style={{ color: '#4285f4', margin: '0 0 0.5rem 0' }}>精准理解</h4>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                  支持中文提示词，精准理解复杂的描述和要求
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                lineHeight: '1'
              }}>📱</div>
              <div>
                <h4 style={{ color: '#4285f4', margin: '0 0 0.5rem 0' }}>响应式设计</h4>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                  完美适配桌面和移动设备，随时随地创作
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用提示 */}
        <div style={{
          backgroundColor: '#e8f5e8',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #c8e6c9'
        }}>
          <h4 style={{
            color: '#2e7d32',
            margin: '0 0 1rem 0',
            fontSize: '1.1rem'
          }}>
            💡 使用提示
          </h4>
          <ul style={{
            color: '#333',
            margin: 0,
            paddingLeft: '1.2rem',
            lineHeight: '1.6'
          }}>
            <li>描述越详细，生成的图片越符合预期</li>
            <li>可以指定艺术风格，如"水彩画"、"油画"、"动漫"等</li>
            <li>支持场景描述，如"室内"、"户外"、"夜晚"等</li>
            <li>可以描述情感和氛围，如"温馨"、"神秘"、"活力"等</li>
            <li>点击上方示例可以快速填入提示词</li>
          </ul>
        </div>

        {/* 快捷链接 */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <a 
            href="/nano"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#34a853',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2d8e47'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#34a853'
            }}
          >
            🚀 体验完整版 Nano Banana
          </a>
          
          <p style={{
            color: '#666',
            fontSize: '14px',
            marginTop: '1rem',
            margin: '1rem 0 0 0'
          }}>
            完整版包含图片编辑、批量生成、风格选择等高级功能
          </p>
        </div>
      </div>
    </div>
  )
}