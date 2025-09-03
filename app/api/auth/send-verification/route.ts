import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '../../../lib/email'

// 存储验证码的临时存储（生产环境建议使用Redis）
const verificationCodes = new Map<string, { code: string; expires: number }>()

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

    // 验证邮箱格式
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    // 检查是否频繁发送（1分钟内只能发送一次）
    const existing = verificationCodes.get(email)
    if (existing && Date.now() < existing.expires - 4 * 60 * 1000) { // 5分钟有效期，1分钟内不能重复发送
      return NextResponse.json(
        { success: false, error: '验证码发送过于频繁，请1分钟后再试' },
        { status: 429 }
      )
    }

    // 生成验证码
    const code = generateVerificationCode()
    const expires = Date.now() + 5 * 60 * 1000 // 5分钟有效期

    // 发送邮件
    const emailSent = await sendVerificationEmail(email, code)
    
    if (!emailSent) {
      return NextResponse.json(
        { success: false, error: '验证码发送失败，请稍后重试' },
        { status: 500 }
      )
    }

    // 存储验证码
    verificationCodes.set(email, { code, expires })

    // 清理过期验证码（简单的垃圾回收）
    setTimeout(() => {
      const current = verificationCodes.get(email)
      if (current && Date.now() > current.expires) {
        verificationCodes.delete(email)
      }
    }, 5 * 60 * 1000)

    return NextResponse.json({
      success: true,
      message: '验证码已发送到您的邮箱，请查收',
      expiresIn: 300 // 5分钟
    })

  } catch (error) {
    console.error('发送验证码API错误:', error)
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

// 导出验证码存储（供验证接口使用）
export { verificationCodes } 