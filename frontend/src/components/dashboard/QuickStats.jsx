import React from 'react';
import { motion } from 'framer-motion';

const QuickStats = ({ stats }) => {
  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label}
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="stat-card__icon">{stat.icon}</span>
          <span className="stat-card__label">{stat.label}</span>
          <span className="stat-card__value">{stat.value}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;
