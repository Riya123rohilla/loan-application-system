import React from 'react';

const EMIBreakdown = ({ principal, interest, paid, total }) => {
  const principalPercent = (principal / total) * 100;
  const interestPercent = (interest / total) * 100;
  
  // SVG Pie calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const pOffset = circumference - (principalPercent / 100) * circumference;

  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      <div className="pie-container">
        <svg width="140" height="140" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="15" />
          <circle 
            cx="60" cy="60" r={radius} fill="none" 
            stroke="#2a78ff" strokeWidth="15" 
            strokeDasharray={circumference} 
            strokeDashoffset={pOffset}
            transform="rotate(-90 60 60)"
            strokeLinecap="round"
          />
          <text x="60" y="65" textAnchor="middle" fill="white" fontWeight="700" fontSize="14">
            {Math.round(principalPercent)}%
          </text>
        </svg>
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span className="summary-label">Principal</span>
            <span>₹{principal.toLocaleString()}</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
            <div style={{ height: '100%', width: `${principalPercent}%`, background: '#2a78ff', borderRadius: '3px' }}></div>
          </div>
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span className="summary-label">Interest</span>
            <span>₹{interest.toLocaleString()}</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
            <div style={{ height: '100%', width: `${interestPercent}%`, background: '#ffc107', borderRadius: '3px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMIBreakdown;
