import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';

const FintechAIAdvisor = () => {
  const { loan, simExtraPayment } = useDashboardStore();

  const recommendations = useMemo(() => {
    const list = [];
    
    if (loan?.applicantDetails.creditScore > 800) {
      list.push({
        title: 'Premium Refinance Opportunity',
        message: 'Your elite credit score qualifies you for an interest rate reduction to 8.2%. Switch now to save ₹4.2L.',
        type: 'growth',
        action: 'View Offer'
      });
    }

    if (simExtraPayment > 0) {
      list.push({
        title: 'Strategic Debt Acceleration',
        message: `Your planned ₹${simExtraPayment.toLocaleString()} extra payment will cut 14 months off your tenure. Highly recommended.`,
        type: 'strategy',
        action: 'Execute Plan'
      });
    }

    list.push({
      title: 'Top-Up Liquidity Alert',
      message: 'Based on your consistent repayment history, you have a pre-approved top-up of ₹10,00,000 at 9.0%.',
      type: 'info',
      action: 'Check Eligibility'
    });

    return list;
  }, [loan, simExtraPayment]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {recommendations.map((rec, idx) => (
        <motion.div 
          key={idx}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
          style={{
            padding: '20px', borderRadius: '15px', 
            background: 'rgba(255,255,255,0.02)',
            borderLeft: `4px solid ${rec.type === 'growth' ? '#00c853' : rec.type === 'strategy' ? 'var(--blue-500)' : 'rgba(255,255,255,0.1)'}`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
             <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{rec.title}</h4>
             <span className="badge badge--approved" style={{ fontSize: '0.55rem' }}>AI GEN-5</span>
          </div>
          <p style={{ margin: '0 0 15px 0', fontSize: '0.8rem', opacity: 0.6, lineHeight: '1.5' }}>{rec.message}</p>
          <button className="btn-action" style={{ fontSize: '0.7rem', padding: '6px 15px', background: 'rgba(255,255,255,0.05)' }}>
            {rec.action}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default FintechAIAdvisor;
