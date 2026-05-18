import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EMICalculator = () => {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);
  const [results, setResults] = useState({ emi: 0, interest: 0, total: 0 });

  useEffect(() => {
    const p = amount;
    const r = rate / (12 * 100);
    const n = tenure;
    
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - p;

    setResults({
      emi: Math.round(emi),
      interest: Math.round(totalInterest),
      total: Math.round(totalPayable)
    });
  }, [amount, rate, tenure]);

  return (
    <div className="calc-container">
      <div className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label className="stat-group-label">Loan Amount</label>
          <span className="slider-value-badge">₹{amount.toLocaleString()}</span>
        </div>
        <input 
          type="range" min="100000" max="10000000" step="50000" 
          value={amount} onChange={(e) => setAmount(Number(e.target.value))}
          className="range-input"
        />
      </div>

      <div className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label className="stat-group-label">Interest Rate (%)</label>
          <span className="slider-value-badge">{rate}%</span>
        </div>
        <input 
          type="range" min="5" max="25" step="0.1" 
          value={rate} onChange={(e) => setRate(Number(e.target.value))}
          className="range-input"
        />
      </div>

      <div className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label className="stat-group-label">Tenure (Months)</label>
          <span className="slider-value-badge">{tenure} Mo</span>
        </div>
        <input 
          type="range" min="12" max="120" step="12" 
          value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
          className="range-input"
        />
      </div>

      <div className="calc-results" style={{ gridTemplateColumns: '1fr', gap: '15px', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="summary-label">Monthly EMI</span>
          <h4 style={{ margin: 0, color: 'var(--blue-300)' }}>₹{results.emi.toLocaleString()}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="summary-label">Total Interest</span>
          <h4 style={{ margin: 0 }}>₹{results.interest.toLocaleString()}</h4>
        </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="summary-label">Total Payable</span>
          <h4 style={{ margin: 0, fontWeight: '800' }}>₹{results.total.toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
