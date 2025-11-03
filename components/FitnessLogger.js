import { useState } from 'react';

export default function FitnessLogger({ onDataLogged }) {
  const [formData, setFormData] = useState({
    calories: '',
    steps: '',
    active_minutes: '',
    distance: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/student/fitness/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          calories: parseInt(formData.calories) || 0,
          steps: parseInt(formData.steps) || 0,
          active_minutes: parseInt(formData.active_minutes) || 0,
          distance: parseFloat(formData.distance) || 0
        })
      });

      if (response.ok) {
        setMessage('✅ Fitness data logged successfully!');
        setFormData({ calories: '', steps: '', active_minutes: '', distance: '' });
        // Notify parent component to refresh data
        if (onDataLogged) onDataLogged();
      } else {
        setMessage('❌ Failed to log fitness data');
      }
    } catch (error) {
      setMessage('❌ Error logging data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--wame-dark)', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
        📝 Log Today's Activity
      </h3>
      
      {message && (
        <div style={{ padding: 12, background: message.includes('✅') ? '#d4edda' : '#f8d7da', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 6 }}>
              🔥 Calories Burned
            </label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="e.g., 450"
              style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #ddd', borderRadius: 6, outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 6 }}>
              👟 Steps
            </label>
            <input
              type="number"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="e.g., 7500"
              style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #ddd', borderRadius: 6, outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 6 }}>
              ⏱️ Active Minutes
            </label>
            <input
              type="number"
              name="active_minutes"
              value={formData.active_minutes}
              onChange={handleChange}
              placeholder="e.g., 45"
              style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #ddd', borderRadius: 6, outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 6 }}>
              📏 Distance (km)
            </label>
            <input
              type="number"
              step="0.1"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="e.g., 5.2"
              style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #ddd', borderRadius: 6, outline: 'none' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ 
            marginTop: 16, 
            width: '100%', 
            padding: '12px', 
            fontSize: 14, 
            fontWeight: 600, 
            color: '#fff', 
            background: loading ? '#ccc' : 'var(--wame-accent)', 
            border: 'none', 
            borderRadius: 8, 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Logging...' : 'Log Activity'}
        </button>
      </form>
    </div>
  );
}
