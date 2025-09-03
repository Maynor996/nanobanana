import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '../../../lib/email'
import { setVerificationCode } from '../../../lib/verification-store'

// 生成6位数字验证码
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// 简单的邮箱格式验证
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    // 生成验证码
    const code = generateVerificationCode()
    const expires = Date.now() + 5 * 60 * 1000 // 5分钟有效期

    // 发送邮件（开发模式会直接打印）
    const emailSent = await sendVerificationEmail(email, code)
    if (!emailSent) {
      return NextResponse.json({ success: false, error: '验证码发送失败，请稍后重试' }, { status: 500 })
    }

    // 存储验证码
    setVerificationCode(email, { code, expires })

    return NextResponse.json({
      success: true,
      message: '验证码已发送到您的邮箱，请查收',
      expiresIn: 300
    })
  } catch (error) {
    console.error('发送验证码API错误:', error)
    return NextResponse.json({ success: false, error: '服务器内部错误' }, { status: 500 })
  }
} 