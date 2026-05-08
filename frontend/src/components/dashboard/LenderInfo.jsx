import React from 'react';

const LenderInfo = ({ lender }) => {
  return (
    <div className="calc-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
        <span style={{ fontSize: '2.5rem' }}>{lender.logo}</span>
        <div>
          <h4 style={{ margin: 0 }}>{lender.name}</h4>
          <p className="summary-label" style={{ fontSize: '0.75rem' }}>{lender.branch}</p>
        </div>
      </div>
      <div className="info-list">
        <div className="info-item">
          <span className="info-label">Officer</span>
          <span className="info-value">{lender.officer}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Contact</span>
          <span className="info-value">{lender.support}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Avg. Approval</span>
          <span className="stat-value high">{lender.speed}</span>
        </div>
      </div>
      <button className="navbar__link--cta" style={{ width: '100%', marginTop: '10px', border: 'none' }}>
        Contact Lender
      </button>
    </div>
  );
};

export default LenderInfo;
