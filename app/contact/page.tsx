'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      {/* 头部 */}
      <div style={{
        background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
        borderBottom: '1px solid #222'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
              📧 联系我们
            </h1>
            <p style={{ fontSize: '20px', color: '#888', maxWidth: '768px', margin: '0 auto' }}>
              我们随时准备倾听您的声音并提供帮助
            </p>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          {/* 联系方式 */}
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>💬 多种联系方式</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  background: '#111',
                  borderRadius: '12px',
                  padding: '24px',
                  border: hoveredCard === 'email' ? '1px solid #10b981' : '1px solid #222',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={() => setHoveredCard('email')}
                onMouseOut={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '30px', marginRight: '16px' }}>📬</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>电子邮件</h3>
                    <p style={{ color: '#888', marginBottom: '12px' }}>
                      发送邮件到我们的支持邮箱,我们通常在24-48小时内回复。
                    </p>
                    <a
                      href="mailto:support@nanobanana.ai"
                      style={{ color: '#10b981', textDecoration: 'underline', fontWeight: '600' }}
                    >
                      support@nanobanana.ai
                    </a>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#111',
                  borderRadius: '12px',
                  padding: '24px',
                  border: hoveredCard === 'github' ? '1px solid #10b981' : '1px solid #222',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={() => setHoveredCard('github')}
                onMouseOut={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '30px', marginRight: '16px' }}>🐙</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>GitHub</h3>
                    <p style={{ color: '#888', marginBottom: '12px' }}>
                      在我们的开源仓库提交 Issue、Pull Request 或参与讨论。
                    </p>
                    <a
                      href="https://github.com/xianyu110/gemini-nanobanana-plus"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#10b981', textDecoration: 'underline', fontWeight: '600' }}
                    >
                      github.com/xianyu110/gemini-nanobanana-plus
                    </a>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#111',
                  borderRadius: '12px',
                  padding: '24px',
                  border: hoveredCard === 'business' ? '1px solid #10b981' : '1px solid #222',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={() => setHoveredCard('business')}
                onMouseOut={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '30px', marginRight: '16px' }}>💼</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>商务合作</h3>
                    <p style={{ color: '#888', marginBottom: '12px' }}>
                      对于商业合作、媒体咨询或其他商务事宜,请联系:
                    </p>
                    <a
                      href="mailto:business@nanobanana.ai"
                      style={{ color: '#10b981', textDecoration: 'underline', fontWeight: '600' }}
                    >
                      business@nanobanana.ai
                    </a>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#111',
                  borderRadius: '12px',
                  padding: '24px',
                  border: hoveredCard === 'security' ? '1px solid #10b981' : '1px solid #222',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={() => setHoveredCard('security')}
                onMouseOut={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '30px', marginRight: '16px' }}>🔒</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>安全与隐私</h3>
                    <p style={{ color: '#888', marginBottom: '12px' }}>
                      发现安全漏洞或隐私问题?请负责任地披露:
                    </p>
                    <a
                      href="mailto:security@nanobanana.ai"
                      style={{ color: '#10b981', textDecoration: 'underline', fontWeight: '600' }}
                    >
                      security@nanobanana.ai
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 反馈表单 */}
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>✍️ 快速反馈表单</h2>

            <div
              style={{
                background: '#111',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #222'
              }}
            >
              <p style={{ color: '#888', marginBottom: '24px' }}>
                填写下面的表单,我们会尽快回复您。也可以直接发送邮件到上述邮箱。
              </p>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '8px' }}>您的姓名 *</label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#1a1a1a',
                      border: '1px solid #222',
                      color: '#fff',
                      outline: 'none'
                    }}
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '8px' }}>电子邮箱 *</label>
                  <input
                    type="email"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#1a1a1a',
                      border: '1px solid #222',
                      color: '#fff',
                      outline: 'none'
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '8px' }}>主题 *</label>
                  <select
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#1a1a1a',
                      border: '1px solid #222',
                      color: '#fff',
                      outline: 'none'
                    }}
                  >
                    <option value="">请选择...</option>
                    <option value="feedback">功能反馈</option>
                    <option value="bug">问题报告</option>
                    <option value="help">使用帮助</option>
                    <option value="feature">功能建议</option>
                    <option value="business">商务合作</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '8px' }}>详细信息 *</label>
                  <textarea
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#1a1a1a',
                      border: '1px solid #222',
                      color: '#fff',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="请详细描述您的问题、建议或反馈..."
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    background: 'linear-gradient(to right, #10b981, #059669)',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  提交反馈 📤
                </button>

                <p style={{ color: '#888', fontSize: '14px', textAlign: 'center' }}>
                  提交后,我们通常在24-48小时内回复到您的邮箱
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* 常见问题提示 */}
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '32px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>💡 在联系我们之前...</h2>
          <p style={{ color: '#888', marginBottom: '16px' }}>
            您的问题可能已经有答案了!我们建议先查看以下资源,可能能更快地解决您的疑问:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <Link
              href="/faq"
              style={{
                background: '#1a1a1a',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>❓</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>FAQ 常见问题</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>查看最常见的问题和解答</p>
            </Link>

            <Link
              href="/tutorials/beginner-guide"
              style={{
                background: '#1a1a1a',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📖</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>使用教程</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>学习如何使用 Nano Banana</p>
            </Link>

            <Link
              href="/guide"
              style={{
                background: '#1a1a1a',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📚</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>完整指南</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>详细的功能说明和步骤</p>
            </Link>
          </div>
        </div>

        {/* 反馈类型说明 */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>📝 我们希望听到的内容</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))', borderRadius: '12px', padding: '24px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '24px', marginRight: '8px' }}>✅</span>
                欢迎的反馈类型
              </h3>
              <ul style={{ color: '#888', margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• 功能建议和改进意见</li>
                <li>• 使用中遇到的问题或Bug</li>
                <li>• 用户体验反馈</li>
                <li>• 新功能需求</li>
                <li>• 教程或文档改进建议</li>
                <li>• 分享您的成功案例</li>
                <li>• 商务合作咨询</li>
                <li>• 安全和隐私问题报告</li>
              </ul>
            </div>

            <div style={{ background: '#111', borderRadius: '12px', padding: '24px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '24px', marginRight: '8px' }}>💬</span>
                好的反馈示例
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '12px', border: '1px solid #222' }}>
                  <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
                    <strong style={{ color: '#fff' }}>"建议添加批量下载功能:</strong>我经常需要生成多张图片并保存,如果能一次性下载所有生成的图片会很方便。"
                  </p>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '12px', border: '1px solid #222' }}>
                  <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
                    <strong style={{ color: '#fff' }}>"遇到问题:</strong>使用Chrome浏览器,在上传大于5MB的图片时总是失败,错误提示是'上传超时'。我的网络正常。"
                  </p>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '12px', border: '1px solid #222' }}>
                  <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
                    <strong style={{ color: '#fff' }}>"成功案例分享:</strong>我用 Nano Banana 为我的小说创作了封面插图,效果很棒!感谢提供这么好的免费工具。"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 响应时间说明 */}
        <div style={{ background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))', borderRadius: '16px', padding: '32px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>⏱️ 响应时间说明</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '36px', marginBottom: '8px', color: '#10b981' }}>24h</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>一般咨询</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>
                通常在24小时内回复功能咨询、使用帮助等一般问题
              </p>
            </div>
            <div>
              <div style={{ fontSize: '36px', marginBottom: '8px', color: '#10b981' }}>8h</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>紧急问题</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>
                Bug报告、服务中断等紧急问题会在工作时间内8小时内响应
              </p>
            </div>
            <div>
              <div style={{ fontSize: '36px', marginBottom: '8px', color: '#10b981' }}>1h</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>安全问题</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>
                安全漏洞和隐私问题会被最高优先级处理,通常1小时内确认
              </p>
            </div>
          </div>
          <p style={{ color: '#888', fontSize: '14px', marginTop: '24px', textAlign: 'center' }}>
            注:以上是目标响应时间。高峰期或节假日可能略有延迟,请谅解。
          </p>
        </div>

        {/* 社区资源 */}
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '24px', textAlign: 'center' }}>🌟 加入 Nano Banana 社区</h2>
          <p style={{ color: '#888', textAlign: 'center', marginBottom: '24px', maxWidth: '768px', margin: '0 auto 24px' }}>
            除了直接联系我们,您还可以加入我们的社区,与其他创作者交流经验、分享作品、获取灵感。
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <a
              href="https://github.com/xianyu110/gemini-nanobanana-plus"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#1a1a1a',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '30px', marginBottom: '8px' }}>🐙</div>
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}>GitHub</h3>
              <p style={{ color: '#888', fontSize: '12px' }}>开源仓库</p>
            </a>

            <Link
              href="/blog"
              style={{
                background: '#1a1a1a',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '30px', marginBottom: '8px' }}>📝</div>
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}>博客</h3>
              <p style={{ color: '#888', fontSize: '12px' }}>教程与更新</p>
            </Link>

            <Link
              href="/gallery"
              style={{
                background: '#1a1a1a',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '30px', marginBottom: '8px' }}>🖼️</div>
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}>画廊</h3>
              <p style={{ color: '#888', fontSize: '12px' }}>社区作品</p>
            </Link>

            <Link
              href="/nano"
              style={{
                background: '#1a1a1a',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '30px', marginBottom: '8px' }}>✨</div>
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}>开始创作</h3>
              <p style={{ color: '#888', fontSize: '12px' }}>AI图像生成</p>
            </Link>
          </div>
        </div>
      </div>

      {/* SEO内容 */}
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 16px', borderTop: '1px solid #222' }}>
        <div style={{ maxWidth: 'none' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>联系 Nano Banana - 我们随时为您服务</h2>
          <p style={{ color: '#888', marginBottom: '16px' }}>
            Nano Banana 团队致力于为用户提供最好的 AI 图像生成体验。无论您有任何问题、建议、反馈或合作需求,我们都非常欢迎您联系我们。我们提供多种联系方式,包括电子邮件、GitHub Issue、商务合作渠道等,确保您能够通过最便捷的方式与我们沟通。
          </p>
          <p style={{ color: '#888', marginBottom: '16px' }}>
            我们的支持团队会认真阅读每一条反馈,并尽快给予回复。对于功能建议,我们会仔细评估并在合适的时候加入产品路线图。对于技术问题,我们会提供详细的解决方案和指导。对于商务合作,我们会安排专人与您对接洽谈。
          </p>
          <p style={{ color: '#888' }}>
            在联系我们之前,建议先查看我们的 FAQ 常见问题页面、使用教程和完整指南,您的问题可能已经有现成的答案,这样可以更快地解决疑惑。感谢您使用 Nano Banana,我们期待听到您的声音!
          </p>
        </div>
      </div>
    </div>
  );
}
