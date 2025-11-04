import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();
  const [hoveredSection, setHoveredSection] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero Section with Banner Image */}
      <div style={{ position: 'relative', height: 500, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("/frisbee-banner.jpg") center/cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#fff', zIndex: 10 }}>
          <img src="/yultimate-logo.png" alt="Y-Ultimate Logo" style={{ width: 150, height: 150, marginBottom: 20, filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.5))' }} />
          <h1 style={{ fontSize: 56, fontWeight: 700, fontFamily: 'Poppins, sans-serif', marginBottom: 16, textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            Y-Ultimate
          </h1>
          <p style={{ fontSize: 20, fontFamily: 'Inter, sans-serif', marginBottom: 32, textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Empowering underprivileged children through Ultimate Frisbee
          </p>
          <Link href="/student/register">
            <button style={{ padding: '14px 32px', fontSize: 16, fontWeight: 600, color: '#fff', background: '#A5BF13', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 12px rgba(165,191,19,0.4)', transition: 'all 0.3s' }}
              onMouseOver={(e) => e.target.style.background = '#8fa30f'}
              onMouseOut={(e) => e.target.style.background = '#A5BF13'}>
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Impact Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 42, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Our Impact
          </h2>
          <p style={{ fontSize: 18, color: '#666', fontFamily: 'Inter, sans-serif' }}>
            Check out our stories from the ground
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {/* Impact Story Cards */}
          {[
            { date: 'JULY 14, 2023', title: "Manjeet's Journey - GK MAD", image: '/impact1.jpg' },
            { date: 'JULY 14, 2023', title: "Sapna's Journey - GK MAD", image: '/impact2.jpg' },
            { date: 'JUNE 28, 2023', title: "Anita's Journey - GK MAD", image: '/impact3.jpg' }
          ].map((story, index) => (
            <div key={index} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s', cursor: 'pointer' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: 250, background: '#eee' }} />
              <div style={{ padding: 24 }}>
                <p style={{ fontSize: 12, color: '#999', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>{story.date}</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>{story.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Volunteer/Student/Coach Circular Diagram */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px', textAlign: 'center', background: '#f5f7fa' }}>
        <h2 style={{ fontSize: 32, marginBottom: 40, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Get Involved
        </h2>
        <div style={{ position: 'relative', width: 500, height: 500, margin: '0 auto' }}>
          {/* SVG Circular Diagram */}
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
            {/* Volunteer - Blue section (top, exactly 120 degrees) */}
            <g
              onClick={() => router.push('/volunteer')}
              onMouseEnter={() => setHoveredSection('volunteer')}
              onMouseLeave={() => setHoveredSection(null)}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <path
                d="M 100,100 L 169.28,60 A 80,80 0 1,0 30.72,60 L 100,100 Z"
                fill="#62929E"
                style={{
                  transform: hoveredSection === 'volunteer' ? 'scale(1.08)' : hoveredSection && hoveredSection !== 'volunteer' ? 'scale(0.96)' : 'scale(1)',
                  transformOrigin: '100px 100px',
                  transition: 'all 0.3s ease',
                  filter: hoveredSection === 'volunteer' ? 'brightness(1.15)' : 'brightness(1)'
                }}
              />
              <text
                x="100"
                y="45"
                fill="#fff"
                fontSize="16"
                fontWeight="700"
                fontFamily="Poppins, sans-serif"
                textAnchor="middle"
                style={{
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Volunteer
              </text>
            </g>

            {/* Student - Green section (bottom-right, exactly 120 degrees) */}
            <g
              onClick={() => router.push('/student/login')}
              onMouseEnter={() => setHoveredSection('student')}
              onMouseLeave={() => setHoveredSection(null)}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <path
                d="M 100,100 L 169.28,140 A 80,80 0 0,0 169.28,60 L 100,100 Z"
                fill="#A5BF13"
                style={{
                  transform: hoveredSection === 'student' ? 'scale(1.08)' : hoveredSection && hoveredSection !== 'student' ? 'scale(0.96)' : 'scale(1)',
                  transformOrigin: '100px 100px',
                  transition: 'all 0.3s ease',
                  filter: hoveredSection === 'student' ? 'brightness(1.15)' : 'brightness(1)'
                }}
              />
              <text
                x="155"
                y="105"
                fill="#fff"
                fontSize="16"
                fontWeight="700"
                fontFamily="Poppins, sans-serif"
                textAnchor="middle"
                style={{
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Student
              </text>
            </g>

            {/* Coach - Red section (bottom-left, exactly 120 degrees) */}
            <g
              onClick={() => router.push('/coach/login')}
              onMouseEnter={() => setHoveredSection('coach')}
              onMouseLeave={() => setHoveredSection(null)}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <path
                d="M 100,100 L 30.72,60 A 80,80 0 0,0 169.28,140 L 100,100 Z"
                fill="#EF4444"
                style={{
                  transform: hoveredSection === 'coach' ? 'scale(1.08)' : hoveredSection && hoveredSection !== 'coach' ? 'scale(0.96)' : 'scale(1)',
                  transformOrigin: '100px 100px',
                  transition: 'all 0.3s ease',
                  filter: hoveredSection === 'coach' ? 'brightness(1.15)' : 'brightness(1)'
                }}
              />
              <text
                x="55"
                y="160"
                fill="#fff"
                fontSize="16"
                fontWeight="700"
                fontFamily="Poppins, sans-serif"
                textAnchor="middle"
                style={{
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Coach
              </text>
            </g>

            {/* Center circle with Y-Ultimate icon logo */}
            <defs>
              <clipPath id="centerCircle">
                <circle cx="100" cy="100" r="23" />
              </clipPath>
            </defs>
            <circle cx="100" cy="100" r="26" fill="#fff" stroke="#292929" strokeWidth="4" />
            <image
              href="/yu-icon.png"
              x="77"
              y="77"
              width="46"
              height="46"
              clipPath="url(#centerCircle)"
              preserveAspectRatio="xMidYMid meet"
              style={{ pointerEvents: 'none' }}
            />
          </svg>
        </div>
        <p style={{ marginTop: 32, fontSize: 16, color: '#555', maxWidth: 600, margin: '32px auto 0', fontFamily: 'Inter, sans-serif' }}>
          Choose your role to continue
        </p>
      </div>

      {/* Meet Our Team Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 42, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Meet Our Team
          </h2>
          <p style={{ fontSize: 18, color: '#666', fontFamily: 'Inter, sans-serif' }}>
            Meet our family that strives to spread ultimate
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {[
            { name: 'Anita Bhengra', role: 'COACH' },
            { name: 'Vivekanand Srivastava', role: 'COACH' },
            { name: 'Ashitha Razzak', role: 'TRAINER' },
            { name: 'Nilay Bowmick', role: 'COACH' },
            { name: 'Kalpana Bisht', role: 'COACH' }
          ].map((member, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ width: 180, height: 180, margin: '0 auto', borderRadius: '50%', background: '#eee', marginBottom: 16 }} />
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 4 }}>{member.name}</h4>
              <p style={{ fontSize: 14, color: '#999', fontFamily: 'Inter, sans-serif' }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div style={{ background: '#f5f7fa', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 42, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Proud Partners
          </h2>
          <p style={{ fontSize: 18, color: '#666', fontFamily: 'Inter, sans-serif', marginBottom: 60 }}>
            Sponsors list and advertisement
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 32, alignItems: 'center' }}>
            {['ROGUE', 'AIR FORCE', 'VELITES', 'HustleUp', 'LUXIADJUN', 'GOWOD'].map((partner, index) => (
              <div key={index} style={{ padding: 24, background: '#fff', borderRadius: 8, fontSize: 18, fontWeight: 600, color: '#333', fontFamily: 'Poppins, sans-serif' }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donate Section */}
      <div style={{ background: '#A5BF13', color: '#fff', padding: '60px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Support Our Mission
          </h2>
          <p style={{ fontSize: 18, color: '#f0f9e8', fontFamily: 'Inter, sans-serif', marginBottom: 32 }}>
            Your donation helps underprivileged children discover the joy of Ultimate Frisbee and build healthier futures.
          </p>
          <Link href="/donate">
            <button style={{ padding: '16px 32px', fontSize: 18, fontWeight: 600, color: '#A5BF13', background: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.3s' }}
              onMouseOver={(e) => e.target.style.background = '#f0f9e8'}
              onMouseOut={(e) => e.target.style.background = '#fff'}>
              Donate Now 💝
            </button>
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <div style={{ background: '#292929', color: '#fff', padding: '60px 20px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Subscribe to our newsletter
          </h2>
          <p style={{ fontSize: 16, color: '#ccc', fontFamily: 'Inter, sans-serif', marginBottom: 32 }}>
            Sign up for our quarterly newsletters. Join the Y-Ultimate family.
          </p>
          <div style={{ display: 'flex', gap: 12, maxWidth: 400, margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '12px 16px', border: 'none', borderRadius: 6, fontSize: 14, fontFamily: 'Inter, sans-serif' }} />
            <button style={{ padding: '12px 24px', background: '#A5BF13', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1a1a1a', color: '#ccc', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 40 }}>
            <div>
              <img src="/yultimate-logo.png" alt="Y-Ultimate" style={{ width: 60, height: 60, marginBottom: 16 }} />
            </div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Home</Link>
                <Link href="/team" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Meet The Team</Link>
                <Link href="/about" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Impact Stories</Link>
                <Link href="/donate" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Donate</Link>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>Contact</h4>
              <p style={{ fontSize: 14, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>41, Zamrudpur,<br/>Greater Kailash-1,<br/>New Delhi - 110048</p>
              <p style={{ fontSize: 14, fontFamily: 'Inter, sans-serif' }}>+91-9971803241</p>
              <p style={{ fontSize: 14, fontFamily: 'Inter, sans-serif' }}>team@yultimate.org</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333', paddingTop: 24, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
            <p>© 2025 Y-Ultimate. Empowering underprivileged children through Ultimate Frisbee.</p>
            <div style={{ marginTop: 12 }}>
              <Link href="/terms" style={{ color: '#ccc', textDecoration: 'none', margin: '0 12px' }}>Terms and Conditions</Link>
              <Link href="/privacy" style={{ color: '#ccc', textDecoration: 'none', margin: '0 12px' }}>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
