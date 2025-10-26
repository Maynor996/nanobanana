import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface AdPlatformMetrics {
  impressions: number
  clicks: number
  revenue: number
}

interface AdAnalytics {
  impressions: number
  clicks: number
  revenue: number
  ctr: number // Click Through Rate
  cpm: number // Cost Per Mille
  date: string
  googleAdsense?: AdPlatformMetrics
  adsterra?: AdPlatformMetrics
}

// 模拟广告收入数据 - 实际项目中应从 Google AdSense API 和 Adsterra API 获取
async function fetchAdAnalytics(startDate: string, endDate: string): Promise<AdAnalytics[]> {
  // 这里应该调用 Google AdSense Reporting API 和 Adsterra API
  const mockData: AdAnalytics[] = [
    {
      impressions: 1250,
      clicks: 35,
      revenue: 12.45,
      ctr: 2.8,
      cpm: 9.96,
      date: '2024-01-01',
      googleAdsense: {
        impressions: 750,
        clicks: 22,
        revenue: 8.45
      },
      adsterra: {
        impressions: 500,
        clicks: 13,
        revenue: 4.00
      }
    },
    {
      impressions: 1180,
      clicks: 28,
      revenue: 10.82,
      ctr: 2.37,
      cpm: 9.17,
      date: '2024-01-02',
      googleAdsense: {
        impressions: 680,
        clicks: 18,
        revenue: 6.82
      },
      adsterra: {
        impressions: 500,
        clicks: 10,
        revenue: 4.00
      }
    },
    {
      impressions: 1320,
      clicks: 41,
      revenue: 14.75,
      ctr: 3.11,
      cpm: 11.17,
      date: '2024-01-03',
      googleAdsense: {
        impressions: 820,
        clicks: 28,
        revenue: 10.25
      },
      adsterra: {
        impressions: 500,
        clicks: 13,
        revenue: 4.50
      }
    }
  ]

  return mockData
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate') || '2024-01-01'
    const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0]
    
    const analytics = await fetchAdAnalytics(startDate, endDate)
    
    // 计算总计数据
    const totals = analytics.reduce((acc, day) => {
      acc.totalImpressions += day.impressions
      acc.totalClicks += day.clicks
      acc.totalRevenue += day.revenue
      return acc
    }, { totalImpressions: 0, totalClicks: 0, totalRevenue: 0 })

    // 计算各平台总计
    const googleAdsenseTotals = analytics.reduce((acc, day) => {
      if (day.googleAdsense) {
        acc.impressions += day.googleAdsense.impressions
        acc.clicks += day.googleAdsense.clicks
        acc.revenue += day.googleAdsense.revenue
      }
      return acc
    }, { impressions: 0, clicks: 0, revenue: 0 })

    const adsterraTotals = analytics.reduce((acc, day) => {
      if (day.adsterra) {
        acc.impressions += day.adsterra.impressions
        acc.clicks += day.adsterra.clicks
        acc.revenue += day.adsterra.revenue
      }
      return acc
    }, { impressions: 0, clicks: 0, revenue: 0 })

    const averageCTR = totals.totalImpressions > 0
      ? (totals.totalClicks / totals.totalImpressions) * 100
      : 0

    const averageCPM = totals.totalImpressions > 0
      ? (totals.totalRevenue / totals.totalImpressions) * 1000
      : 0

    return NextResponse.json({
      success: true,
      data: {
        daily: analytics,
        summary: {
          ...totals,
          averageCTR: parseFloat(averageCTR.toFixed(2)),
          averageCPM: parseFloat(averageCPM.toFixed(2)),
          period: `${startDate} - ${endDate}`,
          googleAdsense: googleAdsenseTotals,
          adsterra: adsterraTotals
        }
      }
    })
  } catch (error) {
    console.error('获取广告分析数据失败:', error)
    return NextResponse.json({
      success: false,
      error: '获取广告分析数据失败'
    }, { status: 500 })
  }
}

// 记录广告点击事件
export async function POST(request: NextRequest) {
  try {
    const { adSlot, adFormat, userAgent } = await request.json()
    
    // 这里可以记录广告点击事件到数据库或分析服务
    console.log('广告点击记录:', {
      adSlot,
      adFormat,
      userAgent,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json({
      success: true,
      message: '广告点击已记录'
    })
  } catch (error) {
    console.error('记录广告点击失败:', error)
    return NextResponse.json({
      success: false,
      error: '记录广告点击失败'
    }, { status: 500 })
  }
}