import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

const NotificationPanel = () => {
  const { notifications, markNotificationRead, markAllRead, addNotification, unreadCount } = useDashboardStore();

  // Simulate live notification every 45 seconds
  useEffect(() => {
    const liveMessages = [
      { title: 'Rate Alert', message: 'SBI reduced personal loan rate to 10.25%. Check marketplace.', type: 'offer' },
      { title: 'Market Update', message: 'RBI repo rate unchanged at 6.5%. Your EMI stays stable.', type: 'info' },
      { title: 'Reward Earned', message: 'On-time payment streak: 5 months! Loyalty points credited.', type: 'success' },
      { title: 'Security Alert', message: 'New login detected from Chrome/Linux. Verify your session.', type: 'warning' }
    ];
    const interval = setInterval(() => {
      const msg = liveMessages[Math.floor(Math.random() * liveMessages.length)];
      addNotification(msg);
      toast(msg.title, { icon: msg.type === 'success' ? '✅' : msg.type === 'warning' ? '⚠️' : 'ℹ️', duration: 3000 });
    }, 45000);
    return () => clearInterval(interval);
  }, [addNotification]);

  const getIcon = (type) => {
    const icons = { success: '✅', warning: '⚠️', info: 'ℹ️', offer: '💰', error: '❌' };
    return icons[type] || 'ℹ️';
  };

  const getBorderColor = (type) => {
    const colors = { success: '#00c853', warning: '#ffc107', info: '#6fb2ff', offer: '#e040fb', error: '#ff5252' };
    return colors[type] || '#6fb2ff';
  };

  return (
    <div>
      {unreadCount() > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '0.7rem', color: '#ffc107', fontWeight: '700' }}>{unreadCount()} new</span>
          <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--blue-400)', fontSize: '0.65rem', cursor: 'pointer', padding: 0 }}>
            Mark all read
          </button>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '350px', overflowY: 'auto' }}>
        <AnimatePresence>
          {notifications.slice(0, 8).map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => markNotificationRead(notif.id)}
              style={{
                padding: '12px 14px', borderRadius: '12px', cursor: 'pointer',
                background: notif.read ? 'rgba(255,255,255,0.01)' : 'rgba(111,178,255,0.04)',
                borderLeft: `3px solid ${getBorderColor(notif.type)}`,
                opacity: notif.read ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{getIcon(notif.type)} {notif.title}</span>
                {!notif.read && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6fb2ff' }}></span>}
              </div>
              <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.6, lineHeight: '1.4' }}>{notif.message}</p>
              <span style={{ fontSize: '0.6rem', opacity: 0.35, marginTop: '4px', display: 'block' }}>{notif.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationPanel;
