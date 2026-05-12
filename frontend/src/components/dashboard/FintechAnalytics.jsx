import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar } from 'recharts';
import useDashboardStore from '../../store/dashboardStore';

const FintechAnalytics = () => {
  const { loan, repayments, creditHistory, chartPeriod, setChartPeriod } = useDashboardStore();

  const emiTrend = useMemo(() => {
    if (!repayments.length) return [];
    const baseData = repayments.slice(0, 6).reverse();
    const multiplier = chartPeriod === 'monthly' ? 1 : chartPeriod === 'quarterly' ? 3 : 12;
    
    return baseData.map((r, i) => ({
      name: chartPeriod === 'monthly' ? new Date(r.date).toLocaleString('en', { month: 'short' }) : 
            chartPeriod === 'quarterly' ? `Q${i+1} '26` : `202${i+1}`,
      emi: r.amount * multiplier,
      principal: Math.round(r.amount * multiplier * 0.65),
      interest: Math.round(r.amount * multiplier * 0.35)
    }));
  }, [repayments, chartPeriod]);

  const pieData = [
    { name: 'Principal Paid', value: loan?.paidAmount || 0, color: '#10b981' },
    { name: 'Remaining', value: loan?.remainingBalance || 0, color: 'var(--dash-accent)' },
    { name: 'Interest Paid', value: Math.round((loan?.paidAmount || 0) * 0.35), color: '#f59e0b' }
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
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        {['monthly', 'quarterly', 'yearly'].map(p => (
          <button key={p} onClick={() => setChartPeriod(p)}
            className={`btn-action ${chartPeriod === p ? '' : 'secondary'}`}
            style={{ padding: '8px 20px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {p}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* EMI Trend */}
        <div style={{ background: 'var(--dash-surface)', padding: '24px', borderRadius: '24px', border: '1px solid var(--dash-border)' }}>
          <h4 style={{ margin: '0 0 20px 0', fontSize: '0.75rem', color: 'var(--dash-text-muted)', letterSpacing: '0.1em', fontWeight: '800' }}>REPAYMENT VELOCITY</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={emiTrend}>
              <defs>
                <linearGradient id="emiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--dash-accent)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--dash-accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--dash-text-muted)', fontSize: 11 }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: 'var(--dash-surface-solid)', border: '1px solid var(--dash-border)', borderRadius: '12px', fontSize: '12px' }} 
                itemStyle={{ color: 'var(--dash-text)' }} 
              />
              <Area type="monotone" dataKey="emi" stroke="var(--dash-accent)" strokeWidth={3} fill="url(#emiGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Capital Split */}
        <div style={{ background: 'var(--dash-surface)', padding: '24px', borderRadius: '24px', border: '1px solid var(--dash-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '0.75rem', color: 'var(--dash-text-muted)', letterSpacing: '0.1em', fontWeight: '800' }}>CAPITAL ALLOCATION</h4>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={8} dataKey="value" cornerRadius={10}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--dash-surface-solid)', border: '1px solid var(--dash-border)', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ width: '100%', marginTop: '16px' }}>
            {pieData.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                  <span style={{ color: 'var(--dash-text-muted)', fontWeight: '600' }}>{item.name}</span>
                </div>
                <span style={{ fontWeight: '800' }}>₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Interest vs Principal */}
        <div style={{ background: 'var(--dash-surface)', padding: '24px', borderRadius: '24px', border: '1px solid var(--dash-border)' }}>
          <h4 style={{ margin: '0 0 20px 0', fontSize: '0.75rem', color: 'var(--dash-text-muted)', letterSpacing: '0.1em', fontWeight: '800' }}>INTEREST vs PRINCIPAL</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={emiTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--dash-text-muted)', fontSize: 11 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'var(--dash-surface-solid)', border: '1px solid var(--dash-border)', borderRadius: '12px' }} />
              <Bar dataKey="principal" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="interest" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Balance Forecast */}
        <div style={{ background: 'var(--dash-surface)', padding: '24px', borderRadius: '24px', border: '1px solid var(--dash-border)' }}>
          <h4 style={{ margin: '0 0 20px 0', fontSize: '0.75rem', color: 'var(--dash-text-muted)', letterSpacing: '0.1em', fontWeight: '800' }}>BALANCE FORECAST</h4>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-border)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--dash-text-muted)', fontSize: 11 }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: 'var(--dash-surface-solid)', border: '1px solid var(--dash-border)', borderRadius: '12px' }} 
                formatter={(v) => `₹${v.toLocaleString()}`} 
              />
              <Line type="monotone" dataKey="balance" stroke="var(--dash-secondary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--dash-secondary)' }} />
              <Line type="monotone" dataKey="interest" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FintechAnalytics;
