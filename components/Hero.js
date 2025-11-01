export default function Hero({ title, subtitle, ctaText, ctaHref = '#' }) {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--wame-dark) 0%, var(--wame-teal) 100%)',
        color: '#fff',
        padding: '4rem 2rem',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--wame-accent)',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: '1rem 0 2rem',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {subtitle}
        </p>
        {ctaText && (
          <a
            href={ctaHref}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--wame-accent)',
              color: 'var(--wame-dark)',
              borderRadius: 10,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
