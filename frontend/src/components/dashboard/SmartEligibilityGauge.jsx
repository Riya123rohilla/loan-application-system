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
      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 20px' }}>
        <svg width="180" height="180" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--dash-border)" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r="50" fill="none"
            stroke={grade.color} strokeWidth="10"
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
            style={{ margin: 0, fontSize: '2.5rem', color: 'var(--dash-text)', fontWeight: '900', letterSpacing: '-0.05em' }}
          >{score}</motion.h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--dash-text-muted)', fontWeight: '700' }}>OF 900</span>
        </div>
      </div>

      {/* Grade & Change */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ 
          background: `${grade.color}20`, 
          color: grade.color, 
          padding: '6px 16px', 
          fontSize: '0.8rem', 
          borderRadius: '100px', 
          fontWeight: '800',
          border: `1px solid ${grade.color}40`
        }}>
          {grade.grade.toUpperCase()} • {grade.risk.toUpperCase()} RISK
        </span>
        {scoreChange !== 0 && (
          <p style={{ margin: '12px 0 0', fontSize: '0.75rem', color: scoreChange > 0 ? 'var(--dash-success)' : '#ef4444', fontWeight: '700' }}>
            {scoreChange > 0 ? '↑' : '↓'} {Math.abs(scoreChange)} PTS THIS MONTH
          </p>
        )}
      </div>

      {/* Mini Trend Chart */}
      <div style={{ background: 'var(--dash-surface)', borderRadius: '16px', padding: '16px', border: '1px solid var(--dash-border)' }}>
        <p className="stat-group-label" style={{ fontSize: '0.65rem', marginBottom: '8px', fontWeight: '800' }}>CREDIT VELOCITY (6M)</p>
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={creditHistory}>
            <XAxis dataKey="month" hide />
            <Tooltip contentStyle={{ background: 'var(--dash-surface-solid)', border: '1px solid var(--dash-border)', borderRadius: '8px', fontSize: '10px' }} />
            <Line type="monotone" dataKey="score" stroke={grade.color} strokeWidth={3} dot={{ r: 3, fill: grade.color }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SmartEligibilityGauge;
