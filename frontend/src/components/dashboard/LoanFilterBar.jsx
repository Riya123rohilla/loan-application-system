import React from 'react';
import useDashboardStore from '../../store/dashboardStore';

const LoanFilterBar = () => {
  const { activeCategory, setActiveCategory } = useDashboardStore();
  
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
