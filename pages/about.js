import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Inter, sans-serif', color: 'var(--wame-text)' }}>
        <h1 style={{ fontSize: 42, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          About Y-Ultimate
        </h1>
        <p style={{ fontSize: 20, color: 'var(--wame-muted)', lineHeight: 1.8, marginBottom: 40 }}>
          Empowering youth through Ultimate Frisbee — teaching life skills, building confidence, and creating opportunities for children from lesser privileged backgrounds.
        </p>

        {/* Hero Image Placeholder */}
        <div style={{ background: 'linear-gradient(135deg, var(--wame-dark), var(--wame-teal))', height: 300, borderRadius: 12, marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 64 }}>
          🥏
        </div>

        <h2 style={{ fontSize: 32, marginTop: 48, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our Story
        </h2>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16, marginBottom: 16 }}>
          Y-Ultimate began with a simple belief: that sports can be a powerful tool for social transformation. Founded in Delhi, our organization recognized that many talented and energetic children from underprivileged communities lacked access to structured sports programs and the life skills education that comes with them.
        </p>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16, marginBottom: 16 }}>
          Ultimate Frisbee, with its core principle of "Spirit of the Game" (self-officiated play emphasizing sportsmanship and fair play), proved to be the perfect vehicle for our mission. The sport naturally teaches teamwork, communication, conflict resolution, and mutual respect — values that extend far beyond the playing field.
        </p>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16 }}>
          Over the years, we've grown from a small initiative in Greater Kailash to a recognized non-profit organization working across Delhi NCR, touching the lives of hundreds of children and giving them skills, confidence, and opportunities they never imagined possible.
        </p>

        <h2 style={{ fontSize: 32, marginTop: 48, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our Mission
        </h2>
        <div style={{ background: 'var(--wame-accent)', padding: 32, borderRadius: 12, marginBottom: 32 }}>
          <p style={{ color: 'var(--wame-dark)', lineHeight: 1.8, fontSize: 18, fontWeight: 600, margin: 0, textAlign: 'center' }}>
            To impart life skills education in children, especially those from lesser privileged socio-economic backgrounds, through the sport of Ultimate Frisbee.
          </p>
        </div>

        <h2 style={{ fontSize: 32, marginTop: 48, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our Approach: The Playbook
        </h2>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16, marginBottom: 24 }}>
          Our structured "Playbook" methodology integrates Ultimate Frisbee training with comprehensive life skills development:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 32 }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 10, border: '2px solid var(--wame-accent)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>Athletic Skills</h3>
            <p style={{ fontSize: 15, color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              Teaching throwing, catching, positioning, strategy, and game sense through structured practice sessions.
            </p>
          </div>
          <div style={{ background: '#fff', padding: 24, borderRadius: 10, border: '2px solid var(--wame-teal)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-teal)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>Life Skills</h3>
            <p style={{ fontSize: 15, color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              Building leadership, communication, problem-solving, and teamwork through intentional coaching and reflection.
            </p>
          </div>
          <div style={{ background: '#fff', padding: 24, borderRadius: 10, border: '2px solid var(--wame-dark)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>Character Development</h3>
            <p style={{ fontSize: 15, color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              Instilling values of integrity, respect, perseverance, and self-discipline through the Spirit of the Game philosophy.
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: 32, marginTop: 48, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our Impact
        </h2>
        <div style={{ background: 'linear-gradient(135deg, var(--wame-dark), var(--wame-teal))', padding: 40, borderRadius: 12, color: '#fff', marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--wame-accent)', marginBottom: 8 }}>500+</div>
              <div style={{ fontSize: 16 }}>Children Empowered</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--wame-accent)', marginBottom: 8 }}>10+</div>
              <div style={{ fontSize: 16 }}>Years of Impact</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--wame-accent)', marginBottom: 8 }}>15+</div>
              <div style={{ fontSize: 16 }}>Dedicated Coaches</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--wame-accent)', marginBottom: 8 }}>Multiple</div>
              <div style={{ fontSize: 16 }}>Community Partners</div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 32, marginTop: 48, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our Values
        </h2>
        <ul style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16 }}>
          <li><strong>Inclusivity:</strong> Creating safe, welcoming spaces for all children regardless of gender, background, or ability level.</li>
          <li><strong>Empowerment:</strong> Building confidence and self-belief through skill development and positive reinforcement.</li>
          <li><strong>Integrity:</strong> Upholding the Spirit of the Game values in all our interactions and programs.</li>
          <li><strong>Community:</strong> Fostering connections, friendships, and support networks among participants.</li>
          <li><strong>Excellence:</strong> Striving for high-quality coaching and continuous improvement in our programs.</li>
        </ul>

        <h2 style={{ fontSize: 32, marginTop: 48, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Recognition & Media
        </h2>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16, marginBottom: 16 }}>
          Our work has been recognized by leading media outlets including:
        </p>
        <ul style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16 }}>
          <li><strong>Indian Express:</strong> Featured for breaking gender barriers through Ultimate Frisbee</li>
          <li><strong>The Better India:</strong> Highlighted for helping children study and escape negative influences</li>
          <li><strong>The Hindu:</strong> Profiled in "Of Flying Discs and Dreams"</li>
          <li><strong>The Patriot:</strong> Coverage of our youth empowerment programs</li>
        </ul>

        <h2 style={{ fontSize: 32, marginTop: 48, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Legal Status
        </h2>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 15, background: 'var(--wame-bg)', padding: 20, borderRadius: 8 }}>
          Y-Ultimate is registered as <strong>Flyingdisc Development Foundation</strong> under Section 8 of the Indian Companies Act, 2013 and is exempted under Section 80(g) of the Income Tax Act, 1961. All donations are tax-deductible.
        </p>

        {/* Call to Action */}
        <div style={{ marginTop: 56, textAlign: 'center', padding: 40, background: 'var(--wame-bg)', borderRadius: 12 }}>
          <h3 style={{ fontSize: 28, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginTop: 0, marginBottom: 16 }}>
            Join Our Mission
          </h3>
          <p style={{ fontSize: 16, color: 'var(--wame-muted)', marginBottom: 24, maxWidth: 600, margin: '0 auto 24px' }}>
            Whether you want to volunteer, donate, or partner with us, there are many ways to support Y-Ultimate's mission.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ padding: '14px 28px', background: 'var(--wame-accent)', color: 'var(--wame-dark)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
              Get Involved
            </a>
            <a href="/team" style={{ padding: '14px 28px', border: '2px solid var(--wame-teal)', borderRadius: 8, color: 'var(--wame-dark)', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>
              Meet Our Team
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
