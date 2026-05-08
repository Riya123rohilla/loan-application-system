import React from 'react';
import toast from 'react-hot-toast';

const RepaymentTimeline = ({ repayments }) => {
  const handleDownloadReceipt = (txId) => {
    const loading = toast.loading(`Generating receipt for ${txId}...`);
    setTimeout(() => {
      toast.success(`Receipt downloaded successfully!`, { id: loading });
    }, 1200);
  };

  return (
    <div className="timeline-v2">
      {repayments.map((rep, index) => (
        <div key={rep.id} className="timeline-v2-item">
          <div 
            className="timeline-v2-dot" 
            style={{ 
              background: rep.status === 'Success' ? '#00c853' : '#ff5252',
              boxShadow: `0 0 10px ${rep.status === 'Success' ? 'rgba(0, 200, 83, 0.4)' : 'rgba(255, 82, 82, 0.4)'}`
            }}
          ></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: 0, fontWeight: '700', fontSize: '1rem' }}>₹{rep.amount.toLocaleString()}</p>
              <p className="summary-label" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{rep.method} • {rep.status}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>
                {new Date(rep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <button 
                onClick={() => handleDownloadReceipt(rep.ref)}
                style={{ background: 'none', border: 'none', color: 'var(--blue-400)', fontSize: '0.7rem', padding: 0, cursor: 'pointer' }}
              >
                Receipt 📥
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className="btn-action" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
        View Full History
      </button>
    </div>
  );
};

export default RepaymentTimeline;
