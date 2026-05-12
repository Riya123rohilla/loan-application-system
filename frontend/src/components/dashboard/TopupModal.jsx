import React from 'react';
import DashboardModal from './DashboardModal';
import useDashboardStore from '../../store/dashboardStore';

const TopupModal = ({ isOpen, onClose }) => {
  const { requestTopup, getCreditGrade } = useDashboardStore();
  const grade = getCreditGrade();

  const handleApply = () => {
    requestTopup();
    onClose();
  };

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Request Loan Top-up">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          background: 'var(--dash-bg)', 
          padding: '24px', 
          borderRadius: '20px', 
          border: '1px solid var(--dash-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ fontSize: '3rem' }}>🚀</div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Pre-approved Offer</h4>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>
              Based on your <strong style={{ color: grade.color }}>{grade.grade}</strong> credit status.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '16px', border: '1px solid var(--dash-border)', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--dash-text-muted)', display: 'block', marginBottom: '4px' }}>Eligible Amount</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>₹5,00,000</span>
          </div>
          <div style={{ padding: '16px', border: '1px solid var(--dash-border)', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--dash-text-muted)', display: 'block', marginBottom: '4px' }}>Interest Rate</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>8.9% p.a.</span>
          </div>
        </div>

        <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Get instant disbursal into your linked bank account. No additional documentation required for {grade.grade} tier members.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button 
            className="btn-action" 
            style={{ flex: 1, padding: '16px' }}
            onClick={handleApply}
          >
            Apply & Disburse ⚡
          </button>
          <button 
            className="btn-action secondary" 
            style={{ flex: 1, padding: '16px' }}
            onClick={onClose}
          >
            Not Now
          </button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default TopupModal;
