import React from 'react';
import { motion } from 'framer-motion';

const FinancialAIInsights = () => {
  const insights = [
    {
      title: "Optimization Potential",
      message: "Increase your EMI by ₹3,000 to save ₹85,000 in total interest and close your loan 14 months early.",
      type: "success"
    },
    {
      title: "Refinance Opportunity",
      message: "Your credit score improved to 845. You are now eligible for a balance transfer at 8.25% (Save ₹1.2L).",
      type: "info"
    },
    {
      title: "Repayment Strength",
      message: "100% on-time repayment history. You are eligible for a pre-approved top-up loan of ₹10,00,000.",
      type: "primary"
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {insights.map((insight, idx) => (
        <motion.div 
          key={idx}
          className="ai-insight-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.2 }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{insight.title}</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.5' }}>{insight.message}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FinancialAIInsights;
