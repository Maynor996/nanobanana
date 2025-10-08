'use client'

import Link from 'next/link';

const blogPosts = [
  {
    id: 'beginner-guide',
    title: 'AI图像生成完全入门指南',
    description: '从零开始学习如何使用Nano Banana创建令人惊叹的AI艺术作品。本指南涵盖基础概念、提示词技巧和实用案例。',
    date: '2025年1月',
    readTime: '10分钟',
    category: '入门教程',
    link: '/tutorials/beginner-guide'
  },
  {
    id: 'prompt-engineering',
    title: 'AI绘画提示词工程：从基础到精通',
    description: '掌握提示词的艺术，学习如何通过精确的描述获得理想的图像效果。包含100+实战案例和技巧分析。',
    date: '2025年1月',
    readTime: '15分钟',
    category: '进阶技巧',
    link: '/prompt-templates'
  },
  {
    id: 'style-guide',
    title: '四大风格深度解析：增强、艺术、动漫、写实',
    description: '深入了解Nano Banana的四种核心风格，学习每种风格的特点、适用场景和最佳实践方法。',
    date: '2025年1月',
    readTime: '12分钟',
    category: '风格指南',
    link: '/tutorials/beginner-guide'
  },
  {
    id: 'image-editing',
    title: 'AI图像编辑实战：让照片焕然一新',
    description: '学习如何使用AI技术编辑现有图片，包括风格转换、元素添加、背景替换等高级技巧。',
    date: '2025年1月',
    readTime: '18分钟',
    category: '图像编辑',
    link: '/use-cases'
  },
  {
    id: 'inspiration-gallery',
    title: '创意灵感库：50个精选AI艺术案例',
    description: '精选社区优秀作品，分析创作思路和技术要点，为您的创作提供源源不断的灵感。',
    date: '2025年1月',
    readTime: '20分钟',
    category: '灵感案例',
    link: '/gallery'
  },
  {
    id: 'gemini-vs-doubao',
    title: 'Gemini vs Doubao：AI模型对比与选择指南',
    description: '全面对比Google Gemini 2.5和字节豆包SeedReam 4.0两大AI模型，帮助您选择最适合的工具。',
    date: '2025年1月',
    readTime: '14分钟',
    category: '技术对比',
    link: '/models-comparison'
  }
];

const categories = ['全部', '入门教程', '进阶技巧', '风格指南', '图像编辑', '灵感案例', '技术对比'];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* 头部区域 */}
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🎨 AI艺术创作博客
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            探索AI图像生成的无限可能，从入门到精通的完整学习路径
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
            {categories.map((category) => (
              <button
                key={category}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', background: category === '全部' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.9rem' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseOut={(e) => { e.currentTarget.style.background = category === '全部' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 博客文章列表 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* 特色文章 */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>📌 精选教程</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {blogPosts.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                href={post.link}
                style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '600', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    {post.category}
                  </span>
                  <span style={{ color: '#666', fontSize: '0.875rem' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fff' }}>
                  {post.title}
                </h3>
                <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {post.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#666', fontSize: '0.875rem' }}>{post.date}</span>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>
                    阅读更多 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 所有文章 */}
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>📚 全部文章</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {blogPosts.slice(2).map((post) => (
              <Link
                key={post.id}
                href={post.link}
                style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #222', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: '600', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    {post.category}
                  </span>
                  <span style={{ color: '#666', fontSize: '0.75rem' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fff' }}>
                  {post.title}
                </h3>
                <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {post.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#666', fontSize: '0.75rem' }}>{post.date}</span>
                  <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: '600' }}>
                    阅读 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 底部导航 */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link
            href="/nano"
            style={{ display: 'inline-block', padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            开始创作 AI 艺术 →
          </Link>
        </div>
      </div>

      {/* SEO 内容区域 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>关于 Nano Banana AI 艺术博客</h2>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          欢迎来到 Nano Banana 的 AI 艺术创作博客！这里是学习人工智能图像生成技术的最佳平台。我们提供从入门到精通的完整教程体系，帮助您掌握 Google Gemini 2.5 Flash 和字节豆包 SeedReam 4.0 两大先进 AI 模型的使用方法。
        </p>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          无论您是初学者还是经验丰富的创作者，都能在这里找到有价值的内容。我们的教程涵盖提示词工程、风格选择、图像编辑、创意灵感等多个方面，每篇文章都经过精心设计，配有详细的步骤说明和实用案例。
        </p>
        <p style={{ color: '#888', lineHeight: '1.75' }}>
          加入我们的社区，探索 AI 艺术创作的无限可能。通过学习专业技巧和最佳实践，您将能够创造出令人惊叹的视觉作品。立即开始您的 AI 艺术之旅！
        </p>
      </div>
    </div>
  );
}
