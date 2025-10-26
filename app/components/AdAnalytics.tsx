'use client'

import { useState, useEffect } from 'react'

interface AdAnalyticsData {
  daily: Array<{
    impressions: number
    clicks: number
    revenue: number
    ctr: number
    cpm: number
    date: string
    googleAdsense?: {
      impressions: number
      clicks: number
      revenue: number
    }
    adsterra?: {
      impressions: number
      clicks: number
      revenue: number
    }
  }>
  summary: {
    totalImpressions: number
    totalClicks: number
    totalRevenue: number
    averageCTR: number
    averageCPM: number
    period: string
    googleAdsense?: {
      revenue: number
      impressions: number
      clicks: number
    }
    adsterra?: {
      revenue: number
      impressions: number
      clicks: number
    }
  }
}

export default function AdAnalytics() {
  const [analytics, setAnalytics] = useState<AdAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
      
      const response = await fetch(`/api/ads/analytics?${params}`)
      const result = await response.json()
      
      if (result.success) {
        setAnalytics(result.data)
      }
    } catch (error) {
      console.error('获取广告数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  if (loading) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#111',
        borderRadius: '1rem',
        border: '1px solid #333'
      }}>
        <div style={{ color: '#888' }}>📊 加载广告数据中...</div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#111',
        borderRadius: '1rem',
        border: '1px solid #333'
      }}>
        <div style={{ color: '#888' }}>❌ 无法加载广告数据</div>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#111',
      borderRadius: '1rem',
      border: '1px solid #333',
      overflow: 'hidden'
    }}>
      {/* 标题栏 */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #333',
        backgroundColor: '#0a0a0a'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          margin: 0,
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          📈 广告收入分析
        </h2>
        
        {/* 日期选择器 */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ color: '#888', fontSize: '0.9rem' }}>时间范围:</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
            style={{
              backgroundColor: '#222',
              border: '1px solid #333',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.9rem'
            }}
          />
          <span style={{ color: '#888' }}>到</span>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
            style={{
              backgroundColor: '#222',
              border: '1px solid #333',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={fetchAnalytics}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🔄 更新
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{
        padding: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {/* 总收入卡片 */}
        <div style={{
          backgroundColor: '#1a1a2e',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #8b5cf6'
        }}>
          <div style={{ color: '#8b5cf6', fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>总收入</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            ¥{analytics.summary.totalRevenue.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.25rem' }}>
            Google: ¥{analytics.summary.googleAdsense?.revenue?.toFixed(2) || '0.00'} |
            Adsterra: ¥{analytics.summary.adsterra?.revenue?.toFixed(2) || '0.00'}
          </div>
        </div>

        {/* 总展示量卡片 */}
        <div style={{
          backgroundColor: '#1a2e1a',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #10b981'
        }}>
          <div style={{ color: '#10b981', fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>总展示量</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {analytics.summary.totalImpressions.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.25rem' }}>
            Google: {analytics.summary.googleAdsense?.impressions?.toLocaleString() || '0'} |
            Adsterra: {analytics.summary.adsterra?.impressions?.toLocaleString() || '0'}
          </div>
        </div>

        {/* 总点击量卡片 */}
        <div style={{
          backgroundColor: '#2e1a1a',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #ef4444'
        }}>
          <div style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '0.5rem' }}>🖱️</div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>总点击量</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {analytics.summary.totalClicks.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.25rem' }}>
            Google: {analytics.summary.googleAdsense?.clicks?.toLocaleString() || '0'} |
            Adsterra: {analytics.summary.adsterra?.clicks?.toLocaleString() || '0'}
          </div>
        </div>

        {/* 平均点击率卡片 */}
        <div style={{
          backgroundColor: '#2e2e1a',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #ffa500'
        }}>
          <div style={{ color: '#ffa500', fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>平均点击率</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {analytics.summary.averageCTR}%
          </div>
        </div>

        {/* Google AdSense 专项 */}
        <div style={{
          backgroundColor: '#1a2e2e',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #4285F4'
        }}>
          <div style={{ color: '#4285F4', fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Google AdSense</div>
          <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
            ¥{analytics.summary.googleAdsense?.revenue?.toFixed(2) || '0.00'}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.25rem' }}>
            {analytics.summary.googleAdsense?.impressions?.toLocaleString() || '0'} 展示
          </div>
        </div>

        {/* Adsterra 专项 */}
        <div style={{
          backgroundColor: '#2e1a1a',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #ff6b6b'
        }}>
          <div style={{ color: '#ff6b6b', fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔴</div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Adsterra</div>
          <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
            ¥{analytics.summary.adsterra?.revenue?.toFixed(2) || '0.00'}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.25rem' }}>
            {analytics.summary.adsterra?.impressions?.toLocaleString() || '0'} 展示
          </div>
        </div>
      </div>

      {/* 每日数据表格 */}
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <h3 style={{ 
          color: '#888', 
          fontSize: '1.1rem', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          📅 每日明细
        </h3>
        
        <div style={{
          backgroundColor: '#0a0a0a',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          border: '1px solid #333'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#222' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#888', fontSize: '0.9rem' }}>日期</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: '#888', fontSize: '0.9rem' }}>总展示</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: '#4285F4', fontSize: '0.9rem' }}>Google</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: '#ff6b6b', fontSize: '0.9rem' }}>Adsterra</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: '#8b5cf6', fontSize: '0.9rem' }}>总收入 (¥)</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: '#ffa500', fontSize: '0.9rem' }}>点击率</th>
              </tr>
            </thead>
            <tbody>
              {analytics.daily.map((day, index) => (
                <tr key={day.date} style={{
                  borderTop: index > 0 ? '1px solid #333' : 'none',
                  backgroundColor: index % 2 === 0 ? 'transparent' : '#111'
                }}>
                  <td style={{ padding: '0.75rem', color: 'white', fontSize: '0.9rem' }}>
                    {new Date(day.date).toLocaleDateString('zh-CN')}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: '#10b981', fontSize: '0.9rem' }}>
                    {day.impressions.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: '#4285F4', fontSize: '0.9rem' }}>
                    {day.googleAdsense?.impressions?.toLocaleString() || '0'}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: '#ff6b6b', fontSize: '0.9rem' }}>
                    {day.adsterra?.impressions?.toLocaleString() || '0'}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: '#8b5cf6', fontSize: '0.9rem' }}>
                    {day.revenue.toFixed(2)}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: '#ffa500', fontSize: '0.9rem' }}>
                    {day.ctr.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 优化建议 */}
      <div style={{
        padding: '1.5rem',
        borderTop: '1px solid #333',
        backgroundColor: '#0a0a0a'
      }}>
        <h3 style={{ 
          color: '#ffa500', 
          fontSize: '1.1rem', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💡 优化建议
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {analytics.summary.averageCTR < 2 && (
            <div style={{ 
              backgroundColor: '#2e1a1a', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #ef4444'
            }}>
              <div style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>📈 提升点击率</div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                当前点击率较低，建议优化广告位置和内容相关性
              </div>
            </div>
          )}
          
          {analytics.summary.totalRevenue < 50 && (
            <div style={{ 
              backgroundColor: '#1a2e1a', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #10b981'
            }}>
              <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>💰 增加收入</div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                考虑增加高价值广告位，或提升网站流量
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}