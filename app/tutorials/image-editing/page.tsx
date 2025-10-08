'use client'
import Link from 'next/link';

export default function ImageEditingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto' }}>
          <Link href="/blog" style={{ color: '#10b981', marginBottom: '1rem', display: 'inline-block', textDecoration: 'none' }}>← 返回博客</Link>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>🖼️ AI图像编辑实战</h1>
          <div style={{ display: 'flex', gap: '1rem', color: '#888' }}>
            <span>📅 2025年1月</span>
            <span>⏱️ 18分钟</span>
            <span>🏷️ 图像编辑</span>
          </div>
        </div>
      </div>

      <article style={{ maxWidth: '896px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ background: '#111', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1.125rem', lineHeight: '1.75', margin: 0 }}>
            AI图像编辑让您能够通过简单的文字描述对现有图片进行智能改造。本教程将教您如何使用Nano Banana的图像编辑功能，实现风格转换、元素添加、背景替换等高级效果。
          </p>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>基础操作</h2>
        <p style={{ color: '#888', lineHeight: '1.75', marginBottom: '1.5rem' }}>
          访问 /nano 页面，选择"通过对话编辑图像"模式，上传您的图片（支持PNG、JPG、WebP，最大10MB），然后描述您想要的改变即可。
        </p>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>常见编辑类型</h2>
        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { title: '风格转换', desc: '将照片转换为不同艺术风格', example: '"将这张照片转换为油画风格，保留主体细节"' },
            { title: '背景替换', desc: '更换图片背景场景', example: '"将背景改为海滩日落场景，主体人物保持不变"' },
            { title: '元素添加', desc: '在图片中添加新元素', example: '"在天空中添加几只飞鸟，自然融入场景"' },
            { title: '色调调整', desc: '改变图片整体色彩氛围', example: '"调整为暖色调，增强温馨感觉"' }
          ].map((item, i) => (
            <div key={i} style={{ background: '#111', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>{item.desc}</p>
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ fontSize: '0.875rem', color: '#10b981', marginBottom: '0.5rem' }}>示例提示词：</p>
                <p style={{ fontSize: '0.875rem', color: '#888', fontStyle: 'italic', margin: 0 }}>{item.example}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>进阶技巧</h2>
        <ul style={{ color: '#888', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          <li>描述要具体明确，说清楚保留什么、改变什么</li>
          <li>复杂编辑可以分步进行，一次改一个方面</li>
          <li>选择合适的风格：艺术风格适合风格转换，写实照片适合细节调整</li>
          <li>上传高质量原图能获得更好的编辑效果</li>
        </ul>

        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>继续学习</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link href="/tutorials/beginner-guide" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              📖 新手入门指南
            </Link>
            <Link href="/prompt-templates" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              📝 提示词模板库
            </Link>
            <Link href="/nano" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease', display: 'block' }}>
              ✨ 开始编辑图片
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
