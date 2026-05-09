import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import useDashboardStore from '../../store/dashboardStore';

const SmartEligibilityGauge = () => {
  const { loan, creditHistory, getCreditGrade } = useDashboardStore();
  const score = loan?.applicantDetails?.creditScore || 0;
  const grade = getCreditGrade();
  const percentage = (score / 900) * 100;

  const scoreChange = useMemo(() => {
    if (creditHistory.length < 2) return 0;
    return creditHistory[creditHistory.length - 1].score - creditHistory[creditHistory.length - 2].score;
  }, [creditHistory]);

  return (
    <div>
      {/* Gauge */}
      <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 15px' }}>
        <svg width="160" height="160" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="50" fill="none"
            stroke={grade.color} strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 314} 314`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            initial={{ strokeDasharray: '0 314' }}
            animate={{ strokeDasharray: `${(percentage / 100) * 314} 314` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <motion.h2
            key={score}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            style={{ margin: 0, fontSize: '2rem', color: grade.color }}
          >{score}</motion.h2>
          <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>/ 900</span>
        </div>
      </div>

      {/* Grade & Change */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <span className="badge" style={{ background: `${grade.color}20`, color: grade.color, padding: '4px 14px', fontSize: '0.7rem', borderRadius: '20px', fontWeight: '700' }}>
          {grade.grade} • {grade.risk} Risk
        </span>
        {scoreChange !== 0 && (
          <p style={{ margin: '8px 0 0', fontSize: '0.7rem', color: scoreChange > 0 ? '#00c853' : '#ff5252' }}>
            {scoreChange > 0 ? '↑' : '↓'} {Math.abs(scoreChange)} pts this month
          </p>
        )}
      </div>

      {/* Mini Trend Chart */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '10px', marginTop: '10px' }}>
        <p className="stat-group-label" style={{ fontSize: '0.55rem', marginBottom: '5px' }}>6-MONTH TREND</p>
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={creditHistory}>
            <XAxis dataKey="month" hide />
            <Tooltip contentStyle={{ background: '#0f2147', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
            <Line type="monotone" dataKey="score" stroke={grade.color} strokeWidth={2} dot={{ r: 2, fill: grade.color }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SmartEligibilityGauge;
