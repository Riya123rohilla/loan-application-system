import React from 'react';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

const DocumentVault = () => {
  const { documents, uploadDocument } = useDashboardStore();

  const getStatusStyle = (status) => {
    if (status === 'Verified') return { badge: 'approved', border: '1px solid rgba(0,200,83,0.2)', bg: 'rgba(0,200,83,0.03)' };
    if (status === 'Processing') return { badge: 'pending', border: '1px solid rgba(255,193,7,0.2)', bg: 'rgba(255,193,7,0.03)' };
    return { badge: 'error', border: '1px dashed rgba(255,255,255,0.15)', bg: 'transparent' };
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
      {documents.map((doc) => {
        const s = getStatusStyle(doc.status);
        return (
          <div
            key={doc.id}
            onClick={() => {
              if (doc.status === 'Pending') uploadDocument(doc.id);
              else if (doc.status === 'Verified') toast.success(`${doc.name}: Verified on ${doc.date}`);
              else toast.loading(`${doc.name}: Verification in progress...`, { duration: 2000 });
            }}
            style={{
              padding: '22px 15px', textAlign: 'center', borderRadius: '18px',
              border: s.border, background: s.bg,
              cursor: 'pointer', transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '12px', opacity: doc.status === 'Pending' ? 0.3 : 1 }}>
              {doc.icon}
            </div>
            <p style={{ margin: '0 0 4px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.03em' }}>{doc.name}</p>
            <p style={{ margin: '0 0 12px', fontSize: '0.6rem', opacity: 0.4 }}>{doc.date === '-' ? 'Not uploaded' : doc.date}</p>
            <span className={`badge badge--${s.badge}`} style={{ fontSize: '0.55rem' }}>
              {doc.status.toUpperCase()}
            </span>
            {doc.status === 'Pending' && (
              <div style={{ marginTop: '10px', fontSize: '0.6rem', color: 'var(--blue-400)', fontWeight: '600' }}>
                ↑ Tap to Upload
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DocumentVault;
