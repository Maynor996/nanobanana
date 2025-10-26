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
                <strong style={{ color: '#888' }}>Google AdSense 配置</strong>
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
              border: '1px solid #ff6b6b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true' ? '#ff6b6b' : '#ef4444', fontSize: '1.2rem' }}>
                  {process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true' ? '✅' : '❌'}
                </span>
                <strong style={{ color: '#888' }}>Adsterra 配置</strong>
              </div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                {process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true'
                  ? '已启用 Adsterra 广告'
                  : '请配置 NEXT_PUBLIC_ADSTERRA_ENABLED=true'
                }
              </div>
              <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.25rem' }}>
                支持：Banner、Native、Popunder 等格式
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
                已配置 9 个广告位 (Google: 4个, Adsterra: 5个)
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
            📚 广告平台设置指南
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Google AdSense 设置指南 */}
            <div style={{
              backgroundColor: '#0a0a0a',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #333'
            }}>
              <h3 style={{ color: '#10b981', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔍 Google AdSense 设置</h3>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#8b5cf6', fontSize: '1rem', marginBottom: '0.5rem' }}>1. 申请账户</div>
                <ul style={{ color: '#ccc', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  <li>访问 <a href="https://adsense.google.com" target="_blank" style={{ color: '#00a3ff' }}>Google AdSense</a></li>
                  <li>提交网站审核申请</li>
                  <li>等待审核通过</li>
                </ul>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#8b5cf6', fontSize: '1rem', marginBottom: '0.5rem' }}>2. 配置环境变量</div>
                <div style={{
                  backgroundColor: '#222',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  color: '#ccc'
                }}>
                  NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-your-publisher-id
                </div>
              </div>
            </div>

            {/* Adsterra 设置指南 */}
            <div style={{
              backgroundColor: '#0a0a0a',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ff6b6b'
            }}>
              <h3 style={{ color: '#ff6b6b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔴 Adsterra 设置</h3>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#ff6b6b', fontSize: '1rem', marginBottom: '0.5rem' }}>1. 申请账户</div>
                <ul style={{ color: '#ccc', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  <li>访问 <a href="https://publishers.adsterra.com" target="_blank" style={{ color: '#00a3ff' }}>Adsterra Publishers</a></li>
                  <li>注册账户并验证网站</li>
                  <li>创建广告位并获取代码</li>
                </ul>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#ff6b6b', fontSize: '1rem', marginBottom: '0.5rem' }}>2. 配置环境变量</div>
                <div style={{
                  backgroundColor: '#222',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  color: '#ccc'
                }}>
                  NEXT_PUBLIC_ADSTERRA_ENABLED=true<br/>
                  NEXT_PUBLIC_ADSTERRA_BANNER_KEY=your-banner-key<br/>
                  NEXT_PUBLIC_ADSTERRA_NATIVE_KEY=your-native-key
                </div>
              </div>

              <div>
                <div style={{ color: '#ff6b6b', fontSize: '1rem', marginBottom: '0.5rem' }}>3. 广告格式</div>
                <ul style={{ color: '#ccc', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  <li>Banner: 横幅广告，适合页头页尾</li>
                  <li>Native: 原生广告，融入内容流</li>
                  <li>Popunder: 弹窗广告，高收益</li>
                  <li>Social Bar: 社交栏广告</li>
                </ul>
              </div>
            </div>

            {/* 通用优化建议 */}
            <div style={{
              backgroundColor: '#0a0a0a',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ffa500'
            }}>
              <h3 style={{ color: '#ffa500', fontSize: '1.1rem', marginBottom: '0.5rem' }}>💡 优化建议</h3>
              <ul style={{ color: '#ccc', fontSize: '0.8rem', lineHeight: '1.4' }}>
                <li>合理配置广告位，避免过多影响用户体验</li>
                <li>定期监控广告表现和收入数据</li>
                <li>根据用户行为调整广告位置</li>
                <li>确保网站符合各平台政策要求</li>
                <li>测试不同广告平台的收益表现</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}