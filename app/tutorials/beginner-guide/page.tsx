'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function BeginnerGuidePage() {
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setOpenDetails(openDetails === id ? null : id);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      {/* 文章头部 */}
      <div style={{
        background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
        borderBottom: '1px solid #222'
      }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '48px 16px' }}>
          <Link
            href="/blog"
            style={{
              color: '#10b981',
              marginBottom: '16px',
              display: 'inline-block',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#059669'}
            onMouseOut={(e) => e.currentTarget.style.color = '#10b981'}
          >
            ← 返回博客
          </Link>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
            AI图像生成完全入门指南
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#888' }}>
            <span>📅 2025年1月</span>
            <span>⏱️ 阅读时间:10分钟</span>
            <span>🏷️ 入门教程</span>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <article style={{ maxWidth: '896px', margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ maxWidth: 'none' }}>

          {/* 引言 */}
          <div style={{ background: '#111', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
            <p style={{ color: '#888', fontSize: '18px', lineHeight: '1.75', margin: 0 }}>
              欢迎来到 AI 图像生成的奇妙世界!本指南将带您从零开始,逐步掌握使用 Nano Banana 创作精美 AI 艺术作品的全部技能。无论您是否有任何设计经验,都能在这里找到简单易懂的学习路径。
            </p>
          </div>

          {/* 第一部分:什么是AI图像生成 */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginTop: '48px', marginBottom: '24px' }}>第一章:理解 AI 图像生成</h2>

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginTop: '32px', marginBottom: '16px' }}>1.1 什么是 AI 图像生成?</h3>
          <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
            AI 图像生成是一种革命性的技术,它使用人工智能模型将文字描述转换为视觉图像。想象一下,您只需用语言描述您脑海中的画面,AI 就能在几秒钟内将其变成现实。这项技术基于深度学习和神经网络,通过学习数百万张图片的特征,理解了颜色、形状、风格和构图之间的关系。
          </p>
          <p style={{ color: '#888', marginBottom: '24px', lineHeight: '1.75' }}>
            Nano Banana 使用的是 Google Gemini 2.5 Flash 和字节豆包 SeedReam 4.0 两大先进模型。Gemini 擅长理解复杂的描述和生成多样化的风格,而 Doubao 则在细节表现和艺术性方面表现出色。两者结合,为您提供无与伦比的创作体验。
          </p>

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginTop: '32px', marginBottom: '16px' }}>1.2 为什么选择 Nano Banana?</h3>
          <div style={{ background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: '#888', lineHeight: '1.75' }}>
              <li><strong style={{ color: '#fff' }}>✨ 完全免费:</strong>无需注册,无需付费,立即开始创作</li>
              <li><strong style={{ color: '#fff' }}>🚀 简单易用:</strong>直观的界面设计,3步即可生成图像</li>
              <li><strong style={{ color: '#fff' }}>🎨 多种风格:</strong>提供增强、艺术、动漫、写实四大核心风格</li>
              <li><strong style={{ color: '#fff' }}>⚡ 快速生成:</strong>通常在10-30秒内完成图像创作</li>
              <li><strong style={{ color: '#fff' }}>🔧 图像编辑:</strong>支持上传图片并通过对话进行编辑</li>
              <li><strong style={{ color: '#fff' }}>📱 全平台支持:</strong>在手机、平板、电脑上都能流畅使用</li>
            </ul>
          </div>

          {/* 第二部分:快速开始 */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginTop: '48px', marginBottom: '24px' }}>第二章:5分钟快速上手</h2>

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginTop: '32px', marginBottom: '16px' }}>2.1 创建您的第一张 AI 图像</h3>
          <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
            让我们从最简单的例子开始。假设您想生成一张"日落时分的海滩"图片:
          </p>

          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>步骤 1:访问工具页面</h4>
            <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
              打开 Nano Banana 主页,点击"开始创作"或直接访问 /nano 页面。您会看到一个简洁的界面,包含输入框和几个选项按钮。
            </p>

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>步骤 2:选择生成模式</h4>
            <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
              确保选中"文生图模式"(这是默认模式)。如果您想编辑现有图片,可以选择"通过对话编辑图像"模式。
            </p>

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>步骤 3:输入描述</h4>
            <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
              在输入框中输入您的描述,例如:"一片宁静的海滩,日落时分,金色的阳光洒在海面上,几只海鸥在天空飞翔,椰子树摇曳"。描述越详细,生成的图像越接近您的想象。
            </p>

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>步骤 4:选择风格和模型</h4>
            <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
              选择一个风格标签(推荐初学者使用"增强细节"或"写实照片")。选择 AI 模型(Gemini 或 Doubao,两者都很优秀)。
            </p>

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>步骤 5:生成图像</h4>
            <p style={{ color: '#888', marginBottom: '8px', lineHeight: '1.75' }}>
              点击"开始生成"按钮,等待10-30秒。您的第一张 AI 艺术作品就诞生了!如果不满意,可以调整描述或风格,再次生成。
            </p>
          </div>

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginTop: '32px', marginBottom: '16px' }}>2.2 理解提示词(Prompt)</h3>
          <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
            提示词是 AI 图像生成的核心。一个好的提示词应该包含以下元素:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>主体(Subject)</h5>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75' }}>您想生成的核心内容,如"一只猫"、"城市街道"、"抽象图案"</p>
            </div>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>细节(Details)</h5>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75' }}>描述主体的特征,如"橘色的皮毛"、"繁忙的"、"几何形状的"</p>
            </div>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>环境(Environment)</h5>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75' }}>场景设置,如"在花园里"、"夜晚的"、"白色背景"</p>
            </div>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>风格(Style)</h5>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75' }}>艺术风格,如"水彩画"、"赛博朋克"、"极简主义"</p>
            </div>
          </div>

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginTop: '32px', marginBottom: '16px' }}>2.3 提示词示例对比</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '8px' }}>❌ 不够好的提示词:</p>
              <p style={{ color: '#888', marginBottom: '8px' }}>"一只猫"</p>
              <p style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>问题:太简单,缺乏细节,AI 难以理解您的具体需求</p>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>✅ 优秀的提示词:</p>
              <p style={{ color: '#888', marginBottom: '8px' }}>"一只蓬松的橘色猫咪,坐在窗台上,柔和的晨光透过窗户洒在它身上,背景是模糊的室内植物,温馨的氛围,柔焦摄影风格"</p>
              <p style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>优点:包含主体、细节、光线、环境、氛围和风格,AI 能准确理解并生成</p>
            </div>
          </div>

          {/* 第三部分:四大风格详解 */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginTop: '48px', marginBottom: '24px' }}>第三章:掌握四大风格</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '12px' }}>🔍 增强细节(Enhanced Details)</h4>
              <p style={{ color: '#888', marginBottom: '12px', lineHeight: '1.75' }}>
                这是最通用的风格,适合大多数场景。AI 会自动优化图像的清晰度、色彩和构图,使画面更加精致和吸引人。
              </p>
              <p style={{ color: '#888', marginBottom: '8px', lineHeight: '1.75' }}><strong>适用场景:</strong></p>
              <ul style={{ color: '#888', margin: '0 0 12px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.75' }}>
                <li>• 通用场景插画</li>
                <li>• 产品概念设计</li>
                <li>• 社交媒体内容</li>
                <li>• 不确定选哪种风格时的默认选择</li>
              </ul>
              <p style={{ color: '#888', lineHeight: '1.75' }}><strong>推荐提示词:</strong>"一座未来主义城市,高楼林立,霓虹灯闪烁,繁忙的街道,细节丰富"</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(16, 185, 129, 0.1))', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ec4899', marginBottom: '12px' }}>🎨 艺术风格(Artistic Style)</h4>
              <p style={{ color: '#888', marginBottom: '12px', lineHeight: '1.75' }}>
                强调艺术性和创意表现,生成的图像更具绘画感和想象力。适合需要独特视觉风格的创作。
              </p>
              <p style={{ color: '#888', marginBottom: '8px', lineHeight: '1.75' }}><strong>适用场景:</strong></p>
              <ul style={{ color: '#888', margin: '0 0 12px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.75' }}>
                <li>• 海报和封面设计</li>
                <li>• 艺术创作和插画</li>
                <li>• 品牌视觉设计</li>
                <li>• 需要抽象或风格化表现的场景</li>
              </ul>
              <p style={{ color: '#888', lineHeight: '1.75' }}><strong>推荐提示词:</strong>"梵高风格的星空下,一个孤独的旅人走在麦田里,笔触明显,色彩浓烈"</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '12px' }}>🌸 动漫风格(Anime Style)</h4>
              <p style={{ color: '#888', marginBottom: '12px', lineHeight: '1.75' }}>
                专为动漫和二次元爱好者设计,生成日式动漫风格的图像,线条清晰,色彩鲜艳。
              </p>
              <p style={{ color: '#888', marginBottom: '8px', lineHeight: '1.75' }}><strong>适用场景:</strong></p>
              <ul style={{ color: '#888', margin: '0 0 12px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.75' }}>
                <li>• 角色设计和立绘</li>
                <li>• 漫画和轻小说插图</li>
                <li>• 游戏美术概念</li>
                <li>• 二次元社区内容</li>
              </ul>
              <p style={{ color: '#888', lineHeight: '1.75' }}><strong>推荐提示词:</strong>"一位可爱的动漫少女,长发飘逸,大眼睛,穿着校服,樱花飘落的背景,新海诚风格"</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>📷 写实照片(Photorealistic)</h4>
              <p style={{ color: '#888', marginBottom: '12px', lineHeight: '1.75' }}>
                追求照片级别的真实感,生成的图像几乎与真实照片无异,细节丰富,光影自然。
              </p>
              <p style={{ color: '#888', marginBottom: '8px', lineHeight: '1.75' }}><strong>适用场景:</strong></p>
              <ul style={{ color: '#888', margin: '0 0 12px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.75' }}>
                <li>• 产品展示和广告</li>
                <li>• 建筑和室内设计可视化</li>
                <li>• 人像摄影效果</li>
                <li>• 需要高度真实感的任何场景</li>
              </ul>
              <p style={{ color: '#888', lineHeight: '1.75' }}><strong>推荐提示词:</strong>"一杯拿铁咖啡,精美的拉花,木质桌面,自然光从窗户照进来,专业摄影,浅景深"</p>
            </div>
          </div>

          {/* 第四部分:常见问题 */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginTop: '48px', marginBottom: '24px' }}>第四章:新手常见问题解答</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <summary
                style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', cursor: 'pointer' }}
                onClick={() => toggleDetails('q1')}
              >
                Q1: 生成的图像不符合我的期望怎么办?
              </summary>
              {openDetails === 'q1' && (
                <p style={{ color: '#888', marginTop: '12px', lineHeight: '1.75' }}>
                  A: 这很正常!AI 图像生成需要多次尝试。您可以:(1) 调整提示词,添加更多细节;(2) 尝试不同的风格;(3) 切换AI模型;(4) 生成多张图片进行对比选择。
                </p>
              )}
            </div>

            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <summary
                style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', cursor: 'pointer' }}
                onClick={() => toggleDetails('q2')}
              >
                Q2: 中文和英文提示词哪个效果更好?
              </summary>
              {openDetails === 'q2' && (
                <p style={{ color: '#888', marginTop: '12px', lineHeight: '1.75' }}>
                  A: 两者都支持且效果相近。Gemini 模型对中英文的理解能力都很强。如果某些专业术语或艺术风格名称用英文描述可能更准确,其他情况下使用您最熟悉的语言即可。
                </p>
              )}
            </div>

            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <summary
                style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', cursor: 'pointer' }}
                onClick={() => toggleDetails('q3')}
              >
                Q3: 一次生成多少张图片比较好?
              </summary>
              {openDetails === 'q3' && (
                <p style={{ color: '#888', marginTop: '12px', lineHeight: '1.75' }}>
                  A: 初学者建议一次生成1-2张,这样可以更快看到结果并及时调整。熟练后可以选择生成4张,增加成功率和选择空间。
                </p>
              )}
            </div>

            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <summary
                style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', cursor: 'pointer' }}
                onClick={() => toggleDetails('q4')}
              >
                Q4: 如何提高生成速度?
              </summary>
              {openDetails === 'q4' && (
                <p style={{ color: '#888', marginTop: '12px', lineHeight: '1.75' }}>
                  A: 生成速度主要取决于服务器负载。建议:(1) 避免高峰时段;(2) 一次生成较少数量的图片;(3) 保持网络连接稳定;(4) 使用较简洁的提示词。
                </p>
              )}
            </div>

            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
              <summary
                style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', cursor: 'pointer' }}
                onClick={() => toggleDetails('q5')}
              >
                Q5: 我可以商用生成的图片吗?
              </summary>
              {openDetails === 'q5' && (
                <p style={{ color: '#888', marginTop: '12px', lineHeight: '1.75' }}>
                  A: 请查看我们的使用条款页面了解详细的版权信息。一般来说,您生成的图像可以用于个人和创意项目,但商业使用前请确保了解相关许可协议。
                </p>
              )}
            </div>
          </div>

          {/* 总结 */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginTop: '48px', marginBottom: '24px' }}>下一步学习</h2>
          <p style={{ color: '#888', marginBottom: '24px', lineHeight: '1.75' }}>
            恭喜您完成了 AI 图像生成的入门学习!现在您已经掌握了基础概念、操作流程和四大风格的使用方法。接下来,建议您:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <Link
              href="/tutorials/prompt-engineering"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>📝 学习提示词工程</h4>
              <p style={{ color: '#888', fontSize: '14px' }}>深入掌握编写高质量提示词的技巧和方法</p>
            </Link>

            <Link
              href="/tutorials/style-guide"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>🎨 深入了解风格</h4>
              <p style={{ color: '#888', fontSize: '14px' }}>探索每种风格的细微差别和高级应用</p>
            </Link>

            <Link
              href="/gallery"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>🖼️ 浏览作品画廊</h4>
              <p style={{ color: '#888', fontSize: '14px' }}>从社区优秀作品中获取灵感和创意</p>
            </Link>

            <Link
              href="/nano"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>✨ 立即开始创作</h4>
              <p style={{ color: '#888', fontSize: '14px' }}>将所学知识付诸实践,创作您的第一件作品</p>
            </Link>
          </div>

          {/* 文章底部 */}
          <div style={{ background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '24px', marginTop: '48px' }}>
            <p style={{ color: '#888', marginBottom: '16px', lineHeight: '1.75' }}>
              <strong style={{ color: '#fff' }}>💡 小贴士:</strong>学习 AI 图像生成最好的方法就是不断实践。不要害怕尝试各种奇特的想法,每一次生成都是一次学习的机会。随着经验的积累,您会越来越擅长与 AI 沟通,创作出令人惊叹的作品。
            </p>
            <p style={{ color: '#888', margin: 0, lineHeight: '1.75' }}>
              祝您创作愉快!如果有任何问题,欢迎查看我们的{' '}
              <Link
                href="/faq"
                style={{ color: '#10b981', textDecoration: 'underline' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.color = '#10b981'}
              >
                FAQ 页面
              </Link>
              {' '}或{' '}
              <Link
                href="/contact"
                style={{ color: '#10b981', textDecoration: 'underline' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.color = '#10b981'}
              >
                联系我们
              </Link>
              。
            </p>
          </div>

        </div>
      </article>

      {/* 相关文章推荐 */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 16px 48px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>📚 相关教程推荐</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link
            href="/tutorials/prompt-engineering"
            style={{
              background: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              padding: '16px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#222';
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>提示词工程进阶</h4>
            <p style={{ color: '#888', fontSize: '14px' }}>掌握专业级提示词编写技巧</p>
          </Link>
          <Link
            href="/tutorials/image-editing"
            style={{
              background: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              padding: '16px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#222';
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>AI 图像编辑实战</h4>
            <p style={{ color: '#888', fontSize: '14px' }}>学习如何编辑和改进现有图片</p>
          </Link>
          <Link
            href="/blog"
            style={{
              background: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              padding: '16px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#222';
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>更多教程</h4>
            <p style={{ color: '#888', fontSize: '14px' }}>浏览全部AI艺术创作教程</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
