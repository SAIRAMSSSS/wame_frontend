import React from 'react'
import Hero from './Hero'

export default function HomePage() {
  return (
    <React.Fragment>
      {/* Main Hero */}
      <Hero
        title="The Ultimate Tournament Platform"
        subtitle="Unified registration, realtime scoring, automated spirit tracking. Built for Y-Ultimate directors, volunteers, coaches and players."
        ctaText="Get started"
        ctaHref="/contact"
      />

      {/* Tagline / Mission */}
      <section style={{ background: 'var(--wame-accent)', color: 'var(--wame-dark)', padding: '2rem', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20 }}>
        Managing tournaments shouldn't be harder than playing the game.
      </section>

      {/* Tournament Season Timeline */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Inter, sans-serif' }}>
        <h2 style={{ fontSize: 32, marginBottom: 24, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
          2026 Tournament Season
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '2px solid var(--wame-accent)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 12, color: 'var(--wame-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Feb - Mar</div>
            <h3 style={{ fontSize: 20, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif', margin: '0 0 8px' }}>Early Registration</h3>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', lineHeight: 1.6, margin: 0 }}>
              Teams register, rosters lock, and tournament brackets are set. Directors finalize schedules.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '2px solid var(--wame-teal)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 12, color: 'var(--wame-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>April - June</div>
            <h3 style={{ fontSize: 20, color: 'var(--wame-teal)', fontFamily: 'Poppins, sans-serif', margin: '0 0 8px' }}>Regional Qualifiers</h3>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', lineHeight: 1.6, margin: 0 }}>
              Top teams compete in regional tournaments. Live scoring and spirit tracking for all matches.
            </p>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '2px solid var(--wame-dark)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 12, color: 'var(--wame-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>July - August</div>
            <h3 style={{ fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 8px' }}>National Championships</h3>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', lineHeight: 1.6, margin: 0 }}>
              The best teams from qualifiers compete for the national title. Real-time leaderboards and stats.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Events / Tournaments */}
      <div style={{ background: 'var(--wame-bg)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, marginBottom: 24, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
            Featured Tournaments
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--wame-dark), var(--wame-teal))', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
                Spring Invitational
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 13, color: 'var(--wame-muted)', marginBottom: 8 }}>March 15-17, 2026 · Boston, MA</div>
                <p style={{ fontSize: 15, color: 'var(--wame-text)', lineHeight: 1.6, margin: '0 0 12px' }}>
                  32 teams compete in a weekend showcase featuring live scoring, spirit awards, and player stats.
                </p>
                <a href="/contact" style={{ display: 'inline-block', padding: '8px 14px', background: 'var(--wame-accent)', color: 'var(--wame-dark)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                  Register now
                </a>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--wame-accent), var(--wame-teal))', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wame-dark)', fontSize: 24, fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
                Summer Classic
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 13, color: 'var(--wame-muted)', marginBottom: 8 }}>June 20-22, 2026 · Austin, TX</div>
                <p style={{ fontSize: 15, color: 'var(--wame-text)', lineHeight: 1.6, margin: '0 0 12px' }}>
                  Top regional teams battle for a spot at Nationals. Automated leaderboards and spirit tracking.
                </p>
                <a href="/contact" style={{ display: 'inline-block', padding: '8px 14px', background: 'var(--wame-teal)', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                  Learn more
                </a>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--wame-teal), var(--wame-dark))', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
                National Finals
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 13, color: 'var(--wame-muted)', marginBottom: 8 }}>August 10-12, 2026 · Denver, CO</div>
                <p style={{ fontSize: 15, color: 'var(--wame-text)', lineHeight: 1.6, margin: '0 0 12px' }}>
                  The ultimate showdown. 16 elite teams compete for the national championship title.
                </p>
                <a href="/services" style={{ display: 'inline-block', padding: '8px 14px', background: 'var(--wame-dark)', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                  View details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News & Updates */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Inter, sans-serif' }}>
        <h2 style={{ fontSize: 32, marginBottom: 24, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
          Latest News & Updates
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd' }}>
            <div style={{ fontSize: 12, color: 'var(--wame-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Tournament Update</div>
            <h3 style={{ fontSize: 18, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 10px' }}>
              2026 Season Schedule Released
            </h3>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', lineHeight: 1.6, margin: '0 0 12px' }}>
              View the complete 2026 tournament season schedule, including regional qualifiers and national championships.
            </p>
            <a href="/about" style={{ fontSize: 14, color: 'var(--wame-teal)', fontWeight: 600 }}>Read more →</a>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd' }}>
            <div style={{ fontSize: 12, color: 'var(--wame-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Product Release</div>
            <h3 style={{ fontSize: 18, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 10px' }}>
              New Mobile App Features
            </h3>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', lineHeight: 1.6, margin: '0 0 12px' }}>
              Enhanced offline mode and instant push notifications for live scores. Download the latest update today.
            </p>
            <a href="/services" style={{ fontSize: 14, color: 'var(--wame-teal)', fontWeight: 600 }}>Learn more →</a>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd' }}>
            <div style={{ fontSize: 12, color: 'var(--wame-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Community</div>
            <h3 style={{ fontSize: 18, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 10px' }}>
              Spirit of the Game Awards
            </h3>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', lineHeight: 1.6, margin: '0 0 12px' }}>
              Congratulations to the 2025 Spirit Award winners. See the top teams recognized for sportsmanship and fair play.
            </p>
            <a href="/team" style={{ fontSize: 14, color: 'var(--wame-teal)', fontWeight: 600 }}>View winners →</a>
          </div>
        </div>
      </div>

      {/* About / Platform Overview */}
      <div style={{ background: '#fff', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
          <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'start' }}>
            <div style={{ color: 'var(--wame-text)' }}>
              <h2 style={{ fontSize: 28, marginBottom: 12, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
                Why WAME?
              </h2>
              <p style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
                WAME is a mission-driven technology company focused on simplifying sports tournament operations for community organizers, schools, and leagues. We combine an easy-to-use Progressive Web App experience with robust backend services so organizers can focus on the event — not on spreadsheets.
              </p>

            <h3 style={{ marginTop: 24, fontSize: 22, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              What we do
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              We deliver a single platform that handles registration, scheduling, live scoring, spirit and performance tracking, and participant communications. Our system gives directors real-time visibility, automates manual workflows, and provides participants with timely updates and historical performance data.
            </p>

            <h3 style={{ marginTop: 24, fontSize: 22, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Who we serve
            </h3>
            <ul style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              <li>Community tournament directors and volunteers</li>
              <li>School athletic departments and club organizers</li>
              <li>Coaches and team managers tracking player development</li>
              <li>Players who want clear stats and spirit feedback</li>
            </ul>

            <h3 style={{ marginTop: 24, fontSize: 22, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Services & offerings
            </h3>
            <ul style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              <li><strong>Tournament Setup:</strong> fast creation and templating for recurring events.</li>
              <li><strong>Registration & Rosters:</strong> managed signups, approvals and team linking.</li>
              <li><strong>Live Scoring & Leaderboards:</strong> real-time results, automated standings and tie-breakers.</li>
              <li><strong>Spirit & Feedback:</strong> mandatory spirit scoring workflows and anonymous feedback channels.</li>
              <li><strong>Offline Support:</strong> mobile and kiosk-friendly PWA for low-connectivity venues.</li>
            </ul>

            <h3 style={{ marginTop: 24, fontSize: 22, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              How we add value
            </h3>
            <ol style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              <li>Reduce administrative load by replacing fragmented spreadsheets with a single source of truth.</li>
              <li>Improve participant experience with realtime updates and transparent leaderboards.</li>
              <li>Boost fairness and player development with structured spirit and performance tracking.</li>
            </ol>

            <h3 style={{ marginTop: 24, fontSize: 22, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Get started
            </h3>
            <p style={{ color: 'var(--wame-muted)', lineHeight: 1.7 }}>
              To evaluate WAME for your event, request a demo or sign up for a trial. Our team will help onboard your tournament and ensure the app fits your workflow.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              <a
                href="/contact"
                style={{
                  padding: '10px 16px',
                  background: 'var(--wame-accent)',
                  color: 'var(--wame-dark)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Request a demo
              </a>
              <a
                href="/services"
                style={{
                  padding: '10px 16px',
                  border: '1px solid var(--wame-teal)',
                  borderRadius: 8,
                  color: 'var(--wame-dark)',
                  textDecoration: 'none',
                  fontSize: 15,
                }}
              >
                View services
              </a>
            </div>
          </div>

          <aside
            style={{
              background: '#fff',
              padding: 20,
              borderRadius: 10,
              border: '1px solid #ddd',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <h3 style={{ marginTop: 0, fontSize: 18, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Why choose WAME
            </h3>
            <ul style={{ color: 'var(--wame-muted)', fontSize: 14, lineHeight: 1.6 }}>
              <li>Purpose-built for community sports and tournaments.</li>
              <li>Fast deployment with minimal setup and optional Supabase integration.</li>
              <li>Designed for volunteers — offline-capable and mobile-first.</li>
              <li>Transparent pricing and flexible support for events of any size.</li>
            </ul>

            <h4 style={{ marginTop: 20, fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Our team
            </h4>
            <div style={{ fontSize: 13, color: 'var(--wame-muted)' }}>
              <div style={{ fontWeight: 700, color: 'var(--wame-dark)' }}>Founders</div>
              <div style={{ marginTop: 6 }}>Senju · Lakshmikanthan · Nikesh · Rahul</div>
              <div style={{ marginTop: 10 }}>
                We're a small, dedicated team focused on building tools that help organizers run better events.
              </div>
            </div>

            <h4 style={{ marginTop: 20, fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Contact
            </h4>
            <div style={{ fontSize: 13, color: 'var(--wame-muted)' }}>
              <div id="contact">
                Email: <a href="mailto:hello@wame.example" style={{ color: 'var(--wame-teal)' }}>hello@wame.example</a>
              </div>
              <div style={{ marginTop: 6 }}>Phone: +1 (555) 123‑4567</div>
            </div>
          </aside>
        </section>
      </div>
      </div>


      {/* Partner / Sponsor Section */}
      <div style={{ background: 'var(--wame-dark)', color: '#fff', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, marginBottom: 24, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif' }}>
            Proud Partners
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif' }}>Supabase</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>Vercel</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-teal)', fontFamily: 'Poppins, sans-serif' }}>Next.js</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>Django</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-accent)', fontFamily: 'Poppins, sans-serif' }}>Socket.io</div>
          </div>
          <p style={{ marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
            Interested in partnering with WAME? <a href="/contact" style={{ color: 'var(--wame-accent)', fontWeight: 600 }}>Get in touch</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}
