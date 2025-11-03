import { useState } from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submission (replace with actual POST to backend)
    console.log({ name, email, message })
    setSubmitted(true)
    setTimeout(() => {
      setName('')
      setEmail('')
      setMessage('')
      setSubmitted(false)
    }, 3000)
  }

  return (
    <Layout>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Inter, sans-serif', color: 'var(--wame-text)' }}>
        <h1 style={{ fontSize: 36, marginBottom: 12, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
          Contact us
        </h1>
        <p style={{ fontSize: 18, color: 'var(--wame-muted)', lineHeight: 1.7 }}>
          Have questions or want to request a demo? Fill out the form below or reach out directly via email or phone.
        </p>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd' }}>
            <h3 style={{ fontSize: 18, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Email
            </h3>
            <a href="mailto:hello@wame.example" style={{ color: 'var(--wame-teal)', fontSize: 16 }}>
              hello@wame.example
            </a>
          </div>

          <div style={{ background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #ddd' }}>
            <h3 style={{ fontSize: 18, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
              Phone
            </h3>
            <div style={{ color: 'var(--wame-muted)', fontSize: 16 }}>+1 (555) 123‑4567</div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: 40,
            background: '#fff',
            padding: 24,
            borderRadius: 10,
            border: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h2 style={{ fontSize: 24, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
            Request a demo
          </h2>

          <div>
            <label style={{ fontSize: 14, color: 'var(--wame-dark)', fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
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
            <label style={{ fontSize: 14, color: 'var(--wame-dark)', fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
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
            <label style={{ fontSize: 14, color: 'var(--wame-dark)', fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your event and what you're looking for..."
              rows={5}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #d0d0d0',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                resize: 'vertical',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '12px 20px',
              background: 'var(--wame-accent)',
              color: 'var(--wame-dark)',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Send message
          </button>

          {submitted && (
            <div
              style={{
                marginTop: 8,
                padding: 12,
                background: '#e8f8f5',
                borderRadius: 8,
                color: 'var(--wame-dark)',
                fontSize: 15,
              }}
            >
              ✓ Thank you! We'll get back to you soon.
            </div>
          )}
        </form>
      </div>
    </Layout>
  )
}
