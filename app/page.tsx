'use client'

import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* Hero区域 */}
      <div style={{ padding: '4rem 1rem', textAlign: 'center', background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🍌 Nano Banana
          </h1>
          <p style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', color: '#888', marginBottom: '0.5rem' }}>
            免费 AI 图像生成工具
          </p>
          <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            无需注册，立即开始创作。使用 Google Gemini 和字节豆包先进 AI 模型
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Link
              href="/nano"
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', transition: 'transform 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🚀 立即开始创作
            </Link>
            <Link
              href="/tutorials/beginner-guide"
              style={{ padding: '1rem 2rem', background: 'transparent', color: '#10b981', border: '2px solid #10b981', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              📖 查看教程
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', color: '#888', fontSize: '0.95rem' }}>
            <span style={{ color: '#10b981' }}>✓ 完全免费</span>
            <span style={{ color: '#10b981' }}>✓ 无需注册</span>
            <span style={{ color: '#10b981' }}>✓ 多种风格</span>
            <span style={{ color: '#10b981' }}>✓ 快速生成</span>
          </div>
        </div>
      </div>

      {/* 核心功能 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#fff' }}>✨ 核心功能</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { icon: '🎨', title: '文字生成图像', desc: '输入文字描述，AI 自动生成精美图像。支持中英文，理解复杂场景。', link: '/nano' },
            { icon: '🖼️', title: '图像智能编辑', desc: '上传图片，通过对话描述修改。支持风格转换、元素添加等高级编辑。', link: '/nano' },
            { icon: '🎭', title: '多种艺术风格', desc: '增强细节、艺术风格、动漫风格、写实照片四大核心风格。', link: '/tutorials/beginner-guide' }
          ].map((item, i) => (
            <div
              key={i}
              style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fff' }}>{item.title}</h3>
              <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.6' }}>{item.desc}</p>
              <Link href={item.link} style={{ color: '#10b981', textDecoration: 'none', fontWeight: '600' }}>
                了解更多 →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 快速导航 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#fff' }}>🧭 探索更多</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: '📝', title: '博客教程', desc: '从入门到精通', link: '/blog' },
            { icon: '🖼️', title: '作品画廊', desc: '精选作品与灵感', link: '/gallery' },
            { icon: '❓', title: '常见问题', desc: '快速找到答案', link: '/faq' },
            { icon: '🍌', title: '关于我们', desc: '了解使命与技术', link: '/about' },
            { icon: '🎓', title: '入门指南', desc: '零基础教程', link: '/tutorials/beginner-guide' },
            { icon: '📧', title: '联系我们', desc: '反馈与建议', link: '/contact' }
          ].map((item, i) => (
            <Link
              key={i}
              href={item.link}
              style={{ background: '#111', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #222', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#888' }}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderTop: '1px solid #222', padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>准备好开始创作了吗？</h2>
          <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '2rem' }}>立即体验免费的 AI 图像生成，无需注册，无需付费</p>
          <Link
            href="/nano"
            style={{ display: 'inline-block', padding: '1.25rem 3rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.25rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            🚀 开始免费创作
          </Link>
        </div>
      </div>

      {/* SEO内容 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>Nano Banana - 最好用的免费 AI 图像生成工具</h2>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          Nano Banana 是一个革命性的免费 AI 图像生成平台，让每个人都能轻松创作高质量的 AI 艺术作品。我们整合了 Google Gemini 2.5 Flash 和字节豆包 SeedReam 4.0 两大先进 AI 模型，为用户提供强大而易用的文字生图和图像编辑功能。
        </p>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          无需注册，无需付费，无需任何设计经验。只需输入文字描述，选择喜欢的风格，AI 就能在几秒钟内生成精美的图像。我们支持增强细节、艺术风格、动漫风格、写实照片四大核心风格，满足从个人创作到专业设计的各种需求。
        </p>
        <p style={{ color: '#888', lineHeight: '1.75' }}>
          我们还提供丰富的学习资源，包括详细的入门教程、提示词工程技巧、风格指南、作品画廊和常见问题解答。无论您是 AI 艺术创作新手还是经验丰富的设计师，都能在 Nano Banana 找到有价值的内容和灵感。立即开始您的 AI 艺术之旅！
        </p>
      </div>
    </div>
  );
}
