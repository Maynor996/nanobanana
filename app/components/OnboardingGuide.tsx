'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

interface OnboardingGuideProps {
  isOpen: boolean
  onClose: () => void
}

export default function OnboardingGuide({ isOpen, onClose }: OnboardingGuideProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [showGuide, setShowGuide] = useState(false)

  const steps = [
    {
      title: '欢迎使用 Nano Banana 🍌',
      content: '这是一个免费的 AI 图像生成工具，支持文字生成图片和智能编辑功能。',
      highlight: '.mode-selector',
      position: 'bottom'
    },
    {
      title: '选择创作模式',
      content: '文生图模式：用文字描述生成图片；图像编辑模式：上传图片进行编辑。',
      highlight: '.mode-button',
      position: 'right'
    },
    {
      title: '选择 AI 模型',
      content: 'Z-Image 是完全免费的，无限使用！推荐新手选择。',
      highlight: '.model-selector',
      position: 'left'
    },
    {
      title: '输入提示词',
      content: '描述你想要的画面，越详细越好。可以使用灵感标签快速开始。',
      highlight: '.text-input-area',
      position: 'top'
    },
    {
      title: '开始创作',
      content: '点击生成按钮，等待 AI 为你创作精美图片。记得多尝试不同的风格！',
      highlight: '.generate-button',
      position: 'top'
    }
  ]

  useEffect(() => {
    if (isOpen) {
      setShowGuide(true)
      setCurrentStep(0)
    }
  }, [isOpen])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setShowGuide(false)
    setTimeout(() => {
      onClose()
      // 标记已完成引导
      localStorage.setItem('hasCompletedOnboarding', 'true')
    }, 300)
  }

  const handleSkip = () => {
    handleClose()
  }

  if (!showGuide) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
        opacity: showGuide ? 1 : 0
      }}
      onClick={handleClose}
    >
      {/* 引导卡片 */}
      <div
        style={{
          position: 'absolute',
          top: currentStep === 0 ? '20%' : '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1a1a1a',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '450px',
          width: '90%',
          border: '1px solid #333',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          animation: 'slideIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 进度指示器 */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          justifyContent: 'center'
        }}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index === currentStep ? '#10b981' : '#333',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* 标题 */}
        <h3 style={{
          fontSize: '1.5rem',
          color: '#10b981',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          {steps[currentStep].title}
        </h3>

        {/* 内容 */}
        <p style={{
          color: '#ccc',
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '1.5rem'
        }}>
          {steps[currentStep].content}
        </p>

        {/* 操作按钮 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '0.5rem 1rem'
            }}
          >
            跳过引导
          </button>

          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
              >
                上一步
              </button>
            )}

            <button
              onClick={handleNext}
              style={{
                padding: '0.5rem 1.5rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
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
              {currentStep === steps.length - 1 ? '开始使用' : '下一步'}
            </button>
          </div>
        </div>
      </div>

      {/* 高亮提示 */}
      {currentStep === 2 && (
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#f59e0b',
            color: '#000',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            animation: 'pulse 2s infinite'
          }}
        >
          👆 推荐选择这个！
        </div>
      )}

      {/* 样式动画 */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}