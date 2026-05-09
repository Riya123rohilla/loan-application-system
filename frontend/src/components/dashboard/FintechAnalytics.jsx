import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar } from 'recharts';
import useDashboardStore from '../../store/dashboardStore';

const FintechAnalytics = () => {
  const { loan, repayments, creditHistory, chartPeriod, setChartPeriod } = useDashboardStore();

  const emiTrend = useMemo(() => {
    if (!repayments.length) return [];
    return repayments.slice(0, 6).reverse().map((r) => ({
      name: new Date(r.date).toLocaleString('en', { month: 'short' }),
      emi: r.amount,
      principal: Math.round(r.amount * 0.65),
      interest: Math.round(r.amount * 0.35)
    }));
  }, [repayments]);

  const pieData = [
    { name: 'Principal Paid', value: loan?.paidAmount || 0, color: '#00c853' },
    { name: 'Remaining', value: loan?.remainingBalance || 0, color: '#6fb2ff' },
    { name: 'Interest Paid', value: Math.round((loan?.paidAmount || 0) * 0.35), color: '#ffc107' }
  ];

  const forecastData = useMemo(() => {
    if (!loan) return [];
    const data = [];
    let balance = loan.remainingBalance;
    for (let i = 0; i < 12; i++) {
      const monthInterest = Math.round(balance * (loan.interestRate / 100 / 12));
      const principal = loan.emiAmount - monthInterest;
      balance = Math.max(0, balance - principal);
      data.push({
        month: new Date(2026, 5 + i).toLocaleString('en', { month: 'short' }),
        balance: Math.round(balance),
        interest: monthInterest
      });
    }
    return data;
  }, [loan]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '25px' }}>
        {['monthly', 'quarterly', 'yearly'].map(p => (
          <button key={p} onClick={() => setChartPeriod(p)}
            className={`btn-action ${chartPeriod === p ? 'active' : ''}`}
            style={{ fontSize: '0.65rem', padding: '6px 14px', textTransform: 'capitalize' }}>
            {p}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
        {/* EMI Trend */}
        <div style={{ minWidth: 0, background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.05em' }}>REPAYMENT VELOCITY</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={emiTrend}>
              <defs>
                <linearGradient id="emiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6fb2ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6fb2ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#0f2147', border: '1px solid rgba(111,178,255,0.2)', borderRadius: '10px', fontSize: '11px' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="emi" stroke="#6fb2ff" strokeWidth={2.5} fill="url(#emiGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Capital Split */}
        <div style={{ minWidth: 0, background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.05em' }}>CAPITAL ALLOCATION</h4>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f2147', border: 'none', borderRadius: '10px', fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ width: '100%', marginTop: '8px' }}>
            {pieData.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.7rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '2px', background: item.color }}></div>
                  <span style={{ opacity: 0.6 }}>{item.name}</span>
                </div>
                <span style={{ fontWeight: '700' }}>₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        {/* Interest vs Principal */}
        <div style={{ minWidth: 0, background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.05em' }}>INTEREST vs PRINCIPAL</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={emiTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#0f2147', border: 'none', borderRadius: '10px', fontSize: '11px' }} />
              <Bar dataKey="principal" fill="#00c853" radius={[4, 4, 0, 0]} />
              <Bar dataKey="interest" fill="#ffc107" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Balance Forecast */}
        <div style={{ minWidth: 0, background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.05em' }}>BALANCE FORECAST</h4>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#0f2147', border: 'none', borderRadius: '10px', fontSize: '11px' }} formatter={(v) => `₹${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="balance" stroke="#e040fb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="interest" stroke="#ff5252" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FintechAnalytics;
