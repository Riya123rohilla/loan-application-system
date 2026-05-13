import { create } from 'zustand';
import axios from 'axios';
import { showToast } from '../components/PremiumToast';

// ─────────── MOCK DATA (Backend-ready fallbacks) ───────────
const MOCK_LOAN = {
  _id: 'LN-992', remainingBalance: 2450000, emiAmount: 42731,
  totalLoan: 5000000, interestRate: 9.5, status: 'Active',
  paidAmount: 213655, totalInterest: 845544, nextEmiDate: '2026-06-10',
  disbursalDate: '2025-05-15', tenure: 60, tenureRemaining: 48,
  applicantDetails: { creditScore: 845, name: 'Rahul Sharma', riskCategory: 'Low' }
};

const MOCK_REPAYMENTS = [
  { id: 'TXN-001', amount: 42731, date: '2026-05-01', method: 'UPI', status: 'Success', ref: 'REF-4421' },
  { id: 'TXN-002', amount: 42731, date: '2026-04-01', method: 'Net Banking', status: 'Success', ref: 'REF-3389' },
  { id: 'TXN-003', amount: 42731, date: '2026-03-01', method: 'Auto Debit', status: 'Success', ref: 'REF-2210' },
  { id: 'TXN-004', amount: 42731, date: '2026-02-01', method: 'UPI', status: 'Success', ref: 'REF-1102' },
  { id: 'TXN-005', amount: 42731, date: '2026-01-01', method: 'Net Banking', status: 'Success', ref: 'REF-0053' }
];

const MOCK_NOTIFICATIONS = [
  { id: 'n1', title: 'EMI Due Reminder', message: 'Your EMI of ₹42,731 is due on Jun 10, 2026.', type: 'warning', time: '2 hours ago', read: false },
  { id: 'n2', title: 'Document Approved', message: 'Your Aadhaar Card has been successfully verified.', type: 'success', time: '1 day ago', read: false },
  { id: 'n3', title: 'Credit Score Update', message: 'Your credit score improved by 12 points to 845.', type: 'info', time: '3 days ago', read: true },
  { id: 'n4', title: 'Payment Successful', message: 'EMI for May has been processed via UPI.', type: 'success', time: '1 week ago', read: true },
  { id: 'n5', title: 'Refinance Offer', message: 'HDFC offers 8.5% rate. Save ₹3.2L over tenure.', type: 'offer', time: '1 week ago', read: true }
];

const MOCK_BANKS = [
  { _id: 'b1', name: 'SBI', logo: '🏦', details: { rate: 10.5, fee: '1%', maxAmount: 2000000, tenure: 60, speed: '3-5 Days', minScore: 700, rating: 4.2 } },
  { _id: 'b2', name: 'HDFC', logo: '🏦', details: { rate: 10.75, fee: '1.5%', maxAmount: 4000000, tenure: 72, speed: '1 Day', minScore: 720, rating: 4.5 } },
  { _id: 'b3', name: 'ICICI', logo: '🏦', details: { rate: 10.65, fee: '1%', maxAmount: 3000000, tenure: 60, speed: '2 Days', minScore: 710, rating: 4.3 } },
  { _id: 'b4', name: 'Axis Bank', logo: '🏦', details: { rate: 11.0, fee: '1.2%', maxAmount: 3500000, tenure: 60, speed: '2-3 Days', minScore: 700, rating: 4.1 } },
  { _id: 'b5', name: 'Kotak', logo: '🏦', details: { rate: 10.9, fee: '0.5%', maxAmount: 2500000, tenure: 48, speed: '1 Day', minScore: 730, rating: 4.4 } },
  { _id: 'b6', name: 'Bajaj Finance', logo: '🏦', details: { rate: 11.5, fee: '2%', maxAmount: 5000000, tenure: 84, speed: '4 Hours', minScore: 680, rating: 4.0 } },
  { _id: 'b7', name: 'PNB', logo: '🏦', details: { rate: 10.3, fee: '0.8%', maxAmount: 2000000, tenure: 60, speed: '5-7 Days', minScore: 690, rating: 3.9 } }
];

const MOCK_CREDIT_HISTORY = [
  { month: 'Dec', score: 810 }, { month: 'Jan', score: 818 },
  { month: 'Feb', score: 825 }, { month: 'Mar', score: 830 },
  { month: 'Apr', score: 838 }, { month: 'May', score: 845 }
];

const MOCK_DOCUMENTS = [
  { id: 1, name: 'PAN Card', status: 'Pending', date: '-', icon: '📁' },
  { id: 2, name: 'Aadhaar Card', status: 'Pending', date: '-', icon: '📁' },
  { id: 3, name: 'Salary Slip', status: 'Pending', date: '-', icon: '📁' },
  { id: 4, name: 'Bank Statement', status: 'Pending', date: '-', icon: '📁' },
  { id: 5, name: 'Tax Returns', status: 'Pending', date: '-', icon: '📁' }
];

// ─────────── STORE ───────────
const useDashboardStore = create((set, get) => ({
  // ── Core State ──
  loan: null,
  repayments: [],
  notifications: [],
  banks: [],
  documents: MOCK_DOCUMENTS,
  creditHistory: MOCK_CREDIT_HISTORY,
  loading: true,

  // ── Dashboard Settings ──
  activeCategory: 'Personal Loan',
  isPayModalOpen: false,
  chartPeriod: 'monthly',
  
  // ── Simulation State ──
  simExtraPayment: 5000,
  simTenure: 60,

  // ── Computed Getters ──
  unreadCount: () => get().notifications.filter(n => !n.read).length,
  loanProgress: () => {
    const l = get().loan;
    if (!l) return 0;
    return Math.round((l.paidAmount / l.totalLoan) * 100);
  },

  // ── Basic Setters ──
  setPayModalOpen: (v) => set({ isPayModalOpen: v }),
  setActiveCategory: (c) => {
    const loanData = { ...MOCK_LOAN };
    
    // Simulate different details for each category
    switch(c) {
      case 'Home Loan':
        loanData.interestRate = 8.4;
        loanData.totalLoan = 7500000;
        loanData.remainingBalance = 6200000;
        loanData.emiAmount = 55000;
        break;
      case 'Education Loan':
        loanData.interestRate = 9.2;
        loanData.totalLoan = 1500000;
        loanData.remainingBalance = 1200000;
        loanData.emiAmount = 18000;
        break;
      case 'Gold Loan':
        loanData.interestRate = 7.5;
        loanData.totalLoan = 500000;
        loanData.remainingBalance = 450000;
        loanData.emiAmount = 45000;
        break;
      case 'Business Loan':
        loanData.interestRate = 12.5;
        loanData.totalLoan = 10000000;
        loanData.remainingBalance = 8500000;
        loanData.emiAmount = 150000;
        break;
      case 'Car Loan':
        loanData.interestRate = 8.8;
        loanData.totalLoan = 2500000;
        loanData.remainingBalance = 2100000;
        loanData.emiAmount = 35000;
        break;
      default:
        // Personal Loan (Default)
        loanData.interestRate = 10.5;
        loanData.totalLoan = 5000000;
        loanData.remainingBalance = 2450000;
        loanData.emiAmount = 42731;
    }

    set({ activeCategory: c, loan: loanData });
    get().fetchMarketplace();
  },
  setSimExtraPayment: (v) => set({ simExtraPayment: v }),
  setSimTenure: (v) => set({ simTenure: v }),
  setChartPeriod: (v) => set({ chartPeriod: v }),

  // ────────────────────────────────────────────
  //  PHASE A: DATA FETCHING
  // ────────────────────────────────────────────
  fetchDashboardData: async () => {
    set({ loading: true });
    try {
      const [repRes, notifRes] = await Promise.all([
        axios.get('/api/payments/history/LN-992'),
        axios.get('/api/notifications')
      ]);
      set({
        loan: MOCK_LOAN,
        repayments: repRes.data.payments || MOCK_REPAYMENTS,
        notifications: notifRes.data.notifications || MOCK_NOTIFICATIONS,
        banks: MOCK_BANKS,
        loading: false
      });
    } catch {
      set({ loan: MOCK_LOAN, repayments: MOCK_REPAYMENTS, notifications: MOCK_NOTIFICATIONS, banks: MOCK_BANKS, loading: false });
    }
  },

  fetchMarketplace: async () => {
    const { activeCategory } = get();
    try {
      const res = await axios.get(`/api/banks/category/${activeCategory}`);
      if (res.data.banks?.length) {
        set({ banks: res.data.banks });
      } else {
        // Filter mock banks as fallback
        set({ banks: MOCK_BANKS });
      }
    } catch {
      // keep existing mock banks
    }
  },

  // ────────────────────────────────────────────
  //  PHASE A: EMI PAYMENT WORKFLOW
  // ────────────────────────────────────────────
  payEMI: async (method) => {
    const { loan } = get();
    if (!loan) return false;

    try {
      await axios.post('/api/payments/pay-emi', { loanId: loan._id, amount: loan.emiAmount, method });
    } catch { /* proceed with local state update for demo */ }

    const newTxn = {
      id: `TXN-${Date.now()}`, amount: loan.emiAmount, method,
      date: new Date().toISOString(), status: 'Success',
      ref: `REF-${Math.floor(Math.random() * 90000 + 10000)}`
    };

    // SYNCHRONIZED STATE UPDATE — every section reacts
    set((s) => ({
      loan: {
        ...s.loan,
        remainingBalance: s.loan.remainingBalance - s.loan.emiAmount,
        paidAmount: s.loan.paidAmount + s.loan.emiAmount,
        tenureRemaining: s.loan.tenureRemaining - 1,
        nextEmiDate: new Date(new Date(s.loan.nextEmiDate).setMonth(new Date(s.loan.nextEmiDate).getMonth() + 1)).toISOString().slice(0, 10),
        applicantDetails: { ...s.loan.applicantDetails, creditScore: Math.min(900, s.loan.applicantDetails.creditScore + 3) }
      },
      repayments: [newTxn, ...s.repayments],
      creditHistory: [...s.creditHistory.slice(1), { month: new Date().toLocaleString('en', { month: 'short' }), score: Math.min(900, s.loan.applicantDetails.creditScore + 3) }],
      notifications: [
        { id: `n-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, title: 'Payment Confirmed', message: `₹${loan.emiAmount.toLocaleString()} paid via ${method}. Balance: ₹${(loan.remainingBalance - loan.emiAmount).toLocaleString()}`, type: 'success', time: 'Just now', read: false },
        ...s.notifications
      ]
    }));

    showToast(`₹${loan.emiAmount.toLocaleString()} paid successfully via ${method}!`, 'success');
    return true;
  },

  // ────────────────────────────────────────────
  //  PHASE B: NOTIFICATIONS
  // ────────────────────────────────────────────
  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),

  markAllRead: () => set((s) => ({
    notifications: s.notifications.map(n => ({ ...n, read: true }))
  })),

  addNotification: (notif) => set((s) => ({
    notifications: [{ ...notif, id: `n-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, read: false, time: 'Just now' }, ...s.notifications]
  })),

  // ────────────────────────────────────────────
  //  PHASE B: DOCUMENT MANAGEMENT
  // ────────────────────────────────────────────
  uploadDocument: (docId) => {
    set((s) => ({
      documents: s.documents.map(d => d.id === docId ? { ...d, status: 'Reviewing', date: new Date().toLocaleDateString(), icon: '⏳' } : d)
    }));
    
    showToast('Uploading to secure vault...', 'loading', 2500);
    
    setTimeout(() => {
      showToast('AI-Agent verifying authenticity...', 'loading', 4500);
      
      setTimeout(() => {
        set((s) => ({
          documents: s.documents.map(d => d.id === docId ? { ...d, status: 'Verified', icon: '🛡️' } : d),
          notifications: [
            { 
              id: `n-doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
              title: 'Verification Complete', 
              message: `Authentication of your ${s.documents.find(d => d.id === docId)?.name} is successful.`, 
              type: 'success', 
              time: 'Just now', 
              read: false 
            },
            ...s.notifications
          ]
        }));
        showToast('Document verified & encrypted! 🛡️', 'success');
      }, 4000);
    }, 2000);
  },

  setDocumentStatus: (docId, status) => {
    set((s) => ({
      documents: s.documents.map(d => d.id === docId ? { ...d, status, icon: status === 'Verified' ? '🛡️' : '⚖️' } : d)
    }));
    if (status === 'Verified') {
      showToast('Document status updated to APPROVED. ✅', 'success');
    }
  },

  // ────────────────────────────────────────────
  //  PHASE D: EXTENDED ACTIONS (Schedule, Top-up, Statement)
  // ────────────────────────────────────────────
  schedulePayment: (date) => {
    const { addNotification } = get();
    addNotification({
      title: 'Auto-Debit Scheduled',
      message: `Your next EMI has been scheduled for auto-debit on ${date}.`,
      type: 'info'
    });
    showToast(`EMI Scheduled for ${date} ✅`, 'success');
  },

  requestTopup: async () => {
    const { addNotification, loan } = get();
    if (!loan) return;

    showToast('Analyzing eligibility for Top-up...', 'loading', 2500);
    
    setTimeout(() => {
      addNotification({
        title: 'Top-up Pre-Approved',
        message: `Based on your ${get().getCreditGrade().grade} status, you are eligible for an additional ₹5,00,000 at 8.9% interest.`,
        type: 'offer'
      });
      showToast('Top-up application pre-approved! 🎉', 'success', 5000);
    }, 2000);
  },

  downloadStatement: () => {
    showToast('Generating digitally signed PDF statement...', 'loading', 2500);
    setTimeout(() => {
      showToast('Statement downloaded successfully (vault-signed). 📄', 'success');
    }, 2200);
  },

  // ────────────────────────────────────────────
  //  PHASE B: CREDIT SCORE TRACKING
  // ────────────────────────────────────────────
  getCreditGrade: () => {
    const score = get().loan?.applicantDetails?.creditScore || 0;
    if (score >= 800) return { grade: 'Platinum', color: '#00c853', risk: 'Very Low' };
    if (score >= 750) return { grade: 'Gold', color: '#ffc107', risk: 'Low' };
    if (score >= 650) return { grade: 'Silver', color: '#ff9800', risk: 'Moderate' };
    return { grade: 'Bronze', color: '#ff5252', risk: 'High' };
  }
}));

export default useDashboardStore;
