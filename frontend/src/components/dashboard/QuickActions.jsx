import React from 'react';

const QuickActions = () => {
  const actions = [
    { label: 'Download Summary', icon: '📥' },
    { label: 'Pay EMI', icon: '💳' },
    { label: 'Upload Docs', icon: '📤' },
    { label: 'Contact Support', icon: '🎧' },
    { label: 'Schedule', icon: '🗓️' }
  ];

  return (
    <div className="actions-group">
      {actions.map(action => (
        <button key={action.label} className="btn-action">
          {action.icon} {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
