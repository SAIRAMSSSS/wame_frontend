import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VolunteerHome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('matches');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/volunteer/login');
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.user_type !== 'volunteer') {
        router.push('/student/login');
        return;
      }
      setUser(parsedUser);
    }

    fetchVolunteerData(token);
  }, [router]);

  const fetchVolunteerData = async (token) => {
    try {
      // Fetch matches, tournaments, and attendance data
      const [matchesRes, tournamentsRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/matches/', {
          headers: { 'Authorization': `Token ${token}` }
        }),
        fetch('http://127.0.0.1:8000/api/tournaments/', {
          headers: { 'Authorization': `Token ${token}` }
        })
      ]);

      const matches = await matchesRes.json();
      const tournaments = await tournamentsRes.json();

      setMatches(matches);
      setTournaments(tournaments);
    } catch (error) {
      console.error('Error fetching volunteer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMatchScore = async (matchId, teamAScore, teamBScore) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/matches/${matchId}/update_score/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          team_a_score: teamAScore,
          team_b_score: teamBScore
        })
      });

      if (response.ok) {
        alert('Score updated successfully!');
        fetchVolunteerData(token); // Refresh data
      } else {
        alert('Failed to update score');
      }
    } catch (error) {
      console.error('Error updating score:', error);
      alert('Error updating score');
    }
  };

  const submitSpiritScore = async (matchId, submittingTeamId, targetTeamId, scores) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/spirit-scores/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          match: matchId,
          submitting_team: submittingTeamId,
          target_team: targetTeamId,
          ...scores
        })
      });

      if (response.ok) {
        alert('Spirit score submitted successfully!');
        fetchVolunteerData(token); // Refresh data
      } else {
        alert('Failed to submit spirit score');
      }
    } catch (error) {
      console.error('Error submitting spirit score:', error);
      alert('Error submitting spirit score');
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
          <p style={{ fontSize: 16, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>Loading volunteer dashboard...</p>
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
              Volunteer Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 14, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>
              Welcome, Volunteer {user?.first_name}!
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
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #e0e0e0' }}>
          {[
            { id: 'matches', label: 'Live Matches', icon: '🏐' },
            { id: 'tournaments', label: 'Tournaments', icon: '🏆' },
            { id: 'attendance', label: 'Attendance', icon: '📝' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id ? 'var(--wame-accent)' : '#fff',
                color: activeTab === tab.id ? '#fff' : 'var(--wame-dark)',
                border: activeTab === tab.id ? 'none' : '1px solid #e0e0e0',
                borderBottom: activeTab === tab.id ? 'none' : '1px solid #e0e0e0',
                borderRadius: '8px 8px 0 0',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'matches' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
              Live Matches
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {matches.map((match) => (
                <div key={match.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8 }}>
                        {match.team_a.name} vs {match.team_b.name}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 4 }}>
                        📅 {match.scheduled_time} • 📍 {match.field?.name || 'TBD'}
                      </p>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                        {match.tournament.name}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#fff',
                      background: match.status === 'in_progress' ? '#10b981' : match.status === 'completed' ? '#6b7280' : '#f59e0b',
                      borderRadius: 12
                    }}>
                      {match.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Score Update Section */}
                  {match.status === 'in_progress' && (
                    <div style={{ marginBottom: 16, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 12 }}>
                        Update Live Score
                      </h4>
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)' }}>
                            {match.team_a.name}:
                          </span>
                          <input
                            type="number"
                            defaultValue={match.team_a_score}
                            min="0"
                            style={{ width: 60, padding: '6px 8px', border: '1px solid #e0e0e0', borderRadius: 4, textAlign: 'center' }}
                            id={`score-a-${match.id}`}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)' }}>
                            {match.team_b.name}:
                          </span>
                          <input
                            type="number"
                            defaultValue={match.team_b_score}
                            min="0"
                            style={{ width: 60, padding: '6px 8px', border: '1px solid #e0e0e0', borderRadius: 4, textAlign: 'center' }}
                            id={`score-b-${match.id}`}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const scoreA = parseInt(document.getElementById(`score-a-${match.id}`).value) || 0;
                            const scoreB = parseInt(document.getElementById(`score-b-${match.id}`).value) || 0;
                            updateMatchScore(match.id, scoreA, scoreB);
                          }}
                          style={{ padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#fff', background: '#A5BF13', border: 'none', borderRadius: 6, cursor: 'pointer' }}
                        >
                          Update Score
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Current Score Display */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--wame-dark)' }}>
                        {match.team_a_score}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)' }}>
                        {match.team_a.name}
                      </div>
                    </div>
                    <div style={{ fontSize: 18, color: 'var(--wame-muted)', margin: '0 16px' }}>VS</div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--wame-dark)' }}>
                        {match.team_b_score}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)' }}>
                        {match.team_b.name}
                      </div>
                    </div>
                  </div>

                  {/* Spirit Score Section */}
                  {match.status === 'completed' && !match.spirit_scores_submitted && (
                    <div style={{ marginTop: 16, padding: 16, background: '#fef3c7', borderRadius: 8 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 12 }}>
                        Submit Spirit Scores
                      </h4>
                      <div style={{ display: 'grid', gap: 12 }}>
                        {/* Spirit score form would go here - simplified for now */}
                        <p style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                          Spirit score submission form would be implemented here with 5 categories (0-4 points each).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
              Tournaments
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
              {tournaments.map((tournament) => (
                <div key={tournament.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8 }}>
                      {tournament.name}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 4 }}>
                      📅 {tournament.start_date} - {tournament.end_date}
                    </p>
                    <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 8 }}>
                      📍 {tournament.location}
                    </p>
                    <p style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                      {tournament.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#fff',
                      background: tournament.status === 'ongoing' ? '#10b981' : tournament.status === 'completed' ? '#6b7280' : '#f59e0b',
                      borderRadius: 12
                    }}>
                      {tournament.status.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                      {tournament.max_teams} teams
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
              Volunteer Attendance
            </h2>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: 16, color: 'var(--wame-muted)', textAlign: 'center', margin: 0 }}>
                Attendance tracking for volunteer sessions would be displayed here.
                This could include match officiating hours, tournament duties, and other volunteer activities.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
