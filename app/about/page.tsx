'use client'
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🍌 关于 Nano Banana
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#888', maxWidth: '800px', margin: '0 auto' }}>
          让每个人都能成为AI艺术创作者
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>我们的使命</h2>
            <p style={{ color: '#888', lineHeight: '1.75' }}>
              Nano Banana 的使命是打破技术壁垒，让 AI 艺术创作变得简单、直观且人人可用。我们相信创造力不应该受限于技术门槛，每个人都应该有机会将想象变为现实。
            </p>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>我们的愿景</h2>
            <p style={{ color: '#888', lineHeight: '1.75' }}>
              成为全球最受欢迎的 AI 艺术创作平台，为数百万创作者提供创意实现的工具。我们致力于推动 AI 技术的普及化应用，让艺术创作不再是少数人的专利。
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>💎 核心价值观</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            { icon: '🚀', title: '创新驱动', desc: '不断探索和采用最新的 AI 技术' },
            { icon: '❤️', title: '用户至上', desc: '倾听用户需求，持续优化体验' },
            { icon: '🌈', title: '开放包容', desc: '欢迎所有创作者，无论技术背景' },
            { icon: '✨', title: '追求卓越', desc: '对每个细节精益求精' }
          ].map((item, i) => (
            <div key={i} style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#888' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>🔬 技术架构</h2>
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '4rem' }}>
          <p style={{ color: '#888', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.75' }}>
            Nano Banana 采用业界领先的 AI 技术栈，确保为用户提供最优质的图像生成体验。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>🤖 Google Gemini 2.5 Flash</h3>
              <p style={{ color: '#888', marginBottom: '1rem' }}>Google 最新的多模态 AI 模型，具备卓越的图像理解和生成能力。</p>
              <ul style={{ color: '#888', paddingLeft: '1.25rem' }}>
                <li>强大的多语言理解能力</li>
                <li>出色的细节处理</li>
                <li>快速的生成速度</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>🎨 字节豆包 SeedReam 4.0</h3>
              <p style={{ color: '#888', marginBottom: '1rem' }}>字节跳动先进图像生成模型，在艺术性和细节表现方面卓越。</p>
              <ul style={{ color: '#888', paddingLeft: '1.25rem' }}>
                <li>优秀的中文理解能力</li>
                <li>丰富的艺术表现</li>
                <li>精准的色彩控制</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderTop: '1px solid #222', borderRadius: '1rem', padding: '3rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>准备好开始您的 AI 艺术之旅了吗？</h2>
          <p style={{ fontSize: '1.125rem', color: '#888', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            加入 Nano Banana 社区，与全球创作者一起探索 AI 艺术的无限可能
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <Link href="/nano" style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', transition: 'transform 0.3s ease', display: 'inline-block' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              立即开始创作 →
            </Link>
            <Link href="/blog" style={{ padding: '1rem 2rem', background: 'transparent', color: '#10b981', border: '2px solid #10b981', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)' }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}>
              查看教程 📚
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
