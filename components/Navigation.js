import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Set active tab based on current route
    const path = router.pathname;
    if (path === '/' || path === '/index') {
      setActiveTab('home');
    } else if (path.includes('/student/home') || path.includes('/coach/dashboard')) {
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
  }, [router.pathname]);

  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.role === 'team_manager' || user.role === 'tournament_director') {
          return '/coach/dashboard';
        }
      }
    }
    return '/student/home';
  };

  const navItems = [
    { key: 'home', label: 'home', path: '/' },
    { key: 'dashboard', label: 'dashboard', path: getDashboardPath() },
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
      alignItems: 'center'
    }}>
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            setActiveTab(item.key);
            router.push(item.path);
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
            transition: 'all 0.3s',
            textTransform: 'lowercase'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== item.key) {
              e.target.style.background = '#7FA095';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== item.key) {
              e.target.style.background = '#6B8E7F';
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
