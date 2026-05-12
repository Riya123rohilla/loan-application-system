import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

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
      input.onchange = (e) => {
        toast.promise(
          new Promise(resolve => setTimeout(resolve, 2500)),
          {
            loading: `Uploading ${doc.name} to secure vault...`,
            success: () => {
              uploadDocument(doc.id);
              return `${doc.name} uploaded successfully!`;
            },
            error: 'Upload failed.'
          }
        );
      };
      input.click();
    } else {
      onDocClick(doc);
    }
  };

  return (
    <div className="vault-grid">
      {documents.map((doc) => {
        const s = getStatusStyle(doc.status);
        return (
          <div
            key={doc.id}
            onClick={() => handleDocClick(doc)}
            style={{
              padding: '32px 24px', textAlign: 'center', borderRadius: '28px',
              border: s.border, background: s.bg,
              cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative', overflow: 'hidden',
              boxShadow: doc.status === 'Verified' ? '0 10px 30px rgba(16, 185, 129, 0.05)' : 'none'
            }}
            className="vault-item"
          >
            <div style={{ 
              fontSize: '2.8rem', marginBottom: '20px', 
              filter: doc.status === 'Pending' ? 'grayscale(1) opacity(0.2)' : 'none',
              transform: 'translateZ(0)',
              transition: 'transform 0.3s ease'
            }} className="vault-icon">
              {doc.icon}
            </div>
            
            <h5 style={{ margin: '0 0 6px', fontSize: '0.9rem', fontWeight: '800', color: 'var(--dash-text)', letterSpacing: '-0.02em' }}>
              {doc.name}
            </h5>
            
            <p style={{ margin: '0 0 20px', fontSize: '0.68rem', color: 'var(--dash-text-muted)', fontWeight: '600' }}>
              {doc.date === '-' ? 'Waiting for upload' : `Auth: ${doc.date}`}
            </p>
            
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', 
              borderRadius: '100px', fontSize: '0.68rem', fontWeight: '800',
              background: doc.status === 'Verified' ? 'rgba(16, 185, 129, 0.12)' : 
                         doc.status === 'Reviewing' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0,0,0,0.05)',
              color: s.color,
              border: `1px solid ${doc.status === 'Pending' ? 'transparent' : s.color.replace(')', ', 0.15)')}`
            }}>
              <span style={{ fontSize: '0.8rem' }}>{s.icon}</span>
              <span style={{ letterSpacing: '0.05em' }}>{s.badge.toUpperCase()}</span>
            </div>

            {doc.status === 'Reviewing' && (
              <div style={{ marginTop: '16px', width: '100%' }}>
                <div style={{ height: '4px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress[doc.id] || 0}%` }}
                    style={{ height: '100%', background: 'var(--dash-warning)', borderRadius: '10px' }}
                  />
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '0.6rem', color: 'var(--dash-warning)', fontWeight: '800' }}>
                  AI VERIFICATION: {progress[doc.id] || 0}%
                </p>
              </div>
            )}

            {doc.status === 'Pending' && (
              <div style={{ 
                marginTop: '16px', fontSize: '0.72rem', color: 'var(--dash-accent)', 
                fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' 
              }}>
                <span style={{ fontSize: '1rem' }}>↑</span>
                <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Tap to Upload</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DocumentVault;
