'use client'
import Link from 'next/link';

export default function StyleGuidePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto' }}>
          <Link href="/blog" style={{ color: '#10b981', marginBottom: '1rem', display: 'inline-block', textDecoration: 'none' }}>← 返回博客</Link>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>🎨 四大风格完全指南</h1>
          <div style={{ display: 'flex', gap: '1rem', color: '#888' }}>
            <span>📅 2025年1月</span>
            <span>⏱️ 12分钟</span>
            <span>🏷️ 风格指南</span>
          </div>
        </div>
      </div>

      <article style={{ maxWidth: '896px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ background: '#111', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1.125rem', lineHeight: '1.75', margin: 0 }}>
            Nano Banana 提供四种核心风格，每种都有独特的视觉特点和最佳应用场景。本指南将深入解析这四大风格，帮助您为每个项目选择最合适的风格。
          </p>
        </div>

        {[
          {
            name: '🔍 增强细节 (Enhanced Details)',
            color: '#3b82f6',
            intro: '最通用的风格，AI会自动优化图像的清晰度、色彩和构图，适合大多数创作场景。',
            features: [
              '自动优化清晰度和细节表现',
              '平衡的色彩饱和度',
              '适中的艺术化程度',
              '保持原始描述的真实性'
            ],
            bestFor: ['通用场景插画', '产品概念设计', '社交媒体内容', '不确定选哪种风格时的默认选择'],
            tips: '当您不确定使用哪种风格时，选择增强细节总是安全的。它能在保持真实感的同时提升视觉质量。',
            example: '"一座现代科技公司总部大楼，玻璃幕墙，傍晚灯光，城市背景"'
          },
          {
            name: '🎨 艺术风格 (Artistic Style)',
            color: '#ec4899',
            intro: '强调艺术性和创意表现，生成的图像更具绘画感和想象力，适合需要独特视觉风格的创作。',
            features: [
              '明显的艺术化处理',
              '富有创意的色彩运用',
              '绘画般的质感',
              '强烈的风格化表现'
            ],
            bestFor: ['海报和封面设计', '艺术创作和插画', '品牌视觉设计', '需要抽象或风格化表现的场景'],
            tips: '艺术风格适合追求独特视觉效果的项目。可以在提示词中加入艺术家名字或艺术流派来进一步控制风格。',
            example: '"梵高风格的星空下，一个孤独的旅人走在麦田里，笔触明显，色彩浓烈"'
          },
          {
            name: '🌸 动漫风格 (Anime Style)',
            color: '#8b5cf6',
            intro: '专为动漫和二次元爱好者设计，生成日式动漫风格的图像，线条清晰，色彩鲜艳。',
            features: [
              '典型的日式动漫画风',
              '清晰的线条和轮廓',
              '鲜艳饱满的色彩',
              '符合二次元审美'
            ],
            bestFor: ['角色设计和立绘', '漫画和轻小说插图', '游戏美术概念', '二次元社区内容'],
            tips: '在提示词中加入"新海诚风格"、"京都动画"等参考词可以更精确地控制动漫风格的方向。',
            example: '"动漫风格少女，大眼睛，粉色长发，校服，樱花背景，新海诚光影"'
          },
          {
            name: '📷 写实照片 (Photorealistic)',
            color: '#10b981',
            intro: '追求照片级别的真实感，生成的图像几乎与真实照片无异，细节丰富，光影自然。',
            features: [
              '照片级真实感',
              '丰富的细节层次',
              '自然的光影效果',
              '真实的材质表现'
            ],
            bestFor: ['产品展示和广告', '建筑和室内设计可视化', '人像摄影效果', '需要高度真实感的任何场景'],
            tips: '写实照片风格最适合需要专业感和可信度的项目。加入摄影术语如"浅景深"、"85mm镜头"可以提升效果。',
            example: '"专业产品摄影，智能手机，白色背景，柔和顶光，45度角，玻璃反光，商业摄影质感"'
          }
        ].map((style, index) => (
          <div key={index} style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: style.color, marginBottom: '1rem' }}>{style.name}</h2>
            <p style={{ color: '#888', fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>{style.intro}</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>核心特点：</h3>
            <ul style={{ color: '#888', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              {style.features.map((feature, i) => <li key={i}>{feature}</li>)}
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>最适合：</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {style.bestFor.map((use, i) => (
                <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', padding: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.1)', color: '#888', fontSize: '0.875rem' }}>
                  • {use}
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#10b981', marginBottom: '0.75rem' }}>💡 使用技巧：</h4>
              <p style={{ color: '#888', lineHeight: '1.75', margin: 0 }}>{style.tips}</p>
            </div>

            <div style={{ background: '#0a0a0a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #222' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#10b981', marginBottom: '0.75rem' }}>示例提示词：</h4>
              <p style={{ color: '#888', fontStyle: 'italic', lineHeight: '1.75', margin: 0 }}>"{style.example}"</p>
            </div>
          </div>
        ))}

        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '1.5rem' }}>如何选择合适的风格？</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { q: '追求真实感和专业性？', a: '选择写实照片风格' },
              { q: '需要独特的艺术表现？', a: '选择艺术风格' },
              { q: '制作动漫相关内容？', a: '选择动漫风格' },
              { q: '不确定或通用场景？', a: '选择增强细节风格' }
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ color: '#10b981', fontWeight: '600', marginBottom: '0.5rem' }}>{item.q}</p>
                <p style={{ color: '#888', margin: 0 }}>→ {item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>继续探索</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link href="/tutorials/beginner-guide" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              📖 新手入门指南
            </Link>
            <Link href="/prompt-templates" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              📝 提示词模板库
            </Link>
            <Link href="/nano" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              ✨ 尝试不同风格
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
