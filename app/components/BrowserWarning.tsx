'use client'

import { useState, useEffect } from 'react'
import { detectBrowser, getBrowserWarningText, type BrowserInfo } from '../utils/browserDetection'

export default function BrowserWarning() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);

  useEffect(() => {
    const info = detectBrowser();
    setBrowserInfo(info);
    
    // 如果在应用内浏览器，禁用页面滚动和交互
    if (info.isInApp) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }
    
    return () => {
      // 清理时恢复页面
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  if (!browserInfo?.isInApp) {
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
          🚫 访问受限
        </h2>

        {/* 提示内容 */}
        <p style={{
          color: '#ccc',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          {browserInfo.isWeChat ? '检测到您正在微信中访问，必须在浏览器中打开才能使用本服务' : '检测到您正在QQ中访问，必须在浏览器中打开才能使用本服务'}
        </p>
        
        {/* 强制提示 */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '2rem',
          border: '2px solid #ef4444'
        }}>
          <p style={{
            color: '#ef4444',
            fontSize: '1rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            ⛔ 该页面无法在应用内浏览器中正常工作
          </p>
          <p style={{
            color: '#fca5a5',
            fontSize: '0.9rem',
            margin: '0.5rem 0 0 0'
          }}>
            为确保功能完整性，请按以下步骤在浏览器中打开
          </p>
        </div>

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
            🔒 功能受限原因
          </h4>
          <ul style={{
            textAlign: 'left',
            color: '#ccc',
            fontSize: '0.85rem',
            margin: 0,
            paddingLeft: '1.2rem'
          }}>
            <li style={{ marginBottom: '0.3rem' }}>AI图像生成需要完整的API支持</li>
            <li style={{ marginBottom: '0.3rem' }}>文件上传功能在应用内受限</li>
            <li style={{ marginBottom: '0.3rem' }}>某些JavaScript功能被禁用</li>
            <li>页面渲染可能出现异常</li>
          </ul>
        </div>
        
        {/* 无法关闭提示 */}
        <div style={{
          background: 'rgba(55, 65, 81, 0.5)',
          borderRadius: '0.75rem',
          padding: '1rem',
          border: '1px solid #4b5563'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '0.9rem',
            margin: 0,
            fontStyle: 'italic'
          }}>
            💡 此提示无法关闭，请按上述步骤在浏览器中打开
          </p>
        </div>
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