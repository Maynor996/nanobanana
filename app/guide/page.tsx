'use client'
import Link from 'next/link';

export default function GuidePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* 头部 */}
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            📚 完整使用指南
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#888', maxWidth: '800px', margin: '0 auto' }}>
            从零开始掌握 Nano Banana AI 图像生成的所有功能
          </p>
        </div>
      </div>

      {/* 目录导航 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>📑 学习路径</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { num: '01', title: '新手入门', desc: '快速开始使用', link: '/tutorials/beginner-guide' },
              { num: '02', title: '提示词技巧', desc: '掌握提示词编写', link: '/prompt-templates' },
              { num: '03', title: '模型选择', desc: '了解AI模型差异', link: '/models-comparison' },
              { num: '04', title: '应用场景', desc: '探索实际用途', link: '/use-cases' }
            ].map((item, i) => (
              <Link
                key={i}
                href={item.link}
                style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981', marginBottom: '0.5rem' }}>{item.num}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#888' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 功能详解 */}
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#fff' }}>🎯 功能详解</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          {/* 文字生成图像 */}
          <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem', marginRight: '0.75rem' }}>✏️</span>
              文字生成图像 (Text to Image)
            </h3>
            <p style={{ color: '#888', marginBottom: '1.5rem', lineHeight: '1.75', fontSize: '1.125rem' }}>
              通过文字描述直接生成图像，这是 Nano Banana 的核心功能。
            </p>
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem' }}>使用步骤：</h4>
              <ol style={{ color: '#888', paddingLeft: '1.5rem', lineHeight: '1.8', margin: 0 }}>
                <li>访问 /nano 页面</li>
                <li>确保选择"文生图模式"</li>
                <li>在输入框中描述您想要的图像</li>
                <li>选择风格标签（增强细节/艺术风格/动漫风格/写实照片）</li>
                <li>选择 AI 模型（Gemini 或 Doubao）</li>
                <li>选择生成数量（1-4张）</li>
                <li>点击"开始生成"</li>
              </ol>
            </div>
            <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#60a5fa', marginBottom: '1rem' }}>💡 实用技巧：</h4>
              <ul style={{ color: '#888', paddingLeft: '1.5rem', lineHeight: '1.8', margin: 0 }}>
                <li>描述越详细，生成效果越接近预期</li>
                <li>包含主体、环境、光线、风格等要素</li>
                <li>可以参考提示词模板库中的示例</li>
                <li>初学者建议先生成1-2张，熟练后可生成4张对比</li>
              </ul>
            </div>
          </div>

          {/* 图像编辑 */}
          <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem', marginRight: '0.75rem' }}>🖼️</span>
              通过对话编辑图像 (Image Editing)
            </h3>
            <p style={{ color: '#888', marginBottom: '1.5rem', lineHeight: '1.75', fontSize: '1.125rem' }}>
              上传现有图片，通过文字描述对其进行 AI 编辑和改造。
            </p>
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem' }}>使用步骤：</h4>
              <ol style={{ color: '#888', paddingLeft: '1.5rem', lineHeight: '1.8', margin: 0 }}>
                <li>访问 /nano 页面</li>
                <li>选择"通过对话编辑图像"模式</li>
                <li>点击上传按钮，选择图片（支持 PNG、JPG、WebP，最大10MB）</li>
                <li>在输入框中描述您想要的改变</li>
                <li>选择风格和模型</li>
                <li>点击"开始生成"</li>
              </ol>
            </div>
            <div style={{ background: 'rgba(168, 85, 247, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(168, 85, 247, 0.1)' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#a78bfa', marginBottom: '1rem' }}>🎨 可以做什么：</h4>
              <ul style={{ color: '#888', paddingLeft: '1.5rem', lineHeight: '1.8', margin: 0 }}>
                <li>风格转换（如：将照片转为油画风格）</li>
                <li>背景替换（如：改为海滩背景）</li>
                <li>元素添加（如：添加一只蝴蝶）</li>
                <li>色调调整（如：改为暖色调）</li>
                <li>细节增强（如：提升清晰度）</li>
              </ul>
            </div>
          </div>

          {/* 风格选择 */}
          <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem', marginRight: '0.75rem' }}>🎨</span>
              四大风格详解
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '🔍', name: '增强细节', color: '#3b82f6', desc: '通用风格，自动优化清晰度和色彩', use: '适合大多数场景，不确定时的首选' },
                { icon: '🎨', name: '艺术风格', color: '#ec4899', desc: '强调艺术性和创意表现', use: '海报、插画、品牌视觉设计' },
                { icon: '🌸', name: '动漫风格', color: '#8b5cf6', desc: '日式动漫风格，线条清晰色彩鲜艳', use: '角色设计、漫画插图、游戏美术' },
                { icon: '📷', name: '写实照片', color: '#10b981', desc: '照片级真实感，细节丰富光影自然', use: '产品展示、建筑设计、人像摄影' }
              ].map((style, i) => (
                <div key={i} style={{ background: `rgba(${style.color === '#3b82f6' ? '59, 130, 246' : style.color === '#ec4899' ? '236, 72, 153' : style.color === '#8b5cf6' ? '139, 92, 246' : '16, 185, 129'}, 0.05)`, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid rgba(${style.color === '#3b82f6' ? '59, 130, 246' : style.color === '#ec4899' ? '236, 72, 153' : style.color === '#8b5cf6' ? '139, 92, 246' : '16, 185, 129'}, 0.2)` }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{style.icon}</div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: style.color, marginBottom: '0.75rem' }}>{style.name}</h4>
                  <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: '1.6' }}>{style.desc}</p>
                  <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: '1.5' }}><strong>适用：</strong>{style.use}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#fff' }}>❓ 常见问题</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
          {[
            { q: '生成的图片在哪里保存？', a: '图片会显示在页面上，您可以右键点击选择"图片另存为"保存到本地，或长按（移动端）选择保存。' },
            { q: '为什么生成失败或很慢？', a: '可能是服务器负载高峰期。建议：(1) 换个时段重试；(2) 减少生成数量；(3) 简化提示词；(4) 检查网络连接。' },
            { q: '中文和英文提示词哪个好？', a: '两者效果相近。Gemini 和 Doubao 都支持中英文。专业术语用英文可能更精准，复杂描述用中文可能更流畅。' },
            { q: '可以商用生成的图片吗？', a: '个人和创意项目可以使用。商业用途前请查看使用条款，了解版权限制，必要时咨询法律专家。' },
            { q: '有使用次数限制吗？', a: '正常使用无限制。为保证所有用户体验，请避免短时间内大量生成（如几分钟内几十张）。' }
          ].map((item, i) => (
            <div key={i} style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10b981', marginBottom: '0.75rem' }}>Q: {item.q}</h4>
              <p style={{ color: '#888', lineHeight: '1.75', margin: 0 }}>A: {item.a}</p>
            </div>
          ))}
        </div>

        {/* 快速链接 */}
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '3rem 2rem', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>🚀 继续探索</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🎓', title: '新手教程', link: '/tutorials/beginner-guide' },
              { icon: '📝', title: '提示词模板', link: '/prompt-templates' },
              { icon: '🤖', title: '模型对比', link: '/models-comparison' },
              { icon: '💼', title: '使用案例', link: '/use-cases' },
              { icon: '🖼️', title: '作品画廊', link: '/gallery' },
              { icon: '❓', title: 'FAQ', link: '/faq' }
            ].map((item, i) => (
              <Link
                key={i}
                href={item.link}
                style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#fff' }}>{item.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SEO内容 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>Nano Banana 完整使用指南 - 掌握AI图像生成的所有功能</h2>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          本指南提供了 Nano Banana AI 图像生成平台的完整使用说明，包括文字生成图像、图像编辑、四大风格选择、AI模型对比等核心功能的详细介绍。无论您是初次使用还是想要深入了解高级功能，这里都有您需要的所有信息。
        </p>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          我们提供了清晰的步骤说明、实用技巧和常见问题解答，帮助您快速上手并充分发挥 Nano Banana 的强大功能。从基础的文字生图到高级的图像编辑，从风格选择到模型对比，每个功能都有详细的使用指导。
        </p>
        <p style={{ color: '#888', lineHeight: '1.75' }}>
          配合我们的新手教程、提示词模板库、应用案例等丰富资源，您将能够快速成长为 AI 图像生成的熟练用户。立即开始学习，释放您的创造力！
        </p>
      </div>
    </div>
  );
}
