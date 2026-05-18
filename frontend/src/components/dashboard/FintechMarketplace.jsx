import React, { useState } from 'react';
import useDashboardStore from '../../store/dashboardStore';
import ComparisonModal from './ComparisonModal';
import QuickApplyModal from './QuickApplyModal';
import toast from 'react-hot-toast';

const FintechMarketplace = () => {
  const { banks, activeCategory } = useDashboardStore();
  const [marketplaceSort, setMarketplaceSort] = useState('rate');
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [targetBank, setTargetBank] = useState(null);

  const handleSelect = (bank, autoOpen = false) => {
    let newSelection;
    if (selectedBanks.find(b => b._id === bank._id)) {
      newSelection = selectedBanks.filter(b => b._id !== bank._id);
    } else {
      if (selectedBanks.length >= 3) {
        toast.error("Maximum 3 lenders can be compared simultaneously.");
        return;
      }
      newSelection = [...selectedBanks, bank];
    }
    setSelectedBanks(newSelection);
    if (autoOpen && newSelection.length > 0) {
      setIsCompareOpen(true);
    }
  };

  const sortedBanks = [...banks].sort((a, b) => {
    if (marketplaceSort === 'rate') return a.details.rate - b.details.rate;
    return 0;
  });

  const handleApply = (bank) => {
    setTargetBank(bank);
    setIsApplyOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <p className="summary-label" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Available Lenders: {banks.length}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           {selectedBanks.length > 1 && (
             <button 
               className="btn-action" 
               style={{ background: 'var(--dash-accent)', boxShadow: '0 8px 20px var(--dash-accent-glow)' }}
               onClick={() => setIsCompareOpen(true)}
             >
               Compare ({selectedBanks.length})
             </button>
           )}
           <button 
             className={`btn-action ${marketplaceSort === 'rate' ? '' : 'secondary'}`}
             onClick={() => setMarketplaceSort('rate')}
             style={{ fontSize: '0.8rem' }}
           >
             Sort by Interest
           </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {sortedBanks.map((bank, idx) => {
          const isSelected = selectedBanks.find(b => b._id === bank._id);
          return (
            <div 
              key={bank._id} 
              className="enterprise-card" 
              style={{ 
                padding: '24px', 
                border: isSelected ? '1px solid var(--dash-accent)' : '1px solid var(--dash-border)',
                background: isSelected ? 'var(--dash-accent-glow)' : 'var(--dash-surface)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="marketplace-item-grid">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={!!isSelected} 
                    onChange={() => handleSelect(bank)}
                    style={{ 
                      width: '22px', 
                      height: '22px', 
                      cursor: 'pointer',
                      accentColor: 'var(--dash-accent)'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '2.5rem', background: 'var(--dash-border)', padding: '12px', borderRadius: '16px' }}>{bank.logo}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{bank.name}</h4>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.6rem', padding: '2px 8px', background: 'var(--dash-success)', color: '#fff', borderRadius: '4px', fontWeight: '800' }}>TRUST A+</span>
                      {idx === 0 && <span style={{ fontSize: '0.6rem', padding: '2px 8px', background: 'var(--dash-accent)', color: '#fff', borderRadius: '4px', fontWeight: '800' }}>BEST MATCH</span>}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p className="stat-group-label" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>RATE</p>
                  <p style={{ margin: 0, fontWeight: '800', color: 'var(--dash-accent)', fontSize: '1.1rem' }}>{bank.details.rate}%</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p className="stat-group-label" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>APPROVAL</p>
                  <p style={{ margin: 0, fontWeight: '700', color: 'var(--dash-success)' }}>{bank.details.speed}</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p className="stat-group-label" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>MAX TENURE</p>
                  <p style={{ margin: 0, fontWeight: '700' }}>30 Years</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button className="btn-action secondary" style={{ padding: '10px 16px', fontSize: '0.8rem' }} onClick={() => handleSelect(bank, true)}>
                    {isSelected ? 'Deselect' : 'Analyze'}
                  </button>
                  <button 
                    className="btn-action" 
                    style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                    onClick={() => handleApply(bank)}
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
        onSelectBank={(bank) => {
          setIsCompareOpen(false);
          handleApply(bank);
        }}
      />

      <QuickApplyModal 
        isOpen={isApplyOpen} 
        onClose={() => setIsApplyOpen(false)} 
        bank={targetBank} 
      />
    </div>
  );
};

export default FintechMarketplace;
