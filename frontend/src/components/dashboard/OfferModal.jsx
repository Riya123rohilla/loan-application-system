import React from 'react';
import DashboardModal from './DashboardModal';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

const OfferModal = ({ isOpen, onClose, offer }) => {
  const { addNotification } = useDashboardStore();

  const handleAccept = () => {
    toast.success('Interest rate lock successful! Your manager will call you shortly.');
    addNotification({
      title: 'Rate Offer Accepted',
      message: `You have locked in a rate of ${offer.newRate}% for your portfolio refinance.`,
      type: 'success'
    });
    onClose();
  };

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Exclusive Rate Offer">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ padding: '24px', background: 'var(--dash-accent-glow)', borderRadius: '24px', textAlign: 'center', border: '1px solid var(--dash-accent)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--dash-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New Targeted Rate</span>
          <h2 style={{ fontSize: '3rem', margin: '10px 0', color: 'var(--dash-accent)' }}>{offer.newRate}%</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--dash-text-muted)' }}>Reduced from {offer.oldRate}%</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '20px', border: '1px solid var(--dash-border)', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--dash-text-muted)', display: 'block', marginBottom: '4px' }}>Interest Savings</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#00c853' }}>₹4.2L</span>
          </div>
          <div style={{ padding: '20px', border: '1px solid var(--dash-border)', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--dash-text-muted)', display: 'block', marginBottom: '4px' }}>Monthly Savings</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>₹3,500</span>
          </div>
        </div>

        <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          By accepting this offer, you authorize LoanMate to initiate a refinance request with our partner banks. No impact on credit score.
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-action" style={{ flex: 2, padding: '16px' }} onClick={handleAccept}>
            Lock This Rate 🔒
          </button>
          <button className="btn-action secondary" style={{ flex: 1 }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default OfferModal;
