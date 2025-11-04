import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function CoachRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '', // Added username field
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone: '',
    team_name: '',
    school: ''
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

    // Validate passwords match
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
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
          username: formData.username, // Added username to request
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          school: formData.school,
          user_type: 'coach' // Backend uses user_type instead of role
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user data
        localStorage.setItem('token', data.token);
        
        // Now update the profile with additional coach information
        try {
          const profileResponse = await fetch(`http://127.0.0.1:8000/api/profiles/${data.user.id}/`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Token ${data.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_type: 'coach',
              role: 'team_manager',
              team_name: formData.team_name,
              coach_name: `${formData.first_name} ${formData.last_name}`
            })
          });
          
          if (profileResponse.ok) {
            console.log('Profile updated successfully');
          }
        } catch (profileError) {
          console.error('Profile update error:', profileError);
        }

        const userData = {
          username: data.user.email,
          email: data.user.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: 'team_manager',
          user_type: 'coach',
          team_name: formData.team_name,
          phone: formData.phone,
          school: formData.school,
          id: data.user.id
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirect to coach dashboard
        router.push('/coach/dashboard');
      } else {
        setError(data.message || data.email?.[0] || 'Registration failed. Please check your information.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Connection error. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Coach Registration - Y-Ultimate</title>
      </Head>

      <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}>
        {/* Left Side - Branding */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px', color: 'white' }}>
          <div style={{ maxWidth: 500 }}>
            <Link href="/">
              <img src="/yultimate-logo.png" alt="Y-Ultimate" style={{ width: 120, height: 120, marginBottom: 32, cursor: 'pointer', filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.3))' }} />
            </Link>
            <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 20, fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
              👨‍🏫 Join as Coach
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.8, opacity: 0.95, fontFamily: 'Inter, sans-serif', textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}>
              Register to lead your team, access powerful analytics, and make a difference in young athletes' lives.
            </p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px', background: 'white', overflowY: 'auto' }}>
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
              Coach Registration
            </h2>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 32, fontFamily: 'Inter, sans-serif' }}>
              Create your coach account to get started
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '2px solid #e0e0e0',
                      borderRadius: 8,
                      fontSize: 15,
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '2px solid #e0e0e0',
                      borderRadius: 8,
                      fontSize: 15,
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Username *
                  <span style={{ fontSize: 12, fontWeight: 400, color: '#666', marginLeft: 8 }}>(You'll use this to login)</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="e.g., coach_john, team_captain_2024"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
                />
                <small style={{ fontSize: 12, color: '#666', marginTop: 4, display: 'block', fontFamily: 'Inter, sans-serif' }}>
                  Choose a unique username (letters, numbers, underscore only)
                </small>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-9876543210"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Team Name
                </label>
                <input
                  type="text"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleChange}
                  placeholder="Your team name"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  School/Organization
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="School or organization name"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
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
                {loading ? 'Creating Account...' : 'Register as Coach'}
              </button>
            </form>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#666', fontFamily: 'Inter, sans-serif' }}>
                Already have an account? {' '}
                <Link href="/coach/login" style={{ color: '#EF4444', textDecoration: 'none', fontWeight: 600 }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
