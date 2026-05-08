import React from 'react';

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="notif-panel">
      {notifications.length > 0 ? (
        notifications.map(notif => (
          <div key={notif._id} className={`notif-item ${notif.type}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <strong style={{ fontSize: '0.9rem' }}>{notif.title}</strong>
              <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>
                {new Date(notif.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>{notif.message}</p>
          </div>
        ))
      ) : (
        <p style={{ opacity: 0.5, textAlign: 'center' }}>No new notifications</p>
      )}
    </div>
  );
};

export default NotificationPanel;
