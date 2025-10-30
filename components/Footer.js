export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--wame-dark)',
        color: '#fff',
        padding: '2rem',
        marginTop: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: 14,
        }}
      >
        <div>© {new Date().getFullYear()} WAME · Y‑Ultimate Tournament Manager</div>
        <div style={{ color: 'var(--wame-accent)', fontWeight: 600 }}>
          Built with Next.js • Django • Supabase
        </div>
      </div>
    </footer>
  )
}
