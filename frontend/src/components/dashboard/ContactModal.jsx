import React from 'react';
import DashboardModal from './DashboardModal';
import toast from 'react-hot-toast';

const ContactModal = ({ isOpen, onClose, mode }) => {
  const handleInitiate = () => {
    toast.success(`Secure ${mode} channel established with Arjun Mehra.`);
    onClose();
  };

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title={mode === 'Call' ? 'Voice Connection' : 'Encrypted Chat'}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '30px', padding: '10px 0' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
           <div style={{ width: '100%', height: '100%', borderRadius: '40px', background: 'var(--dash-gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>🤵</div>
           <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: '24px', height: '24px', background: 'var(--dash-success)', borderRadius: '50%', border: '4px solid white' }}></div>
        </div>
        
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem' }}>Arjun Mehra</h3>
          <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Senior Relationship Director</p>
        </div>

        <div style={{ background: 'var(--dash-bg)', padding: '20px', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--dash-text-muted)', textAlign: 'left', lineHeight: '1.5' }}>
          {mode === 'Call' ? 
            'Initiating a high-priority VOIP call. Please ensure your microphone permissions are enabled for this browser tab.' : 
            'Opening a 256-bit AES encrypted chat session. All conversations are logged for regulatory compliance.'
          }
        </div>

        <button className="btn-action" style={{ width: '100%', padding: '18px', fontSize: '1.1rem' }} onClick={handleInitiate}>
          {mode === 'Call' ? 'Start Call 📞' : 'Open Chat Session 📩'}
        </button>
      </div>
    </DashboardModal>
  );
};

export default ContactModal;
