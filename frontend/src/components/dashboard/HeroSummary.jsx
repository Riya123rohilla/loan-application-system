import React from 'react';
import { motion } from 'framer-motion';

const HeroSummary = ({ loan }) => {
  return (
    <div className="hero-dashboard">
      <div className="hero-main">
        <p className="section__eyebrow" style={{ color: 'var(--blue-300)' }}>Active Portfolio</p>
        <h1 className="section__title" style={{ margin: '10px 0', fontSize: '2.5rem' }}>
          ₹{loan?.remainingBalance?.toLocaleString()}
        </h1>
        <p className="summary-label">Total Remaining Balance</p>
        
        <div className="hero-stats">
          <div className="hero-stat-card">
            <span className="summary-label" style={{ fontSize: '0.7rem' }}>Next EMI</span>
            <p style={{ margin: '5px 0', fontWeight: '700', color: 'var(--blue-300)' }}>
              ₹{loan?.emiAmount?.toLocaleString()}
            </p>
            <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>Due on {loan?.nextEmiDate}</span>
          </div>
          <div className="hero-stat-card">
            <span className="summary-label" style={{ fontSize: '0.7rem' }}>Interest Rate</span>
            <p style={{ margin: '5px 0', fontWeight: '700' }}>{loan?.interestRate}%</p>
            <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>Fixed Annual</span>
          </div>
          <div className="hero-stat-card">
            <span className="summary-label" style={{ fontSize: '0.7rem' }}>Credit Score</span>
            <p style={{ margin: '5px 0', fontWeight: '700', color: '#00c853' }}>{loan?.applicantDetails?.creditScore}</p>
            <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>Excellent Tier</span>
          </div>
          <div className="hero-stat-card">
            <span className="summary-label" style={{ fontSize: '0.7rem' }}>Health Score</span>
            <p style={{ margin: '5px 0', fontWeight: '700', color: 'var(--blue-300)' }}>92/100</p>
            <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>Financial Health</span>
          </div>
        </div>
        
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button className="navbar__link--cta" style={{ border: 'none' }}>Pay Now</button>
          <button className="btn-action" style={{ background: 'rgba(255,255,255,0.05)' }}>Statement</button>
          <button className="btn-action" style={{ background: 'rgba(255,255,255,0.05)' }}>Top-up</button>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right' }}>
        <div className="badge badge--approved" style={{ marginBottom: '15px', padding: '8px 15px' }}>
          {loan?.status}
        </div>
        <p className="summary-label">Loan ID: {loan?._id}</p>
        <p className="summary-label" style={{ marginTop: '5px' }}>Disbursed on: {loan?.disbursalDate}</p>
      </div>
    </div>
  );
};

export default HeroSummary;
