import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';

const DocumentVault = ({ onDocClick }) => {
  const { documents, uploadDocument, setDocumentStatus } = useDashboardStore();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Simulate progress for reviewing docs
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = { ...prev };
        documents.forEach(doc => {
          if (doc.status === 'Reviewing') {
            next[doc.id] = Math.min((next[doc.id] || 0) + 5, 100);
          } else {
            delete next[doc.id];
          }
        });
        return next;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [documents]);

  const getStatusStyle = (status) => {
    if (status === 'Verified') return { 
      badge: 'Approved', 
      border: '1px solid rgba(16, 185, 129, 0.4)', 
      bg: 'linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%)', 
      icon: '🛡️',
      color: 'var(--dash-success)'
    };
    if (status === 'Reviewing' || status === 'Processing') return { 
      badge: 'Reviewing', 
      border: '1px solid rgba(245, 158, 11, 0.4)', 
      bg: 'linear-gradient(145deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.01) 100%)', 
      icon: '⚖️',
      color: 'var(--dash-warning)'
    };
    return { 
      badge: 'Required', 
      border: '1px dashed var(--dash-border)', 
      bg: 'transparent', 
      icon: '📁',
      color: 'var(--dash-text-muted)'
    };
  };

  const handleDocClick = (doc) => {
    if (doc.status === 'Pending') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/pdf,image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        uploadDocument(doc.id);
      };
      input.click();
    } else {
      onDocClick(doc);
    }
  };

  return (
    <div className="vault-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      {documents.map((doc) => {
        const s = getStatusStyle(doc.status);
        const isUploading = doc.status === 'Reviewing' || doc.status === 'Processing';
        
        return (
          <div
            key={doc.id}
            onClick={() => handleDocClick(doc)}
            style={{
              padding: '24px', textAlign: 'center', borderRadius: '24px',
              border: s.border, background: s.bg,
              cursor: 'pointer', transition: 'all 0.3s ease',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: doc.status === 'Verified' ? '0 10px 25px rgba(16, 185, 129, 0.08)' : '0 4px 12px rgba(0,0,0,0.02)'
            }}
            className="vault-item"
          >
            <div style={{ 
              fontSize: '2.4rem', marginBottom: '16px', 
              filter: doc.status === 'Pending' ? 'grayscale(0.5) opacity(0.5)' : 'none',
              transition: 'transform 0.3s ease'
            }} className="vault-icon">
              {doc.icon}
            </div>
            
            <h5 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: '700', color: 'var(--dash-text)' }}>
              {doc.name}
            </h5>
            
            <p style={{ margin: '0 0 16px', fontSize: '0.7rem', color: 'var(--dash-text-muted)', fontWeight: '500' }}>
              {doc.date === '-' ? 'Waiting for upload' : `Auth: ${doc.date}`}
            </p>
            
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', 
              borderRadius: '100px', fontSize: '0.7rem', fontWeight: '700',
              background: doc.status === 'Verified' ? 'rgba(16, 185, 129, 0.1)' : 
                         doc.status === 'Reviewing' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0,0,0,0.05)',
              color: s.color,
              border: `1px solid ${doc.status === 'Pending' ? 'rgba(0,0,0,0.1)' : s.color.replace(')', ', 0.2)')}`
            }}>
              <span style={{ fontSize: '0.8rem' }}>{s.icon}</span>
              <span>{s.badge.toUpperCase()}</span>
            </div>

            {isUploading && (
              <div style={{ marginTop: '16px', width: '100%' }}>
                <div style={{ height: '4px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress[doc.id] || 0}%` }}
                    style={{ height: '100%', background: 'var(--dash-warning)', borderRadius: '10px' }}
                  />
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '0.6rem', color: 'var(--dash-warning)', fontWeight: '700' }}>
                  AI SCAN: {progress[doc.id] || 0}%
                </p>
              </div>
            )}

            {doc.status === 'Pending' && (
              <div style={{ 
                marginTop: '12px', fontSize: '0.75rem', color: '#6366f1', 
                fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' 
              }}>
                <span style={{ fontSize: '1rem' }}>↑</span>
                <span style={{ textDecoration: 'underline' }}>Tap to Upload</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DocumentVault;
