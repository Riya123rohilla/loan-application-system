import React from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';

const LoanFilterBar = () => {
  const { activeCategory, setActiveCategory } = useDashboardStore();
  
  const categories = [
    'Personal Loan', 'Home Loan', 'Education Loan', 
    'Business Loan', 'Car Loan', 'Gold Loan'
  ];

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LoanFilterBar;
