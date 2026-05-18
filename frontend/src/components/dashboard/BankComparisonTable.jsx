import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BankComparisonTable = ({ banks }) => {
  const [sortBy, setSortBy] = useState('rate');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedBanks = [...banks].sort((a, b) => {
    const valA = a.details[sortBy];
    const valB = b.details[sortBy];
    
    if (typeof valA === 'string') {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  const handleApply = (bankName) => {
    const loading = toast.loading(`Starting application with ${bankName}...`);
    setTimeout(() => {
      toast.success(`Application pre-approved by ${bankName}! Check your email for details.`, { id: loading });
    }, 1500);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="marketplace-table">
        <thead>
          <tr style={{ textAlign: 'left', opacity: 0.5, fontSize: '0.75rem' }}>
            <th style={{ padding: '0 20px' }}>LENDER</th>
            <th onClick={() => toggleSort('rate')} style={{ cursor: 'pointer' }}>
              RATE {sortBy === 'rate' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>PROCESSING</th>
            <th onClick={() => toggleSort('speed')} style={{ cursor: 'pointer' }}>
              SPEED {sortBy === 'speed' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>RATING</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {sortedBanks.map(bank => (
            <tr key={bank._id} className="marketplace-row">
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '2rem' }}>{bank.logo}</span>
                  <span style={{ fontWeight: '700' }}>{bank.name}</span>
                </div>
              </td>
              <td>
                <span style={{ color: 'var(--blue-400)', fontWeight: '800' }}>{bank.details.rate}%</span>
              </td>
              <td>{bank.details.fee}</td>
              <td>
                <span className="badge badge--approved" style={{ padding: '4px 12px' }}>{bank.details.speed}</span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '2px', color: '#ffc107' }}>
                   {Array(5).fill().map((_, i) => <span key={i}>⭐</span>)}
                </div>
              </td>
              <td>
                <button 
                  className="navbar__link--cta" 
                  style={{ fontSize: '0.75rem', padding: '8px 20px', border: 'none' }}
                  onClick={() => handleApply(bank.name)}
                >
                  Apply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankComparisonTable;
