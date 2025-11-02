import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Donate() {
  const router = useRouter();
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predefinedAmounts = [50, 100, 250, 500, 1000];

  const handleDonate = async () => {
    if (amount < 1) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/donate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR'
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Razorpay checkout
        if (data.order_id && data.razorpay_key) {
          const options = {
            key: data.razorpay_key,
            amount: data.amount,
            currency: data.currency,
            order_id: data.order_id,
            name: 'Y-Ultimate',
            description: 'Support underprivileged children through Ultimate Frisbee',
            image: '/yu-icon.png',
            handler: function (response) {
              // Handle successful payment
              router.push('/donate/success?payment_id=' + response.razorpay_payment_id);
            },
            prefill: {
              name: '',
              email: '',
              contact: ''
            },
            theme: {
              color: '#A5BF13'
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setError('Failed to create payment order');
        }
      } else {
        setError(data.error || 'Failed to process donation');
      }
    } catch (error) {
      console.error('Donation error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '16px 32px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src="/yu-icon.png" alt="Y-Ultimate" style={{ width: 40, height: 40 }} />
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif' }}>
              Support Y-Ultimate
            </h1>
          </div>
          <button
            onClick={() => router.push('/')}
            style={{ padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#666', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 6, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Make a Difference
          </h1>
          <p style={{ fontSize: 18, color: '#666', fontFamily: 'Inter, sans-serif', maxWidth: 600, margin: '0 auto' }}>
            Your donation helps underprivileged children discover the joy of Ultimate Frisbee and build a healthier future.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 48, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          {/* Impact Preview */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 24 }}>
              Your Impact
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              <div style={{ textAlign: 'center', padding: 24, background: '#f8f9fa', borderRadius: 12 }}>
                <div style={{ fontSize: 32, color: '#A5BF13', marginBottom: 8 }}>🏃‍♂️</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Active Lifestyle</h3>
                <p style={{ fontSize: 14, color: '#666' }}>₹100 can fund one child's participation in weekly practice sessions</p>
              </div>
              <div style={{ textAlign: 'center', padding: 24, background: '#f8f9fa', borderRadius: 12 }}>
                <div style={{ fontSize: 32, color: '#62929E', marginBottom: 8 }}>🥇</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Tournament Access</h3>
                <p style={{ fontSize: 14, color: '#666' }}>₹250 covers entry fees and equipment for local tournaments</p>
              </div>
              <div style={{ textAlign: 'center', padding: 24, background: '#f8f9fa', borderRadius: 12 }}>
                <div style={{ fontSize: 32, color: '#EF4444', marginBottom: 8 }}>🎓</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Skill Development</h3>
                <p style={{ fontSize: 14, color: '#666' }}>₹500 supports coaching workshops and skill-building programs</p>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 24 }}>
              Choose Your Donation Amount
            </h2>

            {/* Predefined Amounts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12, marginBottom: 24 }}>
              {predefinedAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  onClick={() => setAmount(presetAmount)}
                  style={{
                    padding: '16px',
                    fontSize: 16,
                    fontWeight: 600,
                    color: amount === presetAmount ? '#fff' : '#666',
                    background: amount === presetAmount ? '#A5BF13' : '#f8f9fa',
                    border: amount === presetAmount ? 'none' : '1px solid #e0e0e0',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s'
                  }}
                >
                  ₹{presetAmount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 16, fontWeight: 600, color: 'var(--wame-dark)', marginBottom: 8 }}>
                Or enter custom amount
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18, fontWeight: 600, color: '#666' }}>₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  min="1"
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 40px',
                    fontSize: 18,
                    fontWeight: 600,
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A5BF13'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ padding: 16, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: '#dc2626', margin: 0 }}>⚠️ {error}</p>
              </div>
            )}

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={loading}
              style={{
                width: '100%',
                padding: '20px',
                fontSize: 18,
                fontWeight: 700,
                color: '#fff',
                background: loading ? '#ccc' : '#A5BF13',
                border: 'none',
                borderRadius: 12,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.3s',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(165,191,19,0.3)'
              }}
              onMouseOver={(e) => !loading && (e.target.style.background = '#8fa30f')}
              onMouseOut={(e) => !loading && (e.target.style.background = '#A5BF13')}
            >
              {loading ? '⏳ Processing...' : `💝 Donate ₹${amount}`}
            </button>

            <p style={{ textAlign: 'center', fontSize: 14, color: '#666', marginTop: 16 }}>
              Secure payment powered by Razorpay • 100% of your donation goes to our programs
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#292929', color: '#ccc', padding: '40px 32px', textAlign: 'center', marginTop: 60 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <img src="/yu-icon.png" alt="Y-Ultimate" style={{ width: 32, height: 32 }} />
            <span style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>Y-Ultimate</span>
          </div>
          <p style={{ fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
            Empowering underprivileged children through Ultimate Frisbee • Made with ❤️ for a healthier future
          </p>
        </div>
      </footer>
    </div>
  );
}
