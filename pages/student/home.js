import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SimpleLineChart from '../../components/SimpleLineChart';

export default function StudentHome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [fitnessData, setFitnessData] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [googleFitConnected, setGoogleFitConnected] = useState(false);
  const [isGoogleOAuthUser, setIsGoogleOAuthUser] = useState(false); // Track if user logged in via Google OAuth
  const [syncing, setSyncing] = useState(false);

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
      router.replace('/student/home', undefined, { shallow: true });
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
      const response = await fetch('http://127.0.0.1:8000/api/profiles/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      
      if (response.ok) {
        const profiles = await response.json();
        if (profiles && profiles.length > 0) {
          const userData = {
            username: profiles[0].user_name || 'Student',
            email: profiles[0].email || '',
            id: profiles[0].id
          };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
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
              Welcome, {user?.first_name}!
            </span>
            <button
              onClick={handleLogout}
              style={{ padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#fff', background: '#EF4444', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* Left Column */}
          <div>
            {/* Google Fit Connection Banner */}
            {!googleFitConnected && (
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
                  Tournaments
                </h2>
                <button style={{ padding: '6px 12px', fontSize: 13, fontWeight: 600, color: 'var(--wame-accent)', background: 'transparent', border: '1px solid var(--wame-accent)', borderRadius: 6, cursor: 'pointer' }}>
                  View All
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

          {/* Right Column - Leaderboard */}
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
                Leaderboard
              </h2>
              <p style={{ fontSize: 13, color: 'var(--wame-muted)', marginBottom: 20 }}>Top performers this month</p>
              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  { rank: 1, name: 'Rahul Sharma', points: 1250, badge: '🥇' },
                  { rank: 2, name: 'Priya Singh', points: 1180, badge: '🥈' },
                  { rank: 3, name: 'Amit Kumar', points: 1120, badge: '🥉' },
                  { rank: 4, name: 'Sneha Patel', points: 1050 },
                  { rank: 5, name: 'Vikas Reddy', points: 980 },
                  { rank: 6, name: user?.first_name + ' ' + user?.last_name || 'You', points: 920, highlight: true },
                ].map((player) => (
                  <div 
                    key={player.rank} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: 12, 
                      background: player.highlight ? '#fffbeb' : '#f8f9fa', 
                      borderRadius: 8,
                      border: player.highlight ? '2px solid #A5BF13' : '1px solid #e0e0e0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#666', minWidth: 24 }}>
                        {player.badge || `#${player.rank}`}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)' }}>{player.name}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#A5BF13' }}>{player.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
