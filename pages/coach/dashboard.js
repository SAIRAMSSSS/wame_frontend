import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../../components/Navigation';
import SimpleLineChart from '../../components/SimpleLineChart';

export default function CoachDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [myTeam, setMyTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [spiritLeaderboard, setSpiritLeaderboard] = useState([]);
  const [teamPerformance, setTeamPerformance] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedView, setSelectedView] = useState('overview'); // 'overview', 'students', 'performance'

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken) {
      router.push('/coach/login');
      return;
    }

    // Verify user is a coach
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'team_manager' && userData.role !== 'tournament_director') {
        router.push('/student/login');
        return;
      }
      setUser(userData);
    }

    setToken(storedToken);
    fetchDashboardData(storedToken);
  }, []);

  const fetchDashboardData = async (authToken) => {
    try {
      setLoading(true);

      // Fetch tournaments
      const tournamentsRes = await fetch('http://127.0.0.1:8000/api/tournaments/', {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      const tournamentsData = await tournamentsRes.json();
      setTournaments(tournamentsData);

      // Fetch spirit leaderboard from first available tournament
      if (tournamentsData && tournamentsData.length > 0) {
        const spiritRes = await fetch(`http://127.0.0.1:8000/api/tournaments/${tournamentsData[0].id}/spirit_rankings/`, {
          headers: { 'Authorization': `Token ${authToken}` }
        });
        if (spiritRes.ok) {
          const spiritData = await spiritRes.json();
          setSpiritLeaderboard(spiritData);
        }
      }

      // Fetch all students/profiles for team analytics
      const profilesRes = await fetch('http://127.0.0.1:8000/api/profiles/', {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      if (profilesRes.ok) {
        const allProfiles = await profilesRes.json();
        // Filter students only
        const studentProfiles = allProfiles.filter(p => 
          p.user_type === 'student' || p.role === 'student'
        );
        setStudents(studentProfiles);

        // Calculate team performance metrics
        calculateTeamPerformance(studentProfiles);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTeamPerformance = (studentProfiles) => {
    // Mock data for now - in real app, this would come from fitness data endpoint
    const performance = {
      totalStudents: studentProfiles.length,
      activeStudents: Math.floor(studentProfiles.length * 0.7),
      avgCalories: [1200, 1350, 1400, 1500, 1450, 1600, 1550],
      avgSteps: [5000, 5500, 6000, 6500, 6200, 7000, 6800],
      dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      topPerformers: studentProfiles.slice(0, 5)
    };
    setTeamPerformance(performance);
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
          <div style={{ width: 60, height: 60, border: '4px solid #f3f3f3', borderTop: '4px solid #EF4444', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ fontSize: 16, color: '#666', fontFamily: 'Inter, sans-serif' }}>Loading coach dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Coach Dashboard - Y-Ultimate</title>
      </Head>

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
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#333', fontFamily: 'Poppins, sans-serif' }}>
                👨‍🏫 Coach Dashboard
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ fontSize: 14, color: '#666', fontFamily: 'Inter, sans-serif' }}>
                Welcome, Coach {user?.first_name || user?.username}!
              </span>
              <button
                onClick={handleLogout}
                style={{ padding: '8px 16px', background: '#EF4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px' }}>
          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 32 }}>
            <div style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', borderRadius: 12, padding: 32, color: 'white', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>
              <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 8 }}>{tournaments.length}</div>
              <div style={{ fontSize: 16, opacity: 0.9 }}>Active Tournaments</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: 12, padding: 32, color: 'white', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
              <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 8 }}>
                {students.length}
              </div>
              <div style={{ fontSize: 16, opacity: 0.9 }}>Total Students</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 12, padding: 32, color: 'white', boxShadow: '0 4px 12px rgba(102,126,234,0.3)' }}>
              <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 8 }}>
                {teamPerformance?.activeStudents || 0}
              </div>
              <div style={{ fontSize: 16, opacity: 0.9 }}>Active Students</div>
            </div>
          </div>

          {/* View Tabs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, borderBottom: '2px solid #e0e0e0' }}>
            <button
              onClick={() => setSelectedView('overview')}
              style={{
                padding: '12px 24px',
                background: selectedView === 'overview' ? '#EF4444' : 'transparent',
                color: selectedView === 'overview' ? '#fff' : '#666',
                border: 'none',
                borderBottom: selectedView === 'overview' ? '3px solid #EF4444' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s'
              }}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setSelectedView('performance')}
              style={{
                padding: '12px 24px',
                background: selectedView === 'performance' ? '#EF4444' : 'transparent',
                color: selectedView === 'performance' ? '#fff' : '#666',
                border: 'none',
                borderBottom: selectedView === 'performance' ? '3px solid #EF4444' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s'
              }}
            >
              📈 Team Performance
            </button>
            <button
              onClick={() => setSelectedView('students')}
              style={{
                padding: '12px 24px',
                background: selectedView === 'students' ? '#EF4444' : 'transparent',
                color: selectedView === 'students' ? '#fff' : '#666',
                border: 'none',
                borderBottom: selectedView === 'students' ? '3px solid #EF4444' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s'
              }}
            >
              👥 Students
            </button>
          </div>

          {/* Overview Tab */}
          {selectedView === 'overview' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                {/* Left Column - Tournaments */}
                <div>
                  <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', fontFamily: 'Poppins, sans-serif' }}>
                        🏆 Tournaments
                      </h2>
                      <button
                        onClick={() => router.push('/tournaments')}
                        style={{ padding: '10px 20px', background: '#EF4444', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                      >
                        View All
                      </button>
                    </div>

                    {tournaments.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
                        <p style={{ fontSize: 16 }}>No tournaments available</p>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gap: 16 }}>
                        {tournaments.slice(0, 4).map((tournament) => (
                          <div
                            key={tournament.id}
                            onClick={() => router.push(`/tournaments/${tournament.id}`)}
                            style={{
                              background: '#f8f9fa',
                              borderRadius: 12,
                              padding: 20,
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              border: '2px solid #e0e0e0'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.borderColor = '#EF4444';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239,68,68,0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.borderColor = '#e0e0e0';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginBottom: 8 }}>
                              {tournament.name}
                            </h3>
                            <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
                              📍 {tournament.location}
                            </div>
                            <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
                              📅 {new Date(tournament.start_date).toLocaleDateString()}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{
                                background: tournament.status === 'ongoing' ? '#10b981' :
                                          tournament.status === 'registration_open' ? '#3b82f6' : '#6b7280',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600
                              }}>
                                {tournament.status === 'ongoing' ? 'Ongoing' :
                                 tournament.status === 'registration_open' ? 'Registration Open' : 'Completed'}
                              </span>
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                                View Details →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Spirit Leaderboard */}
                <div>
                  <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#333', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
                      ⭐ Spirit Leaderboard
                    </h2>
                    <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>Top teams by Spirit of the Game</p>
                    <div style={{ display: 'grid', gap: 12 }}>
                      {spiritLeaderboard && spiritLeaderboard.length > 0 ? (
                        spiritLeaderboard.slice(0, 10).map((team, index) => (
                          <div 
                            key={team.id} 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              padding: 12, 
                              background: index < 3 ? '#fff9f0' : '#f8f9fa', 
                              borderRadius: 8,
                              border: index < 3 ? '2px solid #fbbf24' : '1px solid #e0e0e0'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <span style={{ fontSize: 18, fontWeight: 700, color: '#666', minWidth: 24 }}>
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                              </span>
                              <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                                  {team.name}
                                </div>
                                {team.city && (
                                  <div style={{ fontSize: 11, color: '#999' }}>{team.city}</div>
                                )}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 16, fontWeight: 700, color: '#EF4444' }}>
                                {team.average_spirit_score?.toFixed(1) || 'N/A'}
                              </div>
                              <div style={{ fontSize: 10, color: '#999' }}>spirit</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
                          <p style={{ fontSize: 14 }}>No spirit scores yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Performance Tab */}
          {selectedView === 'performance' && teamPerformance && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                {/* Team Calories Graph */}
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#333', marginBottom: 16 }}>
                    🔥 Team Average Calories (7 Days)
                  </h3>
                  <SimpleLineChart
                    data={teamPerformance.avgCalories}
                    labels={teamPerformance.dates}
                    color="#EF4444"
                    height={250}
                  />
                  <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#EF4444' }}>
                      {teamPerformance.avgCalories[teamPerformance.avgCalories.length - 1]}
                    </div>
                    <div style={{ fontSize: 13, color: '#666' }}>Average Today</div>
                  </div>
                </div>

                {/* Team Steps Graph */}
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#333', marginBottom: 16 }}>
                    👟 Team Average Steps (7 Days)
                  </h3>
                  <SimpleLineChart
                    data={teamPerformance.avgSteps}
                    labels={teamPerformance.dates}
                    color="#10b981"
                    height={250}
                  />
                  <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#10b981' }}>
                      {teamPerformance.avgSteps[teamPerformance.avgSteps.length - 1].toLocaleString()}
                    </div>
                    <div style={{ fontSize: 13, color: '#666' }}>Average Today</div>
                  </div>
                </div>
              </div>

              {/* Performance Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>📈</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#10b981', marginBottom: 8 }}>+15%</div>
                  <div style={{ fontSize: 14, color: '#666' }}>Activity Increase</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>vs Last Week</div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>⏱️</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#667eea', marginBottom: 8 }}>142</div>
                  <div style={{ fontSize: 14, color: '#666' }}>Avg Active Minutes</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Per Day</div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>🎯</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b', marginBottom: 8 }}>87%</div>
                  <div style={{ fontSize: 14, color: '#666' }}>Goal Achievement</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>This Week</div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>🏃</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#EF4444', marginBottom: 8 }}>
                    {teamPerformance.activeStudents}
                  </div>
                  <div style={{ fontSize: 14, color: '#666' }}>Active Students</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Last 7 Days</div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {selectedView === 'students' && (
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', fontFamily: 'Poppins, sans-serif' }}>
                  👥 All Students ({students.length})
                </h2>
              </div>

              {students.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
                  <p style={{ fontSize: 16 }}>No students found</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                  {/* Table Header */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '50px 2fr 2fr 1.5fr 1.5fr 1fr', 
                    padding: '12px 16px', 
                    background: '#f8f9fa', 
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 13,
                    color: '#666'
                  }}>
                    <div>#</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Team</div>
                    <div>School</div>
                    <div>Role</div>
                  </div>

                  {/* Student Rows */}
                  {students.map((student, index) => (
                    <div 
                      key={student.id}
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '50px 2fr 2fr 1.5fr 1.5fr 1fr', 
                        padding: '16px', 
                        background: '#fff', 
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        alignItems: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8f9fa';
                        e.currentTarget.style.borderColor = '#EF4444';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#666' }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                          {student.first_name && student.last_name 
                            ? `${student.first_name} ${student.last_name}` 
                            : student.user?.username || 'N/A'}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: '#666' }}>
                        {student.user?.email || student.email || 'N/A'}
                      </div>
                      <div style={{ fontSize: 13, color: '#666' }}>
                        {student.team_name || 'Not assigned'}
                      </div>
                      <div style={{ fontSize: 13, color: '#666' }}>
                        {student.school || 'N/A'}
                      </div>
                      <div>
                        <span style={{
                          padding: '4px 10px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600
                        }}>
                          {student.team_role || 'Student'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
