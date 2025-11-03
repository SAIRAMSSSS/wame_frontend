import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../../components/Navigation';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TournamentDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [tournament, setTournament] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [spiritRankings, setSpiritRankings] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('leaderboard'); // leaderboard, spirit, schedule, graphs
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/student/login');
      return;
    }
    setToken(storedToken);
    
    if (id) {
      fetchAllData(storedToken);
    }
  }, [id]);

  const fetchAllData = async (authToken) => {
    try {
      setLoading(true);
      
      // Fetch user profile to determine role
      const profileRes = await fetch('http://127.0.0.1:8000/api/profiles/me/', {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      const profileData = await profileRes.json();
      setUserProfile(profileData);

      // Fetch tournament details
      const tournamentRes = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      const tournamentData = await tournamentRes.json();
      setTournament(tournamentData);

      // Fetch leaderboard
      const leaderboardRes = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/leaderboard/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      const leaderboardData = await leaderboardRes.json();
      setLeaderboard(leaderboardData);

      // Fetch spirit rankings
      const spiritRes = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/spirit_rankings/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      const spiritData = await spiritRes.json();
      setSpiritRankings(spiritData);

      // Fetch schedule
      const scheduleRes = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/schedule/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      const scheduleData = await scheduleRes.json();
      setSchedule(scheduleData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isCoach = userProfile?.role === 'team_manager';

  // Team Performance Comparison Graph Data (for coaches)
  const getTeamComparisonData = () => {
    if (!leaderboard.length) return null;

    return {
      labels: leaderboard.map(team => team.name),
      datasets: [
        {
          label: 'Wins',
          data: leaderboard.map(team => team.wins),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
        {
          label: 'Losses',
          data: leaderboard.map(team => team.losses),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
        {
          label: 'Points For',
          data: leaderboard.map(team => team.points_for),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        }
      ]
    };
  };

  // Player Performance Comparison (for coaches)
  const getPlayerComparisonData = () => {
    if (!leaderboard.length) return null;

    // Get all players from all teams
    const allPlayers = leaderboard.flatMap(team => 
      team.players?.map(player => ({
        ...player,
        teamName: team.name
      })) || []
    );

    // Sort by some metric (you can customize this)
    const topPlayers = allPlayers.slice(0, 10);

    return {
      labels: topPlayers.map(p => `${p.name} (${p.teamName})`),
      datasets: [
        {
          label: 'Player Performance Score',
          data: topPlayers.map(() => Math.floor(Math.random() * 100)), // Replace with actual player stats when available
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2,
        }
      ]
    };
  };

  const renderLeaderboardTab = () => {
    if (isCoach) {
      // Coach sees TWO leaderboards: Team-wise and Player-wise
      return (
        <div>
          {/* Team-wise Leaderboard */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              🏆 Team Leaderboard
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Rank</th>
                    <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Team</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>W</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>L</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>PF</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>PA</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>+/-</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Spirit</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((team, index) => (
                    <tr key={team.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: 16, fontWeight: 700, fontSize: 18 }}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {team.logo_url && (
                            <img src={team.logo_url} alt={team.name} style={{ width: 40, height: 40, borderRadius: 8 }} />
                          )}
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 16 }}>{team.name}</div>
                            <div style={{ fontSize: 12, color: '#999' }}>{team.city}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#28a745' }}>{team.wins}</td>
                      <td style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#dc3545' }}>{team.losses}</td>
                      <td style={{ padding: 16, textAlign: 'center' }}>{team.points_for}</td>
                      <td style={{ padding: 16, textAlign: 'center' }}>{team.points_against}</td>
                      <td style={{ 
                        padding: 16, 
                        textAlign: 'center', 
                        fontWeight: 600,
                        color: team.point_differential > 0 ? '#28a745' : team.point_differential < 0 ? '#dc3545' : '#666'
                      }}>
                        {team.point_differential > 0 ? '+' : ''}{team.point_differential}
                      </td>
                      <td style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#667eea' }}>
                        {team.average_spirit_score?.toFixed(1) || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Player-wise Leaderboard */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              👤 Player Leaderboard
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Rank</th>
                    <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Player</th>
                    <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Team</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Jersey</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Position</th>
                    <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.flatMap(team => 
                    team.players?.map(player => ({ ...player, teamName: team.name, teamLogo: team.logo_url })) || []
                  ).map((player, index) => (
                    <tr key={`${player.id}-${index}`} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: 16, fontWeight: 600 }}>#{index + 1}</td>
                      <td style={{ padding: 16 }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>{player.name}</div>
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {player.teamLogo && (
                            <img src={player.teamLogo} alt={player.teamName} style={{ width: 24, height: 24, borderRadius: 4 }} />
                          )}
                          <span style={{ fontSize: 14, color: '#666' }}>{player.teamName}</span>
                        </div>
                      </td>
                      <td style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#667eea' }}>
                        #{player.jersey_number}
                      </td>
                      <td style={{ padding: 16, textAlign: 'center' }}>
                        <span style={{ 
                          background: '#f0f0f0', 
                          padding: '4px 8px', 
                          borderRadius: 4, 
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {player.position}
                        </span>
                      </td>
                      <td style={{ padding: 16, textAlign: 'center' }}>
                        <span style={{ 
                          background: player.is_active ? '#d4edda' : '#f8d7da',
                          color: player.is_active ? '#155724' : '#721c24',
                          padding: '4px 8px', 
                          borderRadius: 4, 
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {player.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      // Student sees ONLY student leaderboard
      return (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            🎓 Student Leaderboard
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Rank</th>
                  <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Student Name</th>
                  <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Team</th>
                  <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Jersey</th>
                  <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Position</th>
                  <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Team W-L</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.flatMap(team => 
                  team.players?.map(player => ({ 
                    ...player, 
                    teamName: team.name, 
                    teamLogo: team.logo_url,
                    teamWins: team.wins,
                    teamLosses: team.losses
                  })) || []
                ).map((player, index) => (
                  <tr key={`${player.id}-${index}`} style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: 16, fontWeight: 700, fontSize: 18 }}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </td>
                    <td style={{ padding: 16 }}>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>{player.name}</div>
                    </td>
                    <td style={{ padding: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {player.teamLogo && (
                          <img src={player.teamLogo} alt={player.teamName} style={{ width: 32, height: 32, borderRadius: 6 }} />
                        )}
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{player.teamName}</span>
                      </div>
                    </td>
                    <td style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#667eea', fontSize: 16 }}>
                      #{player.jersey_number}
                    </td>
                    <td style={{ padding: 16, textAlign: 'center' }}>
                      <span style={{ 
                        background: '#667eea', 
                        color: 'white',
                        padding: '6px 12px', 
                        borderRadius: 6, 
                        fontSize: 13,
                        fontWeight: 600
                      }}>
                        {player.position}
                      </span>
                    </td>
                    <td style={{ padding: 16, textAlign: 'center', fontWeight: 600, fontSize: 15 }}>
                      <span style={{ color: '#28a745' }}>{player.teamWins}W</span>
                      {' - '}
                      <span style={{ color: '#dc3545' }}>{player.teamLosses}L</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  const renderGraphsTab = () => {
    if (!isCoach) {
      return (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#666' }}>Coach Access Only</h3>
          <p style={{ color: '#999' }}>Performance graphs are available to coaches only</p>
        </div>
      );
    }

    const teamData = getTeamComparisonData();
    const playerData = getPlayerComparisonData();

    return (
      <div>
        {/* Team Performance Comparison */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20 }}>
            📊 Team Performance Comparison
          </h2>
          <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            {teamData && (
              <Bar 
                data={teamData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Team Statistics Comparison'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Player Performance Comparison */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20 }}>
            🎯 Player Performance Comparison
          </h2>
          <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            {playerData && (
              <Bar 
                data={playerData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Top Players Performance'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <div style={{ fontSize: 20 }}>Loading tournament...</div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
          <div style={{ fontSize: 20 }}>Tournament not found</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{tournament.name} - Y-Ultimate</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        {/* Navigation Bar */}
        <div style={{ background: '#fff', padding: '16px 32px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <Navigation />
          </div>
        </div>

        {/* Tournament Header */}
        <div style={{ 
          background: tournament.banner_image_url 
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${tournament.banner_image_url})` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '60px 24px'
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <button
              onClick={() => router.push('/tournaments')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 20
              }}
            >
              ← Back to Tournaments
            </button>
            <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 12 }}>{tournament.name}</h1>
            <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 24 }}>{tournament.description}</p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 16 }}>
              <div>📍 {tournament.location}</div>
              <div>📅 {new Date(tournament.start_date).toLocaleDateString()} - {new Date(tournament.end_date).toLocaleDateString()}</div>
              <div>👥 {tournament.registered_teams_count} / {tournament.max_teams} teams</div>
            </div>
          </div>
        </div>

        {/* Role Badge */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ 
            display: 'inline-block',
            background: isCoach ? '#28a745' : '#667eea',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600
          }}>
            {isCoach ? '👨‍🏫 Coach View' : '🎓 Student View'}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 24px' }}>
          <div style={{ 
            background: 'white', 
            borderRadius: 12, 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex', 
              borderBottom: '2px solid #e0e0e0',
              overflowX: 'auto'
            }}>
              {['leaderboard', 'spirit', 'schedule', isCoach && 'graphs'].filter(Boolean).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '16px 24px',
                    background: activeTab === tab ? '#667eea' : 'transparent',
                    color: activeTab === tab ? 'white' : '#666',
                    border: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    borderBottom: activeTab === tab ? '3px solid #667eea' : '3px solid transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab === 'leaderboard' ? (isCoach ? '🏆 Leaderboards' : '🎓 Student Leaderboard') :
                   tab === 'spirit' ? '⭐ Spirit Rankings' :
                   tab === 'schedule' ? '📅 Schedule' :
                   '📊 Graphs'}
                </button>
              ))}
            </div>

            <div style={{ padding: 32 }}>
              {activeTab === 'leaderboard' && renderLeaderboardTab()}
              
              {activeTab === 'spirit' && (
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20 }}>
                    ⭐ Spirit of the Game Rankings
                  </h2>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                          <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Rank</th>
                          <th style={{ padding: 16, textAlign: 'left', fontWeight: 600, color: '#666' }}>Team</th>
                          <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Average Spirit Score</th>
                          <th style={{ padding: 16, textAlign: 'center', fontWeight: 600, color: '#666' }}>Games Played</th>
                        </tr>
                      </thead>
                      <tbody>
                        {spiritRankings.map((team, index) => (
                          <tr key={team.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                            <td style={{ padding: 16, fontWeight: 700, fontSize: 18 }}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                            </td>
                            <td style={{ padding: 16 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {team.logo_url && (
                                  <img src={team.logo_url} alt={team.name} style={{ width: 40, height: 40, borderRadius: 8 }} />
                                )}
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: 16 }}>{team.name}</div>
                                  <div style={{ fontSize: 12, color: '#999' }}>{team.city}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: 16, textAlign: 'center', fontWeight: 700, fontSize: 20, color: '#667eea' }}>
                              {team.average_spirit_score?.toFixed(1) || 'N/A'}
                            </td>
                            <td style={{ padding: 16, textAlign: 'center', color: '#666' }}>
                              {team.wins + team.losses}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20 }}>
                    📅 Match Schedule
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {schedule.map((match) => (
                      <div
                        key={match.id}
                        style={{
                          background: '#f8f9fa',
                          borderRadius: 12,
                          padding: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 16,
                          flexWrap: 'wrap'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 150 }}>
                          <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
                            {new Date(match.scheduled_time).toLocaleDateString()}
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>
                            {new Date(match.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                            {match.field_name || 'TBD'}
                          </div>
                        </div>

                        <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                          <div style={{ textAlign: 'right', flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{match.team1_name}</div>
                            {match.status === 'completed' && (
                              <div style={{ fontSize: 24, fontWeight: 800, color: '#667eea', marginTop: 8 }}>
                                {match.team1_score}
                              </div>
                            )}
                          </div>

                          <div style={{ fontSize: 20, fontWeight: 600, color: '#999' }}>vs</div>

                          <div style={{ textAlign: 'left', flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{match.team2_name}</div>
                            {match.status === 'completed' && (
                              <div style={{ fontSize: 24, fontWeight: 800, color: '#667eea', marginTop: 8 }}>
                                {match.team2_score}
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ flex: 1, textAlign: 'right', minWidth: 120 }}>
                          <span style={{
                            background: match.status === 'completed' ? '#28a745' :
                                      match.status === 'in_progress' ? '#ffc107' :
                                      match.status === 'cancelled' ? '#dc3545' : '#6c757d',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: 6,
                            fontSize: 13,
                            fontWeight: 600
                          }}>
                            {match.status === 'scheduled' ? 'Scheduled' :
                             match.status === 'in_progress' ? 'Live' :
                             match.status === 'completed' ? 'Final' : 'Cancelled'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'graphs' && renderGraphsTab()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
