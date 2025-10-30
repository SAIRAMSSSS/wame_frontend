import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Inter, sans-serif', color: 'var(--wame-text)' }}>
        <h1 style={{ fontSize: 36, marginBottom: 12, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          About WAME
        </h1>
        <p style={{ fontSize: 18, color: 'var(--wame-muted)', lineHeight: 1.7 }}>
          WAME is a mission-driven technology company focused on simplifying sports tournament operations for community organizers, schools, and leagues.
        </p>

        <h2 style={{ fontSize: 28, marginTop: 32, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our story
        </h2>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
          Founded by a team of passionate developers and sports enthusiasts, WAME was born out of frustration with the fragmented, manual tournament workflows that plagued community events. We saw directors juggling spreadsheets, volunteers struggling with poor connectivity, and participants left in the dark about live scores and schedules.
        </p>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
          We built WAME to provide a single, unified platform that brings together registration, scheduling, live scoring, and spirit tracking — all accessible from any device, even offline.
        </p>

        <h2 style={{ fontSize: 28, marginTop: 32, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our mission
        </h2>
        <p style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
          To empower community organizers and volunteers with technology that reduces administrative overhead, improves participant experience, and promotes fairness and sportsmanship through transparent, data-driven processes.
        </p>

        <h2 style={{ fontSize: 28, marginTop: 32, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Our values
        </h2>
        <ul style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
          <li><strong>Community first:</strong> we design for volunteers and participants, not just admins.</li>
          <li><strong>Simplicity:</strong> powerful features delivered through intuitive, easy-to-use interfaces.</li>
          <li><strong>Reliability:</strong> offline-first architecture so your event runs smoothly even with spotty connectivity.</li>
          <li><strong>Transparency:</strong> open data, clear leaderboards, and fair spirit scoring for all.</li>
        </ul>
      </div>
    </Layout>
  )
}
