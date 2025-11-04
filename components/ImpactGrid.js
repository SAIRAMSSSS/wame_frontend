export default function ImpactGrid({ stories = [] }) {
  const sample = stories.length ? stories : [
    { date: 'JUL 14, 2023', title: "Manjeet's Journey", image: '/impact1.jpg' },
    { date: 'JUL 14, 2023', title: "Sapna's Journey", image: '/impact2.jpg' },
    { date: 'JUN 28, 2023', title: "Anita's Journey", image: '/impact3.jpg' }
  ]

  return (
    <section className="container" style={{ padding: '40px 12px' }}>
      <h2 style={{ textAlign: 'center', fontSize: 28, marginBottom: 8, fontFamily: 'Poppins, sans-serif' }}>Our Impact</h2>
      <p style={{ textAlign: 'center', color: 'var(--wame-muted)', marginBottom: 24 }}>Stories from the ground</p>

      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {sample.map((s, i) => (
          <article key={i} className="card-hover" style={{ background:'#fff', borderRadius:12, overflow:'hidden', boxShadow:'0 6px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 200, background: s.image ? `url(${s.image}) center/cover` : '#eee' }} />
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginBottom: 6 }}>{s.date}</div>
              <h3 style={{ margin: 0, fontSize: 18, fontFamily: 'Poppins, sans-serif' }}>{s.title}</h3>
              <p style={{ color: 'var(--wame-muted)', marginTop: 8 }}>Read how this program changed lives.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
