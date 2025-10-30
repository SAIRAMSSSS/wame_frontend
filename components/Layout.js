import { useState } from 'react'
import Link from 'next/link'
import LoginModal from './LoginModal'
import Footer from './Footer'

export default function Layout({ children }) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginRole, setLoginRole] = useState('student')

  const openLogin = (role) => {
    setLoginRole(role)
    setLoginOpen(true)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wame-bg)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header / Nav */}
      <header style={{ background: 'var(--wame-dark)', color: '#fff', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--wame-accent)', fontSize: 24, fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
            WAME
          </Link>

          <nav style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Home</Link>
            <Link href="/about" style={{ color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>About</Link>
            <Link href="/services" style={{ color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Services</Link>
            <Link href="/team" style={{ color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Team</Link>
            <Link href="/contact" style={{ color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Contact</Link>
          </nav>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => openLogin('student')} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--wame-accent)', color: 'var(--wame-dark)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Student</button>
            <button onClick={() => openLogin('coach')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--wame-teal)', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Coach</button>
            <button onClick={() => openLogin('volunteer')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--wame-teal)', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Volunteer</button>
            <button onClick={() => openLogin('admin')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ffd4d4', background: 'rgba(255,100,100,0.15)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Admin</button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Login modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} defaultRole={loginRole} />
    </div>
  )
}
