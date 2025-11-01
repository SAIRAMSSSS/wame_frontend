import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        color: '#fff',
        padding: '48px 20px 24px',
        marginTop: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Main Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Logo and Social */}
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/yultimate-logo.png" alt="Y-Ultimate Logo" style={{ width: 40, height: 40 }} />
              <span>Y-Ultimate</span>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--wame-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>f</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--wame-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>𝕏</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--wame-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>in</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--wame-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>▶</a>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#fff' }}>Y-Ultimate</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Annual Reports</Link>
              <Link href="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Impact Stories</Link>
            </div>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#fff' }}>&nbsp;</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <Link href="/team" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Meet The Team</Link>
              <Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Donate</Link>
              <Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Contact Us</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#fff' }}>Contact</h4>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 12px' }}>
                41, Zamrudpur,<br />
                Greater Kailash-1,<br />
                New Delhi – 110048
              </p>
              <p style={{ margin: '0 0 8px' }}>
                <a href="tel:+919971803431" style={{ color: 'var(--wame-accent)', textDecoration: 'none' }}>+91-9971803431</a>
              </p>
              <p style={{ margin: 0 }}>
                <a href="mailto:team@yultimate.org" style={{ color: 'var(--wame-accent)', textDecoration: 'none' }}>team@yultimate.org</a>
              </p>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px' }}>
            Registered as "Flyingdisc Development Foundation" under Section 8 of Indian Companies Act, 2013 and exempted under Section 80(g) of the Income Tax Act, 1961.
          </p>
          <p style={{ margin: 0 }}>
            Y-Ultimate © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
