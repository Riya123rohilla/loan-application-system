import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useDashboardStore from '../../store/dashboardStore';

const FintechAIAdvisor = ({ onViewOffer, onExecutePlan }) => {
  const { loan, simExtraPayment, addNotification } = useDashboardStore();

  const handleAction = (rec) => {
    switch (rec.action) {
      case 'View Offer':
        onViewOffer();
        break;

      case 'Execute Plan':
        onExecutePlan();
        break;

      case 'Compare Rates':
        toast('Redirecting to Gold Loan marketplace comparison...', { icon: '🏅', duration: 3000 });
        addNotification({ title: 'Marketplace Opened', message: 'Comparing Gold Loan rates across 7 lenders.', type: 'info' });
        document.getElementById('global-marketplace')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'Tax Guide':
        toast('Section 24(b) allows up to ₹2L deduction on home loan interest per year.', { icon: '📋', duration: 5000 });
        addNotification({ title: 'Tax Guide', message: 'Claim Section 24(b) deductions before March 31 for maximum tax benefit.', type: 'info' });
        break;

      default:
        toast.success(`${rec.action} initiated successfully.`);
    }
  };

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

  if (!recommendations.length) {
    return <p style={{ color: 'var(--dash-text-muted)', textAlign: 'center', padding: '20px', fontSize: '0.85rem' }}>Select a loan category to see AI recommendations.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {recommendations.map((rec, idx) => (
        <motion.div 
          key={idx}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
          style={{
            padding: '24px', 
            borderRadius: '20px', 
            background: 'var(--dash-surface)',
            border: '1px solid var(--dash-border)',
            borderLeft: `6px solid ${rec.type === 'growth' ? 'var(--dash-success)' : rec.type === 'strategy' ? 'var(--dash-accent)' : 'var(--dash-border)'}`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>{rec.title}</h4>
            <span style={{ fontSize: '0.6rem', padding: '2px 8px', background: 'var(--dash-accent-glow)', color: 'var(--dash-accent)', borderRadius: '4px', fontWeight: '900' }}>AI ANALYSIS</span>
          </div>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: 'var(--dash-text-muted)', lineHeight: '1.6' }}>{rec.message}</p>
          <button 
            className="btn-action secondary" 
            style={{ padding: '8px 20px', fontSize: '0.8rem' }}
            onClick={() => handleAction(rec)}
          >
            {rec.action}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default FintechAIAdvisor;
