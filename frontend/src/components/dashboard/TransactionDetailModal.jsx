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
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Transaction Details">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
            {event.type === 'paid' ? '✅' : event.type === 'upcoming' ? '⏰' : '📋'}
          </div>
          <h3 style={{ margin: '0 0 8px', fontSize: '1.4rem' }}>{event.title}</h3>
          <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>
            {event.day ? `May ${event.day}, 2026` : 'Scheduled for next cycle'}
          </p>
        </div>

        <div style={{ background: 'var(--dash-bg)', padding: '24px', borderRadius: '20px', border: '1px solid var(--dash-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Amount</span>
            <span style={{ fontWeight: '800', color: 'var(--dash-accent)', fontSize: '1.2rem' }}>₹{event.amount.toLocaleString()}</span>
          </div>
          {event.ref && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Reference ID</span>
              <span style={{ fontWeight: '700' }}>{event.ref}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Surcharge/Late Fee</span>
            <span style={{ fontWeight: '700', color: 'var(--dash-success)' }}>₹0.00</span>
          </div>
          <div style={{ height: '1px', background: 'var(--dash-border)', margin: '12px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Status</span>
            <span style={{ 
              padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '800',
              background: event.type === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
              color: event.type === 'paid' ? 'var(--dash-success)' : 'var(--dash-warning)'
            }}>
              ● {event.type === 'paid' ? 'COMPLETED' : 'PENDING'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-action secondary" style={{ flex: 1 }} onClick={onClose}>Close</button>
          {event.type === 'paid' ? (
            <button className="btn-action" style={{ flex: 2 }} onClick={handleDownloadReceipt}>
              Download Receipt 📥
            </button>
          ) : (
            <button className="btn-action" style={{ flex: 2, background: 'var(--dash-accent)' }} onClick={handlePayNow}>
              Pay Now 💳
            </button>
          )}
        </div>
      </div>
    </DashboardModal>
  );
};

export default TransactionDetailModal;
