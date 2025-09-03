import nodemailer from 'nodemailer'

// 创建邮件发送器
const createTransporter = () => {
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
    })
  }

  // 方案2: Gmail
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })
  }

  // 方案3: Ethereal（测试）
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass'
    }
  })
}

// 发送验证码邮件
export async function sendVerificationEmail(to: string, code: string): Promise<boolean> {
  try {
    // 开发最小 MVP：直接打印验证码并返回成功
    if (process.env.EMAIL_DEV_MODE === 'true') {
      console.log('[DEV EMAIL] to=', to, 'code=', code, '(5分钟有效)')
      await new Promise(r => setTimeout(r, 200))
      return true
    }

    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.SMTP_USER || process.env.GMAIL_USER || '"Nano Banana" <noreply@nanobanana.com>',
      to,
      subject: '🍌 Nano Banana 验证码',
      html: `
        <div style="max-width:600px;margin:0 auto;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <div style="text-align:center;margin-bottom:30px;">
            <h1 style="color:#10b981;font-size:28px;margin:0;">🍌 Nano Banana</h1>
            <p style="color:#6b7280;margin:10px 0 0;">AI图像生成平台</p>
          </div>
          <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #10b981;border-radius:12px;padding:30px;text-align:center;margin-bottom:30px;">
            <h2 style="color:#065f46;margin:0 0 15px;font-size:24px;">您的验证码</h2>
            <div style="background:#fff;border:2px solid #10b981;border-radius:8px;padding:20px;margin:20px 0;display:inline-block;">
              <span style="font-size:32px;font-weight:bold;color:#10b981;letter-spacing:5px;">${code}</span>
            </div>
            <p style="color:#374151;margin:15px 0 0;font-size:14px;">验证码有效期为 5 分钟</p>
          </div>
        </div>
      `,
      text: `
Nano Banana 验证码

您的验证码是: ${code}

验证码有效期为 5 分钟。
`.trim()
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('📧 邮件发送成功:', { to, messageId: info.messageId, response: info.response })
    return true
  } catch (error) {
    console.error('📧 邮件发送失败:', error)
    return false
  }
}

// 测试邮件配置
export async function testEmailConfig(): Promise<{ success: boolean; message: string }> {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    return { success: true, message: '邮件配置正确' }
  } catch (error) {
    console.error('邮件配置测试失败:', error)
    return { success: false, message: `邮件配置错误: ${error}` }
  }
}