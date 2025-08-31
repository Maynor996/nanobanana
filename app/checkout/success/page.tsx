'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟获取支付详情
    setTimeout(() => {
      setPaymentDetails({
        id: paymentIntentId || 'pi_mock_123',
        amount: 5599,
        currency: 'usd',
        plan: '无限年付版',
        credits: '无限',
        customerEmail: 'test@example.com'
      })
      setLoading(false)
    }, 1000)
  }, [paymentIntentId])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'spin 2s linear infinite'
          }}>⏳</div>
          <h2>正在验证支付结果...</h2>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* 成功图标 */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1.5rem',
          animation: 'bounce 1s ease-in-out'
        }}>
          🎉
        </div>

        {/* 成功标题 */}
        <h1 style={{
          color: '#10b981',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          支付成功！
        </h1>

        <p style={{
          color: '#666',
          fontSize: '1.1rem',
          marginBottom: '2rem'
        }}>
          恭喜！你已成功购买 Nano Banana AI 图像生成服务
        </p>

        {/* 支付详情 */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>📋 购买详情</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#666' }}>套餐:</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>{paymentDetails.plan}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#666' }}>AI积分:</span>
            <span style={{ fontWeight: 'bold', color: '#10b981' }}>{paymentDetails.credits}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#666' }}>支付金额:</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>
              ${(paymentDetails.amount / 100).toFixed(2)} USD
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#666' }}>邮箱:</span>
            <span style={{ color: '#333' }}>{paymentDetails.customerEmail}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>订单号:</span>
            <span style={{ color: '#333', fontSize: '0.9rem' }}>{paymentDetails.id}</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.href = '/nano'}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            🚀 开始使用
          </button>
          <button
            onClick={() => window.location.href = '/pricing'}
            style={{
              backgroundColor: 'transparent',
              color: '#10b981',
              border: '2px solid #10b981',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            📊 查看套餐
          </button>
        </div>

        {/* 感谢信息 */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#eff6ff',
          borderRadius: '0.5rem',
          color: '#1e40af'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            🎁 感谢选择 Nano Banana！你的支持让我们能够持续改进AI图像生成技术。
          </p>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <h2>加载中...</h2>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}

 