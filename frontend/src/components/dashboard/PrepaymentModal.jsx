import React from 'react';
import DashboardModal from './DashboardModal';
import useDashboardStore from '../../store/dashboardStore';

const PrepaymentModal = ({ isOpen, onClose, amount, interestSaved, monthsReduced }) => {
  const { executePrepayment } = useDashboardStore();

  const handleExecute = async () => {
    await executePrepayment(amount, interestSaved, monthsReduced);
    onClose();
  };

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Execute Prepayment">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ background: 'rgba(0, 200, 83, 0.05)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(0, 200, 83, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: 'var(--dash-text-muted)' }}>Payment Amount</span>
            <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>₹{amount.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: 'var(--dash-text-muted)' }}>Interest Saved</span>
            <span style={{ fontWeight: '800', color: '#00c853' }}>₹{interestSaved.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--dash-text-muted)' }}>Tenure Reduction</span>
            <span style={{ fontWeight: '800', color: 'var(--dash-accent)' }}>{monthsReduced} Months</span>
          </div>
        </div>

        <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          This transaction will be applied directly to your principal balance. Surcharge and taxes are included in the above amount.
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-action" style={{ flex: 2, padding: '16px' }} onClick={handleExecute}>
            Confirm & Pay ₹{amount.toLocaleString()}
          </button>
          <button className="btn-action secondary" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default PrepaymentModal;
