'use client'

import AdAnalytics from '../components/AdAnalytics'

export default function AdsDashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 页头 */}
      <header style={{
        padding: '2rem',
        borderBottom: '1px solid #333',
        backgroundColor: '#111'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #10b981, #00a3ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              📊 广告收入管理
            </h1>
            <p style={{
              color: '#888',
              margin: '0.5rem 0 0 0',
              fontSize: '1rem'
            }}>
              Google AdSense 收入分析与优化建议
            </p>
          </div>
          
          <button
            onClick={() => window.location.href = '/nano'}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            ← 返回应用
          </button>
        </div>
      </header>

      {/* 主要内容 */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* 广告配置状态 */}
        <div style={{
          backgroundColor: '#111',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            margin: '0 0 1rem 0',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ⚙️ 广告配置状态
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: '#0a0a0a',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #333'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID !== 'ca-pub-xxxxxxxxxxxxxxxxx' ? '#10b981' : '#ef4444', fontSize: '1.2rem' }}>
                  {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID !== 'ca-pub-xxxxxxxxxxxxxxxxx' ? '✅' : '❌'}
                </span>
                <strong style={{ color: '#888' }}>AdSense 配置</strong>
              </div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID !== 'ca-pub-xxxxxxxxxxxxxxxxx' 
                  ? `发布商 ID: ${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}` 
                  : '请配置 NEXT_PUBLIC_GOOGLE_ADSENSE_ID'
                }
              </div>
            </div>

            <div style={{
              backgroundColor: '#0a0a0a',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #333'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✅</span>
                <strong style={{ color: '#888' }}>广告位数量</strong>
              </div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                已配置 4 个广告位 (横幅、矩形、自适应)
              </div>
            </div>

            <div style={{
              backgroundColor: '#0a0a0a',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #333'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#ffa500', fontSize: '1.2rem' }}>⚠️</span>
                <strong style={{ color: '#888' }}>数据来源</strong>
              </div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                当前使用模拟数据，生产环境需接入 AdSense API
              </div>
            </div>
          </div>
        </div>

        {/* 广告分析组件 */}
        <AdAnalytics />

        {/* 快速设置指南 */}
        <div style={{
          backgroundColor: '#111',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #333',
          marginTop: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            margin: '0 0 1rem 0',
            color: '#ffa500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📚 AdSense 设置指南
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <h3 style={{ color: '#10b981', fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. 申请 AdSense 账户</h3>
              <ul style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>访问 <a href="https://adsense.google.com" target="_blank" style={{ color: '#00a3ff' }}>Google AdSense</a></li>
                <li>提交网站审核申请</li>
                <li>等待审核通过（通常需要数天到数周）</li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ color: '#8b5cf6', fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. 配置环境变量</h3>
              <div style={{
                backgroundColor: '#222',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#ccc'
              }}>
                NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-your-publisher-id
              </div>
            </div>
            
            <div>
              <h3 style={{ color: '#ef4444', fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. 创建广告单元</h3>
              <ul style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>登录 AdSense 控制台</li>
                <li>创建不同尺寸的广告单元</li>
                <li>获取广告位 ID 并更新组件配置</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}