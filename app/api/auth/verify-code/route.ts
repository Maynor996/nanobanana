import { NextRequest, NextResponse } from 'next/server'
import { addUserCredits } from '../../../lib/credits'
import { getVerificationCode, deleteVerificationCode } from '../../../lib/verification-store'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ success: false, error: '邮箱和验证码不能为空' }, { status: 400 })
    }

    const stored = getVerificationCode(email)
    if (!stored) {
      return NextResponse.json({ success: false, error: '验证码不存在或已过期，请重新发送' }, { status: 400 })
    }

    if (Date.now() > stored.expires) {
      deleteVerificationCode(email)
      return NextResponse.json({ success: false, error: '验证码已过期，请重新发送' }, { status: 400 })
    }

    if (stored.code !== code) {
      return NextResponse.json({ success: false, error: '验证码错误，请重新输入' }, { status: 400 })
    }

    deleteVerificationCode(email)

    const userCredits = addUserCredits(email, 5)

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
    return NextResponse.json({ success: false, error: '服务器内部错误' }, { status: 500 })
  }
} 