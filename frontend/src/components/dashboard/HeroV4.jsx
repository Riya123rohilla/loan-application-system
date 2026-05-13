import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useDashboardStore from '../../store/dashboardStore';

const HeroV4 = ({ onPayClick, onScheduleClick, onHistoryClick, onTopupClick }) => {
  const { loan, schedulePayment, requestTopup, downloadStatement } = useDashboardStore();

  if (!loan) return null;

  const onSchedule = () => {
    schedulePayment(new Date(loan.nextEmiDate).toLocaleDateString());
  };

  const onDownload = () => {
    downloadStatement();
  };

  const onTopup = () => {
    requestTopup();
  };

  return (
    <motion.div
      className="hero-v4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="hero-v4-content">
        <span className="stat-group-label" style={{ color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em' }}>ACTIVE PORTFOLIO BALANCE</span>
        <h1 className="hero-balance-text" style={{ fontSize: '4.5rem', marginBottom: '12px' }}>
          ₹{loan.remainingBalance.toLocaleString()}
        </h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ 
            background: 'rgba(16, 185, 129, 0.15)', 
            color: '#10b981', 
            padding: '4px 12px', 
            borderRadius: '100px', 
            fontSize: '0.7rem', 
            fontWeight: '900',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            letterSpacing: '0.05em'
          }}>
            ● ACTIVE
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontWeight: '600' }}>
            Disbursed on {new Date(loan.disbursalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="hero-v4-stats" style={{ gap: '40px' }}>
        <div className="stat-group">
          <span className="stat-group-label" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>MONTHLY EMI</span>
          <span className="stat-group-value" style={{ color: '#ffffff', fontSize: '2.4rem' }}>₹{loan.emiAmount.toLocaleString()}</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>PAID TO DATE</span>
          <span className="stat-group-value" style={{ color: '#10b981', fontSize: '2.4rem' }}>₹{loan.paidAmount.toLocaleString()}</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>INTEREST</span>
          <span className="stat-group-value" style={{ color: '#818cf8', fontSize: '2.4rem' }}>{loan.interestRate}%</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>NEXT DUE</span>
          <span className="stat-group-value" style={{ color: '#fbbf24', fontSize: '2.4rem' }}>
            {new Date(loan.nextEmiDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '280px', alignItems: 'center' }}>
        <button
          className="btn-action"
          style={{ 
            padding: '24px 40px', 
            fontSize: '1.25rem', 
            background: '#ffffff', 
            color: '#2d0066',
            width: '100%',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            fontWeight: '900'
          }}
          onClick={onPayClick}
        >
          Instant EMI Pay ⚡
        </button>
        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
          <button className="btn-action secondary" style={{ flex: 1, padding: '12px', fontSize: '0.7rem', fontWeight: '800', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} onClick={onScheduleClick}>
            Schedule
          </button>
          <button className="btn-action secondary" style={{ flex: 1, padding: '12px', fontSize: '0.7rem', fontWeight: '800', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} onClick={onHistoryClick}>
            History
          </button>
          <button className="btn-action secondary" style={{ flex: 1, padding: '12px', fontSize: '0.7rem', fontWeight: '800', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} onClick={onTopupClick}>
            Top-up
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroV4;
