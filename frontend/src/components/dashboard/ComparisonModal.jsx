import React from 'react';
import { motion } from 'framer-motion';

const ComparisonModal = ({ isOpen, onClose, selectedBanks }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)',
      zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px'
    }}>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: '#0a1931', width: '100%', maxWidth: '1000px',
          borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)',
          padding: '40px', maxHeight: '90vh', overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ margin: 0 }}>Strategic Lender Comparison</h2>
            <p className="summary-label">Side-by-side financial telemetry analysis</p>
          </div>
          <button className="btn-action" onClick={onClose}>Close Analysis</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedBanks.length}, 1fr)`, gap: '20px' }}>
          {selectedBanks.map(bank => (
            <div key={bank._id} className="enterprise-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '25px' }}>
               <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <span style={{ fontSize: '3.5rem' }}>{bank.logo}</span>
                  <h3 style={{ margin: '10px 0 5px' }}>{bank.name}</h3>
                  <span className="badge badge--approved">Verified Partner</span>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                     <p className="stat-group-label" style={{ fontSize: '0.65rem' }}>INTEREST RATE</p>
                     <p style={{ margin: 0, fontWeight: '900', color: 'var(--blue-300)', fontSize: '1.2rem' }}>{bank.details.rate}%</p>
                  </div>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                     <p className="stat-group-label" style={{ fontSize: '0.65rem' }}>PROCESSING FEE</p>
                     <p style={{ margin: 0, fontWeight: '700' }}>{bank.details.fee}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                     <p className="stat-group-label" style={{ fontSize: '0.65rem' }}>EST. MONTHLY EMI</p>
                     <p style={{ margin: 0, fontWeight: '700' }}>₹{(bank.details.rate * 4500).toLocaleString()}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                     <p className="stat-group-label" style={{ fontSize: '0.65rem' }}>APPROVAL VELOCITY</p>
                     <p style={{ margin: 0, fontWeight: '700' }}>{bank.details.speed}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                     <p className="stat-group-label" style={{ fontSize: '0.65rem' }}>ELIGIBILITY MATCH</p>
                     <p style={{ margin: 0, fontWeight: '900', color: '#00c853' }}>98.4%</p>
                  </div>
               </div>

               <button className="navbar__link--cta" style={{ width: '100%', marginTop: '30px', border: 'none' }}>
                 Select {bank.name}
               </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonModal;
