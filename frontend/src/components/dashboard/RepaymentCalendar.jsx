import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';
import TransactionDetailModal from './TransactionDetailModal';

const RepaymentCalendar = () => {
  const { repayments, loan } = useDashboardStore();
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const currentDate = useMemo(() => {
    const d = new Date(2026, 4 + monthOffset, 1);
    return d;
  }, [monthOffset]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = currentDate.getDay();
  const monthName = currentDate.toLocaleString('en', { month: 'long', year: 'numeric' });

  // Build events from real repayment data
  const events = useMemo(() => {
    const map = {};
    const m = currentDate.getMonth();
    const y = currentDate.getFullYear();

    // Past payments
    repayments.forEach(r => {
      const d = new Date(r.date);
      if (d.getMonth() === m && d.getFullYear() === y) {
        map[d.getDate()] = { day: d.getDate(), type: 'paid', title: `EMI Payment (${r.method})`, amount: r.amount, ref: r.ref };
      }
    });

    // Upcoming EMI
    if (loan) {
      const nextDue = new Date(loan.nextEmiDate);
      if (nextDue.getMonth() === m && nextDue.getFullYear() === y && !map[nextDue.getDate()]) {
        map[nextDue.getDate()] = { day: nextDue.getDate(), type: 'upcoming', title: 'EMI Due', amount: loan.emiAmount };
      }
    }

    return map;
  }, [repayments, loan, currentDate]);

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const getDayStyle = (day) => {
    if (!day) return {};
    const e = events[day];
    if (e?.type === 'paid') return { background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)' };
    if (e?.type === 'upcoming') return { background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.4)' };
    if (e?.type === 'overdue') return { background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)' };
    return { background: 'var(--dash-border)', border: '1px solid var(--dash-border)' };
  };

  const dotColor = (type) => {
    if (type === 'paid') return 'var(--dash-success)';
    if (type === 'upcoming') return 'var(--dash-warning)';
    if (type === 'overdue') return '#ef4444';
    return 'var(--dash-accent)';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>{monthName}</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-action secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setMonthOffset(p => p - 1)}>&lt;</button>
          <button className="btn-action secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setMonthOffset(0)}>Today</button>
          <button className="btn-action secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setMonthOffset(p => p + 1)}>&gt;</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontSize: '0.7rem', fontWeight: '700', color: 'var(--dash-text-muted)', marginBottom: '12px' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {days.map((day, idx) => (
          <motion.div
            key={idx}
            whileHover={day ? { scale: 1.1, y: -2, zIndex: 10 } : {}}
            onClick={() => day && events[day] && setSelectedEvent(events[day])}
            style={{
              height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', fontWeight: '600', color: day ? 'var(--dash-text)' : 'transparent', position: 'relative',
              cursor: (day && events[day]) ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              ...getDayStyle(day)
            }}
          >
            {day}
            {day && events[day] && (
              <div style={{ position: 'absolute', bottom: '6px', width: '5px', height: '5px', borderRadius: '50%', background: dotColor(events[day].type) }}></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '20px', justifyContent: 'center' }}>
        {[{ label: 'Paid', color: 'var(--dash-success)' }, { label: 'Due', color: 'var(--dash-warning)' }, { label: 'Overdue', color: '#ef4444' }].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--dash-text-muted)', fontWeight: '600' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }}></div>
            {l.label}
          </div>
        ))}
      </div>

      <TransactionDetailModal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} event={selectedEvent} />
    </div>
  );
};

export default RepaymentCalendar;
