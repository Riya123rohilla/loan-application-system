import React from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

const RepaymentTimeline = () => {
  const { repayments } = useDashboardStore();

  const handleReceipt = (ref) => {
    toast.promise(
      new Promise(r => setTimeout(r, 1200)),
      { loading: `Generating receipt ${ref}...`, success: `Receipt ${ref} downloaded.`, error: 'Failed.' }
    );
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
          style={{ position: 'relative', paddingLeft: '25px', marginBottom: '18px', borderLeft: '2px solid rgba(255,255,255,0.06)' }}
        >
          <div style={{
            position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%',
            background: rep.status === 'Success' ? '#00c853' : '#ff5252',
            boxShadow: `0 0 8px ${rep.status === 'Success' ? 'rgba(0,200,83,0.4)' : 'rgba(255,82,82,0.4)'}`
          }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: 0, fontWeight: '700', fontSize: '0.95rem' }}>₹{rep.amount.toLocaleString()}</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.7rem', opacity: 0.5 }}>
                {rep.method} • {rep.status}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>
                {new Date(rep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <button
                onClick={() => handleReceipt(rep.ref || rep.id)}
                style={{ background: 'none', border: 'none', color: '#6fb2ff', fontSize: '0.65rem', cursor: 'pointer', padding: 0, marginTop: '3px' }}
              >📥 Receipt</button>
            </div>
          </div>
        </motion.div>
      ))}

      {repayments.length > 5 && (
        <button className="btn-action" style={{ width: '100%', justifyContent: 'center', fontSize: '0.7rem', marginTop: '8px' }}
          onClick={() => toast.success(`Showing all ${repayments.length} transactions...`)}>
          View All ({repayments.length})
        </button>
      )}
    </div>
  );
};

export default RepaymentTimeline;
