import React from 'react';
import { motion } from 'framer-motion';

const BankComparison = ({ banks }) => {
  return (
    <div className="bank-grid">
      {banks.map((bank, index) => (
        <motion.div 
          key={bank._id} 
          className="bank-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bank-header">
            <span className="bank-name">{bank.name}</span>
            <span className="bank-logo">{bank.logo}</span>
          </div>
          <div className="bank-stats">
            <div className="stat-box">
              <span className="stat-label">Interest Rate</span>
              <span className="stat-value high">{bank.details.rate}%</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Processing Fee</span>
              <span className="stat-value">{bank.details.fee}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Max Amount</span>
              <span className="stat-value">₹{(bank.details.maxAmount / 100000).toFixed(1)}L</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Tenure</span>
              <span className="stat-value">{bank.details.tenure / 12} Yrs</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Approval</span>
              <span className="stat-value mid">{bank.details.speed}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Min Score</span>
              <span className="stat-value">{bank.details.minScore}+</span>
            </div>
          </div>
          <button className="navbar__link--cta" style={{ width: '100%', marginTop: '20px', border: 'none', cursor: 'pointer' }}>
            Compare & Apply
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default BankComparison;
