import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ComparisonModal = ({ isOpen, onClose, selectedBanks, onSelectBank }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px) saturate(180%)',
          zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px',
          overscrollBehavior: 'none'
        }}>
          <motion.div 
            className="modal-content-wrapper"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            style={{
              background: '#ffffff',
              borderRadius: '32px', border: '1px solid var(--dash-border)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(24px, 4vw, 48px)', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h2 style={{ margin: 0, color: 'var(--dash-text)', fontSize: '2rem' }}>Strategic Lender Comparison</h2>
                <p className="summary-label" style={{ color: 'var(--dash-text-muted)', fontSize: '0.95rem' }}>Side-by-side financial telemetry analysis</p>
              </div>
              <button className="btn-action secondary" onClick={onClose} style={{ padding: '12px 24px' }}>✕ Close</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedBanks.length}, 1fr)`, gap: '20px' }}>
              {selectedBanks.map(bank => (
                <div key={bank._id} className="enterprise-card" style={{ background: 'var(--dash-bg)', padding: '32px', border: '1px solid var(--dash-border)' }}>
                   <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                      <span style={{ fontSize: '4rem', background: 'var(--dash-surface)', padding: '16px', borderRadius: '24px', display: 'inline-block' }}>{bank.logo}</span>
                      <h3 style={{ margin: '16px 0 8px', color: 'var(--dash-text)', fontSize: '1.4rem' }}>{bank.name}</h3>
                      <span style={{ 
                        fontSize: '0.7rem', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '100px', fontWeight: '800'
                      }}>● VERIFIED PARTNER</span>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div style={{ borderBottom: '1px solid var(--dash-border)', paddingBottom: '16px' }}>
                         <p className="stat-group-label" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>INTEREST RATE</p>
                         <p style={{ margin: 0, fontWeight: '900', color: 'var(--dash-accent)', fontSize: '1.4rem' }}>{bank.details.rate}%</p>
                      </div>
                      <div style={{ borderBottom: '1px solid var(--dash-border)', paddingBottom: '16px' }}>
                         <p className="stat-group-label" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>PROCESSING FEE</p>
                         <p style={{ margin: 0, fontWeight: '700', color: 'var(--dash-text)' }}>{bank.details.fee}</p>
                      </div>
                      <div style={{ borderBottom: '1px solid var(--dash-border)', paddingBottom: '16px' }}>
                         <p className="stat-group-label" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>EST. MONTHLY EMI</p>
                         <p style={{ margin: 0, fontWeight: '700', color: 'var(--dash-text)' }}>₹{(bank.details.rate * 4500).toLocaleString()}</p>
                      </div>
                      <div style={{ borderBottom: '1px solid var(--dash-border)', paddingBottom: '16px' }}>
                         <p className="stat-group-label" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>APPROVAL VELOCITY</p>
                         <p style={{ margin: 0, fontWeight: '700', color: 'var(--dash-success)' }}>{bank.details.speed}</p>
                      </div>
                      <div>
                         <p className="stat-group-label" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>ELIGIBILITY MATCH</p>
                         <p style={{ margin: 0, fontWeight: '900', color: 'var(--dash-success)', fontSize: '1.2rem' }}>98.4%</p>
                      </div>
                   </div>

                   <button 
                     className="btn-action" 
                     style={{ 
                       width: '100%', 
                       marginTop: '30px', 
                       background: 'var(--dash-gradient-primary)',
                       color: '#fff',
                       fontWeight: '800',
                       letterSpacing: '0.15em',
                       fontSize: '0.75rem',
                       padding: '16px',
                       borderRadius: '100px',
                       border: 'none',
                       boxShadow: '0 10px 25px var(--dash-accent-glow)',
                       transition: 'all 0.3s ease'
                     }}
                     onClick={() => onSelectBank(bank)}
                   >
                     SELECT {bank.name.toUpperCase()}
                   </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ComparisonModal;
