import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('Personal Loan');
  const [loan, setLoan] = useState(null);
  const [banks, setBanks] = useState([]);
  const [repayments, setRepayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be API calls
        const mockLoan = {
          _id: 'LN-ENTERPRISE-882',
          remainingBalance: 2450000,
          emiAmount: 42731,
          nextEmiDate: '2026-06-10',
          interestRate: 9.5,
          status: 'Active',
          disbursalDate: '2026-03-15',
          paidAmount: 213655,
          totalInterest: 845544,
          totalPayable: 3295544,
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
          { id: 'tx-3', amount: 42731, date: '2026-03-10', status: 'Success', method: 'Net Banking', ref: 'PAY-98822' }
        ];

        setLoan(mockLoan);
        setRepayments(mockRepayments);
        
        // Fetch banks based on category
        const banksRes = await fetch(`/api/banks/category/${activeCategory}`);
        const banksData = await banksRes.json();
        setBanks(banksData.banks || []);

        // Fetch notifications
        const notifRes = await fetch(`/api/notifications`);
        const notifData = await notifRes.json();
        setNotifications(notifData.notifications || []);

      } catch (error) {
        console.error("Dashboard data fetch failed", error);
        toast.error("Failed to sync dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  const handlePayEMI = async () => {
    const loadingToast = toast.loading("Processing Payment...");
    setTimeout(() => {
      setLoan(prev => ({
        ...prev,
        paidAmount: prev.paidAmount + prev.emiAmount,
        remainingBalance: prev.remainingBalance - prev.emiAmount
      }));
      setRepayments(prev => [
        { id: `tx-${Date.now()}`, amount: loan.emiAmount, date: new Date().toISOString(), status: 'Success', method: 'Dashboard Pay', ref: `PAY-${Math.floor(Math.random()*100000)}` },
        ...prev
      ]);
      toast.success("EMI Payment Successful!", { id: loadingToast });
    }, 2000);
  };

  const handleDocumentUpload = (file) => {
    toast.success(`${file.name} uploaded successfully!`);
    // Mock update document status
  };

  const value = {
    activeCategory,
    setActiveCategory,
    loan,
    banks,
    repayments,
    notifications,
    loading,
    handlePayEMI,
    handleDocumentUpload
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};
