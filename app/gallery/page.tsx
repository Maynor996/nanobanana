'use client'
import Link from 'next/link';

const galleryCategories = [
  { category: '人像摄影', icon: '👤', count: 12 },
  { category: '自然风景', icon: '🏔️', count: 18 },
  { category: '幻想艺术', icon: '✨', count: 15 },
  { category: '动漫角色', icon: '🎭', count: 20 },
  { category: '抽象创意', icon: '🌀', count: 10 },
  { category: '动物世界', icon: '🦁', count: 14 },
];

export default function GalleryPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🖼️ AI 艺术作品画廊
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#888', maxWidth: '800px', margin: '0 auto 1rem' }}>
          精选社区优秀作品，探索 AI 生成艺术的无限可能
        </p>
        <p style={{ fontSize: '1rem', color: '#666' }}>
          每个作品都包含详细的提示词，助您轻松复现和学习
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>🎨 关于这个画廊</h2>
          <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
            欢迎来到 Nano Banana AI 艺术画廊！这里展示了使用我们平台创作的精选作品，涵盖人像、风景、动漫、抽象、建筑等多个类别。每件作品都附有完整的提示词、使用的风格和AI模型。
          </p>
          <p style={{ color: '#888', lineHeight: '1.75' }}>
            <strong style={{ color: '#10b981' }}>使用提示：</strong>点击任意作品查看详细信息，复制提示词到 Nano Banana 工具页面，选择相同的风格和模型，即可生成类似的图像。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {galleryCategories.map((cat, i) => (
            <div key={i} style={{ background: '#111', borderRadius: '1rem', padding: '2rem', border: '1px solid #222', textAlign: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseOut={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>{cat.category}</h3>
              <p style={{ fontSize: '0.875rem', color: '#888' }}>{cat.count} 个作品</p>
              <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <p style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '0.5rem' }}>示例提示词：</p>
                <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
                  {i === 0 ? '"柔和的夕阳光线照射的人像，浅景深，专业摄影"' : 
                   i === 1 ? '"壮丽的北极光夜景，星空清晰，长曝光效果"' :
                   i === 2 ? '"漂浮在云层的奇幻城市，魔法粒子，史诗场景"' :
                   i === 3 ? '"动漫风格少女，大眼睛，樱花背景，新海诚风格"' :
                   i === 4 ? '"抽象能量漩涡，蓝紫金渐变，3D渲染质感"' :
                   '"雄狮特写，金色鬃毛，非洲草原日落，野生动物摄影"'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>💡 如何使用画廊中的提示词</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '1', title: '复制提示词', desc: '从画廊作品中复制完整的提示词描述' },
              { step: '2', title: '选择相同设置', desc: '选择与作品相同的风格和AI模型' },
              { step: '3', title: '生成并调整', desc: '点击生成，等待AI创作' },
              { step: '4', title: '个性化创作', desc: '在原提示词基础上修改，创造独特作品' }
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981', marginBottom: '0.5rem' }}>0{item.step}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#888' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>准备创作您自己的 AI 艺术作品了吗？</h2>
          <Link href="/nano" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
            开始创作 ✨
          </Link>
        </div>
      </div>
    </div>
  );
}
