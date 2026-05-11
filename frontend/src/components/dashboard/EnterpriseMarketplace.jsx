import React from 'react';
import toast from 'react-hot-toast';

const EnterpriseMarketplace = ({ banks }) => {
  const handleApply = (name) => {
    const loading = toast.loading(`Starting application with ${name}...`);
    setTimeout(() => {
      toast.success(`Application submitted to ${name}!`);
      toast.dismiss(loading);
    }, 1500);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="marketplace-table">
        <thead>
          <tr style={{ textAlign: 'left', opacity: 0.5, fontSize: '0.75rem' }}>
            <th style={{ padding: '0 20px' }}>PARTNER LENDER</th>
            <th>INTEREST RATE</th>
            <th>PROCESSING</th>
            <th>APPROVAL TIME</th>
            <th>CUSTOMER SCORE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {banks.map(bank => (
            <tr key={bank._id} className="marketplace-row">
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '2rem' }}>{bank.logo}</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: '700' }}>{bank.name}</p>
                    <p className="summary-label" style={{ fontSize: '0.65rem' }}>Premium Partner</p>
                  </div>
                </div>
              </td>
              <td>
                <span style={{ color: 'var(--blue-400)', fontWeight: '800', fontSize: '1.1rem' }}>{bank.details.rate}%</span>
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
                  Apply Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnterpriseMarketplace;
