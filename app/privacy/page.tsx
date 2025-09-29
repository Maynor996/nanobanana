'use client'

export default function PrivacyPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #10b981, #00a3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🔒 隐私政策
        </h1>

        <div style={{ lineHeight: '1.6', color: '#ccc' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>信息收集</h2>
            <p>
              我们的 AI 图像生成服务可能收集以下信息：
            </p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>您提供的文本提示和上传的图片</li>
              <li>生成的图像数据和使用统计</li>
              <li>设备信息和IP地址</li>
              <li>Cookie 和本地存储数据</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>信息使用</h2>
            <p>我们使用收集的信息用于：</p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>提供和改进 AI 图像生成服务</li>
              <li>个性化用户体验</li>
              <li>分析服务使用情况</li>
              <li>防止滥用和确保服务安全</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>第三方服务</h2>
            <p>我们的网站使用以下第三方服务：</p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li><strong>Google AdSense</strong> - 展示相关广告</li>
              <li><strong>Google Analytics</strong> - 网站使用分析</li>
              <li><strong>广告平台</strong> - 展示相关广告内容</li>
              <li><strong>AI API 服务</strong> - 图像生成功能</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>Cookie 使用</h2>
            <p>
              我们使用 Cookie 来改善您的体验，包括：
            </p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>记住您的偏好设置</li>
              <li>分析网站使用情况</li>
              <li>提供相关广告内容</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>用户权利</h2>
            <p>您有权：</p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>访问、更正或删除您的个人数据</li>
              <li>撤回对数据处理的同意</li>
              <li>要求数据可移植性</li>
              <li>向相关监管机构投诉</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>联系我们</h2>
            <p>
              如果您对我们的隐私政策有任何问题，请通过以下方式联系我们：
            </p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>邮箱：privacy@nanobanana.com</li>
              <li>地址：[您的公司地址]</li>
            </ul>
          </section>

          <section>
            <p style={{ color: '#888', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>
              最后更新日期：2024年9月29日
            </p>
          </section>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={() => window.location.href = '/nano'}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            返回应用
          </button>
        </div>
      </div>
    </div>
  )
}