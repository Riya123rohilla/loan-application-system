import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useDashboardStore from '../../store/dashboardStore';

const HeroV4 = ({ onPayClick }) => {
  const loan = useDashboardStore((state) => state.loan);

  if (!loan) return null;

  const onSchedule = () => {
    toast.success("EMI payment scheduled for next month.");
  };

  const onDownload = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Generating financial statement...',
        success: 'Statement downloaded successfully!',
        error: 'Download failed.',
      }
    );
  };

  const onTopup = () => {
    toast("Top-up application initiated.", { icon: '💸' });
  };

  return (
    <motion.div
      className="hero-v4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="hero-v4-main">
        <span className="stat-group-label" style={{ color: 'var(--blue-400)' }}>Active Portfolio Balance</span>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '10px 0', letterSpacing: '-0.03em' }}>
          ₹{loan.remainingBalance.toLocaleString()}
        </h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span className="badge badge--approved" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>{loan.status}</span>
          <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>Disbursed on {new Date(loan.disbursalDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="hero-v4-stats">
        <div className="stat-group">
          <span className="stat-group-label">Monthly EMI</span>
          <span className="stat-group-value">₹{loan.emiAmount.toLocaleString()}</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label">Paid To Date</span>
          <span className="stat-group-value" style={{ color: '#00c853' }}>₹{loan.paidAmount.toLocaleString()}</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label">Interest Rate</span>
          <span className="stat-group-value" style={{ color: 'var(--blue-300)' }}>{loan.interestRate}%</span>
        </div>
        <div className="stat-group">
          <span className="stat-group-label">Next Due</span>
          <span className="stat-group-value" style={{ color: '#ffc107', fontSize: '1.5rem' }}>
            {new Date(loan.nextEmiDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button
          className="navbar__link--cta"
          style={{ padding: '20px 45px', fontSize: '1.1rem', border: 'none' }}
          onClick={onPayClick}
        >
          Instant EMI Pay
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-action" style={{ flex: 1, padding: '12px' }} onClick={onSchedule}>
            Schedule
          </button>
          <button className="btn-action" style={{ flex: 1, padding: '12px' }} onClick={onDownload}>
            Download
          </button>
          <button className="btn-action" style={{ flex: 1, padding: '12px' }} onClick={onTopup}>
            Top-up
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroV4;
