'use client'
import Link from 'next/link';
import { useState } from 'react';

const comparisonData = [
  {
    aspect: '基本信息',
    gemini: {
      title: 'Google Gemini 2.5 Flash',
      features: [
        '最新多模态AI模型',
        '2024年发布',
        '支持文本、图像、视频理解',
        '快速响应速度'
      ]
    },
    doubao: {
      title: '字节豆包 SeedReam 4.0',
      features: [
        '专业图像生成模型',
        '2024年升级版本',
        '专注图像创作',
        '中文场景优化'
      ]
    }
  },
  {
    aspect: '语言理解能力',
    gemini: {
      features: [
        '卓越的多语言支持',
        '英文理解最为出色',
        '复杂语义理解准确',
        '支持长文本提示词'
      ],
      rating: 9.5
    },
    doubao: {
      features: [
        '优秀的中文理解',
        '中文语境把握精准',
        '简洁提示词即可',
        '中文成语俗语理解好'
      ],
      rating: 9.0
    }
  },
  {
    aspect: '图像质量',
    gemini: {
      features: [
        '高清晰度输出',
        '细节丰富准确',
        '色彩还原自然',
        '构图平衡合理'
      ],
      rating: 9.0
    },
    doubao: {
      features: [
        '艺术感强烈',
        '色彩��现鲜艳',
        '细节层次丰富',
        '质感表现出色'
      ],
      rating: 9.2
    }
  },
  {
    aspect: '风格多样性',
    gemini: {
      features: [
        '写实风格优秀',
        '现代简约风格好',
        '科技感表现强',
        '适合商业用途'
      ],
      rating: 9.0
    },
    doubao: {
      features: [
        '艺术风格多变',
        '动漫二次元强',
        '传统艺术风格好',
        '适合创意表达'
      ],
      rating: 9.5
    }
  },
  {
    aspect: '生成速度',
    gemini: {
      features: [
        '平均15-25秒',
        'Flash版本快速',
        '批量生成效率高',
        '服务器稳定性好'
      ],
      rating: 9.0
    },
    doubao: {
      features: [
        '平均20-30秒',
        '质量优先设计',
        '高峰期稍慢',
        '整体稳定可靠'
      ],
      rating: 8.5
    }
  },
  {
    aspect: '人物生成',
    gemini: {
      features: [
        '面部特征准确',
        '表情自然真实',
        '多人场景协调',
        '适合写实人像'
      ],
      rating: 8.5
    },
    doubao: {
      features: [
        '人物美化效果好',
        '动漫角色出色',
        '艺术化处理强',
        '适合角色设计'
      ],
      rating: 9.0
    }
  },
  {
    aspect: '场景与环境',
    gemini: {
      features: [
        '建筑结构准确',
        '透视关系正确',
        '光影效果自然',
        '大场景控制好'
      ],
      rating: 9.2
    },
    doubao: {
      features: [
        '氛围营造优秀',
        '色彩搭配和谐',
        '细节装饰丰富',
        '艺术感染力强'
      ],
      rating: 9.0
    }
  },
  {
    aspect: '文字处理',
    gemini: {
      features: [
        '较好的文字理解',
        '可生成简单文字',
        '标识设计可用',
        '准确度中等'
      ],
      rating: 7.0
    },
    doubao: {
      features: [
        '文字生成能力弱',
        '主要依赖提示词',
        '不推荐文字内容',
        '图形为主'
      ],
      rating: 6.0
    }
  },
  {
    aspect: '创意理解',
    gemini: {
      features: [
        '抽象概念理解好',
        '隐喻表达准确',
        '创新组合能力强',
        '适合概念设计'
      ],
      rating: 9.5
    },
    doubao: {
      features: [
        '艺术化诠释强',
        '视觉冲击力大',
        '风格化表达好',
        '适合艺术创作'
      ],
      rating: 9.0
    }
  },
  {
    aspect: '最佳应用场景',
    gemini: {
      features: [
        '商业设计与营销',
        '产品展示图',
        '建筑与室内设计',
        '写实摄影风格',
        '科技与现代风格',
        'UI/UX设计参考'
      ]
    },
    doubao: {
      features: [
        '艺术创作',
        '插画与漫画',
        '角色设计',
        '游戏美术',
        '创意海报',
        '装饰画作'
      ]
    }
  }
];

const usageRecommendations = [
  {
    scenario: '商业营销',
    recommend: 'Gemini',
    reason: '写实风格和现代感更适合品牌传播，细节准确度高，适合产品展示和广告素材。',
    icon: '💼'
  },
  {
    scenario: '艺术创作',
    recommend: 'Doubao',
    reason: '艺术表现力强，色彩鲜艳，风格化效果好，适合个人创作和艺术探索。',
    icon: '🎨'
  },
  {
    scenario: '动漫插画',
    recommend: 'Doubao',
    reason: '在二次元风格、动漫角色设计方面表现卓越，色彩饱和度高，符合动漫审美。',
    icon: '🎭'
  },
  {
    scenario: '建筑设计',
    recommend: 'Gemini',
    reason: '结构准确性高，透视关系正确，适合建筑效果图和室内设计方案展示。',
    icon: '🏠'
  },
  {
    scenario: '人像摄影',
    recommend: 'Gemini',
    reason: '面部特征准确，光影自然，适合写实人像和专业摄影风格。',
    icon: '👤'
  },
  {
    scenario: '游戏美术',
    recommend: 'Doubao',
    reason: '风格化效果强，适合角色设计、场景概念图等游戏美术需求。',
    icon: '🎮'
  },
  {
    scenario: '社交媒体',
    recommend: '两者皆可',
    reason: 'Gemini适合商业账号，Doubao适合个人创作账号，根据品牌调性选择。',
    icon: '📱'
  },
  {
    scenario: '教育内容',
    recommend: 'Gemini',
    reason: '准确性高，概念表达清晰，适合教学示意图和科普插图。',
    icon: '📚'
  }
];

export default function ModelsComparisonPage() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'recommendations'>('comparison');

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* 头部 */}
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🤖 AI 模型深度对比
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#888', maxWidth: '800px', margin: '0 auto 1rem' }}>
            Gemini vs Doubao：全方位对比分析，帮您选择最适合的 AI 模型
          </p>
          <p style={{ fontSize: '1rem', color: '#666' }}>
            深入了解两大模型的优势与特点，让每次创作都选对工具
          </p>
        </div>
      </div>

      {/* Tab切换 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 0' }}>
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #222' }}>
          <button
            onClick={() => setActiveTab('comparison')}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'comparison' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
              color: activeTab === 'comparison' ? '#10b981' : '#888',
              border: 'none',
              borderBottom: activeTab === 'comparison' ? '2px solid #10b981' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '1.125rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              marginBottom: '-2px'
            }}
          >
            📊 详细对比
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'recommendations' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
              color: activeTab === 'recommendations' ? '#10b981' : '#888',
              border: 'none',
              borderBottom: activeTab === 'recommendations' ? '2px solid #10b981' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '1.125rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              marginBottom: '-2px'
            }}
          >
            💡 选择建议
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {activeTab === 'comparison' ? (
          <>
            {/* 快速总结 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e40af)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔵</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>Google Gemini 2.5</h3>
                <p style={{ color: '#bfdbfe', marginBottom: '1rem', lineHeight: '1.6' }}>
                  全能型 AI 模型，擅长写实风格、商业设计、建筑可视化。英文理解出色，细节准确度高，适合专业和商业用途。
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['写实', '商业', '现代', '准确'].map(tag => (
                    <span key={tag} style={{ padding: '0.25rem 0.75rem', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '1rem', fontSize: '0.75rem', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #581c87, #7c3aed)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🟣</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>字节豆包 SeedReam</h3>
                <p style={{ color: '#e9d5ff', marginBottom: '1rem', lineHeight: '1.6' }}>
                  艺术型 AI 模型，擅长动漫插画、艺术创作、风格化表达。中文理解优秀，色彩表现力强，适合创意和艺术项目。
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['艺术', '动漫', '创意', '色彩'].map(tag => (
                    <span key={tag} style={{ padding: '0.25rem 0.75rem', background: 'rgba(168, 85, 247, 0.2)', borderRadius: '1rem', fontSize: '0.75rem', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 详细对比表格 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {comparisonData.map((item, index) => (
                <div key={index} style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff', borderBottom: '2px solid rgba(16, 185, 129, 0.2)', paddingBottom: '0.75rem' }}>
                    {item.aspect}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#60a5fa', flex: 1 }}>
                          {item.gemini.title || 'Google Gemini'}
                        </h4>
                        {item.gemini.rating && (
                          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: '700', color: '#93c5fd' }}>
                            {item.gemini.rating}/10
                          </div>
                        )}
                      </div>
                      <ul style={{ color: '#888', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                        {item.gemini.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: 'rgba(168, 85, 247, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(168, 85, 247, 0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#a78bfa', flex: 1 }}>
                          {item.doubao.title || '字节豆包'}
                        </h4>
                        {item.doubao.rating && (
                          <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: '700', color: '#c4b5fd' }}>
                            {item.doubao.rating}/10
                          </div>
                        )}
                      </div>
                      <ul style={{ color: '#888', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                        {item.doubao.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* 场景推荐 */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>🎯 应用场景推荐</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {usageRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{rec.icon}</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>{rec.scenario}</h3>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ padding: '0.25rem 0.75rem', background: rec.recommend === 'Gemini' ? 'rgba(59, 130, 246, 0.2)' : rec.recommend === 'Doubao' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(16, 185, 129, 0.2)', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600', color: rec.recommend === 'Gemini' ? '#93c5fd' : rec.recommend === 'Doubao' ? '#c4b5fd' : '#10b981' }}>
                        推荐：{rec.recommend}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: '1.6' }}>{rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 选择流程图 */}
            <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#fff', textAlign: 'center' }}>🧭 快速选择指南</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                {[
                  { q: '需要准确的结构和细节？', a: '选择 Gemini - 透视准确、细节精准' },
                  { q: '追求艺术感和创意表达？', a: '选择 Doubao - 艺术化强、风格多变' },
                  { q: '制作商业设计和营销素材？', a: '选择 Gemini - 专业感强、适合品牌' },
                  { q: '创作动漫、插画、游戏美术？', a: '选择 Doubao - 二次元风格出色' },
                  { q: '建筑、室内、产品设计？', a: '选择 Gemini - 写实准确、专业可靠' },
                  { q: '不确定或想要多样化？', a: '两个都试试 - 对比选择最佳效果' }
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>
                      ❓ {item.q}
                    </div>
                    <div style={{ fontSize: '1rem', color: '#10b981', paddingLeft: '1.5rem' }}>
                      ✓ {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 实用建议 */}
            <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>💡 实用建议</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: '先试后选', desc: '同一个提示词用两个模型都生成一次，直观对比效果' },
                  { title: '场景适配', desc: '根据项目类型选择：商业用Gemini，艺术用Doubao' },
                  { title: '风格搭配', desc: '写实照片风格用Gemini，动漫艺术风格用Doubao' },
                  { title: '语言优化', desc: '英文提示词优先Gemini，中文描述优先Doubao' },
                  { title: '混合使用', desc: '可用Gemini做草图，Doubao做艺术化，或反之' },
                  { title: '持续实验', desc: '多尝试不同组合，积累经验找到最佳搭配' }
                ].map((tip, i) => (
                  <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#10b981', marginBottom: '0.5rem' }}>{tip.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: '1.6' }}>{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '3rem 2rem', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>准备好选择适合的模型开始创作了吗？</h2>
          <p style={{ fontSize: '1.125rem', color: '#888', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            在 Nano Banana，您可以自由切换两个模型，找到最适合您项目的AI助手
          </p>
          <Link
            href="/nano"
            style={{ display: 'inline-block', padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            🚀 立即体验两大模型
          </Link>
        </div>
      </div>

      {/* SEO内容 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>Google Gemini vs 字节豆包：选择最适合您的 AI 图像生成模型</h2>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          Nano Banana 整合了业界领先的两大 AI 图像生成模型：Google Gemini 2.5 Flash 和字节豆包 SeedReam 4.0。本页面提供全方位的模型对比分析，从语言理解、图像质量、风格多样性、生成速度等多个维度深入比较，帮助您根据具体需求选择最合适的模型。
        </p>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          Google Gemini 擅长写实风格、商业设计、建筑可视化，提供高准确度和专业质感；字节豆包在艺术创作、动漫插画、风格化表达方面表现卓越，色彩鲜艳富有感染力。无论您是商业用户还是艺术创作者，都能在这里找到最适合的AI工具。
        </p>
        <p style={{ color: '#888', lineHeight: '1.75' }}>
          了解两个模型的优势和特点，让每次创作都选对工具。我们提供详细的应用场景推荐和选择指南，助您快速做出明智决策。立即开始体验，发现最适合您的 AI 图像生成模型！
        </p>
      </div>
    </div>
  );
}
