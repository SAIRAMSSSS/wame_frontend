import { useState } from 'react'
import { useRouter } from 'next/router'

export default function RoleDiagram() {
  const router = useRouter()
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ textAlign: 'center', padding: '28px 12px' }}>
      <h2 style={{ fontSize: 22, fontFamily: 'Poppins, sans-serif', marginBottom: 18, color: 'var(--wame-dark)' }}>Get Involved</h2>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }} role="img" aria-label="Role selector diagram">
          <g tabIndex={0} onClick={() => router.push('/volunteer')}
            onMouseEnter={() => setHovered('volunteer')} onMouseLeave={() => setHovered(null)}>
            <path d="M 100,100 L 169.28,60 A 80,80 0 1,0 30.72,60 L 100,100 Z" fill="#62929E" style={{ transform: hovered === 'volunteer' ? 'scale(1.06)' : 'scale(1)', transformOrigin: '100px 100px' }} />
            <text x="100" y="45" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Poppins, sans-serif" textAnchor="middle">Volunteer</text>
          </g>
          <g tabIndex={0} onClick={() => router.push('/student')} onMouseEnter={() => setHovered('student')} onMouseLeave={() => setHovered(null)}>
            <path d="M 100,100 L 169.28,140 A 80,80 0 0,0 169.28,60 L 100,100 Z" fill="#A5BF13" style={{ transform: hovered === 'student' ? 'scale(1.06)' : 'scale(1)', transformOrigin: '100px 100px' }} />
            <text x="155" y="105" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Poppins, sans-serif" textAnchor="middle">Student</text>
          </g>
          <g tabIndex={0} onClick={() => router.push('/coach')} onMouseEnter={() => setHovered('coach')} onMouseLeave={() => setHovered(null)}>
            <path d="M 100,100 L 30.72,60 A 80,80 0 0,0 169.28,140 L 100,100 Z" fill="#EF4444" style={{ transform: hovered === 'coach' ? 'scale(1.06)' : 'scale(1)', transformOrigin: '100px 100px' }} />
            <text x="55" y="160" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Poppins, sans-serif" textAnchor="middle">Coach</text>
          </g>
          <circle cx="100" cy="100" r="26" fill="#fff" stroke="#292929" strokeWidth="4" />
        </svg>
      </div>
    </div>
  )
}
