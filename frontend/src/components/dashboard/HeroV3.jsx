import React from 'react';
import { motion } from 'framer-motion';

const HeroV3 = ({ loan }) => {
  return (
    <motion.div 
      className="hero-v3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-v3-main">
        <span className="summary-label" style={{ letterSpacing: '0.2em' }}>Portfolio Value</span>
        <h1 className="hero-v3-title">₹{loan?.remainingBalance?.toLocaleString()}</h1>
        
        <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
          <div>
            <span className="summary-label">Next EMI</span>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: '5px 0' }}>₹{loan?.emiAmount?.toLocaleString()}</p>
            <span style={{ color: '#00c853', fontSize: '0.8rem' }}>Due in 12 days</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <span className="summary-label">Interest Rate</span>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: '5px 0' }}>{loan?.interestRate}%</p>
            <span style={{ color: 'var(--blue-400)', fontSize: '0.8rem' }}>Fixed Rate</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <span className="summary-label">Credit Tier</span>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: '5px 0' }}>{loan?.applicantDetails?.creditScore}</p>
            <span style={{ color: '#ffc107', fontSize: '0.8rem' }}>High Potential</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button className="navbar__link--cta" style={{ padding: '18px 40px', fontSize: '1.1rem', border: 'none' }}>
          Quick Pay EMI
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-action" style={{ flex: 1, padding: '12px' }}>Download</button>
          <button className="btn-action" style={{ flex: 1, padding: '12px' }}>Support</button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroV3;
