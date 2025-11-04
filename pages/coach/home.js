import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CoachHome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [children, setChildren] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [homeVisits, setHomeVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sessions');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/coach/login');
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.user_type !== 'coach') {
        router.push('/student/login');
        return;
      }
      setUser(parsedUser);
    }

    fetchCoachData(token);
  }, [router]);

  const fetchCoachData = async (token) => {
    try {
      // Fetch sessions, children, assessments, and home visits
      const [sessionsRes, childrenRes, assessmentsRes, homeVisitsRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/sessions/', {
          headers: { 'Authorization': `Token ${token}` }
        }),
        fetch('http://127.0.0.1:8000/api/child-profiles/', {
          headers: { 'Authorization': `Token ${token}` }
        }),
        fetch('http://127.0.0.1:8000/api/life-skills-assessments/', {
          headers: { 'Authorization': `Token ${token}` }
        }),
        fetch('http://127.0.0.1:8000/api/home-visits/', {
          headers: { 'Authorization': `Token ${token}` }
        })
      ]);

      const sessions = await sessionsRes.json();
      const children = await childrenRes.json();
      const assessments = await assessmentsRes.json();
      const homeVisits = await homeVisitsRes.json();

      setSessions(sessions);
      setChildren(children);
      setAssessments(assessments);
      setHomeVisits(homeVisits);
    } catch (error) {
      console.error('Error fetching coach data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const markAttendance = async (sessionId, childId, isPresent) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/attendance/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: sessionId,
          child: childId,
          is_present: isPresent
        })
      });

      if (response.ok) {
        alert('Attendance marked successfully!');
        fetchCoachData(token); // Refresh data
      } else {
        alert('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Error marking attendance');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, border: '4px solid #f3f3f3', borderTop: '4px solid var(--wame-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ fontSize: 16, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>Loading coach dashboard...</p>
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
              Coach Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 14, color: 'var(--wame-muted)', fontFamily: 'Inter, sans-serif' }}>
              Welcome, Coach {user?.first_name}!
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
            { id: 'sessions', label: 'Sessions & Attendance', icon: '📅' },
            { id: 'assessments', label: 'Life Skills Assessments', icon: '📊' },
            { id: 'homevisits', label: 'Home Visits', icon: '🏠' },
            { id: 'children', label: 'My Children', icon: '👶' }
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
        {activeTab === 'sessions' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
              Sessions & Attendance
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {sessions.map((session) => (
                <div key={session.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8 }}>
                        {session.title}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 4 }}>
                        📅 {session.date} • ⏰ {session.start_time} - {session.end_time}
                      </p>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                        📍 {session.location}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#fff',
                      background: session.coach_attendance ? '#10b981' : '#f59e0b',
                      borderRadius: 12
                    }}>
                      {session.coach_attendance ? 'Present' : 'Not Marked'}
                    </span>
                  </div>

                  {/* Children Attendance */}
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 12 }}>
                      Mark Attendance
                    </h4>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {children.slice(0, 5).map((child) => (
                        <div key={child.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: '#f8f9fa', borderRadius: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)' }}>
                            {child.user.first_name} {child.user.last_name}
                          </span>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => markAttendance(session.id, child.id, true)}
                              style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#fff', background: '#10b981', border: 'none', borderRadius: 6, cursor: 'pointer' }}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => markAttendance(session.id, child.id, false)}
                              style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#fff', background: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }}
                            >
                              Absent
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
              Life Skills Assessments
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {assessments.map((assessment) => (
                <div key={assessment.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8 }}>
                        {assessment.child.user.first_name} {assessment.child.user.last_name}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                        📅 {assessment.assessment_date} • {assessment.assessment_type}
                      </p>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#A5BF13' }}>
                      {assessment.total_score}/30
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginBottom: 4 }}>Communication</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)' }}>{assessment.communication || 'N/A'}/5</div>
                    </div>
                    <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginBottom: 4 }}>Teamwork</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)' }}>{assessment.teamwork || 'N/A'}/5</div>
                    </div>
                    <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginBottom: 4 }}>Leadership</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)' }}>{assessment.leadership || 'N/A'}/5</div>
                    </div>
                    <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginBottom: 4 }}>Problem Solving</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)' }}>{assessment.problem_solving || 'N/A'}/5</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'homevisits' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
              Home Visits
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {homeVisits.map((visit) => (
                <div key={visit.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8 }}>
                        Visit to {visit.child.user.first_name} {visit.child.user.last_name}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)', marginBottom: 4 }}>
                        📅 {visit.visit_date} • 📍 {visit.location}
                      </p>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                        {visit.purpose}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#fff',
                      background: visit.follow_up_required ? '#f59e0b' : '#10b981',
                      borderRadius: 12
                    }}>
                      {visit.follow_up_required ? 'Follow-up Needed' : 'Completed'}
                    </span>
                  </div>

                  {visit.outcomes && (
                    <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8 }}>
                        Outcomes
                      </h4>
                      <p style={{ fontSize: 14, color: 'var(--wame-muted)', margin: 0 }}>
                        {visit.outcomes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'children' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--wame-dark)', marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
              My Children
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {children.map((child) => (
                <div key={child.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#A5BF13', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>
                      👶
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--wame-dark)' }}>
                      {child.user.first_name} {child.user.last_name}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--wame-muted)' }}>
                      Age: {child.age} • School: {child.school || 'N/A'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginBottom: 4 }}>Gender</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)' }}>{child.gender}</div>
                    </div>
                    <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 12, color: 'var(--wame-muted)', marginBottom: 4 }}>Community</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wame-dark)' }}>{child.community || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
