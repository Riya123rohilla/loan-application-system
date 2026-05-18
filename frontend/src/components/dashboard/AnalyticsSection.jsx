import React from 'react';

const ProgressCircle = ({ percentage, label, color = '#2a78ff' }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="analytic-card">
      <div className="progress-circle">
        <svg className="circle-svg" width="100" height="100">
          <circle className="circle-bg" cx="50" cy="50" r={radius} />
          <circle 
            className="circle-progress" 
            cx="50" cy="50" r={radius} 
            style={{ 
              strokeDasharray: circumference, 
              strokeDashoffset: offset,
              stroke: color
            }}
          />
        </svg>
        <span className="circle-text">{percentage}%</span>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const AnalyticsSection = ({ loan }) => {
  // Mock data for analytics
  const repaymentProgress = 25;
  const interestUtilization = 40;
  const documentVerification = 80;

  return (
    <div className="analytics-grid">
      <ProgressCircle percentage={repaymentProgress} label="Repayment Progress" />
      <ProgressCircle percentage={interestUtilization} label="Interest Utilization" color="#ffc107" />
      <ProgressCircle percentage={documentVerification} label="Docs Verified" color="#00c853" />
      
      <div className="analytic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="summary-label">Financial Summary</span>
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '0.8rem' }}>Principal</span>
            <span style={{ fontWeight: '700' }}>₹{loan?.amount?.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem' }}>Remaining</span>
            <span style={{ fontWeight: '700' }}>₹{(loan?.amount * 0.75).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
