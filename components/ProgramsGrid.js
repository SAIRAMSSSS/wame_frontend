import Link from 'next/link'

export default function ProgramsGrid({ programs = [] }) {
  const sample = programs.length ? programs : [
    { title: 'School Program', desc: 'Weekly coaching in schools', slug: '/programs/school' },
    { title: 'Weekend Clinics', desc: 'Open clinics for beginners', slug: '/programs/clinics' },
    { title: 'Tournaments', desc: 'Inter-school tournaments', slug: '/programs/tournaments' }
  ]

  return (
    <section className="container" style={{ padding: '40px 12px' }}>
      <h2 style={{ textAlign: 'center', fontSize: 28, marginBottom: 8, fontFamily: 'Poppins, sans-serif' }}>Our Programs</h2>
      <p style={{ textAlign: 'center', color: 'var(--wame-muted)', marginBottom: 24 }}>Programs designed to teach life skills through sport.</p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {sample.map((p, i) => (
          <div key={i} className="card-hover" style={{ padding: 18, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: 0, fontSize: 18, fontFamily: 'Poppins, sans-serif' }}>{p.title}</h3>
            <p style={{ color: 'var(--wame-muted)', marginTop: 8 }}>{p.desc}</p>
            <div style={{ marginTop: 12 }}>
              <Link href={p.slug} className="accent-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
