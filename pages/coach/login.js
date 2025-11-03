import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function CoachLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
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
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token
        localStorage.setItem('token', data.token);

        // Fetch user profile to verify they are a coach
        const profileResponse = await fetch('http://127.0.0.1:8000/api/profiles/me/', {
          headers: {
            'Authorization': `Token ${data.token}`
          }
        });

        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          
          // Check if user is a coach (check both role and user_type fields)
          const isCoach = profile.role === 'team_manager' || 
                         profile.role === 'tournament_director' ||
                         profile.user_type === 'coach' ||
                         profile.user_type === 'team_manager';
          
          if (isCoach) {
            // Save user data
            const userData = {
              username: profile.user?.username || profile.first_name || 'Coach',
              email: profile.user?.email || profile.email || '',
              first_name: profile.first_name || '',
              last_name: profile.last_name || '',
              role: profile.role || 'team_manager',
              user_type: profile.user_type || 'coach',
              coach_name: profile.coach_name || '',
              team_name: profile.team_name || '',
              phone: profile.phone || '',
              age: profile.age || '',
              school: profile.school || '',
              address: profile.address || '',
              profile_picture_url: profile.profile_picture_url || null,
              id: profile.id
            };
            localStorage.setItem('user', JSON.stringify(userData));

            // Redirect to coach dashboard
            router.push('/coach/dashboard');
          } else {
            // User is not a coach
            setError('Access denied. This login is for coaches only. Please use the student login if you are a student.');
            localStorage.removeItem('token');
          }
        } else {
          setError('Failed to fetch profile. Please try again.');
        }
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Coach Login - Y-Ultimate</title>
      </Head>

      <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}>
        {/* Left Side - Branding */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px', color: 'white' }}>
          <div style={{ maxWidth: 500 }}>
            <Link href="/">
              <img src="/yultimate-logo.png" alt="Y-Ultimate" style={{ width: 120, height: 120, marginBottom: 32, cursor: 'pointer', filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.3))' }} />
            </Link>
            <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 20, fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
              👨‍🏫 Coach Portal
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.8, opacity: 0.95, fontFamily: 'Inter, sans-serif', textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}>
              Login to manage your team, track player performance, view detailed analytics, and access tournament leaderboards.
            </p>
            <div style={{ marginTop: 40, padding: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 12, backdropFilter: 'blur(10px)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Coach Features:</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: 16, lineHeight: 2 }}>
                <li>✅ Team & Player Leaderboards</li>
                <li>✅ Performance Comparison Graphs</li>
                <li>✅ Tournament Management</li>
                <li>✅ Spirit Score Tracking</li>
                <li>✅ Match Schedules & Live Updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px', background: 'white' }}>
          <div style={{ width: '100%', maxWidth: 450 }}>
            <div style={{ marginBottom: 40 }}>
              <Link href="/">
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 0',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  ← Back to Home
                </button>
              </Link>
            </div>

            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#333', marginBottom: 12, fontFamily: 'Poppins, sans-serif' }}>
              Coach Login
            </h2>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 32, fontFamily: 'Inter, sans-serif' }}>
              Enter your credentials to access the coach portal
            </p>

            {error && (
              <div style={{ 
                padding: '14px 18px', 
                background: '#fee', 
                border: '1px solid #fcc', 
                borderRadius: 8, 
                color: '#c33', 
                marginBottom: 24,
                fontSize: 14,
                fontFamily: 'Inter, sans-serif'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Username or Email
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username (e.g., captain1)"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16,
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#EF4444'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16,
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#EF4444'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: loading ? '#ccc' : '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(239,68,68,0.3)'
                }}
                onMouseEnter={(e) => !loading && (e.target.style.background = '#DC2626')}
                onMouseLeave={(e) => !loading && (e.target.style.background = '#EF4444')}
              >
                {loading ? 'Signing in...' : 'Sign In as Coach'}
              </button>
            </form>

            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#666', fontFamily: 'Inter, sans-serif' }}>
                Not a coach? {' '}
                <Link href="/student/login" style={{ color: '#EF4444', textDecoration: 'none', fontWeight: 600 }}>
                  Student Login
                </Link>
              </p>
            </div>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#666', fontFamily: 'Inter, sans-serif' }}>
                Don't have an account? {' '}
                <Link href="/coach/register" style={{ color: '#EF4444', textDecoration: 'none', fontWeight: 600 }}>
                  Register as Coach
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
