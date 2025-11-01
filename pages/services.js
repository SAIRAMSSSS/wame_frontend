import Layout from '../components/Layout'

export default function Services() {
  return (
    <Layout>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Inter, sans-serif', color: 'var(--wame-text)' }}>
        <h1 style={{ fontSize: 36, marginBottom: 12, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Services & Offerings
        </h1>
        <p style={{ fontSize: 18, color: 'var(--wame-muted)', lineHeight: 1.7 }}>
          WAME provides a comprehensive platform for managing every aspect of your tournament lifecycle.
        </p>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Tournament Setup
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.6, fontSize: 15 }}>
              Fast creation and templating for recurring events. Set up pools, schedules, and fields in minutes, not hours.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Registration & Rosters
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.6, fontSize: 15 }}>
              Managed signups, approvals, and team linking. Players and coaches register online; directors approve and assign teams instantly.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Live Scoring & Leaderboards
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.6, fontSize: 15 }}>
              Real-time results streamed to all participants. Automated standings computation and tie-breakers keep everyone informed.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Spirit & Feedback
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.6, fontSize: 15 }}>
              Mandatory spirit scoring workflows ensure fairness. Anonymous feedback channels promote sportsmanship and continuous improvement.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Offline Support
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.6, fontSize: 15 }}>
              Mobile and kiosk-friendly PWA for low-connectivity venues. Volunteers can score and update even without internet; changes sync automatically.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Analytics & Reporting
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.6, fontSize: 15 }}>
              Post-event insights: player stats, spirit trends, and tournament summaries. Export data for coaches and organizers.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a
            href="/contact"
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
            Request a demo
          </a>
        </div>
      </div>
    </Layout>
  )
}
