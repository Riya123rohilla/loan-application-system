import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

// Enterprise Components
import LoanFilterBar from '../components/dashboard/LoanFilterBar';
import HeroV4 from '../components/dashboard/HeroV4';
import AdvancedEMICtrl from '../components/dashboard/AdvancedEMICtrl';
import FinancialAIInsights from '../components/dashboard/FinancialAIInsights';
import EnterpriseMarketplace from '../components/dashboard/EnterpriseMarketplace';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import RepaymentTimeline from '../components/dashboard/RepaymentTimeline';
import FinancialInsights from '../components/dashboard/FinancialInsights';
import SmartEligibilityGauge from '../components/dashboard/SmartEligibilityGauge';
import BankComparisonTable from '../components/dashboard/BankComparisonTable';
import DashboardModal from '../components/dashboard/DashboardModal';

// Existing Styles
import '../styles/loan-details.css';

const EnterpriseCard = ({ children, title, icon, subtitle, className = "" }) => (
  <div className={`enterprise-card ${className}`}>
    {title && (
      <div style={{ marginBottom: '25px' }}>
        <h3 className="card-title" style={{ marginBottom: '5px', fontSize: '1.25rem', fontWeight: '800' }}>
          {icon && <span style={{ marginRight: '12px' }}>{icon}</span>}
          {title}
        </h3>
        {subtitle && <p className="summary-label" style={{ fontSize: '0.75rem', opacity: 0.5 }}>{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

const LoanDashboardContent = () => {
  const { loan, banks, repayments, notifications, loading, handleDocumentUpload } = useDashboard();
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '20px', opacity: 0.5, letterSpacing: '0.2em' }}>SYNCHRONIZING SECURE DASHBOARD...</p>
      </div>
    );
  }

  const handleDocClick = (doc) => {
    setSelectedDoc(doc);
    setIsDocModalOpen(true);
  };

  return (
    <div className="dashboard-container">
      <HeroV4 />

      <div className="dashboard-main-grid">
        {/* Main Content Area */}
        <div className="grid-main-content">
          <LoanFilterBar />

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
            <EnterpriseCard title="EMI Strategy" icon="📊" subtitle="Optimize your repayments">
               <AdvancedEMICtrl />
            </EnterpriseCard>
            <EnterpriseCard title="Financial AI" icon="🤖" subtitle="Intelligent insights">
               <FinancialAIInsights />
            </EnterpriseCard>
          </div>

          <EnterpriseCard title="Lender Marketplace" icon="🏛️" subtitle="Side-by-side comparison">
             <BankComparisonTable banks={banks} />
          </EnterpriseCard>

          <EnterpriseCard title="Document Vault" icon="🔒" subtitle="Secure verification status">
             <div className="document-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {loan.documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="doc-card" 
                    style={{ padding: '24px', cursor: 'pointer' }}
                    onClick={() => handleDocClick(doc)}
                  >
                    <span className="doc-icon" style={{ fontSize: '1.5rem' }}>📄</span>
                    <span className="doc-name" style={{ fontSize: '0.65rem' }}>{doc.name}</span>
                    <span className={`badge badge--approved`} style={{ fontSize: '0.6rem' }}>{doc.status}</span>
                  </div>
                ))}
             </div>
          </EnterpriseCard>
        </div>

        {/* Sidebar Streams */}
        <div className="grid-side-panel">
          <EnterpriseCard title="Repayment Timeline" icon="⏳" subtitle="Recent transactions">
             <RepaymentTimeline repayments={repayments} />
          </EnterpriseCard>

          <EnterpriseCard title="Notification Center" icon="🔔">
             <NotificationPanel notifications={notifications} />
          </EnterpriseCard>

          <EnterpriseCard title="Financial Health" icon="❤️">
             <div style={{ textAlign: 'center' }}>
                <SmartEligibilityGauge score={loan.applicantDetails.creditScore} />
                <p className="summary-label" style={{ marginTop: '15px' }}>Credit Tier: Platinum</p>
             </div>
          </EnterpriseCard>
        </div>
      </div>

      <DashboardModal 
        isOpen={isDocModalOpen} 
        onClose={() => setIsDocModalOpen(false)}
        title="Document Details"
      >
        {selectedDoc && (
          <div>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', marginBottom: '20px' }}>
              <p><strong>Name:</strong> {selectedDoc.name}</p>
              <p><strong>Type:</strong> {selectedDoc.type}</p>
              <p><strong>Status:</strong> <span style={{ color: '#00c853' }}>{selectedDoc.status}</span></p>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="navbar__link--cta" style={{ flex: 1, border: 'none' }}>Download</button>
              <button 
                className="btn-action" 
                style={{ flex: 1 }}
                onClick={() => {
                  handleDocumentUpload({ name: selectedDoc.name });
                  setIsDocModalOpen(false);
                }}
              >
                Re-upload
              </button>
            </div>
          </div>
        )}
      </DashboardModal>

      <footer style={{ marginTop: '80px', padding: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', opacity: 0.3 }}>
         <p>LOANMATE ENTERPRISE • GEN-5 CORE BANKING ECOSYSTEM</p>
      </footer>
    </div>
  );
};

const LoanDetails = () => (
  <DashboardProvider>
    <Toaster position="top-right" reverseOrder={false} />
    <LoanDashboardContent />
  </DashboardProvider>
);

export default LoanDetails;
