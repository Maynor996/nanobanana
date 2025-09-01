import { NextRequest, NextResponse } from 'next/server'
import { getUserCredits, deductUserCredits } from './credits'

const CREDITS_PER_GENERATION = 1 // 每次生成消耗1积分

export async function withCreditsCheck(
  request: NextRequest,
  handler: (req: NextRequest, userEmail: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    let userEmail = searchParams.get('email') || request.headers.get('x-user-email')

    // 如果没有在URL参数或请求头中找到，尝试从请求体中获取
    let requestBody: any = null
    if (!userEmail) {
      try {
        const clonedRequest = request.clone()
        requestBody = await clonedRequest.json()
        userEmail = requestBody.email || (requestBody.sessionId ? `anonymous_${requestBody.sessionId}` : null)
      } catch (e) {
        // 如果无法解析JSON，继续使用原始请求
      }
    }

    if (!userEmail) {
      return NextResponse.json({
        error: '请先登录或提供邮箱地址',
        requiresAuth: true
      }, { status: 401 })
    }

    const userCredits = getUserCredits(userEmail)

    // 检查是否为匿名用户，如果是则跳过积分检查（无限使用）
    const isAnonymous = userEmail.startsWith('anonymous_')
    if (!isAnonymous && !userCredits.isUnlimited && userCredits.credits <= 0) {
      return NextResponse.json({
        error: '积分不足，请先购买套餐',
        credits: userCredits.credits,
        requiresPayment: true
      }, { status: 402 })
    }

    // 扣除积分
    const deductionResult = deductUserCredits(userEmail, CREDITS_PER_GENERATION)

    if (!deductionResult.success) {
      return NextResponse.json({
        error: '积分扣除失败',
        credits: deductionResult.remainingCredits
      }, { status: 402 })
    }

    // 继续处理请求，传递用户信息
    const response = await handler(request, userEmail)

    // 在响应中添加剩余积分信息
    const responseData = await response.json()
    if (isAnonymous) {
      // 匿名用户无限使用，不显示积分消耗
      return NextResponse.json({
        ...responseData,
        remainingCredits: 999,
        creditsDeducted: 0
      })
    } else {
      return NextResponse.json({
        ...responseData,
        remainingCredits: deductionResult.remainingCredits,
        creditsDeducted: CREDITS_PER_GENERATION
      })
    }

  } catch (error) {
    console.error('积分验证失败:', error)
    return NextResponse.json({
      error: '积分验证失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}
