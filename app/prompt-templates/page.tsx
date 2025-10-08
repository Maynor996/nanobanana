'use client'
import Link from 'next/link';
import { useState } from 'react';

const promptTemplates = [
  {
    category: '人像摄影',
    icon: '👤',
    templates: [
      {
        title: '专业商业人像',
        prompt: '专业商务人像摄影，中年男性，深色西装，自信微笑，办公室背景虚化，柔和侧光，浅景深，85mm镜头，商业摄影质感',
        style: '写实照片',
        model: 'Gemini',
        tags: ['商业', '正式', '专业']
      },
      {
        title: '时尚杂志封面',
        prompt: '时尚杂志封面人像，年轻女性模特，时尚服装，自信表情，简约背景，专业布光，高端时尚摄影，Vogue风格',
        style: '写实照片',
        model: 'Gemini',
        tags: ['时尚', '高端', '杂志']
      },
      {
        title: '温馨家庭照',
        prompt: '温馨家庭照片，幸福的一家三口，公园草地上，阳光明媚，自然微笑，柔和光线，生活摄影风格',
        style: '写实照片',
        model: 'Gemini',
        tags: ['家庭', '温馨', '自然']
      },
      {
        title: '艺术肖像',
        prompt: '艺术肖像摄影，戏剧性光影，低调布光，黑白摄影，强烈对比，情绪表达，人物特写，大师级肖像',
        style: '艺术风格',
        model: 'Gemini',
        tags: ['艺术', '黑白', '情绪']
      }
    ]
  },
  {
    category: '自然风景',
    icon: '🏔️',
    templates: [
      {
        title: '壮丽山川',
        prompt: '壮丽的雪山风景，日出时分，金色阳光照亮雪峰，云海翻腾，前景有湖泊倒影，广角镜头，风光摄影，超高清',
        style: '写实照片',
        model: 'Gemini',
        tags: ['山景', '日出', '风光']
      },
      {
        title: '森林秘境',
        prompt: '神秘的森林深处，晨雾弥漫，阳光透过树叶洒下光束，苔藓覆盖的古树，绿色调，宁静氛围，自然摄影',
        style: '写实照片',
        model: 'Gemini',
        tags: ['森林', '晨雾', '神秘']
      },
      {
        title: '海滨日落',
        prompt: '海滨日落美景，橙红色天空，太阳半沉海平面，海浪温柔拍岸，剪影效果，长曝光，浪漫氛围，风光摄影',
        style: '写实照片',
        model: 'Gemini',
        tags: ['海景', '日落', '浪漫']
      },
      {
        title: '极光奇观',
        prompt: '北极光夜景，绿色和紫色极光舞动天空，雪地前景，星空清晰可见，冷色调，长曝光摄影，自然奇观',
        style: '写实照片',
        model: 'Gemini',
        tags: ['极光', '夜景', '星空']
      }
    ]
  },
  {
    category: '动漫角色',
    icon: '🎭',
    templates: [
      {
        title: '少女角色',
        prompt: '动漫风格少女，大眼睛，粉色长发，可爱表情，校服装扮，樱花背景，新海诚光影风格，细腻色彩，全身立绘',
        style: '动漫风格',
        model: 'Doubao',
        tags: ['少女', '校园', '可爱']
      },
      {
        title: '奇幻战士',
        prompt: '奇幻动漫角色，英勇的女战士，银色盔甲，魔法武器，飘逸披风，战斗姿态，史诗背景，游戏原画风格',
        style: '动漫风格',
        model: 'Doubao',
        tags: ['战士', '奇幻', '游戏']
      },
      {
        title: '赛博朋克角色',
        prompt: '赛博朋克动漫角色，未来科技装扮，霓虹灯光效果，机械改造元素，酷炫姿势，暗黑都市背景，cyberpunk风格',
        style: '动漫风格',
        model: 'Doubao',
        tags: ['科幻', '赛博朋克', '未来']
      },
      {
        title: 'Q版萌系',
        prompt: 'Q版可爱角色，大头小身体比例，圆润造型，糖果色配色，开心表情，简单背景，萌系插画风格',
        style: '动漫风格',
        model: 'Doubao',
        tags: ['Q版', '萌系', '可爱']
      }
    ]
  },
  {
    category: '产品展示',
    icon: '📱',
    templates: [
      {
        title: '科技产品',
        prompt: '高端智能手机产品摄影，简约白色背景，柔和顶光，产品45度角展示，玻璃反光质感，专业商业摄影',
        style: '写实照片',
        model: 'Gemini',
        tags: ['科技', '产品', '简约']
      },
      {
        title: '美妆产品',
        prompt: '奢华护肤品产品摄影，香槟金色瓶身，大理石背景，水珠装饰，柔和光线，高端质感，商业广告级',
        style: '写实照片',
        model: 'Gemini',
        tags: ['美妆', '奢华', '广告']
      },
      {
        title: '食品摄影',
        prompt: '美食摄影，精致的甜品特写，诱人色泽，木质餐桌，自然光线，浅景深，俯视角度，美食博主风格',
        style: '写实照片',
        model: 'Gemini',
        tags: ['美食', '甜品', '诱人']
      },
      {
        title: '时尚配饰',
        prompt: '时尚手表产品摄影，金属质感，精密细节，黑色背景，戏剧性光影，奢侈品广告风格，微距摄影',
        style: '写实照片',
        model: 'Gemini',
        tags: ['时尚', '配饰', '奢侈品']
      }
    ]
  },
  {
    category: '建筑空间',
    icon: '🏠',
    templates: [
      {
        title: '现代建筑外观',
        prompt: '现代建筑外观，玻璃幕墙，简洁几何线条，黄昏光线，倒影在水面，建筑摄影视角，专业建筑可视化',
        style: '写实照片',
        model: 'Gemini',
        tags: ['现代', '建筑', '玻璃']
      },
      {
        title: '室内设计',
        prompt: '现代简约客厅，大落地窗，自然采光，中性色调家具，绿植点缀，宽敞明亮，室内设计效果图',
        style: '写实照片',
        model: 'Gemini',
        tags: ['室内', '简约', '明亮']
      },
      {
        title: '日式庭院',
        prompt: '日式禅意庭院，枯山水景观，石灯笼，竹林小径，宁静氛围，柔和光线，景观设计效果图',
        style: '写实照片',
        model: 'Gemini',
        tags: ['日式', '庭院', '禅意']
      },
      {
        title: '商业空间',
        prompt: '时尚咖啡店室内，工业风格装修，裸露砖墙，复古家具，暖色灯光，温馨氛围，商业空间摄影',
        style: '写实照片',
        model: 'Gemini',
        tags: ['商业', '咖啡店', '工业风']
      }
    ]
  },
  {
    category: '艺术创作',
    icon: '🎨',
    templates: [
      {
        title: '抽象艺术',
        prompt: '抽象表现主义艺术，流动的色彩，蓝紫金渐变，动态笔触，情感表达，现代艺术风格，画布质感',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['抽象', '色彩', '现代']
      },
      {
        title: '水彩画',
        prompt: '水彩画风格，柔和的色彩晕染，花卉静物，轻盈透明感，纸张纹理，艺术插画，温柔氛围',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['水彩', '花卉', '柔和']
      },
      {
        title: '油画风格',
        prompt: '古典油画风格，厚重的笔触，丰富的色彩层次，静物画，伦勃朗光影，博物馆级艺术作品',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['油画', '古典', '厚重']
      },
      {
        title: '波普艺术',
        prompt: '波普艺术风格，鲜艳的对比色，重复图案，流行文化元素，Andy Warhol风格，现代艺术海报',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['波普', '鲜艳', '流行']
      }
    ]
  },
  {
    category: '奇幻场景',
    icon: '✨',
    templates: [
      {
        title: '魔法城堡',
        prompt: '漂浮在云层的魔法城堡，水晶塔尖闪耀，魔法粒子飘浮空中，梦幻光芒，史诗场景，奇幻概念艺术',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['魔法', '城堡', '奇幻']
      },
      {
        title: '龙与骑士',
        prompt: '巨龙盘旋天空，勇敢的骑士，中世纪城堡背景，史诗战斗场面，戏剧性光影，奇幻游戏概念图',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['龙', '骑士', '史诗']
      },
      {
        title: '精灵森林',
        prompt: '神秘的精灵森林，发光的蘑菇，魔法生物，梦幻色彩，星光点点，童话般的氛围，奇幻插画',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['精灵', '森林', '魔法']
      },
      {
        title: '未来都市',
        prompt: '未来科幻都市，摩天大楼直插云霄，飞行器穿梭，霓虹灯光，赛博朋克氛围，科幻概念设计',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['未来', '科幻', '都市']
      }
    ]
  },
  {
    category: '节日主题',
    icon: '🎉',
    templates: [
      {
        title: '圣诞节',
        prompt: '温馨的圣诞场景，装饰精美的圣诞树，礼物堆积，壁炉温暖火光，雪花飘落窗外，节日氛围浓厚',
        style: '写实照片',
        model: 'Gemini',
        tags: ['圣诞', '温馨', '节日']
      },
      {
        title: '春节',
        prompt: '中国春节场景，红灯笼高挂，烟花绽放夜空，传统建筑，喜庆红色调，节日庆祝氛围',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['春节', '喜庆', '传统']
      },
      {
        title: '万圣节',
        prompt: '万圣节主题，神秘的南瓜灯，哥特式建筑，紫色夜空，蝙蝠飞舞，诡异又有趣的氛围',
        style: '艺术风格',
        model: 'Doubao',
        tags: ['万圣节', '神秘', '南瓜']
      },
      {
        title: '情人节',
        prompt: '浪漫情人节场景，玫瑰花束，心形装饰，柔和粉红色调，烛光晚餐，温馨浪漫氛围',
        style: '写实照片',
        model: 'Gemini',
        tags: ['情人节', '浪漫', '玫瑰']
      }
    ]
  }
];

export default function PromptTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const categories = ['全部', ...promptTemplates.map(cat => cat.category)];

  const filteredTemplates = selectedCategory === '全部'
    ? promptTemplates
    : promptTemplates.filter(cat => cat.category === selectedCategory);

  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* 头部 */}
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            📝 提示词模板库
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#888', maxWidth: '800px', margin: '0 auto 1rem' }}>
            精选高质量提示词模板，一键复制即可生成精美图像
          </p>
          <p style={{ fontSize: '1rem', color: '#666' }}>
            100+ 专业模板涵盖各种场景，让您的创作事半功倍
          </p>
        </div>
      </div>

      {/* 使用指南 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem 2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>💡 如何使用模板</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { step: '1', text: '选择感兴趣的分类' },
              { step: '2', text: '点击复制按钮' },
              { step: '3', text: '粘贴到生成页面' },
              { step: '4', text: '选择推荐的风格和模型' },
              { step: '5', text: '根据需要微调提示词' },
              { step: '6', text: '点击生成查看效果' }
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 }}>
                  {item.step}
                </div>
                <span style={{ color: '#888', fontSize: '0.875rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 分类筛选 */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>🔍 选择分类</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  background: selectedCategory === category ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.05)',
                  color: selectedCategory === category ? '#10b981' : '#888',
                  border: `1px solid ${selectedCategory === category ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 模板展示 */}
        {filteredTemplates.map((categoryData, catIndex) => (
          <div key={catIndex} style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '3rem', marginRight: '1rem' }}>{categoryData.icon}</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>{categoryData.category}</h2>
              <span style={{ marginLeft: '1rem', padding: '0.25rem 0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', fontSize: '0.875rem', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                {categoryData.templates.length} 个模板
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {categoryData.templates.map((template, tempIndex) => {
                const uniqueKey = `${catIndex}-${tempIndex}`;
                return (
                  <div
                    key={tempIndex}
                    style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' }}>{template.title}</h3>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {template.tags.map((tag, i) => (
                        <span key={i} style={{ padding: '0.25rem 0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', fontSize: '0.7rem', color: '#888', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem', flex: 1 }}>
                      <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: '1.6', fontStyle: 'italic' }}>
                        "{template.prompt}"
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <span style={{ color: '#666' }}>
                          🎨 {template.style}
                        </span>
                        <span style={{ color: '#666' }}>
                          🤖 {template.model}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(template.prompt, uniqueKey)}
                      style={{
                        padding: '0.75rem',
                        background: copiedIndex === uniqueKey ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.1)',
                        color: copiedIndex === uniqueKey ? '#10b981' : '#888',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}
                      onMouseOver={(e) => {
                        if (copiedIndex !== uniqueKey) {
                          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                          e.currentTarget.style.color = '#10b981';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (copiedIndex !== uniqueKey) {
                          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                          e.currentTarget.style.color = '#888';
                        }
                      }}
                    >
                      {copiedIndex === uniqueKey ? '✓ 已复制' : '📋 复制提示词'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '3rem 2rem', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>准备好使用这些模板创作了吗？</h2>
          <p style={{ fontSize: '1.125rem', color: '#888', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            复制任意模板，前往创作页面，即可立即生成精美图像
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <Link
              href="/nano"
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', transition: 'transform 0.3s ease', display: 'inline-block' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              🚀 开始创作
            </Link>
            <Link
              href="/tutorials/beginner-guide"
              style={{ padding: '1rem 2rem', background: 'transparent', color: '#10b981', border: '2px solid #10b981', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              📖 学习提示词技巧
            </Link>
          </div>
        </div>
      </div>

      {/* SEO内容 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>AI 图像生成提示词模板库 - 快速上手的最佳方式</h2>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          Nano Banana 提示词模板库汇集了100多个精心设计的高质量提示词模板，涵盖人像摄影、自然风景、动漫角色、产品展示、建筑空间、艺术创作、奇幻场景、节日主题等多个分类。每个模板都经过实际测试，确保能够生成高质量的图像效果。
        </p>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          所有模板都标注了推荐使用的风格和AI模型（Gemini或Doubao），并附有详细的标签分类，帮助您快速找到符合需求的提示词。无论您是AI图像生成新手还是经验丰富的创作者，这些模板都能为您的创作提供灵感和起点。只需一键复制，即可在 Nano Banana 平台上立即使用。
        </p>
        <p style={{ color: '#888', lineHeight: '1.75' }}>
          我们持续更新模板库，加入更多优质提示词。您也可以在模板基础上进行修改和优化，创造出独一无二的作品。立即开始探索，让AI图像生成变得简单高效！
        </p>
      </div>
    </div>
  );
}
