import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SimpleLineChart from '../../components/SimpleLineChart';
import ProfileEditModal from '../../components/ProfileEditModal';
import Navigation from '../../components/Navigation';

export default function StudentHome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [fitnessData, setFitnessData] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [spiritLeaderboard, setSpiritLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [googleFitConnected, setGoogleFitConnected] = useState(false);
  const [isGoogleOAuthUser, setIsGoogleOAuthUser] = useState(false); // Track if user logged in via Google OAuth
  const [syncing, setSyncing] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    // Check for token in URL query parameters first (from Google OAuth redirect)
    const { token: queryToken, google_connected, first_time } = router.query;
    
    let token = queryToken || localStorage.getItem('token');
    let userData = localStorage.getItem('user');
    
    // If token is in URL, save it to localStorage
    if (queryToken) {
      localStorage.setItem('token', queryToken);
      token = queryToken;
      
      if (google_connected) {
        localStorage.setItem('googleFitConnected', 'true');
        localStorage.setItem('isGoogleOAuthUser', 'true'); // Mark as Google OAuth user
        setGoogleFitConnected(true);
        setIsGoogleOAuthUser(true);
      }
      
      // Clean up URL by removing query params
      router.replace('/student/dashboard', undefined, { shallow: true });
    }
    
    // If no token at all, redirect to login
    if (!token) {
      router.push('/student/login');
      return;
    }
    
    // Fetch user data if we have a token but no user data
    if (!userData && token) {
      fetchUserData(token);
    } else if (userData) {
      setUser(JSON.parse(userData));
      setProfileData(JSON.parse(userData));
      // Check profile completion for existing users
      checkProfileCompletion(token);
    }
    
    // Check if Google Fit was previously connected
    const fitConnected = localStorage.getItem('googleFitConnected');
    const oauthUser = localStorage.getItem('isGoogleOAuthUser');
    
    if (fitConnected === 'true') {
      setGoogleFitConnected(true);
    }
    
    if (oauthUser === 'true') {
      setIsGoogleOAuthUser(true);
    }
    
    fetchDashboardData(token);
    
    // Auto-sync fitness data if connected (to show graphs immediately)
    if (fitConnected === 'true' || google_connected) {
      autoSyncFitnessData(token);
    }
  }, [router.query]);

  const fetchUserData = async (token) => {
    try {
      // Fetch user profile data
      const response = await fetch('http://127.0.0.1:8000/api/profiles/me/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      
      if (response.ok) {
        const profile = await response.json();
        const userData = {
          username: profile.user?.username || profile.first_name || 'Student',
          email: profile.user?.email || profile.email || '',
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          coach_name: profile.coach_name || '',
          team_name: profile.team_name || '',
          team_role: profile.team_role || '',
          phone: profile.phone || '',
          age: profile.age || '',
          school: profile.school || '',
          address: profile.address || '',
          profile_picture_url: profile.profile_picture_url || null,
          id: profile.id
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setProfileData(userData);
        
        // Check profile completion
        checkProfileCompletion(token);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const checkProfileCompletion = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/profiles/check-completion/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfileCompleted(data.profile_completed);
      }
    } catch (error) {
      console.error('Failed to check profile completion:', error);
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    const userData = {
      username: updatedProfile.first_name || updatedProfile.user?.username || 'Student',
      email: updatedProfile.email || updatedProfile.user?.email || '',
      first_name: updatedProfile.first_name || '',
      last_name: updatedProfile.last_name || '',
      coach_name: updatedProfile.coach_name || '',
      team_name: updatedProfile.team_name || '',
      team_role: updatedProfile.team_role || '',
      phone: updatedProfile.phone || '',
      age: updatedProfile.age || '',
      school: updatedProfile.school || '',
      address: updatedProfile.address || '',
      profile_picture_url: updatedProfile.profile_picture_url || null,
      id: updatedProfile.id
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setProfileData(userData);
    setProfileCompleted(updatedProfile.profile_completed);
  };

  const autoSyncFitnessData = async (token) => {
    // Silent background sync to populate graphs
    try {
      const response = await fetch('http://127.0.0.1:8000/api/student/fitness/sync-google-fit/', {
        method: 'POST',
        headers: { 
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const fitness = await response.json();
        setFitnessData(fitness);
      }
    } catch (error) {
      console.error('Auto-sync error:', error);
    }
  };

  const fetchDashboardData = async (token) => {
    try {
      // Fetch all dashboard data
      const [fitnessRes, tournamentsRes, scheduleRes, leaderboardRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/student/fitness/', {
          headers: { 'Authorization': `Token ${token}` }
        }),
        fetch('http://127.0.0.1:8000/api/tournaments/', {
          headers: { 'Authorization': `Token ${token}` }
        }),
        fetch('http://127.0.0.1:8000/api/student/schedule/', {
          headers: { 'Authorization': `Token ${token}` }
        }),
        fetch('http://127.0.0.1:8000/api/leaderboard/', {
          headers: { 'Authorization': `Token ${token}` }
        })
      ]);

      const fitness = await fitnessRes.json();
      const tournaments = await tournamentsRes.json();
      const schedule = await scheduleRes.json();
      const leaderboard = await leaderboardRes.json();

      setFitnessData(fitness);
      setTournaments(tournaments);
      setSchedule(schedule);
      setLeaderboard(leaderboard);

      // Fetch spirit leaderboard from first available tournament
      if (tournaments && tournaments.length > 0) {
        const spiritRes = await fetch(`http://127.0.0.1:8000/api/tournaments/${tournaments[0].id}/spirit_rankings/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        if (spiritRes.ok) {
          const spiritData = await spiritRes.json();
          setSpiritLeaderboard(spiritData);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectGoogleFit = async () => {
    try {
      // Initiate Google OAuth flow for manual registration users
      const response = await fetch('http://127.0.0.1:8000/api/auth/google/');
      const data = await response.json();
      
      if (response.ok && data.auth_url) {
        // Save current state before redirecting
        localStorage.setItem('connectingGoogleFit', 'true');
        // Redirect to Google OAuth
        window.location.href = data.auth_url;
      } else {
        alert('❌ Failed to connect Google Fit. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting Google Fit:', error);
      alert('❌ Connection error. Please try again.');
    }
  };

  const syncGoogleFitData = async () => {
    const token = localStorage.getItem('token');
    setSyncing(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/student/fitness/sync-google-fit/', {
        method: 'POST',
        headers: { 
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const fitness = await response.json();
        setFitnessData(fitness);
        alert('✅ Google Fit data synced successfully!');
      } else {
        alert('❌ Failed to sync Google Fit data');
      }
    } catch (error) {
      console.error('Error syncing Google Fit data:', error);
      alert('❌ Error connecting to server');
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, border: '4px solid #f3f3f3', borderTop: '4px solid var(--wame-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ fontSize: 16, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Navigation Bar */}
      <div style={{ background: '#fff', padding: '16px 32px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <Navigation />
        </div>
      </div>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '16px 32px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src="/yu-icon.png" alt="Y-Ultimate" style={{ width: 40, height: 40 }} />
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Student Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 14, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>
              Welcome, {user?.first_name || user?.username}!
            </span>
            
            {/* Profile Picture Dropdown Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                onBlur={() => setTimeout(() => setShowProfileDropdown(false), 200)}
                style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%', 
                  border: profileCompleted ? '2px solid #4CAF50' : '2px solid #FF9800',
                  padding: 0,
                  cursor: 'pointer',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
                title="Profile Menu"
              >
                {profileData?.profile_picture_url ? (
                  <img 
                    src={profileData.profile_picture_url} 
                    alt="Profile" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }} 
                  />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" fill="#999"/>
                    <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
                {!profileCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 14,
                    height: 14,
                    background: '#FF9800',
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10
                  }}>
                    ⚠
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 8,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  minWidth: 280,
                  zIndex: 1000,
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0'
                }}>
                  {/* Profile Header */}
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', background: '#f8f9fa' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: profileData?.profile_picture_url ? 'none' : 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        border: '2px solid #fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        {profileData?.profile_picture_url ? (
                          <img src={profileData.profile_picture_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: 20, color: '#fff', fontWeight: 600 }}>
                            {(user?.first_name || user?.username || 'U')[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#333', marginBottom: 2 }}>
                          {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.username}
                        </div>
                        <div style={{ fontSize: 12, color: '#666' }}>{user?.email}</div>
                      </div>
                    </div>
                    {!profileCompleted && (
                      <div style={{ 
                        marginTop: 12, 
                        padding: '8px 12px', 
                        background: 'rgba(255,152,0,0.1)', 
                        borderRadius: 6,
                        fontSize: 12,
                        color: '#FF9800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}>
                        <span>⚠️</span>
                        <span style={{ fontWeight: 600 }}>Complete your profile</span>
                      </div>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div style={{ padding: '8px 0' }}>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setShowProfileDropdown(false);
                        setShowProfileModal(true);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 14,
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      <span style={{ fontSize: 18 }}>✏️</span>
                      <span style={{ fontWeight: 500 }}>Edit Profile</span>
                    </button>

                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 14,
                        color: '#EF4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'background 0.2s',
                        borderTop: '1px solid #f0f0f0',
                        marginTop: 4
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      <span style={{ fontSize: 18 }}>🚪</span>
                      <span style={{ fontWeight: 600 }}>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Completion Warning Banner */}
      {!profileCompleted && (
        <div style={{ background: 'linear-gradient(135deg, #FF9800 0%, #FF5722 100%)', padding: '16px 32px', boxShadow: '0 2px 8px rgba(255,152,0,0.3)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24 }}>⚠️</span>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0, marginBottom: 4 }}>
                  Profile Incomplete
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', margin: 0 }}>
                  Please complete your profile to access all features. Add your name, email, coach name, team name, and team role.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowProfileModal(true)}
              style={{ padding: '10px 24px', fontSize: 14, fontWeight: 600, color: '#FF9800', background: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* Left Column */}
          <div>
            {/* Google Fit Connection Banner */}
            {!googleFitConnected && !isGoogleOAuthUser && (
              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 12, padding: 24, marginBottom: 24, color: '#fff', boxShadow: '0 4px 12px rgba(102,126,234,0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>🔗 Connect Google Fit</h3>
                    <p style={{ fontSize: 14, opacity: 0.9 }}>Automatically sync your fitness data from Google Fit</p>
                  </div>
                  <button 
                    onClick={connectGoogleFit}
                    style={{ padding: '12px 24px', fontSize: 14, fontWeight: 600, color: '#667eea', background: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    Connect Now
                  </button>
                </div>
              </div>
            )}

            {/* Fitness Tracking Graph */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
                  Fitness Tracking {googleFitConnected && <span style={{ fontSize: 14, color: '#10b981', fontWeight: 600 }}>● Google Fit Connected</span>}
                </h2>
                {/* Show Sync Now button ONLY for manual registration users who connected Google Fit */}
                {googleFitConnected && !isGoogleOAuthUser && (
                  <button 
                    onClick={syncGoogleFitData}
                    disabled={syncing}
                    style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#fff', background: syncing ? '#ccc' : '#10b981', border: 'none', borderRadius: 6, cursor: syncing ? 'not-allowed' : 'pointer' }}
                  >
                    {syncing ? '⏳ Syncing...' : '🔄 Sync Now'}
                  </button>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#A5BF13' }}>
                    {fitnessData?.today?.calories || 0}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginTop: 4 }}>Calories Today</div>
                </div>
                <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#62929E' }}>
                    {fitnessData?.today?.steps ? fitnessData.today.steps.toLocaleString() : 0}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginTop: 4 }}>Steps Today</div>
                </div>
                <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#EF4444' }}>
                    {fitnessData?.today?.active_minutes || 0}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginTop: 4 }}>Active Minutes</div>
                </div>
              </div>
              
              {/* Real-time Charts */}
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: 12 }}>Calories Burned (Last 7 Days)</h3>
                <SimpleLineChart 
                  data={fitnessData?.calories || []} 
                  labels={fitnessData?.dates || []}
                  color="#A5BF13"
                  height={180}
                />
              </div>
              
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: 12 }}>Steps (Last 7 Days)</h3>
                <SimpleLineChart 
                  data={fitnessData?.steps || []} 
                  labels={fitnessData?.dates || []}
                  color="#62929E"
                  height={180}
                />
              </div>
            </div>

            {/* Tournaments */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
                  🏆 Tournaments
                </h2>
                <button 
                  onClick={() => router.push('/tournaments')}
                  style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#fff', background: '#667eea', border: 'none', borderRadius: 8, cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => e.target.style.background = '#5568d3'}
                  onMouseLeave={(e) => e.target.style.background = '#667eea'}
                >
                  View All Tournaments →
                </button>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 4 }}>Delhi Inter-School Championship</h3>
                      <p style={{ fontSize: 13, color: 'var(--wame-muted)' }}>📅 Dec 15-17, 2025 • 📍 JLN Stadium</p>
                    </div>
                    <span style={{ padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#fff', background: '#A5BF13', borderRadius: 12 }}>Registered</span>
                  </div>
                </div>
                <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 4 }}>Winter Tournament 2025</h3>
                      <p style={{ fontSize: 13, color: 'var(--wame-muted)' }}>📅 Jan 20-22, 2026 • 📍 Greater Kailash</p>
                    </div>
                    <button style={{ padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#fff', background: '#62929E', border: 'none', borderRadius: 12, cursor: 'pointer' }}>Register</button>
                  </div>
                </div>
              </div>
            </div>

            {/* My Schedule */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
                My Schedule
              </h2>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', gap: 16, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                  <div style={{ minWidth: 60, textAlign: 'center', padding: 12, background: '#A5BF13', color: '#fff', borderRadius: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>12</div>
                    <div style={{ fontSize: 11 }}>DEC</div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 4 }}>Practice Session</h3>
                    <p style={{ fontSize: 13, color: 'var(--wame-muted)' }}>⏰ 4:00 PM - 6:00 PM • 📍 Greater Kailash Ground</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                  <div style={{ minWidth: 60, textAlign: 'center', padding: 12, background: '#62929E', color: '#fff', borderRadius: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>14</div>
                    <div style={{ fontSize: 11 }}>DEC</div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 4 }}>Coaching Workshop</h3>
                    <p style={{ fontSize: 13, color: 'var(--wame-muted)' }}>⏰ 10:00 AM - 12:00 PM • 📍 Y-Ultimate HQ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Spirit Score Leaderboard */}
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
                ⭐ Spirit Leaderboard
              </h2>
              <p style={{ fontSize: 13, color: 'var(--wame-muted)', marginBottom: 20 }}>Top teams by Spirit of the Game</p>
              <div style={{ display: 'grid', gap: 12 }}>
                {spiritLeaderboard && spiritLeaderboard.length > 0 ? (
                  spiritLeaderboard.slice(0, 5).map((team, index) => (
                    <div 
                      key={team.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: 12, 
                        background: team.name === user?.team_name ? '#fffbeb' : '#f8f9fa', 
                        borderRadius: 8,
                        border: team.name === user?.team_name ? '2px solid #A5BF13' : '1px solid #e0e0e0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 18, fontWeight: 700, color: '#666', minWidth: 24 }}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)' }}>
                            {team.name}
                          </div>
                          {team.city && (
                            <div style={{ fontSize: 11, color: '#999' }}>{team.city}</div>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#A5BF13' }}>
                          {team.average_spirit_score?.toFixed(1) || 'N/A'}
                        </div>
                        <div style={{ fontSize: 10, color: '#999' }}>spirit score</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
                    <p style={{ fontSize: 14 }}>No spirit scores available yet</p>
                  </div>
                )}
              </div>
              {spiritLeaderboard && spiritLeaderboard.length > 5 && (
                <button
                  onClick={() => router.push('/tournaments')}
                  style={{
                    width: '100%',
                    marginTop: 16,
                    padding: '10px',
                    background: 'transparent',
                    border: '2px solid #A5BF13',
                    borderRadius: 8,
                    color: '#A5BF13',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  View Full Leaderboard →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userData={profileData}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}
