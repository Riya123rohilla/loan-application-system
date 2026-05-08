import React, { useState } from 'react';

const EligibilityChecker = () => {
  const [income, setIncome] = useState(50000);
  const [score, setScore] = useState(750);
  
  const eligibleAmount = Math.round(income * 40 * (score / 800));
  const chance = score > 750 ? 'High' : score > 650 ? 'Medium' : 'Low';

  return (
    <div className="calc-container">
      <div className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label className="summary-label">Monthly Income</label>
          <span className="summary-value">₹{income.toLocaleString()}</span>
        </div>
        <input 
          type="range" min="10000" max="500000" step="5000" 
          value={income} onChange={(e) => setIncome(Number(e.target.value))}
          className="range-input"
        />
      </div>
      <div className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label className="summary-label">Credit Score</label>
          <span className="summary-value">{score}</span>
        </div>
        <input 
          type="range" min="300" max="900" step="10" 
          value={score} onChange={(e) => setScore(Number(e.target.value))}
          className="range-input"
        />
      </div>

      <div className="calc-results" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="stat-box">
          <span className="stat-label">Max Eligible Amount</span>
          <span className="summary-value" style={{ color: '#00c853' }}>₹{eligibleAmount.toLocaleString()}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Approval Chance</span>
          <span className={`stat-value ${chance === 'High' ? 'high' : 'mid'}`}>{chance}</span>
        </div>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        *Based on average banking norms. Actual eligibility may vary.
      </div>
    </div>
  );
};

export default EligibilityChecker;
