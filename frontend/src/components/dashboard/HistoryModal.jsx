import React from 'react';
import DashboardModal from './DashboardModal';
import useDashboardStore from '../../store/dashboardStore';

const HistoryModal = ({ isOpen, onClose }) => {
  const { repayments } = useDashboardStore();

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Repayment History">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>
          Showing all processed and pending transactions for your active loan portfolio.
        </p>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--dash-border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>DATE</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>AMOUNT</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {repayments.map((txn) => (
                <tr key={txn.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: '500' }}>{new Date(txn.date).toLocaleDateString('en-GB')}</td>
                  <td style={{ padding: '16px 8px', fontWeight: '700' }}>₹{txn.amount.toLocaleString()}</td>
                  <td style={{ padding: '16px 8px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      fontSize: '0.7rem', 
                      fontWeight: '800',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981'
                    }}>
                      ● {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          className="btn-action" 
          style={{ width: '100%', marginTop: '10px' }}
          onClick={onClose}
        >
          Close History
        </button>
      </div>
    </DashboardModal>
  );
};

export default HistoryModal;
