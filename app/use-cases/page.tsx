'use client'
import Link from 'next/link';

const useCases = [
  {
    category: '商业与营销',
    icon: '💼',
    cases: [
      {
        title: '社交媒体内容创作',
        description: '为Instagram、Facebook、Twitter等平台快速生成吸引眼球的视觉内容，提升品牌曝光度和用户参与度。',
        examples: ['产品宣传图', '节日祝福海报', '品牌故事配图', '活动预告图'],
        prompt: '现代简约风格的咖啡店宣传图，一杯精美拉花咖啡特写，木质桌面，温暖晨光，Instagram风格摄影'
      },
      {
        title: '广告素材设计',
        description: '快速生成广告创意草图和视觉概念，加速广告设计流程，降低前期创意成本。',
        examples: ['横幅广告', '展示广告', '电商主图', '促销海报'],
        prompt: '科技感十足的智能手表广告图，产品悬浮在渐变蓝紫背景中，光线粒子效果，未来主义风格'
      },
      {
        title: '品牌视觉开发',
        description: '探索品牌视觉方向，生成logo创意、配色方案、VI元素的视觉参考。',
        examples: ['Logo概念图', '品牌色彩方案', 'VI系统元素', '品牌氛围板'],
        prompt: '环保主题品牌logo设计，绿叶与地球元素结合，简约现代，矢量图形风格，专业商标设计'
      },
      {
        title: '电商产品展示',
        description: '为产品创建多样化的场景展示图，提升商品页面吸引力，增加转化率。',
        examples: ['产品场景图', '生活方式配图', '使用场景展示', '氛围营造图'],
        prompt: '高端护肤品产品摄影，白色背景，柔和顶光，水珠装饰，商业产品摄影质感'
      }
    ]
  },
  {
    category: '内容创作与媒体',
    icon: '✍️',
    cases: [
      {
        title: '博客文章配图',
        description: '为博客、文章、新闻快速生成相关配图，提升内容视觉吸引力和可读性。',
        examples: ['文章头图', '概念插图', '信息图表', '段落配图'],
        prompt: '科技博客配图，抽象的数据流和网络连接，蓝色调，科技感，数字艺术风格'
      },
      {
        title: '图书封面设计',
        description: '为电子书、实体书生成封面创意，快速可视化书籍主题和氛围。',
        examples: ['小说封面', '非虚构类封面', '儿童书封面', '电子书封面'],
        prompt: '奇幻小说封面，漂浮的魔法城堡，紫色夜空，星光闪烁，史诗奇幻风格，封面艺术'
      },
      {
        title: 'YouTube视频缩略图',
        description: '创建吸睛的视频缩略图，提高点击率，增加视频观看量。',
        examples: ['教程缩略图', 'Vlog封面', '游戏视频封面', '评测视频图'],
        prompt: 'YouTube科技评测缩略图，醒目的产品展示，对比效果，明亮色彩，吸引眼球的构图'
      },
      {
        title: '播客与音频封面',
        description: '为播客节目、音乐专辑创建独特的视觉标识，建立品牌辨识度。',
        examples: ['播客封面', '专辑封面', '单曲封面', '音频节目图'],
        prompt: '播客封面设计，极简风格，复古麦克风图标，温暖色调，现代播客美学'
      }
    ]
  },
  {
    category: '教育与培训',
    icon: '🎓',
    cases: [
      {
        title: '教学课件插图',
        description: '为PPT、教案、在线课程生成清晰易懂的示意图和概念图，提升教学效果。',
        examples: ['概念示意图', '历史场景还原', '科学现象展示', '地理景观图'],
        prompt: '教育插图，太阳系八大行星排列，清晰标注，教科书风格，适合儿童学习'
      },
      {
        title: '在线课程素材',
        description: '为MOOC、网课、培训视频创建专业的视觉素材，提升课程质量。',
        examples: ['课程封面', '章节分隔图', '知识点配图', '测验背景图'],
        prompt: '在线编程课程封面，抽象的代码流动效果，科技蓝绿渐变，现代教育风格'
      },
      {
        title: '儿童教育内容',
        description: '生成色彩鲜艳、富有趣味的儿童教育图片，吸引孩子注意力。',
        examples: ['卡通插图', '字母数字图', '动物认知图', '故事场景图'],
        prompt: '儿童教育插图，可爱的卡通动物在森林里学习，明亮色彩，友好风格，适合3-6岁'
      },
      {
        title: '培训资料设计',
        description: '为企业培训、技能培训创建专业的视觉资料，提升培训效果。',
        examples: ['流程图背景', '团队协作图', '技能树图示', '案例配图'],
        prompt: '企业培训PPT背景，团队合作概念图，专业简洁，商务风格，激励氛围'
      }
    ]
  },
  {
    category: '娱乐与个人创作',
    icon: '🎨',
    cases: [
      {
        title: '社交媒体头像',
        description: '创建独特的个人头像、虚拟形象，展现个性和风格。',
        examples: ['个性头像', '虚拟角色', '像素头像', '艺术肖像'],
        prompt: '赛博朋克风格虚拟头像，未来主义装扮，霓虹灯光效，酷炫科幻风'
      },
      {
        title: '创意壁纸制作',
        description: '为手机、电脑、平板生成个性化壁纸，打造专属视觉体验。',
        examples: ['手机壁纸', '桌面壁纸', '锁屏壁纸', '动态壁纸概念'],
        prompt: '4K手机壁纸，极光下的雪山风景，星空璀璨，超高清摄影，壁纸美学'
      },
      {
        title: '礼物卡片设计',
        description: '制作生日、节日、纪念日的独特祝福卡片，传递真挚情感。',
        examples: ['生日卡片', '节日贺卡', '感谢卡', '邀请函'],
        prompt: '生日祝福卡片，温馨的蛋糕和气球，水彩画风格，柔和色彩，手绘质感'
      },
      {
        title: '同人与二创艺术',
        description: '为喜爱的作品创作同人插画，表达创意和热爱。',
        examples: ['角色同人', '场景重绘', '风格融合', 'AU设定图'],
        prompt: '动漫风格角色插画，少女在樱花树下，新海诚光影风格，细腻色彩，唯美画面'
      }
    ]
  },
  {
    category: '产品与UI/UX设计',
    icon: '💻',
    cases: [
      {
        title: 'UI界面原型',
        description: '快速生成界面设计灵感和视觉原型，加速产品设计流程。',
        examples: ['App界面概念', '网站首页设计', '仪表盘界面', '图标集合'],
        prompt: '现代移动App界面设计，简约扁平风格，清新配色，用户友好的UI布局'
      },
      {
        title: '网站横幅设计',
        description: '为网站创建吸引人的横幅、Hero区域、背景图。',
        examples: ['网站Hero图', '横幅广告', '页面背景', 'Landing页配图'],
        prompt: '网站首页大图，科技公司主题，现代办公场景，专业商务摄影，宽屏16:9'
      },
      {
        title: '产品概念可视化',
        description: '将产品创意可视化，帮助团队沟通和投资者展示。',
        examples: ['产品概念图', '功能示意图', '使用场景图', '产品渲染图'],
        prompt: '未来派智能家居设备概念图，3D渲染效果，极简设计，产品设计可视化'
      },
      {
        title: '应用图标设计',
        description: '生成App图标、功能图标的设计灵感和参考。',
        examples: ['App图标', '功能图标', '图标系统', '矢量图标'],
        prompt: '现代App图标设计，渐变色彩，圆角方形，iOS风格，专业图标设计'
      }
    ]
  },
  {
    category: '建筑与室内设计',
    icon: '🏠',
    cases: [
      {
        title: '室内设计方案',
        description: '快速生成室内设计灵感，探索不同装修风格和布局方案。',
        examples: ['客厅设计', '卧室布局', '办公空间', '商业室内'],
        prompt: '现代简约客厅设计，大落地窗，自然采光，中性色调，室内设计效果图'
      },
      {
        title: '建筑外观设计',
        description: '为建筑项目生成外观概念图和风格参考。',
        examples: ['住宅外观', '商业建筑', '地标建筑', '景观建筑'],
        prompt: '现代建筑外观，玻璃幕墙，几何线条，黄昏光线，建筑摄影视角'
      },
      {
        title: '景观园林设计',
        description: '创建园林、庭院、公共空间的景观设计方案。',
        examples: ['庭院设计', '公园景观', '屋顶花园', '广场设计'],
        prompt: '日式禅意庭院，枯山水景观，竹林小径，宁静氛围，景观设计效果图'
      },
      {
        title: '装饰与软装',
        description: '为空间搭配装饰元素，探索色彩和材质组合。',
        examples: ['墙面装饰', '家具搭配', '软装方案', '色彩搭配'],
        prompt: '北欧风格软装搭配，原木家具，绿植点缀，温馨舒适，室内装饰摄影'
      }
    ]
  },
  {
    category: '游戏与虚拟世界',
    icon: '🎮',
    cases: [
      {
        title: '游戏角色设计',
        description: '为游戏项目创建角色概念图，探索角色外观和风格。',
        examples: ['角色概念图', '装备设计', '角色立绘', '皮肤设计'],
        prompt: '奇幻游戏角色设计，精灵战士，魔法装备，全身立绘，游戏美术风格'
      },
      {
        title: '场景与地图设计',
        description: '生成游戏场景、地图的视觉概念和氛围参考。',
        examples: ['场景概念图', '关卡设计', '世界地图', '环境氛围图'],
        prompt: '游戏场景设计，废墟城市，末世氛围，细节丰富，游戏概念艺术'
      },
      {
        title: '道具与物品设计',
        description: '为游戏创建武器、装备、道具的视觉设计。',
        examples: ['武器设计', '道具图标', '装备概念', '物品插画'],
        prompt: '游戏武器设计，魔法法杖，水晶装饰，发光效果，物品概念设计'
      },
      {
        title: '游戏UI与界面',
        description: '设计游戏界面元素、按钮、背景等UI素材。',
        examples: ['游戏UI背景', '按钮设计', '界面框架', 'HUD元素'],
        prompt: '游戏UI背景，魔法主题，装饰花纹，透明质感，游戏界面设计'
      }
    ]
  },
  {
    category: '时尚与艺术',
    icon: '👗',
    cases: [
      {
        title: '服装设计概念',
        description: '探索服装设计灵感，生成款式、面料、配色的视觉参考。',
        examples: ['服装设计图', '时装秀概念', '面料纹理', '配饰设计'],
        prompt: '未来主义时装设计，金属质感面料，前卫剪裁，T台展示，时尚摄影'
      },
      {
        title: '艺术作品创作',
        description: '创作数字艺术、插画、绘画等纯艺术作品。',
        examples: ['数字绘画', '抽象艺术', '概念艺术', '视觉实验'],
        prompt: '抽象表现主义艺术，色彩碰撞，动态笔触，情感表达，当代艺术风格'
      },
      {
        title: '摄影灵感参考',
        description: '为摄影项目生成构图、光影、色调的创意参考。',
        examples: ['人像摄影参考', '风光摄影灵感', '静物摄影', '创意摄影'],
        prompt: '电影感人像摄影，低调布光，戏剧性阴影，35mm胶片质感，肖像摄影'
      },
      {
        title: '展览与装置艺术',
        description: '为艺术展览、装置艺术项目生成视觉概念。',
        examples: ['展览设计', '装置艺术', '空间艺术', '互动艺术'],
        prompt: '当代艺术装置，光影互动，沉浸式空间，艺术展览现场，概念艺术摄影'
      }
    ]
  }
];

export default function UseCasesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* 头部 */}
      <div style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', borderBottom: '1px solid #222', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🎯 AI 图像生成应用场景
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#888', maxWidth: '800px', margin: '0 auto 1rem' }}>
            发现 Nano Banana 在各行各业的实际应用，激发您的创意灵感
          </p>
          <p style={{ fontSize: '1rem', color: '#666' }}>
            从商业营销到个人创作，AI 图像生成正在改变内容创作的方式
          </p>
        </div>
      </div>

      {/* 内容区域 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* 介绍 */}
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>💡 为什么选择 AI 图像生成？</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            {[
              { icon: '⚡', title: '提升效率', desc: '从小时到秒钟，极大缩短创作时间' },
              { icon: '💰', title: '降低成本', desc: '无需聘请设计师，节省预算' },
              { icon: '🎨', title: '无限创意', desc: '快速尝试多种风格和方案' },
              { icon: '🚀', title: '即时迭代', desc: '随时调整，快速优化方案' }
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#888' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 应用场景分类 */}
        {useCases.map((category, catIndex) => (
          <div key={catIndex} style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '3rem', marginRight: '1rem' }}>{category.icon}</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#fff' }}>{category.category}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {category.cases.map((useCase, caseIndex) => (
                <div
                  key={caseIndex}
                  style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' }}>{useCase.title}</h3>
                  <p style={{ color: '#888', marginBottom: '1.25rem', lineHeight: '1.6' }}>{useCase.description}</p>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#10b981', marginBottom: '0.5rem' }}>适用于：</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {useCase.examples.map((example, i) => (
                        <span key={i} style={{ padding: '0.25rem 0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', fontSize: '0.75rem', color: '#888', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#10b981', marginBottom: '0.5rem' }}>💬 示例提示词：</h4>
                    <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic', lineHeight: '1.5' }}>
                      "{useCase.prompt}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 开始使用 */}
        <div style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', borderRadius: '1rem', padding: '3rem 2rem', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>准备好将这些场景变为现实了吗？</h2>
          <p style={{ fontSize: '1.125rem', color: '#888', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Nano Banana 让所有这些应用场景触手可及，无需专业技能，立即开始创作
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <Link
              href="/nano"
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', transition: 'transform 0.3s ease', display: 'inline-block' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              🚀 开始免费创作
            </Link>
            <Link
              href="/tutorials/beginner-guide"
              style={{ padding: '1rem 2rem', background: 'transparent', color: '#10b981', border: '2px solid #10b981', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              📖 查看新手教程
            </Link>
          </div>
        </div>
      </div>

      {/* SEO内容 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>AI 图像生成的无限可能</h2>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          Nano Banana AI 图像生成平台为各行各业提供强大而易用的视觉创作工具。无论您是市场营销人员需要快速制作社交媒体内容，内容创作者寻找博客配图，教育工作者制作教学材料，还是个人用户追求创意表达，Nano Banana 都能满足您的需求。
        </p>
        <p style={{ color: '#888', marginBottom: '1rem', lineHeight: '1.75' }}>
          我们整合了 Google Gemini 2.5 Flash 和字节豆包 SeedReam 4.0 两大先进 AI 模型，支持文字生图、图像编辑、多种艺术风格，让专业级图像生成变得简单直观。从产品设计到游戏开发，从室内设计到时尚艺术，AI 图像生成正在革新各个领域的内容创作方式。
        </p>
        <p style={{ color: '#888', lineHeight: '1.75' }}>
          完全免费，无需注册，无生成次数限制。立即体验 AI 图像生成的强大能力，将您的创意想法快速转化为精美的视觉作品。探索更多应用场景，释放您的创造力！
        </p>
      </div>
    </div>
  );
}
