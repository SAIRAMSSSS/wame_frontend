export default function SimpleLineChart({ data, labels, color = '#A5BF13', height = 200 }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height, background: '#f8f9fa', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: '#999', fontSize: 14 }}>No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data, 1);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / maxValue) * 80; // 80% of height for data, 20% for padding
    return { x, y, value };
  });

  // Create SVG path
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  // Create area fill path
  const areaPath = `${pathData} L 100 100 L 0 100 Z`;

  return (
    <div style={{ position: 'relative', height }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line 
            key={y} 
            x1="0" 
            y1={y} 
            x2="100" 
            y2={y} 
            stroke="#e0e0e0" 
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Area fill */}
        <path 
          d={areaPath} 
          fill={color} 
          fillOpacity="0.1" 
        />

        {/* Line */}
        <path 
          d={pathData} 
          fill="none" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <circle 
            key={index}
            cx={point.x} 
            cy={point.y} 
            r="1.5" 
            fill={color}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {labels && labels.map((label, index) => (
          <span key={index} style={{ fontSize: 11, color: '#999' }}>{label}</span>
        ))}
      </div>

      {/* Value indicators */}
      <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, color }}>
        Max: {Math.max(...data)}
      </div>
    </div>
  );
}
