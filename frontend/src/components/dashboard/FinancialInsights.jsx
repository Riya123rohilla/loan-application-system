import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const FinancialInsights = ({ loan }) => {
  const data = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 2000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
  ];

  const pieData = [
    { name: 'Paid', value: loan?.paidAmount || 0, color: '#00c853' },
    { name: 'Remaining', value: loan?.remainingBalance || 0, color: 'rgba(255,255,255,0.05)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div className="analytic-card">
        <span className="summary-label">Payment Trend</span>
        <div className="chart-wrapper" style={{ height: '150px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2a78ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2a78ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="amount" stroke="#2a78ff" fillOpacity={1} fill="url(#colorAmt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="analytic-card">
        <span className="summary-label">Repayment Split</span>
        <div className="chart-wrapper" style={{ height: '150px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsights;
