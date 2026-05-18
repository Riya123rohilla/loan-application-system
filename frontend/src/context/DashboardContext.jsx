import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('Personal Loan');
  const [loan, setLoan] = useState(null);
  const [banks, setBanks] = useState([]);
  const [repayments, setRepayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simulation State
  const [simExtraPayment, setSimExtraPayment] = useState(5000);
  const [simTenure, setSimTenure] = useState(60);

  // Marketplace State
  const [marketplaceSort, setMarketplaceSort] = useState('rate');
  const [marketplaceFilter, setMarketplaceFilter] = useState('All');

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const mockLoan = {
          _id: 'LN-ENTERPRISE-882',
          totalLoan: 5000000,
          remainingBalance: 2450000,
          emiAmount: 42731,
          nextEmiDate: '2026-06-10',
          interestRate: 9.5,
          status: 'Active',
          disbursalDate: '2026-03-15',
          paidAmount: 213655,
          totalInterest: 845544,
          totalTenure: 120, // months
          paidTenure: 5,
          applicantDetails: {
            fullName: 'Vihaan Singhania',
            creditScore: 845,
            income: 350000,
            employment: 'Managing Director'
          },
          documents: [
            { id: 1, name: 'PAN Card', status: 'Verified', type: 'Identity' },
            { id: 2, name: 'Aadhaar Card', status: 'Verified', type: 'Address' },
            { id: 3, name: 'Salary Slips', status: 'Approved', type: 'Income' },
            { id: 4, name: 'Bank Statement', status: 'Verified', type: 'Financial' }
          ]
        };

        const mockRepayments = [
          { id: 'tx-1', amount: 42731, date: '2026-05-10', status: 'Success', method: 'Auto-Debit', ref: 'PAY-99283' },
          { id: 'tx-2', amount: 42731, date: '2026-04-10', status: 'Success', method: 'UPI', ref: 'PAY-99112' },
          { id: 'tx-3', amount: 42731, date: '2026-03-10', status: 'Success', method: 'Net Banking', ref: 'PAY-98822' },
          { id: 'tx-4', amount: 42731, date: '2026-02-10', status: 'Success', method: 'Auto-Debit', ref: 'PAY-98776' },
          { id: 'tx-5', amount: 42731, date: '2026-01-10', status: 'Success', method: 'Auto-Debit', ref: 'PAY-98661' }
        ];

        setLoan(mockLoan);
        setRepayments(mockRepayments);
        
        // Fetch notifications
        const notifRes = await fetch(`/api/notifications`);
        const notifData = await notifRes.json();
        setNotifications(notifData.notifications || []);

      } catch (error) {
        console.error("Dashboard data sync failed", error);
        toast.error("Cloud sync failed. Using local cache.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Marketplace Logic
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const banksRes = await fetch(`/api/banks/category/${activeCategory}`);
        const banksData = await banksRes.json();
        setBanks(banksData.banks || []);
      } catch (e) {}
    };
    fetchBanks();
  }, [activeCategory]);

  const filteredBanks = useMemo(() => {
    let result = [...banks];
    if (marketplaceFilter !== 'All') {
      result = result.filter(b => b.details.speed.includes(marketplaceFilter));
    }
    return result.sort((a, b) => {
      if (marketplaceSort === 'rate') return a.details.rate - b.details.rate;
      if (marketplaceSort === 'speed') return a.details.speed.localeCompare(b.details.speed);
      return 0;
    });
  }, [banks, marketplaceSort, marketplaceFilter]);

  // Payment Logic
  const handlePayEMI = (paymentDetails) => {
    return new Promise((resolve) => {
      const loadingToast = toast.loading(`Processing ${paymentDetails.method} Payment...`);
      
      setTimeout(() => {
        setLoan(prev => ({
          ...prev,
          paidAmount: prev.paidAmount + prev.emiAmount,
          remainingBalance: prev.remainingBalance - prev.emiAmount,
          paidTenure: prev.paidTenure + 1
        }));

        const newTx = {
          id: `tx-${Date.now()}`,
          amount: loan.emiAmount,
          date: new Date().toISOString(),
          status: 'Success',
          method: paymentDetails.method,
          ref: `PAY-${Math.floor(Math.random()*100000)}`
        };

        setRepayments(prev => [newTx, ...prev]);

        setNotifications(prev => [
          { id: Date.now(), title: "Payment Successful", message: `EMI of ₹${loan.emiAmount.toLocaleString()} paid via ${paymentDetails.method}`, type: "success", time: "Just now" },
          ...prev
        ]);

        toast.success("Payment Confirmed! Account updated.", { id: loadingToast });
        resolve(true);
      }, 2000);
    });
  };

  // Simulation Calculations
  const simulationResults = useMemo(() => {
    if (!loan) return null;
    const extra = simExtraPayment;
    const interestSaved = Math.round(extra * (simTenure / 1.5));
    const monthsReduced = Math.floor(extra / 1200);
    return { interestSaved, monthsReduced };
  }, [loan, simExtraPayment, simTenure]);

  // Live Notification Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        "Your credit score has improved by 4 points!",
        "SBI Bank reduced home loan rates to 8.4%.",
        "New pre-approved top-up available: ₹5,00,000",
        "Security Alert: Login from a new IP detected (Mumbai, IN)."
      ];
      const msg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      // We don't want to spam toast, just add to notifications
      setNotifications(prev => [
        { id: Date.now(), title: "System Insight", message: msg, type: "info", time: "Just now" },
        ...prev.slice(0, 10)
      ]);
    }, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  const value = {
    activeCategory, setActiveCategory,
    loan, setLoan,
    banks: filteredBanks,
    repayments,
    notifications,
    loading,
    handlePayEMI,
    // Simulation
    simExtraPayment, setSimExtraPayment,
    simTenure, setSimTenure,
    simulationResults,
    // Marketplace Controls
    marketplaceSort, setMarketplaceSort,
    marketplaceFilter, setMarketplaceFilter
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
