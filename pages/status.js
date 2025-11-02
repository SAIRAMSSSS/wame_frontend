import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function Status() {
  return (
    <>
      <Head>
        <title>Status - Y-Ultimate</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        {/* Header with Navigation */}
        <header style={{ background: '#fff', padding: '20px 32px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <Navigation />
          </div>
        </header>

        {/* Content */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: '#333', marginBottom: 20, fontFamily: 'Poppins, sans-serif' }}>
            Status
          </h1>
          <p style={{ fontSize: 18, color: '#666', fontFamily: 'Inter, sans-serif' }}>
            Coming soon...
          </p>
        </div>
      </div>
    </>
  );
}
