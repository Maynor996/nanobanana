import { NextRequest, NextResponse } from 'next/server'
import { addUserCredits } from '../../../lib/credits'

// 验证码存储（与发送验证码接口共享）
const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    // 验证参数
    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: '邮箱和验证码不能为空' },
        { status: 400 }
      )
    }

    // 获取存储的验证码
    const storedVerification = verificationCodes.get(email)
    
    if (!storedVerification) {
      return NextResponse.json(
        { success: false, error: '验证码不存在或已过期，请重新发送' },
        { status: 400 }
      )
    }

    // 检查是否过期
    if (Date.now() > storedVerification.expires) {
      verificationCodes.delete(email)
      return NextResponse.json(
        { success: false, error: '验证码已过期，请重新发送' },
        { status: 400 }
      )
    }

    // 验证验证码
    if (storedVerification.code !== code) {
      return NextResponse.json(
        { success: false, error: '验证码错误，请重新输入' },
        { status: 400 }
      )
    }

    // 验证成功，删除验证码
    verificationCodes.delete(email)

    // 为新用户添加初始积分
    const userCredits = addUserCredits(email, 5) // 新用户获得5个积分

    return NextResponse.json({
      success: true,
      message: '登录成功！',
      user: {
        email,
        credits: userCredits.credits,
        isUnlimited: userCredits.isUnlimited,
        userLevel: userCredits.userLevel
      }
    })

  } catch (error) {
    console.error('验证码验证API错误:', error)
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    )
  }
} 