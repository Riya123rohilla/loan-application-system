import React, { useState } from 'react';
import DashboardModal from './DashboardModal';
import useDashboardStore from '../../store/dashboardStore';

const ScheduleModal = ({ isOpen, onClose }) => {
  const { loan, schedulePayment } = useDashboardStore();
  const [selectedDate, setSelectedDate] = useState(loan?.nextEmiDate || '');

  const handleSchedule = () => {
    schedulePayment(selectedDate);
    onClose();
  };

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Schedule Auto-Debit">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Choose a preferred date for your next EMI auto-debit. Ensure sufficient funds are available in your linked account.
        </p>
        
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--dash-text)' }}>Next Payment Date</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: 'var(--dash-bg)',
              border: '1px solid var(--dash-border)',
              color: 'var(--dash-text)',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button 
            className="btn-action" 
            style={{ flex: 1, padding: '16px' }}
            onClick={handleSchedule}
          >
            Confirm Schedule
          </button>
          <button 
            className="btn-action secondary" 
            style={{ flex: 1, padding: '16px' }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default ScheduleModal;
