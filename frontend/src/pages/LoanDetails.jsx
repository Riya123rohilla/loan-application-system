import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import useDashboardStore from '../store/dashboardStore';

// Enterprise Components
import LoanFilterBar from '../components/dashboard/LoanFilterBar';
import HeroV4 from '../components/dashboard/HeroV4';
import SimulationEngine from '../components/dashboard/SimulationEngine';
import FintechAIAdvisor from '../components/dashboard/FintechAIAdvisor';
import FintechMarketplace from '../components/dashboard/FintechMarketplace';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import RepaymentTimeline from '../components/dashboard/RepaymentTimeline';
import FintechAnalytics from '../components/dashboard/FintechAnalytics';
import SmartEligibilityGauge from '../components/dashboard/SmartEligibilityGauge';
import RepaymentCalendar from '../components/dashboard/RepaymentCalendar';
import AdvancedPaymentModal from '../components/dashboard/AdvancedPaymentModal';
import ScheduleModal from '../components/dashboard/ScheduleModal';
import HistoryModal from '../components/dashboard/HistoryModal';
import TopupModal from '../components/dashboard/TopupModal';
import PrepaymentModal from '../components/dashboard/PrepaymentModal';
import OfferModal from '../components/dashboard/OfferModal';
import ContactModal from '../components/dashboard/ContactModal';
import ReceiptModal from '../components/dashboard/ReceiptModal';
import DocumentVault from '../components/dashboard/DocumentVault';

import '../styles/loan-details.css';

const EnterpriseCard = ({ children, title, icon, subtitle, className = "" }) => (
  <div className={`enterprise-card ${className}`}>
    {title && (
      <div className="card-header-v2" style={{ marginBottom: '24px' }}>
        <h3 className="card-title" style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.4rem' }}>{icon}</span>
          {title}
        </h3>
        {subtitle && <p className="summary-label" style={{ fontSize: '0.75rem', marginTop: '6px', opacity: 0.6 }}>{subtitle}</p>}
      </div>
    )}
    <div className="card-content-v2">
      {children}
    </div>
  </div>
);

const LoanDetails = () => {
  const { loan, loading, fetchDashboardData, fetchMarketplace, activeCategory, isPayModalOpen, setPayModalOpen, loanProgress } = useDashboardStore();
  const [isScheduleOpen, setScheduleOpen] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [isTopupOpen, setTopupOpen] = useState(false);
  const [isPrepaymentOpen, setPrepaymentOpen] = useState(false);
  const [simulationData, setSimulationData] = useState(null);
  const [isOfferOpen, setOfferOpen] = useState(false);
  const [contactMode, setContactMode] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleOfficerCall = () => {
    toast.success('Initializing secure VoIP connection with Arjun Mehra...', { icon: '📞' });
  };

  const handleOfficerChat = () => {
    toast('Opening encrypted chat channel...', { icon: '📩' });
  };

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);
  useEffect(() => { fetchMarketplace(); }, [activeCategory, fetchMarketplace]);

  if (loading || !loan) {
    return (
      <div className="dashboard-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '24px', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--dash-text-muted)' }}>SECURELY LOADING YOUR FINANCIAL PORTFOLIO...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { 
            background: 'var(--dash-surface-solid)', 
            color: 'var(--dash-text)', 
            border: '1px solid var(--dash-border)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          } 
        }} 
      />
      
      <HeroV4 
        onPayClick={() => setPayModalOpen(true)} 
        onScheduleClick={() => setScheduleOpen(true)}
        onHistoryClick={() => setHistoryOpen(true)}
        onTopupClick={() => setTopupOpen(true)}
      />

      {/* Loan Completion Progress */}
      <div className="enterprise-card" style={{ marginBottom: '32px', padding: '24px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>Overall Loan Progress</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--dash-text-muted)', margin: '4px 0 0' }}>Your path to financial freedom</p>
          </div>
          <span style={{ fontWeight: '800', color: 'var(--dash-success)', fontSize: '1.2rem' }}>{loanProgress()}%</span>
        </div>
        <div style={{ height: '12px', background: 'var(--dash-border)', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${loanProgress()}%`, 
              background: 'linear-gradient(90deg, var(--dash-accent), var(--dash-success))', 
              borderRadius: '20px', 
              transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 0 15px var(--dash-accent-glow)'
            }} 
          />
        </div>
      </div>

      <div className="dashboard-main-grid">
        <div className="grid-main-content">
          <LoanFilterBar />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
            <EnterpriseCard title="Strategic Simulator" icon="⚡" subtitle="Analyze prepayment & foreclosure impacts">
              <SimulationEngine onExecute={(data) => {
                setSimulationData(data);
                setPrepaymentOpen(true);
              }} />
            </EnterpriseCard>
            <EnterpriseCard title="AI Intelligence" icon="🤖" subtitle="Real-time smart financial recommendations">
              <FintechAIAdvisor 
                onViewOffer={() => setOfferOpen(true)} 
                onExecutePlan={() => setScheduleOpen(true)} 
              />
            </EnterpriseCard>
          </div>

          <EnterpriseCard title="Portfolio Analytics" icon="📈" subtitle="Live financial telemetry & trend forecasting">
            <FintechAnalytics />
          </EnterpriseCard>

          <div id="global-marketplace">
            <EnterpriseCard title="Global Marketplace" icon="🌍" subtitle="Compare exclusive offers from top lenders">
              <FintechMarketplace />
            </EnterpriseCard>
          </div>

          <EnterpriseCard title="Document Vault" icon="🔐" subtitle="Military-grade encrypted document storage">
            <DocumentVault onDocClick={(doc) => setSelectedDoc(doc)} />
          </EnterpriseCard>
        </div>

        <div className="grid-side-panel">
          <EnterpriseCard title="Portfolio Officer" icon="🛡️">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '20px', 
                background: 'var(--dash-gradient-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2rem',
                boxShadow: '0 8px 20px var(--dash-accent-glow)'
              }}>🤵</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>Arjun Mehra</h4>
                <p className="summary-label" style={{ fontSize: '0.8rem' }}>Senior Relationship Director</p>
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                  <span style={{ width: '8px', height: '8px', background: 'var(--dash-success)', borderRadius: '50%' }}></span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--dash-success)', fontWeight: '700' }}>ONLINE</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-action" style={{ flex: 1 }} onClick={() => setContactMode('Call')}>📞 Call</button>
              <button className="btn-action secondary" style={{ flex: 1 }} onClick={() => setContactMode('Chat')}>📩 Chat</button>
            </div>
          </EnterpriseCard>

          <EnterpriseCard title="Transaction History" icon="⌛" subtitle="Your recent repayment activities">
            <RepaymentTimeline onReceiptClick={(txn) => setSelectedReceipt(txn)} />
          </EnterpriseCard>

          <EnterpriseCard title="Financial Planner" icon="🗓️" subtitle="Interactive repayment schedule">
            <RepaymentCalendar />
          </EnterpriseCard>

          <EnterpriseCard title="Live Notifications" icon="🔔" subtitle="Real-time system & payment alerts">
            <NotificationPanel />
          </EnterpriseCard>

          <EnterpriseCard title="Credit Health" icon="💎" subtitle="Monitor your eligibility & credit score">
            <SmartEligibilityGauge />
          </EnterpriseCard>
        </div>
      </div>

      <AdvancedPaymentModal isOpen={isPayModalOpen} onClose={() => setPayModalOpen(false)} />
      <ScheduleModal isOpen={isScheduleOpen} onClose={() => setScheduleOpen(false)} />
      <HistoryModal isOpen={isHistoryOpen} onClose={() => setHistoryOpen(false)} />
      <TopupModal isOpen={isTopupOpen} onClose={() => setTopupOpen(false)} />
      
      {loan && simulationData && (
        <PrepaymentModal 
          isOpen={isPrepaymentOpen} 
          onClose={() => setPrepaymentOpen(false)} 
          amount={simulationData.amount} 
          interestSaved={simulationData.interestSaved} 
          monthsReduced={simulationData.monthsReduced} 
        />
      )}
      
      <OfferModal 
        isOpen={isOfferOpen} 
        onClose={() => setOfferOpen(false)} 
        offer={{ oldRate: loan?.interestRate, newRate: (loan?.interestRate - 0.5).toFixed(1) }} 
      />
      
      <ContactModal 
        isOpen={!!contactMode} 
        onClose={() => setContactMode(null)} 
        mode={contactMode} 
      />
      
      <ReceiptModal 
        isOpen={!!selectedReceipt} 
        onClose={() => setSelectedReceipt(null)} 
        transaction={selectedReceipt} 
      />

      {selectedDoc && (
        <AdvancedPaymentModal isOpen={false} onClose={() => {}} /> /* Dummy to avoid import order issues */
      )}

      {selectedDoc && (
        <DashboardModal 
          isOpen={!!selectedDoc} 
          onClose={() => setSelectedDoc(null)} 
          title={selectedDoc.name}
        >
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '24px' }}>{selectedDoc.icon}</div>
            <div style={{ background: 'var(--dash-bg)', padding: '24px', borderRadius: '20px', border: '1px solid var(--dash-border)', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Status</span>
                <span style={{ fontWeight: '800', color: selectedDoc.status === 'Verified' ? 'var(--dash-success)' : 'var(--dash-warning)' }}>{selectedDoc.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Upload Date</span>
                <span style={{ fontWeight: '700' }}>{selectedDoc.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Security</span>
                <span style={{ fontWeight: '700', color: 'var(--dash-accent)' }}>AES-256 Encrypted</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {selectedDoc.status === 'Reviewing' && (
                <button className="btn-action" style={{ flex: 2, background: 'var(--dash-success)' }} onClick={() => {
                  useDashboardStore.getState().setDocumentStatus(selectedDoc.id, 'Verified');
                  setSelectedDoc(null);
                }}>
                  Simulate Approval ✅
                </button>
              )}
              {selectedDoc.status === 'Verified' && (
                <button className="btn-action" style={{ flex: 2 }} onClick={() => {
                  toast.success('Document downloaded for offline viewing.');
                  setSelectedDoc(null);
                }}>
                  Download Copy 📥
                </button>
              )}
              <button className="btn-action secondary" style={{ flex: 1 }} onClick={() => setSelectedDoc(null)}>
                Close
              </button>
            </div>
          </div>
        </DashboardModal>
      )}

      <footer style={{ marginTop: '100px', padding: '60px 0', borderTop: '1px solid var(--dash-border)', textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--dash-accent)' }}>LoanMate</span>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', opacity: 0.5 }}> PLATINUM</span>
        </div>
        <p style={{ letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--dash-text-muted)', fontWeight: '700' }}>
          ENTERPRISE CORE v7.0.4 • GLOBAL FINANCIAL NETWORK
        </p>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '30px', opacity: 0.4, fontSize: '0.8rem' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Regulatory Disclosure</span>
        </div>
      </footer>
    </div>
  );
};

export default LoanDetails;
