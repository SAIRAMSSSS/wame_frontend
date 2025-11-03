import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  const [hoveredSection, setHoveredSection] = useState(null);
  return (
    <>
      {/* Hero Section with Team Photo */}
      <div style={{ position: 'relative', height: '500px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200") center/cover', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          <img src="/yultimate-logo.png" alt="Y-Ultimate Logo" style={{ width: 200, height: 200, marginBottom: 20, filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.5))' }} />
          <h1 style={{ fontSize: 48, fontWeight: 700, fontFamily: 'Poppins, sans-serif', margin: 0, textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            Y-Ultimate
          </h1>
          <p style={{ fontSize: 20, marginTop: 12, maxWidth: 700, lineHeight: 1.6, textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Empowering youth through Ultimate Frisbee
          </p>
        </div>
      </div>

      {/* Donate Button */}
      <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff' }}>
        <div style={{ display: 'inline-block', cursor: 'pointer' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>
            <span style={{ fontSize: 40 }}>🙌</span>
          </div>
          <div style={{ background: 'linear-gradient(to right, #6B46C1, #3B82F6, #10B981, #F59E0B, #EF4444)', padding: '16px 48px', borderRadius: 50, color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: 'Poppins, sans-serif' }}>
            DONATE
          </div>
          <p style={{ marginTop: 12, fontSize: 16, color: 'var(--wame-dark)', fontWeight: 600 }}>
            click here to donate
          </p>
        </div>
      </div>

      {/* Interactive Volunteer/Student/Coach Circular Diagram */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px', textAlign: 'center', background: '#fff' }}>
        <h2 style={{ fontSize: 36, marginBottom: 48, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
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
              onClick={() => router.push('/student')}
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
              onClick={() => router.push('/coach')}
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
        <p style={{ marginTop: 32, fontSize: 16, color: 'var(--wame-muted)', maxWidth: 600, margin: '32px auto 0' }}>
          Join our community! Whether you want to volunteer, participate as a student, or coach the next generation, we have a place for you.
        </p>
      </div>

      {/* Impact Stories */}
      <div style={{ background: 'var(--wame-bg)', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 32, marginBottom: 8, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              Impact Stories
            </h2>
            <p style={{ fontSize: 15, color: 'var(--wame-muted)' }}>
              Check out our stories from the ground.
            </p>
            <Link href="/about" style={{ fontSize: 14, color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>
              VIEW ALL STORIES →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 32 }}>
            {/* Manjeet's Journey */}
            <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ height: 250, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--wame-muted)', marginBottom: 8 }}>JULY 25, 2022</div>
                <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 8px', fontWeight: 600 }}>
                  Manjeet's Journey – GK MAD
                </h3>
              </div>
            </div>

            {/* Sapna's Journey */}
            <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ height: 250, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--wame-muted)', marginBottom: 8 }}>JULY 14, 2022</div>
                <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 8px', fontWeight: 600 }}>
                  Sapna's Journey – GK MAD
                </h3>
              </div>
            </div>

            {/* Anita's Journey */}
            <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ height: 250, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--wame-muted)', marginBottom: 8 }}>JUNE 25, 2021</div>
                <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 8px', fontWeight: 600 }}>
                  Anita's Journey – GK MAD
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 32, marginBottom: 8, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Meet Our Team
          </h2>
          <p style={{ fontSize: 15, color: 'var(--wame-muted)' }}>
            Meet our family that strives to spread ultimate.
          </p>
          <Link href="/team" style={{ fontSize: 14, color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>
            VIEW ALL →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 32 }}>
          {/* Anita Bhengra */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: 240, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8, marginBottom: 12 }}></div>
            <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px', fontWeight: 600 }}>
              Anita Bhengra
            </h3>
            <div style={{ fontSize: 13, color: '#fff', background: '#F97316', padding: '4px 12px', display: 'inline-block', borderRadius: 4, fontWeight: 600 }}>
              COACH
            </div>
          </div>

          {/* Vivekanand Srivastava */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: 240, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8, marginBottom: 12 }}></div>
            <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px', fontWeight: 600 }}>
              Vivekanand Srivastava
            </h3>
            <div style={{ fontSize: 13, color: '#fff', background: '#F97316', padding: '4px 12px', display: 'inline-block', borderRadius: 4, fontWeight: 600 }}>
              COACH
            </div>
          </div>

          {/* Ashitha Razzak */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: 240, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8, marginBottom: 12 }}></div>
            <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px', fontWeight: 600 }}>
              Ashitha Razzak
            </h3>
            <div style={{ fontSize: 13, color: '#fff', background: '#F97316', padding: '4px 12px', display: 'inline-block', borderRadius: 4, fontWeight: 600 }}>
              COACH
            </div>
          </div>

          {/* Nilay Bowmick */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: 240, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8, marginBottom: 12 }}></div>
            <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px', fontWeight: 600 }}>
              Nilay Bowmick
            </h3>
            <div style={{ fontSize: 13, color: '#fff', background: '#F97316', padding: '4px 12px', display: 'inline-block', borderRadius: 4, fontWeight: 600 }}>
              COACH
            </div>
          </div>

          {/* Kalpana Bisht */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: 240, background: '#ddd', backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8, marginBottom: 12 }}></div>
            <h3 style={{ fontSize: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px', fontWeight: 600 }}>
              Kalpana Bisht
            </h3>
            <div style={{ fontSize: 13, color: '#fff', background: '#F97316', padding: '4px 12px', display: 'inline-block', borderRadius: 4, fontWeight: 600 }}>
              COACH
            </div>
          </div>
        </div>
      </div>

      {/* Proud Partners */}
      <div style={{ background: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, marginBottom: 32, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>
            Proud Partners
          </h2>
          <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 32, fontStyle: 'italic' }}>
            Sponsors list and advertisement
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24, alignItems: 'center', padding: '20px', border: '2px solid #ddd', borderRadius: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--wame-dark)' }}>ROGUE</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--wame-dark)' }}>AIR FORCE</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--wame-dark)' }}>VELITES</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--wame-dark)' }}>GOWOD</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, marginTop: 32, alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-muted)' }}>Hustle Up</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-muted)' }}>LUXIAOJUN</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-muted)' }}>GOWOD</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-muted)' }}>SPUD</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-muted)' }}>PR</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-muted)' }}>MATADOR</div>
          </div>
        </div>
      </div>

      {/* In the News */}
      <div style={{ background: 'var(--wame-bg)', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            In the News
          </h2>
          <p style={{ fontSize: 15, color: 'var(--wame-muted)', marginBottom: 40 }}>
            Check out the articles about us
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, alignItems: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>TH</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#DC2626' }}>The Indian EXPRESS</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#000', background: '#fff', padding: '8px 16px' }}>inUth</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#3B82F6' }}>TeacherPlus</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#000' }}>the patriot</div>
          </div>
        </div>
      </div>

      {/* About Y-Ultimate & What We Do */}
      <div style={{ background: '#fff', padding: '3rem 2rem', display: 'none' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            <div style={{ color: 'var(--wame-text)' }}>
              <h2 style={{ fontSize: 32, marginBottom: 16, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
                About Y-Ultimate
              </h2>
              <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
                Y-Ultimate (registered as Flyingdisc Development Foundation) is a non-profit organization working to empower underprivileged youth through Ultimate Frisbee. We believe sports can be a powerful vehicle for social change and personal development.
              </p>
              
              <h3 style={{ marginTop: 28, fontSize: 22, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
                What We Do
              </h3>
              <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 15 }}>
                We run structured Ultimate Frisbee programs in Delhi and NCR, focusing on children from lesser privileged socio-economic backgrounds. Our approach combines athletic training with life skills education including:
              </p>
              <ul style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 15, marginTop: 12 }}>
                <li><strong>Leadership Development:</strong> Building confidence and decision-making skills</li>
                <li><strong>Teamwork & Communication:</strong> Learning to collaborate and express ideas</li>
                <li><strong>Conflict Resolution:</strong> Managing disagreements constructively</li>
                <li><strong>Gender Equality:</strong> Breaking barriers through mixed-gender teams</li>
                <li><strong>Physical Fitness:</strong> Developing athletic abilities and healthy habits</li>
              </ul>

              <h3 style={{ marginTop: 28, fontSize: 22, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
                Who We Serve
              </h3>
              <p style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 15 }}>
                Our programs reach children from:
              </p>
              <ul style={{ color: 'var(--wame-muted)', lineHeight: 1.8, fontSize: 15, marginTop: 8 }}>
                <li>Under-resourced communities in Greater Kailash, Delhi</li>
                <li>Government and low-income private schools</li>
                <li>Areas where sports infrastructure is limited</li>
                <li>Communities facing social and economic challenges</li>
              </ul>

              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="/contact"
                  style={{
                    padding: '12px 24px',
                    background: 'var(--wame-accent)',
                    color: 'var(--wame-dark)',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: 16,
                    display: 'inline-block'
                  }}
                >
                  Get Involved
                </a>
                <a
                  href="/about"
                  style={{
                    padding: '12px 24px',
                    border: '2px solid var(--wame-teal)',
                    borderRadius: 8,
                    color: 'var(--wame-dark)',
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    display: 'inline-block'
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>

            <div style={{ color: 'var(--wame-text)' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--wame-dark), var(--wame-teal))',
                  padding: 32,
                  borderRadius: 12,
                  color: '#fff',
                  marginBottom: 24
                }}
              >
                <h3 style={{ marginTop: 0, fontSize: 24, fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
                  Our Impact
                </h3>
                <div style={{ fontSize: 15, lineHeight: 1.8 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--wame-accent)' }}>500+</div>
                    <div>Children reached through our programs</div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--wame-accent)' }}>10+</div>
                    <div>Years of community impact</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--wame-accent)' }}>15+</div>
                    <div>Dedicated coaches and volunteers</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#fff',
                  padding: 24,
                  borderRadius: 10,
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <h4 style={{ marginTop: 0, fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 12 }}>
                  Contact Us
                </h4>
                <div style={{ fontSize: 14, color: 'var(--wame-muted)', lineHeight: 1.8 }}>
                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: 'var(--wame-dark)' }}>Address:</strong><br />
                    41, Zamrudpur, Greater Kailash-1,<br />
                    New Delhi – 110048
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: 'var(--wame-dark)' }}>Phone:</strong><br />
                    <a href="tel:+919971803431" style={{ color: 'var(--wame-teal)', textDecoration: 'none' }}>+91-9971803431</a>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--wame-dark)' }}>Email:</strong><br />
                    <a href="mailto:team@yultimate.org" style={{ color: 'var(--wame-teal)', textDecoration: 'none' }}>team@yultimate.org</a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, padding: 16, background: 'var(--wame-bg)', borderRadius: 8 }}>
                <p style={{ fontSize: 13, color: 'var(--wame-muted)', margin: 0, lineHeight: 1.6 }}>
                  <strong>Legal:</strong> Registered as "Flyingdisc Development Foundation" under Section 8 of Indian Companies Act, 2013 and exempted under Section 80(g) of the Income Tax Act, 1961.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>


      {/* Newsletter Subscription */}
      <div style={{ background: 'var(--wame-dark)', color: '#fff', padding: '60px 20px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, marginBottom: 12, color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Subscribe to our newsletter
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>
            Sign up for our quarterly newsletters. Join the Y-Ultimate family.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '12px 20px',
                borderRadius: 8,
                border: 'none',
                fontSize: 15,
                flex: '1',
                minWidth: '250px',
                maxWidth: '400px'
              }}
            />
            <button
              style={{
                padding: '12px 32px',
                background: 'var(--wame-accent)',
                color: 'var(--wame-dark)',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
