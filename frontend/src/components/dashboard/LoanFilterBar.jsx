import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const LoanFilterBar = () => {
  const { activeCategory, setActiveCategory } = useDashboard();
  
  const categories = [
    'Personal Loan', 'Home Loan', 'Education Loan', 
    'Business Loan', 'Car Loan', 'Gold Loan'
  ];

  return (
    <div className="filter-bar">
      {categories.map(cat => (
        <button
          key={cat}
          className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default LoanFilterBar;
