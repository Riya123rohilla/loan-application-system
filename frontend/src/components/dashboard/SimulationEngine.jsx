import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useDashboardStore from '../../store/dashboardStore';

const SimulationEngine = ({ onExecute }) => {
  const { loan, simExtraPayment, setSimExtraPayment, simTenure, setSimTenure } = useDashboardStore();
  const [lumpSum, setLumpSum] = useState(100000);

  const simulationResults = useMemo(() => {
    if (!loan) return { interestSaved: 0, monthsReduced: 0 };
    const extra = simExtraPayment;
    const interestSaved = Math.round((extra * (simTenure / 1.5)) + (lumpSum * 0.4));
    const monthsReduced = Math.floor((extra / 1200) + (lumpSum / 50000));
    return { interestSaved, monthsReduced };
  }, [loan, simExtraPayment, simTenure, lumpSum]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label className="stat-group-label">Extra EMI Payment</label>
            <span style={{ color: 'var(--blue-300)', fontWeight: '800' }}>₹{simExtraPayment.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="0" max="50000" step="1000" 
            value={simExtraPayment} onChange={(e) => setSimExtraPayment(Number(e.target.value))}
            className="range-input"
          />
        </div>

        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label className="stat-group-label">Lump-Sum Prepayment</label>
            <span style={{ color: '#00c853', fontWeight: '800' }}>₹{lumpSum.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="0" max="1000000" step="10000" 
            value={lumpSum} onChange={(e) => setLumpSum(Number(e.target.value))}
            className="range-input"
          />
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(111,178,255,0.1)' }}>
        <h4 style={{ margin: '0 0 20px 0', fontSize: '0.9rem', opacity: 0.6 }}>FORECLOSURE FORECAST</h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ fontSize: '0.85rem' }}>Total Interest Saved</span>
          <motion.span 
            key={simulationResults.interestSaved}
            initial={{ scale: 1.2, color: '#00c853' }}
            animate={{ scale: 1, color: '#00c853' }}
            style={{ fontWeight: '900', fontSize: '1.2rem' }}
          >
            ₹{simulationResults.interestSaved.toLocaleString()}
          </motion.span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ fontSize: '0.85rem' }}>Tenure Reduced By</span>
          <span style={{ fontWeight: '800', color: 'var(--blue-300)' }}>{simulationResults.monthsReduced} Months</span>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '15px 0' }}></div>

        <div style={{ background: 'var(--dash-accent-glow)', padding: '15px', borderRadius: '12px', border: '1px solid var(--dash-accent)' }}>
           <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--dash-accent)', lineHeight: '1.4' }}>
             🚀 <strong>Strategic Tip:</strong> Paying ₹{lumpSum.toLocaleString()} now will settle your loan <strong>{simulationResults.monthsReduced} months</strong> earlier!
           </p>
        </div>

        <button 
          className="btn-action" 
          style={{ width: '100%', marginTop: '20px', padding: '16px' }}
          onClick={() => {
            onExecute({
              amount: lumpSum,
              interestSaved: simulationResults.interestSaved,
              monthsReduced: simulationResults.monthsReduced
            });
          }}
        >
          Execute Prepayment Strategy ⚡
        </button>
      </div>
    </div>
  );
};

export default SimulationEngine;
