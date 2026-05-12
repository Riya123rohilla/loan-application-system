import React, { useState } from 'react';
import DashboardModal from './DashboardModal';
import toast from 'react-hot-toast';

const QuickApplyModal = ({ isOpen, onClose, bank }) => {
  const [step, setStep] = useState('confirm');

  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      toast.success(`Application sent to ${bank.name}!`);
    }, 3000);
  };

  if (!bank) return null;

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title={`Apply with ${bank.name}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {step === 'confirm' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: 'var(--dash-bg)', borderRadius: '20px', border: '1px solid var(--dash-border)' }}>
              <span style={{ fontSize: '3rem' }}>{bank.logo}</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{bank.name}</h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>Interest Rate: {bank.details.rate}% • Speed: {bank.details.speed}</p>
              </div>
            </div>

            <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              We will share your basic profile and credit history with {bank.name}. This will not impact your credit score.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-action" style={{ flex: 2, padding: '16px' }} onClick={handleConfirm}>
                Confirm Application
              </button>
              <button className="btn-action secondary" style={{ flex: 1 }} onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="spinner" style={{ width: '50px', height: '50px', margin: '0 auto 20px' }}></div>
            <h3>Encrypting Profile</h3>
            <p className="summary-label">Establishing secure handshake with {bank.name} servers...</p>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📬</div>
            <h2 style={{ color: 'var(--dash-success)' }}>Application Filed!</h2>
            <p className="summary-label" style={{ marginBottom: '30px' }}>Your application reference is #APP-{Math.floor(Math.random()*100000)}. {bank.name} will contact you within 24 hours.</p>
            <button className="btn-action" style={{ width: '100%' }} onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </DashboardModal>
  );
};

export default QuickApplyModal;
