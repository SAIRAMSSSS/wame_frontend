import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../../components/Navigation';

export default function TournamentsPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, ongoing, completed
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/student/login');
      return;
    }
    setToken(storedToken);
    fetchTournaments(storedToken);
  }, [filter]);

  const fetchTournaments = async (authToken) => {
    try {
      setLoading(true);
      const url = filter === 'all' 
        ? 'http://127.0.0.1:8000/api/tournaments/'
        : `http://127.0.0.1:8000/api/tournaments/?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTournaments(data);
      } else {
        console.error('Failed to fetch tournaments');
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'draft': '#6c757d',
      'registration_open': '#28a745',
      'registration_closed': '#ffc107',
      'ongoing': '#17a2b8',
      'completed': '#dc3545',
      'cancelled': '#6c757d'
    };
    return colors[status] || '#6c757d';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'draft': 'Draft',
      'registration_open': 'Registration Open',
      'registration_closed': 'Registration Closed',
      'ongoing': 'Ongoing',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return labels[status] || status;
  };

  return (
    <>
      <Head>
        <title>Tournaments - Y-Ultimate</title>
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        {/* Navigation Bar */}
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '16px 32px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <Navigation />
          </div>
        </div>

        {/* Header */}
        <div style={{ 
          background: 'rgba(255,255,255,0.95)', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={() => router.push('/student/dashboard')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  padding: 8
                }}
              >
                ←
              </button>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#333' }}>
                🏆 Tournaments
              </h1>
            </div>
            <button
              onClick={() => router.push('/student/dashboard')}
              style={{
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#5568d3'}
              onMouseLeave={(e) => e.target.style.background = '#667eea'}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
          <div style={{ 
            background: 'white', 
            borderRadius: 12, 
            padding: '16px 24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: 24
          }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['all', 'registration_open', 'ongoing', 'completed'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  style={{
                    padding: '10px 20px',
                    background: filter === filterOption ? '#667eea' : '#f8f9fa',
                    color: filter === filterOption ? 'white' : '#333',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {filterOption === 'all' ? 'All Tournaments' : getStatusLabel(filterOption)}
                </button>
              ))}
            </div>
          </div>

          {/* Tournaments Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'white', fontSize: 18 }}>
              Loading tournaments...
            </div>
          ) : tournaments.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 60, 
              background: 'white', 
              borderRadius: 12,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 8 }}>No Tournaments Found</h3>
              <p style={{ color: '#666', fontSize: 16 }}>Check back later for upcoming tournaments!</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
              gap: 24 
            }}>
              {tournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  onClick={() => router.push(`/tournaments/${tournament.id}`)}
                  style={{
                    background: 'white',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Tournament Banner */}
                  {tournament.banner_image_url ? (
                    <div style={{ height: 160, background: '#f0f0f0', position: 'relative' }}>
                      <img 
                        src={tournament.banner_image_url} 
                        alt={tournament.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{ 
                      height: 160, 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ fontSize: 64 }}>🏆</div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: getStatusColor(tournament.status),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}>
                    {getStatusLabel(tournament.status)}
                  </div>

                  {/* Tournament Info */}
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#333', marginBottom: 12, lineHeight: 1.3 }}>
                      {tournament.name}
                    </h3>

                    <p style={{ fontSize: 14, color: '#666', marginBottom: 16, lineHeight: 1.6, height: 60, overflow: 'hidden' }}>
                      {tournament.description || 'Join us for an exciting tournament!'}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#666' }}>
                        <span>📍</span>
                        <span>{tournament.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#666' }}>
                        <span>📅</span>
                        <span>{new Date(tournament.start_date).toLocaleDateString()} - {new Date(tournament.end_date).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#666' }}>
                        <span>👥</span>
                        <span>{tournament.registered_teams_count || 0} / {tournament.max_teams} teams</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderTop: '1px solid #e0e0e0'
                    }}>
                      <span style={{ fontSize: 13, color: '#999' }}>
                        {tournament.tournament_format === 'round_robin' ? 'Round Robin' : 
                         tournament.tournament_format === 'single_elimination' ? 'Single Elimination' :
                         tournament.tournament_format === 'double_elimination' ? 'Double Elimination' : 'Pool Play'}
                      </span>
                      <span style={{ 
                        color: '#667eea', 
                        fontSize: 14, 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
