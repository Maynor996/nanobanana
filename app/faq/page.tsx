'use client'
import Link from 'next/link';
import { useState } from 'react';

const faqCategories = [
  {
    category: '入门使用',
    icon: '🚀',
    questions: [
      {
        q: 'Nano Banana 是什么？我需要注册吗？',
        a: 'Nano Banana 是一个完全免费的 AI 图像生成平台，使用 Google Gemini 2.5 Flash 和字节豆包 SeedReam 4.0 先进模型。最大的特点是无需注册、无需登录、无任何费用,您可以直接访问 /nano 页面开始创作。我们相信创作工具应该对所有人开放，不应被繁琐的注册流程阻碍。'
      },
      {
        q: '如何生成我的第一张 AI 图像？',
        a: '非常简单！只需3步：(1) 访问 /nano 页面；(2) 在输入框中描述您想要的图像，例如"一只可爱的猫咪在花园里玩耍"；(3) 选择风格（推荐初学者使用"增强细节"），点击"开始生成"按钮。等待10-30秒，您的第一张 AI 艺术作品就完成了！如果效果不理想，可以调整描述或尝试不同风格。'
      },
      {
        q: 'Gemini 和 Doubao 两个模型有什么区别？应该选择哪个？',
        a: 'Google Gemini 2.5 Flash 擅长理解复杂描述、生成多样化风格，对英文提示词的理解尤为出色。字节豆包 SeedReam 4.0 在细节表现和艺术性方面优秀，特别适合中文场景和亚洲审美。建议：通用场景选 Gemini，艺术创作或中文描述选 Doubao。最好的方法是两个都试试，找到最适合您的模型。'
      },
      {
        q: '我的图像生成失败了，该怎么办？',
        a: '生成失败可能由几个原因导致：(1) 网络连接问题 - 检查您的网络是否稳定；(2) 服务器负载高峰 - 稍后再试或换个时段；(3) 提示词包含敏感内容 - AI 模型会拒绝生成某些类型的内容，尝试修改描述；(4) 浏览器兼容性 - 建议使用最新版 Chrome、Firefox 或 Safari。如果问题持续，请访问我们的联系页面反馈。'
      }
    ]
  },
  {
    category: '提示词与创作技巧',
    icon: '✍️',
    questions: [
      {
        q: '什么是提示词（Prompt）？如何写好提示词？',
        a: '提示词是您告诉 AI "您想要什么图像"的文字描述。好的提示词应包含：(1) 主体 - 核心内容，如"一只猫"；(2) 细节 - 描述特征，如"橘色的、蓬松的"；(3) 环境 - 场景设置，如"在窗台上，晨光照耀"；(4) 风格 - 艺术风格，如"柔焦摄影"；(5) 氛围 - 情感基调，如"温馨的、宁静的"。记住：越具体详细，AI 理解越准确，生成的图像越接近您的想象。查看我们的提示词工程教程获取更多技巧！'
      },
      {
        q: '中文和英文提示词哪个效果更好？',
        a: '两种语言都能获得优秀的效果！Gemini 和 Doubao 都经过大量中英文数据训练，能准确理解两种语言。建议：(1) 使用您最熟悉、最能准确表达想法的语言；(2) 专业术语（如"cyberpunk"、"chiaroscuro"）可以用英文，更精准；(3) 复杂场景描述用中文可能更流畅；(4) 可以中英文混用，充分发挥两种语言优势。最重要的是清晰具体地表达您的想法。'
      },
      {
        q: '如何让生成的图像更符合我的期望？',
        a: '提高匹配度的技巧：(1) 增加细节 - 从"一只狗"改为"一只金毛犬，毛发蓬松，在公园草地上奔跑，阳光明媚"；(2) 指定风格 - 如"水彩画风格"、"电影级光影"；(3) 使用参考词 - 如"宫崎骏风格"、"皮克斯动画"；(4) 控制构图 - "特写镜头"、"广角视角"、"俯视角度"；(5) 多次尝试 - 生成3-4张图对比选择；(6) 调整模型和风格 - 不同组合产生不同效果。耐心和实验是关键！'
      },
      {
        q: '有什么提示词模板或案例可以参考吗？',
        a: '当然！以下是几个高质量模板：(1) 人物："[描述]的人物，[服装]，[表情/动作]，[背景环境]，[光线]，[艺术风格]"；(2) 风景："[地点]的[时间]景色，[天气/季节]，[主要元素]，[色调]，[摄影风格]"；(3) 产品："[产品]特写，[材质]，[颜色]，[背景]，[光线]，专业摄影"；(4) 抽象："[主题]，[形状/线条]，[色彩方案]，[风格流派]，[情绪]"。访问我们的博客和画廊页面查看100+实际案例和详细分析！'
      }
    ]
  },
  {
    category: '功能与风格',
    icon: '🎨',
    questions: [
      {
        q: '四种风格（增强细节、艺术、动漫、写实）有什么区别？',
        a: '(1) 增强细节：最通用的风格，自动优化清晰度、色彩和构图，适合大多数场景，是不确定时的最佳选择。(2) 艺术风格：强调绘画感和创意，生成类似手绘、油画的效果，适合海报、插画、品牌设计。(3) 动漫风格：日式动漫风格，线条清晰、色彩鲜艳，适合角色设计、漫画插图、二次元内容。(4) 写实照片：照片级真实感，细节丰富、光影自然，适合产品展示、建筑可视化、需要高度真实感的场景。选择风格取决于您的创作目标和偏好。'
      },
      {
        q: '我可以一次生成多少张图片？推荐生成几张？',
        a: 'Nano Banana 支持一次生成 1-4 张图片。推荐策略：(1) 新手测试：生成1张，快速查看效果并调整提示词；(2) 日常创作：生成2张，在速度和选择性之间平衡；(3) 重要项目：生成4张，增加成功率，有更多选项可选；(4) 服务器繁忙时：生成1-2张，节省等待时间。一般来说，生成2-3张是最佳平衡，既能有对比选择，又不会等待太久。'
      },
      {
        q: '图像编辑模式如何使用？能做什么样的编辑？',
        a: '图像编辑功能让您上传现有图片并通过对话进行AI编辑。使用方法：(1) 选择"通过对话编辑图像"模式；(2) 上传您的图片（支持 PNG、JPG、WebP，最大10MB）；(3) 描述您想要的改变，如"将背景改为海滩"、"转换为油画风格"、"添加一只蝴蝶"；(4) 选择风格和模型，开始生成。可以做：风格转换、元素添加/删除、色调调整、背景替换、细节增强等。注意：复杂编辑可能需要多次尝试和详细描述。'
      },
      {
        q: '生成的图片可以保存或下载吗？版权归谁？',
        a: '生成的图片会显示在页面上，您可以：(1) 右键点击图片选择"图片另存为"下载到本地；(2) 长按图片（移动端）选择保存；(3) 截屏保存（虽然不推荐，因为质量会降低）。关于版权：根据我们的使用条款，您生成的图像可以用于个人和创意项目。商业使用前，请查看完整的服务条款和隐私政策了解详细权利和限制。一般来说，AI 生成内容的版权问题较复杂，建议用于非商业用途或咨询法律专家。'
      }
    ]
  },
  {
    category: '技术与性能',
    icon: '⚙️',
    questions: [
      {
        q: '生成一张图片通常需要多长时间？',
        a: '生成时间受多个因素影响：(1) 正常情况：10-30秒生成一张图；(2) 服务器负载高峰期：可能需要30-60秒；(3) 复杂场景或高质量设置：可能需要更长时间；(4) 批量生成：每增加一张图大约增加10秒。影响因素包括：网络速度、所选AI模型（Gemini通常略快）、服务器负载、图片数量等。建议避开高峰时段（工作日晚上、周末），并保持网络连接稳定。如果等待超过2分钟仍无响应，建议刷新页面重试。'
      },
      {
        q: '为什么有时候生成很慢或者失败？',
        a: '可能的原因和解决方法：(1) 高峰时段 - 服务器压力大，建议换个时段或稍后重试；(2) 网络不稳定 - 检查网络连接，尝试切换WiFi或移动网络；(3) 提示词问题 - 包含敏感词或违规内容会被拒绝，修改描述；(4) 浏览器缓存 - 清除缓存或使用无痕模式；(5) 浏览器不兼容 - 更新到最新版或换用Chrome/Firefox；(6) API临时故障 - 这种情况较少，等待几分钟后重试。如果问题持续存在，请联系我们反馈具体情况。'
      },
      {
        q: '支持哪些设备和浏览器？手机可以用吗？',
        a: 'Nano Banana 采用响应式设计，支持所有现代设备和浏览器：(1) 桌面电脑：Windows、Mac、Linux；(2) 移动设备：iPhone、iPad、Android 手机和平板；(3) 推荐浏览器：Chrome、Firefox、Safari、Edge 最新版本；(4) 屏幕尺寸：从小手机到大显示器都完美适配。移动端完全可用，界面会自动调整以适应小屏幕。但建议：复杂创作用大屏幕更方便查看细节，简单生成和浏览在手机上体验也很好。无论您使用什么设备，都能享受流畅的创作体验。'
      },
      {
        q: '图像质量和分辨率是多少？可以生成高清图片吗？',
        a: '生成的图像质量取决于所选的 AI 模型和风格：(1) 标准分辨率：通常为 1024x1024 或类似尺寸，适合大多数在线使用；(2) Gemini 模型：倾向生成平衡的分辨率和细节；(3) Doubao 模型：在保持质量的同时优化生成速度；(4) 不同风格会略有差异："写实照片"通常质量最高，细节最丰富。虽然不是超高清（4K+），但对于社交媒体、网站、打印小尺寸作品已经足够。如需更高分辨率，建议使用专业的 AI 图像放大工具进行后期处理。'
      }
    ]
  },
  {
    category: '账户与隐私',
    icon: '🔒',
    questions: [
      {
        q: 'Nano Banana 真的完全免费吗？有隐藏费用吗？',
        a: '是的，Nano Banana 100% 完全免费，没有任何隐藏费用！(1) 无需注册或登录；(2) 无需绑定信用卡；(3) 无生成次数限制（公平使用原则下）；(4) 无水印或质量降级；(5) 所有功能全部开放。我们的理念是让 AI 艺术创作对所有人开放，不应被价格门槛限制。平台通过可选的广告和未来可能的高级功能（会明确标注）维持运营，但核心功能永远免费。请放心使用！'
      },
      {
        q: '我的数据和隐私安全吗？你们会保存我的图片吗？',
        a: '我们非常重视用户隐私和数据安全：(1) 不保存个人信息：无需注册，我们不收集您的姓名、邮箱等信息；(2) 图片临时处理：上传的图片仅用于生成，处理后不会永久存储；(3) 提示词处理：您的描述仅发送给 AI 模型生成图像，不用于其他目的；(4) 安全传输：所有数据通过 HTTPS 加密传输；(5) 第三方服务：我们使用 Google 和字节跳动的 API，它们有各自的隐私政策。建议：不要上传包含个人敏感信息的图片。查看我们的隐私政策了解完整细节。'
      },
      {
        q: '有使用限制或次数限制吗？',
        a: '为了确保所有用户的公平使用体验，我们采用合理使用政策：(1) 日常使用：正常创作无任何限制，您可以随意生成图片；(2) 公平使用：避免短时间内大量生成（如几分钟内生成几十张），这会影响服务器性能和其他用户体验；(3) 反滥用措施：极端情况下（如自动化脚本攻击），系统可能暂时限制访问；(4) 未来计划：如果用户量大幅增长，可能引入温和的速率限制，但会提前公告。总之：正常、合理的使用不会有任何问题，我们鼓励您尽情创作！'
      },
      {
        q: '我可以商用生成的图片吗？需要署名吗？',
        a: '关于商业使用和版权的重要说明：(1) 个人和创意项目：欢迎自由使用生成的图片；(2) 商业使用：情况较复杂，因为 AI 生成内容的版权在不同地区和情况下有不同规定；(3) 建议做法：用于商业前，咨询法律专家了解当地法规；避免直接商用，或进行二次创作加工；某些行业（如出版、广告）对 AI 内容有特殊要求；(4) 署名：不强制，但如果您觉得 Nano Banana 帮助了您，欢迎分享链接；(5) 详细条款：请阅读我们的服务条款页面了解完整信息。记住：合理、合法使用是关键！'
      }
    ]
  },
  {
    category: '故障排除',
    icon: '🔧',
    questions: [
      {
        q: '图片生成后显示不出来或加载失败怎么办？',
        a: '图片显示问题的解决步骤：(1) 等待加载：有时网络延迟，稍等几秒；(2) 刷新页面：按 F5 或点击刷新按钮；(3) 检查网络：确保网络连接稳定；(4) 清除缓存：浏览器设置中清除缓存和 Cookie；(5) 换浏览器：尝试其他浏览器（Chrome、Firefox、Safari）；(6) 关闭广告拦截器：某些扩展可能干扰图片加载；(7) 检查防火墙：确保没有拦截图片请求；(8) 重新生成：如果上述方法都不行，重新生成图片。如果问题持续，请联系我们并提供浏览器版本、设备信息和错误截图。'
      },
      {
        q: '提示词明明很详细，为什么生成的图片完全不对？',
        a: 'AI 理解偏差的原因和改进方法：(1) 语义歧义：某些词有多重含义，尝试更具体的描述或换个词；(2) 文化差异：某些概念在 AI 训练数据中表现不同，加入更多上下文；(3) 复杂度过高：一次性要求太多元素，AI 难以兼顾，尝试简化或分步骤；(4) 模型限制：不同模型擅长不同风格，换个模型试试；(5) 负面提示缺失：说明"不要什么"有时很重要，如"不要卡通风格"；(6) 风格冲突：同时要求矛盾的风格，如"写实又抽象"；(7) 参考学习：查看我们的教程和示例，学习有效的描述方式。记住：AI 不是魔法，需要练习和耐心！'
      },
      {
        q: '"生成失败"或"请求超时"错误怎么处理？',
        a: '错误解决方法：(1) 立即重试：点击"重新生成"按钮，很多时候是临时问题；(2) 简化提示词：减少字数和复杂度，看是否能成功；(3) 换个模型：Gemini 和 Doubao 轮流试试；(4) 减少数量：如果生成4张失败，改为生成1-2张；(5) 稍后再试：高峰期服务器压力大，等10-30分钟；(6) 检查网络：确保网络稳定，延迟不要太高；(7) 换网络环境：尝试切换 WiFi/移动网络；(8) 清除浏览器缓存：有时旧缓存会导致问题。如果连续多次失败，可能是服务临时中断，请联系我们报告问题。'
      },
      {
        q: '上传图片时提示"文件过大"或"格式不支持"怎么办？',
        a: '图片上传问题解决：(1) 文件大小：当前限制为 10MB，如果超过，使用图片压缩工具（如 TinyPNG、Squoosh）压缩；(2) 支持格式：PNG、JPG/JPEG、WebP，其他格式需要转换（如使用 Photoshop、在线转换工具）；(3) 图片损坏：确保文件完整无损，重新导出或下载；(4) 特殊编码：某些特殊编码的图片可能不支持，重新保存为标准格式；(5) 浏览器限制：某些浏览器对文件上传有限制，尝试其他浏览器；(6) 建议尺寸：虽然没有严格限制，但建议上传 1024x1024 到 2048x2048 的图片，过大或过小都可能影响效果。'
      }
    ]
  },
  {
    category: '其他问题',
    icon: '💡',
    questions: [
      {
        q: '有移动应用(App)吗？需要下载什么软件？',
        a: '目前 Nano Banana 是一个 Web 应用，通过浏览器访问即可，无需下载任何应用或软件。优势：(1) 跨平台：任何设备的浏览器都能用；(2) 即时更新：我们更新功能时，您无需下载新版本；(3) 不占空间：不消耗设备存储；(4) 安全：避免恶意 App 风险。移动端使用建议：(1) 将网站添加到主屏幕，像 App 一样启动；(2) iOS：Safari 浏览器 → 分享 → 添加到主屏幕；(3) Android：Chrome 浏览器 → 菜单 → 添加到主屏幕。未来如果用户需求强烈，我们可能开发原生 App。'
      },
      {
        q: '如何提供反馈或建议新功能？',
        a: '我们非常欢迎用户反馈！提交方式：(1) 联系页面：访问 /contact 填写反馈表单；(2) GitHub：如果您是开发者，可以在我们的 GitHub 仓库提 Issue 或 Pull Request；(3) 社交媒体：通过我们的社交媒体账号私信或评论（如果有）；(4) 邮件：发送详细建议到我们的支持邮箱。好的反馈包含：(1) 清晰的问题描述或功能建议；(2) 具体的使用场景和需求；(3) 截图或示例（如果适用）；(4) 您的联系方式（可选，用于跟进）。所有反馈我们都会认真阅读，虽然不能保证全部实现，但会优先考虑最受欢迎的建议。'
      },
      {
        q: '可以分享我生成的图片到社交媒体吗？',
        a: '当然可以！我们鼓励您分享创作成果：(1) 完全允许：将生成的图片分享到任何社交媒体平台；(2) 可选署名：如果您愿意，可以提及 "由 Nano Banana AI 生成" 或附上我们的链接，帮助更多人发现这个工具；(3) 标签建议：使用 #NanoBanana #AI艺术 #AI生成 等标签；(4) 尊重平台规则：确保内容符合各平台的社区准则；(5) 分享技巧：可以分享提示词，帮助他人学习；(6) 版权提醒：如前所述，商业用途需谨慎，但个人分享完全没问题。我们很期待看到您的创作！'
      },
      {
        q: '未来会有什么新功能？路线图是什么？',
        a: '我们正在规划的激动人心的新功能：(1) 近期计划（1-3个月）：高级编辑工具（精确控制、图层编辑）、更多风格选项、批量下载功能、用户画廊和社区分享；(2) 中期计划（3-6个月）：视频生成功能、3D 图像生成、AI 图像放大和增强、提示词智能建议、创作历史记录；(3) 长期愿景（6-12个月）：原生移动 App、协作功能、API 开放给开发者、更多 AI 模型选择、高级订阅计划（核心功能永远免费）。具体时间表可能根据技术发展和用户需求调整。关注我们的博客获取最新动态，您的反馈也会影响优先级！'
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<{[key: string]: boolean}>({});

  const toggleQuestion = (catIndex: number, qIndex: number) => {
    const key = `${catIndex}-${qIndex}`;
    setOpenIndex(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* 头部 */}
      <div style={{ background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ❓ 常见问题解答 (FAQ)
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '1rem', maxWidth: '800px', margin: '0 auto 1rem' }}>
            快速找到关于 Nano Banana AI 图像生成的答案
          </p>
          <p style={{ color: '#888' }}>
            找不到答案？<Link href="/contact" style={{ color: '#10b981', textDecoration: 'underline', marginLeft: '0.25rem' }}>联系我们</Link>
          </p>
        </div>
      </div>

      {/* FAQ内容 */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* 快速导航 */}
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '1rem', padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>📑 快速导航</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {faqCategories.map((cat) => (
              <a
                key={cat.category}
                href={`#${cat.category.replace(/\s+/g, '-')}`}
                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#1a1a1a', color: '#888', border: '1px solid #222', textDecoration: 'none', textAlign: 'center', transition: 'all 0.3s ease', display: 'block' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#fff' }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#888' }}
              >
                <span style={{ marginRight: '0.5rem' }}>{cat.icon}</span>
                {cat.category}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ分类 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {faqCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              id={category.category.replace(/\s+/g, '-')}
              style={{ scrollMarginTop: '5rem' }}
            >
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '2.5rem', marginRight: '0.75rem' }}>{category.icon}</span>
                {category.category}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {category.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex[key];

                  return (
                    <div
                      key={qIndex}
                      style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem', padding: '1.5rem', transition: 'all 0.3s ease' }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'}
                    >
                      <div
                        onClick={() => toggleQuestion(catIndex, qIndex)}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                          <span style={{ marginRight: '0.75rem', color: '#10b981', fontWeight: '700', flexShrink: 0 }}>Q{catIndex * 4 + qIndex + 1}.</span>
                          <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#fff' }}>{item.q}</span>
                        </div>
                        <svg
                          style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem', flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: '#10b981' }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {isOpen && (
                        <div style={{ marginTop: '1rem', color: '#888', lineHeight: '1.75', borderTop: '1px solid rgba(16, 185, 129, 0.1)', paddingTop: '1rem' }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 底部CTA */}
        <div style={{ marginTop: '4rem', background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '3rem 2rem', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>还有其他问题？</h2>
          <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            如果您没有找到问题的答案，或者遇到了具体的技术问题，欢迎随时联系我们。我们的团队会尽快回复您。
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <Link
              href="/contact"
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: '700', borderRadius: '0.5rem', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              联系我们 📧
            </Link>
            <Link
              href="/blog"
              style={{ padding: '1rem 2rem', background: 'transparent', color: '#10b981', fontWeight: '700', borderRadius: '0.5rem', border: '2px solid #10b981', textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              查看教程 📚
            </Link>
            <Link
              href="/nano"
              style={{ padding: '1rem 2rem', background: 'transparent', color: '#10b981', fontWeight: '700', borderRadius: '0.5rem', border: '2px solid #10b981', textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              开始创作 ✨
            </Link>
          </div>
        </div>

        {/* 相关资源 */}
        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <Link href="/tutorials/beginner-guide" style={{ background: '#111', border: '1px solid #222', borderRadius: '0.75rem', padding: '2rem', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📖</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>使用指南</h3>
            <p style={{ color: '#888', fontSize: '0.875rem' }}>详细的功能说明和操作步骤</p>
          </Link>

          <Link href="/tutorials/beginner-guide" style={{ background: '#111', border: '1px solid #222', borderRadius: '0.75rem', padding: '2rem', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎓</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>入门教程</h3>
            <p style={{ color: '#888', fontSize: '0.875rem' }}>从零开始学习AI图像生成</p>
          </Link>

          <Link href="/about" style={{ background: '#111', border: '1px solid #222', borderRadius: '0.75rem', padding: '2rem', textDecoration: 'none', transition: 'all 0.3s ease', display: 'block' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🍌</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>关于我们</h3>
            <p style={{ color: '#888', fontSize: '0.875rem' }}>了解Nano Banana的使命和技术</p>
          </Link>
        </div>
      </div>

      {/* SEO内容 */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1rem', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>Nano Banana AI图像生成 - 您的所有问题都有答案</h2>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          本FAQ页面汇总了使用 Nano Banana AI 图像生成平台时最常见的问题和解答。我们涵盖了从入门使用、提示词编写技巧、功能说明、技术问题排除到账户隐私等所有方面，帮助您快速解决疑惑并充分利用平台功能。
        </p>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          Nano Banana 使用 Google Gemini 2.5 Flash 和字节豆包 SeedReam 4.0 两大先进 AI 模型,提供完全免费、无需注册的图像生成服务。无论您是AI艺术创作新手还是经验丰富的设计师,都能在这里找到有用的信息和解答。
        </p>
        <p style={{ color: '#888', lineHeight: '1.75' }}>
          如果您没有找到问题的答案，请访问我们的联系页面或查看更多教程资源。我们持续更新FAQ内容，确保为用户提供最全面、最及时的帮助和支持。
        </p>
      </div>
    </div>
  );
}
