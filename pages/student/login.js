import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function StudentLogin() {
  const router = useRouter();
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Check if user is coming back from Google OAuth
  useEffect(() => {
    const { token, google_connected, first_time, error: oauthError } = router.query;
    
    if (token) {
      localStorage.setItem('token', token);
      if (google_connected) {
        localStorage.setItem('googleFitConnected', 'true');
      }
      router.push('/student/home');
    }
    
    if (oauthError) {
      setError(`Google login failed: ${oauthError}. Please try again.`);
    }
  }, [router.query]);

  const handleGoogleLogin = async () => {
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
        setError('Failed to initialize Google login. Please try again.');
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

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/student/home');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
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
          .left-branding {
            display: none !important;
          }
          .right-form {
            padding: 20px !important;
          }
          .form-container {
            padding: 32px 24px !important;
          }
          .logo-mobile {
            display: block !important;
            width: 80px;
            height: 80px;
            margin: 0 auto 24px;
          }
        }
        @media (min-width: 769px) {
          .logo-mobile {
            display: none !important;
          }
        }
        
        .google-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .google-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(66, 133, 244, 0.3);
        }
        .google-btn:active {
          transform: translateY(0);
        }
        
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 24px 0;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #ddd;
        }
        .divider span {
          padding: 0 16px;
          color: #999;
          font-size: 14px;
          font-family: Inter, sans-serif;
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* Left Side - Branding */}
        <div className="left-branding" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 40, background: 'var(--wame-dark)' }}>
          <img src="/yultimate-logo.png" alt="Y-Ultimate Logo" style={{ width: 150, height: 150, marginBottom: 24 }} />
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: 16, textAlign: 'center' }}>
            Y-Ultimate Student Portal
          </h1>
          <p style={{ fontSize: 16, color: '#ccc', fontFamily: 'Inter, sans-serif', textAlign: 'center', maxWidth: 400 }}>
            Track your fitness, join tournaments, and grow with the Y-Ultimate community
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="right-form" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <div className="form-container" style={{ background: '#fff', padding: 48, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', maxWidth: 440, width: '100%' }}>
            {/* Mobile Logo */}
            <img className="logo-mobile" src="/yultimate-logo.png" alt="Y-Ultimate Logo" />
            
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 8, textAlign: 'center' }}>
              Welcome Back!
            </h2>
            <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 32, fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
              Login to access your student dashboard
            </p>

            {error && (
              <div style={{ padding: 12, background: '#fee', border: '1px solid #fcc', borderRadius: 8, marginBottom: 20, color: '#c33', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
                {error}
              </div>
            )}

            {/* Google Sign In Button - Primary */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="google-btn"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: 16,
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <div style={{ margin: '24px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: '#999', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                🚀 Quick login • Auto-sync fitness data • One-click access
              </p>
            </div>

            {/* Divider */}
            <div className="divider">
              <span>Or continue with email</span>
            </div>

            {/* Email/Password Login (Collapsible) */}
            {!showEmailLogin ? (
              <button
                onClick={() => setShowEmailLogin(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: 14,
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
                Login with Email
              </button>
            ) : (
              <form onSubmit={handleSubmit} style={{ animation: 'slideDown 0.3s ease' }}>
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
                    placeholder="student@example.com"
                    style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border 0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--wame-accent)'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
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
                    placeholder="Enter your password"
                    style={{ width: '100%', padding: '12px 16px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border 0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--wame-accent)'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', padding: '14px', fontSize: 16, fontWeight: 700, color: '#fff', background: loading ? '#ccc' : 'var(--wame-accent)', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'background 0.3s' }}
                  onMouseOver={(e) => !loading && (e.target.style.background = '#8fa30f')}
                  onMouseOut={(e) => !loading && (e.target.style.background = 'var(--wame-accent)')}
                >
                  {loading ? 'Logging in...' : 'Login with Email'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowEmailLogin(false)}
                  style={{ width: '100%', padding: '10px', fontSize: 13, color: '#999', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 12 }}
                >
                  ← Back to Google Login
                </button>
              </form>
            )}

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #eee', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif', marginBottom: 16 }}>
                Don't have an account?{' '}
                <Link href="/student/register" style={{ color: 'var(--wame-accent)', fontWeight: 600, textDecoration: 'none' }}>
                  Register here
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
