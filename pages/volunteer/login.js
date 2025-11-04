import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VolunteerLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Check if user is a volunteer
        if (data.user.user_type !== 'volunteer') {
          setError('This login is for volunteers only. Please use the appropriate login page.');
          return;
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to volunteer dashboard
        router.push('/volunteer/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 40, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: 400 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/yu-icon.png" alt="Y-Ultimate" style={{ width: 60, height: 60, marginBottom: 16 }} />
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Poppins, sans-serif' }}>
            Volunteer Login
          </h1>
          <p style={{ fontSize: 14, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>
            Access your volunteer dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 12, marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: '#dc2626', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              {error}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                fontSize: 16,
                fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                fontSize: 16,
                fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: loading ? '#ccc' : 'var(--wame-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
              marginBottom: 24
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Links */}
        <div style={{ textAlign: 'center', borderTop: '1px solid #e0e0e0', paddingTop: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
            Don't have an account?{' '}
            <Link href="/volunteer/register" style={{ color: 'var(--wame-accent)', textDecoration: 'none', fontWeight: 600 }}>
              Register as Volunteer
            </Link>
          </p>
          <p style={{ fontSize: 14, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" style={{ color: 'var(--wame-accent)', textDecoration: 'none', fontWeight: 600 }}>
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
