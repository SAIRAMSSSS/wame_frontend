import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Set active tab based on current route
    const path = router.pathname;
    if (path === '/' || path === '/index') {
      setActiveTab('home');
    } else if (path.includes('/student/dashboard') || path.includes('/coach/dashboard')) {
      setActiveTab('dashboard');
    } else if (path.includes('/tournament')) {
      setActiveTab('tournaments');
    } else if (path.includes('/status')) {
      setActiveTab('status');
    } else if (path.includes('/gallery')) {
      setActiveTab('gallery');
    } else if (path.includes('/about')) {
      setActiveTab('about');
    }

    // Get user role from localStorage
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserRole(user.role || user.user_type);
      }
    }
  }, [router.pathname]);

  // Determine if user is a coach
  const isCoach = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.role === 'team_manager' || 
               user.role === 'captain' || 
               user.role === 'tournament_director' ||
               user.user_type === 'coach' ||
               user.user_type === 'tournament_director';
      }
    }
    return false;
  };

  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    return isCoach() ? '/coach/dashboard' : '/student/dashboard';
  };

  // Handle navigation with role checking
  const handleNavigation = (path) => {
    // Check if trying to access coach dashboard without coach role
    if (path === '/coach/dashboard' && !isCoach()) {
      alert('⚠️ Access Denied: You need coach privileges to access this page.');
      return;
    }
    
    // Check if trying to access student dashboard with coach role
    if (path === '/student/dashboard' && isCoach()) {
      alert('⚠️ Access Denied: Coaches should use the Coach Dashboard.');
      return;
    }

    router.push(path);
  };

  const navItems = [
    { key: 'home', label: 'home', path: '/' },
    { 
      key: 'dashboard', 
      label: isCoach() ? '👨‍🏫 coach' : '🎓 dashboard', 
      path: getDashboardPath() 
    },
    { key: 'tournaments', label: 'tournaments', path: '/tournaments' },
    { key: 'status', label: 'status', path: '/status' },
    { key: 'gallery', label: 'gallery', path: '/gallery' },
    { key: 'about', label: 'about us', path: '/about' }
  ];

  return (
    <nav style={{ 
      display: 'flex', 
      gap: 8, 
      padding: '12px 24px',
      background: '#f5f5f5',
      borderRadius: 50,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      transition: 'all 0.3s ease'
    }}>
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            setActiveTab(item.key);
            handleNavigation(item.path);
          }}
          style={{
            padding: '10px 24px',
            background: activeTab === item.key ? '#A5BF13' : '#6B8E7F',
            color: 'white',
            border: 'none',
            borderRadius: 25,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.3s ease',
            textTransform: 'lowercase',
            transform: activeTab === item.key ? 'scale(1.05)' : 'scale(1)',
            boxShadow: activeTab === item.key ? '0 4px 12px rgba(165,191,19,0.3)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== item.key) {
              e.target.style.background = '#7FA095';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== item.key) {
              e.target.style.background = '#6B8E7F';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
