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
        <span className="stat-group-label" style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '8px' }}>Active Portfolio Balance</span>
        <h1 className="hero-balance-text">
          ₹{loan.remainingBalance.toLocaleString()}
        </h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ 
            background: 'rgba(16, 185, 129, 0.2)', 
            color: '#10b981', 
            padding: '6px 16px', 
            borderRadius: '100px', 
            fontSize: '0.75rem', 
            fontWeight: '800',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            ● {loan.status.toUpperCase()}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: '500' }}>
            Disbursed on {new Date(loan.disbursalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="hero-v4-stats">
        <div className="stat-group">
          <span className="stat-group-label">Monthly EMI</span>
          <span className="stat-group-value">₹{loan.emiAmount.toLocaleString()}</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label">Paid To Date</span>
          <span className="stat-group-value" style={{ color: '#10b981' }}>₹{loan.paidAmount.toLocaleString()}</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label">Interest</span>
          <span className="stat-group-value" style={{ color: 'var(--dash-accent)' }}>{loan.interestRate}%</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label">Next Due</span>
          <span className="stat-group-value" style={{ color: '#f59e0b' }}>
            {new Date(loan.nextEmiDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', position: 'relative', zIndex: 2 }}>
        <button
          className="btn-action"
          style={{ 
            padding: '20px', 
            fontSize: '1.1rem', 
            background: '#ffffff', 
            color: '#1e3a8a',
            boxShadow: '0 15px 35px rgba(255,255,255,0.2)',
            width: '100%'
          }}
          onClick={onPayClick}
        >
          Instant EMI Pay ⚡
        </button>
        <div className="hero-actions-grid">
          <button className="btn-action secondary" style={{ padding: '12px', fontSize: '0.75rem', fontWeight: '600', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }} onClick={onScheduleClick}>
            Schedule
          </button>
          <button className="btn-action secondary" style={{ padding: '12px', fontSize: '0.75rem', fontWeight: '600', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }} onClick={onHistoryClick}>
            History
          </button>
          <button className="btn-action secondary" style={{ padding: '12px', fontSize: '0.75rem', fontWeight: '600', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }} onClick={onTopupClick}>
            Top-up
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroV4;
