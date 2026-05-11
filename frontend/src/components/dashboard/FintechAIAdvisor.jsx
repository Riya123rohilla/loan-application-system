import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';

const FintechAIAdvisor = () => {
  const { loan, simExtraPayment } = useDashboardStore();

  const recommendations = useMemo(() => {
    const list = [];
    const category = useDashboardStore.getState().activeCategory;
    
    if (loan?.applicantDetails.creditScore > 800) {
      list.push({
        title: `Premium ${category} Offer`,
        message: `Your elite credit score qualifies you for an interest rate reduction to ${loan.interestRate - 0.5}%. Switch now to save ₹${Math.round(loan.totalLoan * 0.08 / 100000)}L.`,
        type: 'growth',
        action: 'View Offer'
      });
    }

    if (category === 'Gold Loan') {
      list.push({
        title: 'Instant Liquidity Strategy',
        message: 'Gold loans are processed in under 1 hour with zero processing fees. Ideal for short-term bridge financing.',
        type: 'strategy',
        action: 'Compare Rates'
      });
    } else if (category === 'Home Loan') {
       list.push({
        title: 'Tax Benefit Optimization',
        message: 'Ensure you claim Section 24(b) deductions for interest payments on this Home Loan.',
        type: 'info',
        action: 'Tax Guide'
      });
    }

    if (simExtraPayment > 0) {
      list.push({
        title: 'Strategic Debt Acceleration',
        message: `Your planned ₹${simExtraPayment.toLocaleString()} extra payment will cut significant months off your ${category} tenure.`,
        type: 'strategy',
        action: 'Execute Plan'
      });
    }

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
