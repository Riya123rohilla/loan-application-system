import React from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

const TransactionDetailModal = ({ isOpen, onClose, event }) => {
  const { setPayModalOpen } = useDashboardStore();

  if (!isOpen || !event) return null;

  const handlePayNow = () => {
    onClose();
    setPayModalOpen(true);
  };

  const handleDownloadReceipt = () => {
    toast.promise(
      new Promise(r => setTimeout(r, 1500)),
      { loading: 'Generating encrypted receipt...', success: `Receipt for ₹${event.amount.toLocaleString()} downloaded.`, error: 'Failed.' }
    );
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="enterprise-card"
        style={{ width: '100%', maxWidth: '420px', padding: '35px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            {event.type === 'paid' ? '✅' : event.type === 'upcoming' ? '⏰' : '📋'}
          </div>
          <h3 style={{ margin: '0 0 5px' }}>{event.title}</h3>
          <p className="summary-label">
            {event.day ? `May ${event.day}, 2026` : 'Scheduled'}
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '22px', borderRadius: '18px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>Amount</span>
            <span style={{ fontWeight: '800', color: '#6fb2ff', fontSize: '1.1rem' }}>₹{event.amount.toLocaleString()}</span>
          </div>
          {event.ref && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>Reference</span>
              <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{event.ref}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>Late Fee</span>
            <span style={{ fontWeight: '700', color: '#00c853', fontSize: '0.85rem' }}>₹0.00</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '12px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Status</span>
            <span className={`badge badge--${event.type === 'paid' ? 'approved' : 'pending'}`} style={{ fontSize: '0.65rem' }}>
              {event.type === 'paid' ? 'COMPLETED' : 'SCHEDULED'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-action" style={{ flex: 1 }} onClick={onClose}>Close</button>
          {event.type === 'paid' ? (
            <button className="navbar__link--cta" style={{ flex: 2, border: 'none' }} onClick={handleDownloadReceipt}>
              📥 Download Receipt
            </button>
          ) : (
            <button className="navbar__link--cta" style={{ flex: 2, border: 'none' }} onClick={handlePayNow}>
              💳 Pay Now
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionDetailModal;
