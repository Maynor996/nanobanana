'use client'
import Link from 'next/link';

export default function PromptEngineeringPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto' }}>
          <Link href="/blog" style={{ color: '#10b981', marginBottom: '1rem', display: 'inline-block', textDecoration: 'none' }}>← 返回博客</Link>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>✍️ 提示词工程完全指南</h1>
          <div style={{ display: 'flex', gap: '1rem', color: '#888' }}>
            <span>📅 2025年1月</span>
            <span>⏱️ 15分钟</span>
            <span>🏷️ 进阶技巧</span>
          </div>
        </div>
      </div>

      <article style={{ maxWidth: '896px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ background: '#111', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1.125rem', lineHeight: '1.75', margin: 0 }}>
            提示词（Prompt）是与AI沟通的桥梁。掌握提示词工程技巧，能让您的创作效率提升10倍。本指南将系统性地教您如何编写高质量的提示词。
          </p>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>提示词的五大要素</h2>
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { element: '主体 (Subject)', desc: '图像的核心内容', example: '一只猫、城市街道、抽象图案' },
            { element: '细节 (Details)', desc: '主体的具体特征', example: '橘色的皮毛、繁忙的、几何形状的' },
            { element: '环境 (Environment)', desc: '场景和背景设置', example: '在花园里、夜晚的、白色背景' },
            { element: '风格 (Style)', desc: '艺术表现形式', example: '水彩画、赛博朋克、极简主义' },
            { element: '氛围 (Mood)', desc: '情感和感觉', example: '温馨的、神秘的、充满活力的' }
          ].map((item, i) => (
            <div key={i} style={{ background: '#111', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10b981', marginBottom: '0.5rem' }}>{item.element}</h3>
              <p style={{ color: '#888', marginBottom: '0.5rem' }}>{item.desc}</p>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>例如：{item.example}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>提示词公式</h2>
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem' }}>
            基础公式：主体 + 细节 + 环境 + 风格 + 氛围
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#10b981', marginBottom: '0.5rem' }}>✅ 优秀示例：</p>
            <p style={{ color: '#888', fontStyle: 'italic', margin: 0 }}>
              "一只蓬松的橘色猫咪，坐在窗台上，柔和的晨光透过窗户洒在它身上，背景是模糊的室内植物，温馨的氛围，柔焦摄影风格"
            </p>
          </div>
          <div style={{ background: 'rgba(220, 38, 38, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(220, 38, 38, 0.1)' }}>
            <p style={{ fontSize: '0.875rem', color: '#ef4444', marginBottom: '0.5rem' }}>❌ 避免这样：</p>
            <p style={{ color: '#888', fontStyle: 'italic', margin: 0 }}>"一只猫"</p>
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>太简单，缺乏细节</p>
          </div>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>高级技巧</h2>
        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { title: '使用参考词', tip: '提及知名艺术家、作品或风格，如"宫崎骏风格"、"皮克斯动画"' },
            { title: '控制构图', tip: '指定视角和取景，如"特写镜头"、"广角视角"、"俯视角度"' },
            { title: '描述光线', tip: '光线对氛围影响巨大，如"柔和侧光"、"戏剧性光影"、"黄金时刻"' },
            { title: '加入质量词', tip: '提升画质的关键词，如"高清"、"细节丰富"、"专业摄影"' }
          ].map((item, i) => (
            <div key={i} style={{ background: '#111', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10b981', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ color: '#888', lineHeight: '1.75', margin: 0 }}>{item.tip}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>实战练习</h2>
        <p style={{ color: '#888', lineHeight: '1.75', marginBottom: '1.5rem' }}>
          访问我们的<Link href="/prompt-templates" style={{ color: '#10b981', textDecoration: 'underline' }}>提示词模板库</Link>，查看100+精选示例，学习并改编它们以适应您的需求。记住：最好的学习方式就是不断实践！
        </p>

        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>继续学习</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link href="/prompt-templates" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              📝 浏览提示词模板
            </Link>
            <Link href="/use-cases" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              💼 查看应用案例
            </Link>
            <Link href="/nano" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              ✨ 开始练习创作
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
