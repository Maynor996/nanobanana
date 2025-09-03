import nodemailer from 'nodemailer'

// 创建邮件发送器
const createTransporter = () => {
  // 您可以根据需要配置不同的邮件服务
  
  // 方案1: 使用QQ邮箱SMTP（根据您提供的配置）
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST, // 如: smtp.qq.com
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465', // 465端口使用SSL，587使用TLS
      auth: {
        user: process.env.SMTP_USER, // 您的QQ邮箱
        pass: process.env.SMTP_PASS, // QQ邮箱授权码
      },
    })
  }

  // 方案2: 使用Gmail SMTP
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }

  // 方案3: 开发环境使用Ethereal测试邮箱
  return nodemailer.createTransporter({
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
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.SMTP_USER || process.env.GMAIL_USER || '"Nano Banana" <noreply@nanobanana.com>',
      to,
      subject: '🍌 Nano Banana 验证码',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #10b981; font-size: 28px; margin: 0;">🍌 Nano Banana</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0;">AI图像生成平台</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border: 1px solid #10b981; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
            <h2 style="color: #065f46; margin: 0 0 15px 0; font-size: 24px;">您的验证码</h2>
            <div style="background: white; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: #10b981; letter-spacing: 5px;">${code}</span>
            </div>
            <p style="color: #374151; margin: 15px 0 0 0; font-size: 14px;">验证码有效期为 5 分钟</p>
          </div>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">🚀 登录后可享受：</h3>
            <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
              <li>5个免费积分</li>
              <li>批量生成多张图片</li>
              <li>专业级AI引擎</li>
              <li>高速处理速度</li>
            </ul>
          </div>
          
          <div style="text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.5;">
            <p>如果您没有请求此验证码，请忽略此邮件。</p>
            <p>此邮件由系统自动发送，请勿回复。</p>
            <p style="margin-top: 20px;">
              © 2024 Nano Banana. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
Nano Banana 验证码

您的验证码是: ${code}

验证码有效期为 5 分钟。

登录后可享受：
- 5个免费积分
- 批量生成多张图片  
- 专业级AI引擎
- 高速处理速度

如果您没有请求此验证码，请忽略此邮件。

© 2024 Nano Banana
      `.trim()
    }

    const info = await transporter.sendMail(mailOptions)
    
    console.log('📧 邮件发送成功:', {
      to,
      messageId: info.messageId,
      response: info.response
    })
    
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