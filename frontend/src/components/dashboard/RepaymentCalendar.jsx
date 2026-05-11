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
    if (e?.type === 'paid') return { background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.4)' };
    if (e?.type === 'upcoming') return { background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.4)' };
    if (e?.type === 'overdue') return { background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.4)' };
    return { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' };
  };

  const dotColor = (type) => {
    if (type === 'paid') return '#00c853';
    if (type === 'upcoming') return '#ffc107';
    if (type === 'overdue') return '#ff5252';
    return '#6fb2ff';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{monthName}</h4>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button className="btn-action" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => setMonthOffset(p => p - 1)}>&lt;</button>
          <button className="btn-action" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => setMonthOffset(0)}>Today</button>
          <button className="btn-action" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => setMonthOffset(p => p + 1)}>&gt;</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontSize: '0.6rem', opacity: 0.4, marginBottom: '8px' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
        {days.map((day, idx) => (
          <motion.div
            key={idx}
            whileHover={day ? { scale: 1.12, zIndex: 10 } : {}}
            onClick={() => day && events[day] && setSelectedEvent(events[day])}
            style={{
              height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', color: day ? '#fff' : 'transparent', position: 'relative',
              cursor: (day && events[day]) ? 'pointer' : 'default',
              ...getDayStyle(day)
            }}
          >
            {day}
            {day && events[day] && (
              <div style={{ position: 'absolute', bottom: '3px', width: '4px', height: '4px', borderRadius: '50%', background: dotColor(events[day].type) }}></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'center' }}>
        {[{ label: 'Paid', color: '#00c853' }, { label: 'Upcoming', color: '#ffc107' }, { label: 'Overdue', color: '#ff5252' }].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.6rem', opacity: 0.5 }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: l.color }}></div>
            {l.label}
          </div>
        ))}
      </div>

      <TransactionDetailModal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} event={selectedEvent} />
    </div>
  );
};

export default RepaymentCalendar;
