import Layout from '../components/Layout'

export default function Team() {
  return (
    <Layout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Inter, sans-serif', color: 'var(--wame-text)' }}>
        <h1 style={{ fontSize: 42, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Meet Our Team
        </h1>
        <p style={{ fontSize: 20, color: 'var(--wame-muted)', lineHeight: 1.8, marginBottom: 48 }}>
          Meet our family that strives to spread Ultimate Frisbee and empower youth through sports education.
        </p>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--wame-accent), var(--wame-teal))',
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              S
            </div>
            <h3 style={{ fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '8px 0 4px' }}>
              Senju
            </h3>
            <div style={{ fontSize: 14, color: 'var(--wame-muted)' }}>Co-founder & Lead Developer</div>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginTop: 12, lineHeight: 1.6 }}>
              Full-stack engineer passionate about sports tech and community building.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--wame-teal), var(--wame-accent))',
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              L
            </div>
            <h3 style={{ fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '8px 0 4px' }}>
              Lakshmikanthan
            </h3>
            <div style={{ fontSize: 14, color: 'var(--wame-muted)' }}>Co-founder & Backend Architect</div>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginTop: 12, lineHeight: 1.6 }}>
              Expert in Django, Supabase, and scalable API design for real-time systems.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--wame-accent), var(--wame-dark))',
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              N
            </div>
            <h3 style={{ fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '8px 0 4px' }}>
              Nikesh
            </h3>
            <div style={{ fontSize: 14, color: 'var(--wame-muted)' }}>Co-founder & Frontend Lead</div>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginTop: 12, lineHeight: 1.6 }}>
              Specializes in Next.js, PWA, and user-centric UI/UX design.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--wame-teal), var(--wame-dark))',
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              R
            </div>
            <h3 style={{ fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '8px 0 4px' }}>
              Rahul
            </h3>
            <div style={{ fontSize: 14, color: 'var(--wame-muted)' }}>Co-founder & Operations</div>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginTop: 12, lineHeight: 1.6 }}>
              Manages partnerships, support, and ensures smooth event rollouts.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 48, padding: 24, background: '#fff', borderRadius: 10, border: '1px solid #ddd' }}>
          <h2 style={{ fontSize: 24, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
            Join our team
          </h2>
          <p style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
            We're always looking for talented developers, designers, and sports enthusiasts to help us build the future of tournament management. If you're passionate about community sports and technology, reach out to us at{' '}
            <a href="mailto:careers@wame.example" style={{ color: 'var(--wame-teal)' }}>
              careers@wame.example
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  )
}
