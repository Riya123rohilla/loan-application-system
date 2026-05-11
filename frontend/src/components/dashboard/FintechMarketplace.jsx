import React, { useState } from 'react';
import useDashboardStore from '../../store/dashboardStore';
import ComparisonModal from './ComparisonModal';
import toast from 'react-hot-toast';

const FintechMarketplace = () => {
  const { banks, activeCategory } = useDashboardStore();
  const [marketplaceSort, setMarketplaceSort] = useState('rate');
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleSelect = (bank) => {
    if (selectedBanks.find(b => b._id === bank._id)) {
      setSelectedBanks(prev => prev.filter(b => b._id !== bank._id));
    } else {
      if (selectedBanks.length >= 3) {
        toast.error("Maximum 3 lenders can be compared simultaneously.");
        return;
      }
      setSelectedBanks(prev => [...prev, bank]);
    }
  };

  const handleApply = (bankName) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: `Syncing with ${bankName} verification servers...`,
        success: `Application pre-approved by ${bankName}!`,
        error: 'Network synchronization failed.'
      }
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h3 style={{ margin: 0 }}>Lender Marketplace</h3>
          <p className="summary-label" style={{ fontSize: '0.75rem' }}>Comparing {banks.length} lenders for {activeCategory}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
           {selectedBanks.length > 1 && (
             <button 
               className="navbar__link--cta" 
               style={{ fontSize: '0.7rem', padding: '8px 20px', border: 'none', background: '#2a78ff' }}
               onClick={() => setIsCompareOpen(true)}
             >
               Compare ({selectedBanks.length})
             </button>
           )}
           <button 
             className={`btn-action ${marketplaceSort === 'rate' ? 'active' : ''}`}
             onClick={() => setMarketplaceSort('rate')}
             style={{ fontSize: '0.7rem', padding: '8px 15px' }}
           >
             Lowest Interest
           </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        {banks.map((bank, idx) => {
          const isSelected = selectedBanks.find(b => b._id === bank._id);
          return (
            <div 
              key={bank._id} 
              className="enterprise-card" 
              style={{ 
                padding: '20px', borderRadius: '18px', 
                background: isSelected ? 'rgba(42, 120, 255, 0.05)' : 'rgba(255,255,255,0.015)',
                border: isSelected ? '1px solid var(--blue-500)' : '1px solid rgba(255,255,255,0.03)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 1fr 1fr 1.5fr', alignItems: 'center', gap: '20px' }}>
                <input 
                  type="checkbox" 
                  checked={!!isSelected} 
                  onChange={() => handleSelect(bank)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontSize: '2.5rem' }}>{bank.logo}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ margin: 0 }}>{bank.name}</h4>
                        {idx === 0 && <span className="badge badge--approved" style={{ fontSize: '0.6rem', padding: '2px 8px' }}>AI Recommended</span>}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.65rem', opacity: 0.5 }}>Trust Grade: AAA</p>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p className="stat-group-label" style={{ fontSize: '0.6rem', marginBottom: '5px' }}>INTEREST</p>
                  <p style={{ margin: 0, fontWeight: '800', color: 'var(--blue-300)' }}>{bank.details.rate}%</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p className="stat-group-label" style={{ fontSize: '0.6rem', marginBottom: '5px' }}>SPEED</p>
                  <p style={{ margin: 0, fontWeight: '700' }}>{bank.details.speed}</p>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button className="btn-action" style={{ fontSize: '0.7rem', padding: '8px 15px' }} onClick={() => handleSelect(bank)}>
                    {isSelected ? 'Deselect' : 'Analyze'}
                  </button>
                  <button 
                    className="navbar__link--cta" 
                    style={{ fontSize: '0.75rem', padding: '10px 25px', border: 'none' }}
                    onClick={() => handleApply(bank.name)}
                  >
                    Quick Apply
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ComparisonModal 
        isOpen={isCompareOpen} 
        onClose={() => setIsCompareOpen(false)} 
        selectedBanks={selectedBanks} 
      />
    </div>
  );
};

export default FintechMarketplace;
