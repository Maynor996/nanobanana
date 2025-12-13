'use client'

export default function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(0, 212, 170, 0.3)',
      padding: '12px 20px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <a
        href="https://link3.cc/maynorai"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#00d4aa',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          padding: '8px 16px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(138, 43, 226, 0.1))',
          border: '1px solid rgba(0, 212, 170, 0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.2), rgba(138, 43, 226, 0.2))'
          e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.5)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(138, 43, 226, 0.1))'
          e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.2)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <span style={{ fontSize: '18px' }}>🔗</span>
        <span>Maynor AI - 更多 AI 工具</span>
        <span style={{ fontSize: '16px' }}>→</span>
      </a>
    </footer>
  )
}
