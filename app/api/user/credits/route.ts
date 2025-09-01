import { NextRequest, NextResponse } from 'next/server'
import { getUserCredits } from '../../../lib/credits'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({
        error: '请提供邮箱地址'
      }, { status: 400 })
    }

    const userCredits = getUserCredits(email)

    return NextResponse.json({
      success: true,
      credits: userCredits.credits,
      isUnlimited: userCredits.isUnlimited,
      lastUpdated: userCredits.lastUpdated,
      planId: userCredits.planId
    })

  } catch (error) {
    console.error('获取积分信息失败:', error)
    return NextResponse.json({
      error: '获取积分信息失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

