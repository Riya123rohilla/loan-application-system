import React from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

const RepaymentTimeline = ({ onReceiptClick }) => {
  const { repayments } = useDashboardStore();

  const handleReceipt = (rep) => {
    onReceiptClick(rep);
  };

  if (!repayments.length) {
    return <p style={{ opacity: 0.4, textAlign: 'center', padding: '20px', fontSize: '0.8rem' }}>No transactions yet</p>;
  }

  return (
    <div>
      {repayments.slice(0, 5).map((rep, idx) => (
        <motion.div
          key={rep.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.08 }}
          style={{ 
            position: 'relative', 
            paddingLeft: '30px', 
            marginBottom: '24px', 
            borderLeft: '2px solid var(--dash-border)' 
          }}
        >
          <div style={{
            position: 'absolute', 
            left: '-5px', 
            top: '6px', 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%',
            background: rep.status === 'Success' ? 'var(--dash-success)' : '#ef4444',
            boxShadow: `0 0 12px ${rep.status === 'Success' ? 'var(--dash-accent-glow)' : 'rgba(239, 68, 68, 0.4)'}`
          }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: 0, fontWeight: '800', fontSize: '1rem', color: 'var(--dash-text)' }}>₹{rep.amount.toLocaleString()}</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--dash-text-muted)', fontWeight: '600' }}>
                {rep.method} • {rep.status}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--dash-text-muted)', fontWeight: '500' }}>
                {new Date(rep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <button
                onClick={() => handleReceipt(rep)}
                style={{ background: 'none', border: 'none', color: 'var(--dash-accent)', fontSize: '0.7rem', cursor: 'pointer', padding: 0, marginTop: '4px', fontWeight: '700' }}
              >📥 Receipt</button>
            </div>
          </div>
        </motion.div>
      ))}

      {repayments.length > 5 && (
        <button className="btn-action secondary" style={{ width: '100%', fontSize: '0.8rem', marginTop: '12px' }}
          onClick={() => toast.success(`Viewing all ${repayments.length} transactions in secure vault...`)}>
          View Full History ({repayments.length})
        </button>
      )}
    </div>
  );
};

export default RepaymentTimeline;
