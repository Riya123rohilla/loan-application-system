import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AdvancedEMICtrl = () => {
  const [extraPayment, setExtraPayment] = useState(5000);
  const [tenure, setTenure] = useState(60);

  const interestSaved = extraPayment * (tenure / 2); // Mock calculation
  const monthsReduced = Math.floor(extraPayment / 1000);

  const handleApply = () => {
    toast.success(`Simulation applied! New EMI strategy optimized for ₹${extraPayment} extra/month.`);
  };

  return (
    <div className="control-panel-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="stat-group-label">Extra Monthly Payment</label>
            <span className="slider-value-badge">₹{extraPayment.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="0" max="50000" step="1000" 
            value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))}
            className="range-input"
          />
        </div>
        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="stat-group-label">Simulation Tenure</label>
            <span className="slider-value-badge">{tenure} Mo</span>
          </div>
          <input 
            type="range" min="12" max="120" step="12" 
            value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
            className="range-input"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '15px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="summary-label">Estimated Interest Saved</span>
            <span style={{ fontWeight: '700', color: '#00c853' }}>₹{interestSaved.toLocaleString()}</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="summary-label">Tenure Reduction</span>
            <span style={{ fontWeight: '700', color: 'var(--blue-300)' }}>{monthsReduced} Months</span>
         </div>
         <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '5px 0' }}></div>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="summary-label">Loan Closure Prediction</span>
            <span style={{ fontWeight: '700' }}>Oct 2028</span>
         </div>
         <button 
           className="navbar__link--cta" 
           style={{ border: 'none', padding: '10px', fontSize: '0.85rem' }}
           onClick={handleApply}
         >
           Apply New EMI
         </button>
      </div>
    </div>
  );
};

export default AdvancedEMICtrl;
