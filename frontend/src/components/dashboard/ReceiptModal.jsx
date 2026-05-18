import React from 'react';
import DashboardModal from './DashboardModal';
import toast from 'react-hot-toast';

const ReceiptModal = ({ isOpen, onClose, transaction }) => {
  if (!transaction) return null;

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Digital Payment Receipt">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ border: '1px dashed var(--dash-border)', padding: '30px', borderRadius: '20px', background: 'var(--dash-bg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--dash-accent)' }}>LoanMate</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--dash-text-muted)', letterSpacing: '0.2em' }}>OFFICIAL TRANSACTION RECORD</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Reference Number</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{transaction.ref || 'TXN-' + transaction.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Payment Date</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{new Date(transaction.date).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Payment Method</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{transaction.method}</span>
            </div>
            <div style={{ height: '1px', background: 'var(--dash-border)', margin: '10px 0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1rem', fontWeight: '600' }}>Amount Paid</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--dash-success)' }}>₹{transaction.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-action" style={{ flex: 1 }} onClick={() => toast.success('PDF Receipt downloaded.')}>
            Download PDF 📥
          </button>
          <button className="btn-action secondary" style={{ flex: 1 }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default ReceiptModal;
