'use client'

import React, { useState, useEffect } from 'react'

interface TooltipProps {
  text: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export function Tooltip({ text, children, position = 'top', delay = 500 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setIsVisible(false)
  }

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-8px)',
          marginBottom: '8px'
        }
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(8px)',
          marginTop: '8px'
        }
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(-8px)',
          marginRight: '8px'
        }
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(8px)',
          marginLeft: '8px'
        }
    }
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#333',
            color: '#fff',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            opacity: 0,
            animation: 'fadeIn 0.2s ease forwards',
            ...getPositionStyles()
          }}
        >
          {text}
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: position === 'top' || position === 'bottom' ? '6px' : '8px',
              borderColor: position === 'top'
                ? '#333 transparent transparent transparent'
                : position === 'bottom'
                ? 'transparent transparent #333 transparent'
                : position === 'left'
                ? 'transparent #333 transparent transparent'
                : 'transparent transparent transparent #333',
              ...(
                position === 'top' ? { bottom: '-6px', left: '50%', transform: 'translateX(-50%)' } :
                position === 'bottom' ? { top: '-6px', left: '50%', transform: 'translateX(-50%)' } :
                position === 'left' ? { right: '-6px', top: '50%', transform: 'translateY(-50%)' } :
                { left: '-6px', top: '50%', transform: 'translateY(-50%)' }
              )
            }}
          />
          <style jsx>{`
            @keyframes fadeIn {
              to {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}

interface NewBadgeProps {
  children: React.ReactNode
}

export function NewBadge({ children }: NewBadgeProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <div
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          backgroundColor: '#ef4444',
          color: '#fff',
          fontSize: '0.75rem',
          padding: '2px 6px',
          borderRadius: '0.25rem',
          fontWeight: 'bold',
          animation: 'pulse 2s infinite',
          zIndex: 10
        }}
      >
        NEW
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}

interface HintBubbleProps {
  text: string
  visible: boolean
  onClose: () => void
}

export function HintBubble({ text, visible, onClose }: HintBubbleProps) {
  const [shouldShow, setShouldShow] = useState(visible)

  useEffect(() => {
    setShouldShow(visible)
  }, [visible])

  if (!shouldShow) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: '#1a1a1a',
        border: '1px solid #10b981',
        borderRadius: '0.75rem',
        padding: '1rem 1.5rem',
        maxWidth: '300px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
        animation: 'slideInRight 0.3s ease-out',
        zIndex: 1000
      }}
    >
      <button
        onClick={() => {
          setShouldShow(false)
          onClose()
        }}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'none',
          border: 'none',
          color: '#666',
          fontSize: '1rem',
          cursor: 'pointer',
          padding: '0.25rem'
        }}
      >
        ✕
      </button>
      <p style={{
        color: '#ccc',
        fontSize: '0.9rem',
        margin: 0,
        paddingRight: '1.5rem'
      }}>
        💡 {text}
      </p>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}