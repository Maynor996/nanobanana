'use client'

import { useState, useEffect } from 'react'
import { detectBrowser, getBrowserWarningText, type BrowserInfo } from '../utils/browserDetection'

interface BrowserWarningProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function BrowserWarning({ onClose, showCloseButton = true }: BrowserWarningProps) {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const info = detectBrowser();
    setBrowserInfo(info);
    
    if (info.isInApp) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!browserInfo?.isInApp || !isVisible) {
    return null;
  }

  const warningText = getBrowserWarningText(browserInfo);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        borderRadius: '1.5rem',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        border: '2px solid #ef4444',
        boxShadow: '0 20px 50px rgba(239, 68, 68, 0.3)'
      }}>
        {/* 警告图标 */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'pulse 2s infinite'
        }}>
          ⚠️
        </div>

        {/* 标题 */}
        <h2 style={{
          color: '#ef4444',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          浏览器兼容性提示
        </h2>

        {/* 提示内容 */}
        <p style={{
          color: '#ccc',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          {warningText}
        </p>

        {/* 操作步骤 */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <h3 style={{
            color: '#10b981',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            📱 操作步骤
          </h3>
          
          {browserInfo.isWeChat && (
            <div style={{ textAlign: 'left', color: '#ccc', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>1. 点击右上角 <strong style={{ color: '#10b981' }}>「···」</strong> 菜单</p>
              <p style={{ marginBottom: '0.5rem' }}>2. 选择 <strong style={{ color: '#10b981' }}>「在浏览器中打开」</strong></p>
              <p>3. 选择您常用的浏览器（Safari、Chrome等）</p>
            </div>
          )}

          {browserInfo.isQQ && (
            <div style={{ textAlign: 'left', color: '#ccc', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>1. 点击右上角 <strong style={{ color: '#10b981' }}>「···」</strong> 菜单</p>
              <p style={{ marginBottom: '0.5rem' }}>2. 选择 <strong style={{ color: '#10b981' }}>「在浏览器中打开」</strong></p>
              <p>3. 选择您常用的浏览器（Safari、Chrome等）</p>
            </div>
          )}
        </div>

        {/* 为什么需要在浏览器打开 */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <h4 style={{
            color: '#10b981',
            fontSize: '1rem',
            marginBottom: '0.75rem',
            fontWeight: 'bold'
          }}>
            🚀 为什么需要在浏览器中打开？
          </h4>
          <ul style={{
            textAlign: 'left',
            color: '#ccc',
            fontSize: '0.85rem',
            margin: 0,
            paddingLeft: '1.2rem'
          }}>
            <li style={{ marginBottom: '0.3rem' }}>获得完整的功能体验</li>
            <li style={{ marginBottom: '0.3rem' }}>支持文件上传和下载</li>
            <li style={{ marginBottom: '0.3rem' }}>更好的页面渲染效果</li>
            <li>避免功能限制和兼容性问题</li>
          </ul>
        </div>

        {/* 关闭按钮 */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            style={{
              background: 'linear-gradient(135deg, #6b7280, #4b5563)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4b5563, #374151)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
            }}
          >
            我知道了，继续访问
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}