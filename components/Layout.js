import Link from 'next/link'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wame-bg)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header / Nav */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '1rem 2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--wame-dark)', fontSize: 24, fontWeight: 700, fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/yultimate-logo.png" alt="Y-Ultimate Logo" style={{ width: 50, height: 50 }} />
            <span>Y-Ultimate</span>
          </Link>

          <nav style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--wame-dark)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Home</Link>
            <Link href="/about" style={{ color: 'var(--wame-dark)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Annual Reports and Financials</Link>
            <Link href="/about" style={{ color: 'var(--wame-dark)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Impact Stories</Link>
            <Link href="/team" style={{ color: 'var(--wame-dark)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Meet The Team</Link>
            <Link href="/contact" style={{ color: 'var(--wame-dark)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Donate</Link>
            <Link href="/contact" style={{ color: 'var(--wame-dark)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Contact Us</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
