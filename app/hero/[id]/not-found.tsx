import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      background: '#F6F3E8'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#17120E' }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#17120E' }}>Герой не знайдений</h2>
      <p style={{ marginBottom: '30px', color: '#17120E' }}>На жаль, інформація про цього героя недоступна.</p>
      <Link 
        href="/fined-heroe" 
        style={{ 
          padding: '12px 24px', 
          background: '#17120E', 
          color: '#FFF', 
          textDecoration: 'none', 
          borderRadius: '4px',
          transition: 'opacity 0.3s'
        }}
      >
        Повернутися до списку героїв
      </Link>
    </div>
  )
}

