import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function StudentRegister() {
  const router = useRouter();
  const [showEmailRegister, setShowEmailRegister] = useState(true); // Changed to true - show manual registration by default
  const [formData, setFormData] = useState({
    username: '', // Added username field
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    age: '',
    school: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Check if user is coming back from Google OAuth
  useEffect(() => {
    const { token, google_connected, first_time } = router.query;
    
    if (token && first_time === 'true') {
      localStorage.setItem('token', token);
      if (google_connected) {
        localStorage.setItem('googleFitConnected', 'true');
      }
      // Show welcome message and redirect
      alert('Welcome to Y-Ultimate! Your Google Fit data has been synced.');
      router.push('/student/dashboard');
    } else if (token) {
      localStorage.setItem('token', token);
      router.push('/student/dashboard');
    }
  }, [router.query]);

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      // Get Google OAuth URL from backend
      const response = await fetch('http://127.0.0.1:8000/api/auth/google/');
      const data = await response.json();
      
      if (response.ok && data.auth_url) {
        // Redirect to Google OAuth page
        window.location.href = data.auth_url;
      } else {
        setError('Failed to initialize Google registration. Please try again.');
        setGoogleLoading(false);
      }
    } catch (err) {
      setError('Connection error. Please check your internet connection.');
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_type: 'student'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto login after registration
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/student/dashboard');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          .register-container {
            padding: 32px 24px !important;
          }
          .page-container {
            padding: 40px 20px !important;
          }
        }
        
        .google-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .google-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(66, 133, 244, 0.3);
        }
        
        .feature-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #f0f8ff;
          border-radius: 20px;
          font-size: 14px;
          color: #4285F4;
          font-family: Inter, sans-serif;
          margin: 4px;
        }
      `}</style>
      
      <div className="page-container" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '60px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <img src="/yultimate-logo.png" alt="Y-Ultimate Logo" style={{ width: 100, height: 100, marginBottom: 16 }} />
            <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 8 }}>
              Join Y-Ultimate as a Student
            </h1>
            <p style={{ fontSize: 16, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>
              Start your journey with Ultimate Frisbee and life skills development
            </p>
          </div>

          <div className="register-container" style={{ background: '#fff', padding: 48, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            {error && (
              <div style={{ padding: 12, background: '#fee', border: '1px solid #fcc', borderRadius: 8, marginBottom: 24, color: '#c33', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
                {error}
              </div>
            )}

            {/* Google Sign Up Button - Primary */}
            <div style={{ marginBottom: 32 }}>
              <button
                onClick={handleGoogleRegister}
                disabled={googleLoading}
                className="google-btn"
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#fff',
                  background: googleLoading ? '#ccc' : 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                  border: 'none',
                  borderRadius: 12,
                  cursor: googleLoading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  boxShadow: '0 4px 12px rgba(66, 133, 244, 0.2)'
                }}
              >
                {googleLoading ? (
                  <>⏳ Connecting...</>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFF"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#FFF"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FFF"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#FFF"/>
                    </svg>
                    Sign up with Google
                  </>
                )}
              </button>
              
              {/* Benefits */}
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div className="feature-badge">
                  <span>✓</span> Auto-sync fitness data
                </div>
                <div className="feature-badge">
                  <span>✓</span> One-click registration
                </div>
                <div className="feature-badge">
                  <span>✓</span> Google Fit integration
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0' }}>
              <div style={{ flex: 1, borderBottom: '1px solid #ddd' }}></div>
              <span style={{ padding: '0 16px', color: '#999', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
                Or register with email
              </span>
              <div style={{ flex: 1, borderBottom: '1px solid #ddd' }}></div>
            </div>

            {/* Email Registration Form (Collapsible) */}
            {!showEmailRegister ? (
              <button
                onClick={() => setShowEmailRegister(true)}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--wame-teal)',
                  background: 'transparent',
                  border: '2px solid var(--wame-teal)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--wame-teal)';
                  e.target.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--wame-teal)';
                }}
              >
                Register with Email
              </button>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                      First Name *
                    </label>
                    <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                  style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                  style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                Username *
                <span style={{ fontSize: 12, fontWeight: 400, color: '#666', marginLeft: 8 }}>(You'll use this to login)</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="e.g., john_smith, student_2024"
                style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
              <small style={{ fontSize: 12, color: '#666', marginTop: 4, display: 'block', fontFamily: 'Inter, sans-serif' }}>
                Choose a unique username (letters, numbers, underscore only)
              </small>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="student@example.com"
                style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="At least 6 characters"
                  style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter password"
                  style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="8"
                  max="25"
                  placeholder="Your age"
                  style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                School Name
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Your school name"
                style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your residential address"
                rows="3"
                style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'vertical' }}
              />
            </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', padding: '14px', fontSize: 16, fontWeight: 700, color: '#fff', background: loading ? '#ccc' : 'var(--wame-accent)', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'background 0.3s', marginBottom: 12 }}
                  onMouseOver={(e) => !loading && (e.target.style.background = '#8fa30f')}
                  onMouseOut={(e) => !loading && (e.target.style.background = 'var(--wame-accent)')}
                >
                  {loading ? 'Creating Account...' : 'Register with Email'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowEmailRegister(false)}
                  style={{ width: '100%', padding: '10px', fontSize: 13, color: '#999', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  ← Back to Google Registration
                </button>
              </form>
            )}

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #eee', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif', marginBottom: 16 }}>
                Already have an account?{' '}
                <Link href="/student/login" style={{ color: 'var(--wame-accent)', fontWeight: 600, textDecoration: 'none' }}>
                  Login here
                </Link>
              </p>
              <Link href="/" style={{ fontSize: 14, color: 'var(--wame-teal)', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
