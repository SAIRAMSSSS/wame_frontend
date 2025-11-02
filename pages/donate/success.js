import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DonateSuccess() {
  const router = useRouter();
  const { payment_id } = router.query;

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 600, width: '100%', padding: '48px', background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        {/* Success Animation */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>🎉</div>
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #A5BF13 0%, #8fa30f 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 24px rgba(165,191,19,0.3)'
          }}>
            <span style={{ fontSize: 48, color: '#fff' }}>✓</span>
          </div>
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
          Thank You for Your Donation!
        </h1>

        <p style={{ fontSize: 18, color: '#666', fontFamily: 'Inter, sans-serif', marginBottom: 24 }}>
          Your generous contribution will help underprivileged children discover the joy of Ultimate Frisbee and build healthier futures.
        </p>

        {payment_id && (
          <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
              Payment ID: <span style={{ fontWeight: 600, color: 'var(--wame-dark)' }}>{payment_id}</span>
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
          <Link href="/">
            <button style={{
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 600,
              color: '#fff',
              background: '#A5BF13',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#8fa30f'}
            onMouseOut={(e) => e.target.style.background = '#A5BF13'}>
              ← Back to Home
            </button>
          </Link>

          <Link href="/student/login">
            <button style={{
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 600,
              color: '#A5BF13',
              background: 'transparent',
              border: '2px solid #A5BF13',
              borderRadius: 8,
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#A5BF13';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#A5BF13';
            }}>
              Join as Student
            </button>
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 24 }}>
          <p style={{ fontSize: 14, color: '#999', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Redirecting to home page in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
