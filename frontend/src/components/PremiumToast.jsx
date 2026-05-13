import React, { useEffect, useState } from 'react';

const ICONS = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#dcfce7"/>
      <path d="M6 10l3 3 5-5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#fee2e2"/>
      <path d="M7 7l6 6M13 7l-6 6" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  loading: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
      <circle cx="10" cy="10" r="8" stroke="#dbeafe" strokeWidth="2"/>
      <path d="M10 2a8 8 0 0 1 8 8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#eff6ff"/>
      <path d="M10 9v5M10 7h.01" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const THEMES = {
  success: {
    bg: '#ffffff',
    border: '#86efac',
    accent: '#16a34a',
    text: '#14532d',
    sub: '#166534',
    bar: '#16a34a',
  },
  error: {
    bg: '#ffffff',
    border: '#fca5a5',
    accent: '#dc2626',
    text: '#7f1d1d',
    sub: '#991b1b',
    bar: '#dc2626',
  },
  loading: {
    bg: '#ffffff',
    border: '#bfdbfe',
    accent: '#2563eb',
    text: '#1e3a8a',
    sub: '#1d4ed8',
    bar: '#2563eb',
  },
  info: {
    bg: '#ffffff',
    border: '#c7d2fe',
    accent: '#4f46e5',
    text: '#1e1b4b',
    sub: '#4338ca',
    bar: '#4f46e5',
  },
};

let addToastFn = null;

export function showToast(message, type = 'info', duration = 4000) {
  if (addToastFn) addToastFn({ message, type, duration, id: Date.now() });
}

export function PremiumToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastFn = (toast) => {
      setToasts((prev) => [toast, ...prev].slice(0, 5));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration);
    };
    return () => { addToastFn = null; };
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div style={{
      position: 'fixed',
      top: '90px',
      right: '24px',
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      pointerEvents: 'none',
    }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1);    }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      {toasts.map((t) => {
        const theme = THEMES[t.type] || THEMES.info;
        return (
          <div
            key={t.id}
            onClick={() => dismiss(t.id)}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              background: '#ffffff',
              border: `1px solid ${theme.border}`,
              borderLeft: `4px solid ${theme.accent}`,
              borderRadius: '14px',
              padding: '16px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              minWidth: '300px',
              maxWidth: '400px',
              cursor: 'pointer',
              animation: 'slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
            }}
          >
            <div style={{ flexShrink: 0, marginTop: '1px' }}>{ICONS[t.type] || ICONS.info}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                margin: 0,
                color: theme.text,
                fontWeight: 700,
                fontSize: '0.875rem',
                fontFamily: 'Manrope, sans-serif',
                lineHeight: 1.5,
                wordBreak: 'break-word',
              }}>{t.message}</p>
            </div>
            <div style={{
              flexShrink: 0,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: '#94a3b8',
              fontWeight: 800,
              cursor: 'pointer',
            }}>✕</div>
          </div>
        );
      })}
    </div>
  );
}
