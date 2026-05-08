import React from 'react';

const SmartEligibilityGauge = ({ score }) => {
  const percentage = (score / 900) * 100;
  const circumference = 210; // Match the CSS stroke-dasharray
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="meter-container">
      <svg className="meter-svg" width="180" height="180" viewBox="0 0 120 120">
        <circle className="meter-bg" cx="60" cy="60" r="50" />
        <circle 
          className="meter-progress" 
          cx="60" cy="60" r="50" 
          style={{ strokeDasharray: `${(percentage/100) * 210} 360` }}
        />
      </svg>
      <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>{score}</h2>
        <span className="summary-label" style={{ fontSize: '0.7rem' }}>Excellent</span>
      </div>
    </div>
  );
};

export default SmartEligibilityGauge;
