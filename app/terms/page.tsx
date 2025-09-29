'use client'

export default function TermsPage() {
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
          📋 服务条款
        </h1>

        <div style={{ lineHeight: '1.6', color: '#ccc' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>服务说明</h2>
            <p>
              Nano Banana 是一个基于人工智能的图像生成和编辑平台，为用户提供：
            </p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>文字描述生成图像功能</li>
              <li>图像编辑和风格转换</li>
              <li>多种 AI 模型选择</li>
              <li>高质量图像输出</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>使用规则</h2>
            <p>使用我们的服务时，您需要遵守以下规则：</p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>不得生成违法、有害或不当内容</li>
              <li>不得侵犯他人知识产权</li>
              <li>不得恶意使用或滥用服务</li>
              <li>遵守相关法律法规</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>免费服务</h2>
            <p>Nano Banana 完全免费提供：</p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>无限制的图像生成功能</li>
              <li>所有 AI 模型免费使用</li>
              <li>通过广告收入维持运营</li>
              <li>持续优化和更新服务</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>知识产权</h2>
            <p>关于内容版权：</p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>您对上传的内容拥有版权</li>
              <li>生成的图像版权归您所有</li>
              <li>我们保留改进服务的技术权利</li>
              <li>禁止逆向工程或复制我们的技术</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>免责声明</h2>
            <p>请注意：</p>
            <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
              <li>AI 生成内容可能不完全准确</li>
              <li>服务可能因技术原因中断</li>
              <li>我们不对生成内容的商业使用承担责任</li>
              <li>用户应当合理使用生成的内容</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>服务变更</h2>
            <p>
              我们保留修改服务条款的权利，重大变更会提前通知用户。
              继续使用服务即表示您接受新的条款。
            </p>
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