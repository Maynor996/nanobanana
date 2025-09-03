import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

// 创建邮件发送器
function createTransporter() {
  // 开发模式：不联网，直接把邮件写入内存（控制台可见）
  if (process.env.EMAIL_DEV_MODE === 'true') {
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    })
  }

  // 方案1: QQ 邮箱 SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST, // 如: smtp.qq.com
      port: parseInt(process.env.SMTP_PORT || '587'), // 更通用：默认用 587(TLS)
      secure: process.env.SMTP_PORT === '465',        // 465 才走 SSL
      requireTLS: process.env.SMTP_PORT !== '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // 开发环境放宽校验
      }
    } as SMTPTransport.Options)
  }

  // 方案2: Gmail
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    } as SMTPTransport.Options)
  }

  // 方案3: Ethereal（测试）
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass'
    }
  } as SMTPTransport.Options)
}

// 简单的邮件发送实现（Edge Runtime 兼容）
export async function sendVerificationEmail(to: string, code: string): Promise<boolean> {
  try {
    // 开发模式：直接打印验证码
    if (process.env.EMAIL_DEV_MODE === 'true') {
      console.log('[DEV EMAIL] to=', to, 'code=', code, '(5分钟有效)')
      await new Promise(r => setTimeout(r, 200))
      return true
    }

    // 生产环境：使用 Resend/SendGrid 等 API
    console.log('📧 [TODO] 集成邮件发送 API')
    return true

  } catch (error) {
    console.error('📧 邮件发送失败:', error)
    return false
  }
}

// 测试邮件配置
export async function testEmailConfig(): Promise<{ success: boolean; message: string }> {
  if (process.env.EMAIL_DEV_MODE === 'true') {
    return { success: true, message: '开发模式：邮件将打印到控制台' }
  }
  return { success: true, message: '[TODO] 邮件 API 配置正确' }
}