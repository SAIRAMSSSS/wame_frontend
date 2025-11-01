import { useState, useEffect } from 'react'

export default function LoginModal({ open, onClose, defaultRole = 'student' }) {
  const [role, setRole] = useState(defaultRole)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setRole(defaultRole)
  }, [defaultRole])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setMessage('Please provide email and password')
      return
    }
    // Mock auth demo
    setMessage(`(demo) Logged in as ${role} — ${email}`)
  }

  const fillDemo = () => {
    setEmail('demo@wame.test')
    setPassword('password')
    setMessage('Filled demo credentials — press Sign in')
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(41,41,41,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        fontFamily: 'Inter, sans-serif',
      }}
      onClick={onClose}
      aria-modal="true"
    >
      <div
        style={{
          width: 420,
          maxWidth: '94%',
          background: '#fff',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 12px 48px rgba(41,41,41,0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 20, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
            </h3>
            <div style={{ fontSize: 13, color: 'var(--wame-muted)', marginTop: 6 }}>
              Enter your credentials to continue.
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 24,
              color: 'var(--wame-muted)',
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, color: 'var(--wame-dark)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #d0d0d0',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <option value="student">Student</option>
              <option value="coach">Coach</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, color: 'var(--wame-dark)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #d0d0d0',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, color: 'var(--wame-dark)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #d0d0d0',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                background: 'var(--wame-accent)',
                color: 'var(--wame-dark)',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={fillDemo}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid var(--wame-teal)',
                background: '#fff',
                cursor: 'pointer',
                fontSize: 14,
                color: 'var(--wame-dark)',
              }}
            >
              Fill demo
            </button>
          </div>

          {message && (
            <div
              style={{
                marginTop: 8,
                color: 'var(--wame-dark)',
                background: '#e8f4f8',
                padding: 10,
                borderRadius: 8,
                fontSize: 14,
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
