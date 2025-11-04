import Link from 'next/link'

export default function Hero({
  title = 'Y-Ultimate',
  subtitle = 'Empowering underprivileged children through Ultimate Frisbee',
  ctaPrimary = { text: 'Get Involved', href: '/get-involved' },
  ctaSecondary = { text: 'Donate', href: '/donate' }
}) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 720 : false

  return (
    <section className="hero" style={{ padding: isMobile ? '3rem 1rem' : '6rem 1rem', position: 'relative' }}>
      <div style={{ textAlign: 'center', color: '#fff', zIndex: 10 }}>
        <img src="/yultimate-logo.png" alt="Y-Ultimate" style={{ width: isMobile ? 90 : 140, height: isMobile ? 90 : 140, marginBottom: 20, filter: 'drop-shadow(2px 4px 12px rgba(0,0,0,0.6))' }} />
        <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 700, fontFamily: 'Poppins, sans-serif', marginBottom: 12 }}>{title}</h1>
        <p style={{ fontSize: isMobile ? 14 : 18, color: 'rgba(255,255,255,0.95)', marginBottom: 24 }}>{subtitle}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href={ctaPrimary.href}>
            <button className="accent-button">{ctaPrimary.text}</button>
          </Link>
          <Link href={ctaSecondary.href}>
            <button className="teal-button">{ctaSecondary.text}</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
