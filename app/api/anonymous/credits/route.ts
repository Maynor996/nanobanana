import { NextRequest, NextResponse } from 'next/server'
import { getAnonymousRemainingUses } from '../../../lib/credits'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json({
        error: '请提供会话ID'
      }, { status: 400 })
    }

    const remainingUses = getAnonymousRemainingUses(sessionId)

    return NextResponse.json({
      success: true,
      remainingFreeUses: remainingUses,
      totalFreeUses: 3,
      isAnonymous: true
    })

  } catch (error) {
    console.error('获取匿名用户积分失败:', error)
    return NextResponse.json({
      error: '获取积分信息失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

