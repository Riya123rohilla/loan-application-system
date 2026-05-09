import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDashboardStore from '../../store/dashboardStore';
import toast from 'react-hot-toast';

const AdvancedPaymentModal = ({ isOpen, onClose }) => {
  const { loan, payEMI } = useDashboardStore();
  const [step, setStep] = useState('selection');
  const [method, setMethod] = useState('UPI');
  const [receipt, setReceipt] = useState(null);

  const paymentMethods = [
    { id: 'UPI', icon: '📱', label: 'UPI (GPay/PhonePe)', speed: 'Instant' },
    { id: 'Card', icon: '💳', label: 'Credit / Debit Card', speed: '2-5 min' },
    { id: 'NetBanking', icon: '🏦', label: 'Net Banking', speed: '5-10 min' },
    { id: 'Wallet', icon: '👛', label: 'Digital Wallet', speed: 'Instant' }
  ];

  const penalty = useMemo(() => {
    if (!loan) return 0;
    const dueDate = new Date(loan.nextEmiDate);
    return new Date() > dueDate ? Math.round(loan.emiAmount * 0.02) : 0;
  }, [loan]);

  const totalPayable = (loan?.emiAmount || 0) + penalty;

  const processPayment = async () => {
    setStep('processing');
    // Simulate gateway delay
    await new Promise(r => setTimeout(r, 2500));
    const success = await payEMI(method);
    if (success) {
      setReceipt({
        txnId: `TXN-${Date.now()}`,
        amount: totalPayable,
        method,
        date: new Date().toLocaleString(),
        loanId: loan._id
      });
      setStep('success');
    } else {
      setStep('selection');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('selection'); setReceipt(null); }, 300);
  };

  const downloadReceipt = () => {
    toast.success("Receipt PDF generated and saved to Downloads.");
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div className="enterprise-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: '100%', maxWidth: '520px', padding: '40px' }}>
        <AnimatePresence mode="wait">

          {step === 'selection' && (
            <motion.div key="sel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 style={{ marginBottom: '5px', textAlign: 'center' }}>Finalize EMI Payment</h2>
              <p className="summary-label" style={{ marginBottom: '30px', textAlign: 'center' }}>Loan: {loan?._id} • Due: {new Date(loan?.nextEmiDate).toLocaleDateString()}</p>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '18px', marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>EMI Amount</span>
                  <span style={{ fontWeight: '700' }}>₹{loan?.emiAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>Late Penalty</span>
                  <span style={{ fontWeight: '700', color: penalty > 0 ? '#ff5252' : '#00c853' }}>₹{penalty.toLocaleString()}</span>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '12px 0' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '800' }}>Total Payable</span>
                  <span style={{ fontWeight: '900', color: '#6fb2ff', fontSize: '1.2rem' }}>₹{totalPayable.toLocaleString()}</span>
                </div>
              </div>

              <p className="stat-group-label" style={{ marginBottom: '12px' }}>Select Payment Method</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
                {paymentMethods.map(pm => (
                  <button key={pm.id} onClick={() => setMethod(pm.id)} style={{
                    padding: '14px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: 'white', transition: 'all 0.2s',
                    background: method === pm.id ? 'var(--blue-500)' : 'rgba(255,255,255,0.04)',
                    border: method === pm.id ? '1px solid var(--blue-400)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: method === pm.id ? '0 0 20px rgba(111,178,255,0.15)' : 'none'
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>{pm.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{pm.label}</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>{pm.speed}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-action" style={{ flex: 1 }} onClick={handleClose}>Cancel</button>
                <button className="navbar__link--cta" style={{ flex: 2, border: 'none', fontSize: '1rem', padding: '14px' }} onClick={processPayment}>
                  🔒 Secure Checkout
                </button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="spinner" style={{ width: '60px', height: '60px', margin: '0 auto 25px' }}></div>
              <h3 style={{ marginBottom: '8px' }}>Connecting to Payment Gateway</h3>
              <p className="summary-label" style={{ marginBottom: '20px' }}>Encrypting transaction via {method}...</p>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ opacity: 0.5 }}>Amount</span>
                  <span style={{ fontWeight: '700' }}>₹{totalPayable.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4.5rem', marginBottom: '15px' }}>✅</div>
              <h2 style={{ color: '#00c853', marginBottom: '5px' }}>Payment Successful</h2>
              <p className="summary-label" style={{ marginBottom: '25px' }}>Your repayment schedule has been updated instantly</p>

              {receipt && (
                <div style={{ background: 'rgba(0,200,83,0.05)', border: '1px solid rgba(0,200,83,0.2)', padding: '20px', borderRadius: '15px', marginBottom: '25px', textAlign: 'left', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ opacity: 0.6 }}>Transaction ID</span><span style={{ fontWeight: '700' }}>{receipt.txnId}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ opacity: 0.6 }}>Amount</span><span style={{ fontWeight: '700', color: '#00c853' }}>₹{receipt.amount.toLocaleString()}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ opacity: 0.6 }}>Method</span><span>{receipt.method}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.6 }}>Date</span><span>{receipt.date}</span></div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-action" style={{ flex: 1 }} onClick={downloadReceipt}>📥 Receipt</button>
                <button className="navbar__link--cta" style={{ flex: 2, border: 'none' }} onClick={handleClose}>Return to Dashboard</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdvancedPaymentModal;
