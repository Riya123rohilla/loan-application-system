import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
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
import DocumentVault from '../components/dashboard/DocumentVault';

import '../styles/loan-details.css';

const EnterpriseCard = ({ children, title, icon, subtitle, className = "" }) => (
  <div className={`enterprise-card ${className}`}>
    {title && (
      <div style={{ marginBottom: '22px' }}>
        <h3 className="card-title" style={{ marginBottom: '4px', fontSize: '1.15rem', fontWeight: '800' }}>
          {icon && <span style={{ marginRight: '10px' }}>{icon}</span>}
          {title}
        </h3>
        {subtitle && <p className="summary-label" style={{ fontSize: '0.7rem', opacity: 0.45 }}>{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

const LoanDetails = () => {
  const { loan, loading, fetchDashboardData, fetchMarketplace, activeCategory, isPayModalOpen, setPayModalOpen, loanProgress } = useDashboardStore();

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);
  useEffect(() => { fetchMarketplace(); }, [activeCategory, fetchMarketplace]);

  if (loading || !loan) {
    return (
      <div className="dashboard-container" style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '20px', opacity: 0.5, letterSpacing: '0.2em', fontSize: '0.7rem' }}>SYNCING SECURE DATA STREAMS...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" toastOptions={{ style: { background: '#0f2147', color: '#fff', border: '1px solid rgba(111,178,255,0.2)', borderRadius: '15px' } }} />
      
      <HeroV4 onPayClick={() => setPayModalOpen(true)} />

      {/* Loan Progress Bar */}
      <div style={{ margin: '0 0 30px', padding: '0 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.7rem' }}>
          <span style={{ opacity: 0.5 }}>Loan Completion</span>
          <span style={{ fontWeight: '700', color: '#00c853' }}>{loanProgress()}%</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${loanProgress()}%`, background: 'linear-gradient(90deg, #6fb2ff, #00c853)', borderRadius: '10px', transition: 'width 0.8s ease' }}></div>
        </div>
      </div>

      <div className="dashboard-main-grid">
        <div className="grid-main-content">
          <div style={{ marginBottom: '25px' }}>
            <LoanFilterBar />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <EnterpriseCard title="Strategic Simulator" icon="🧬" subtitle="Foreclosure & prepayment analysis">
              <SimulationEngine />
            </EnterpriseCard>
            <EnterpriseCard title="Intelligence Center" icon="🧠" subtitle="Dynamic AI recommendations">
              <FintechAIAdvisor />
            </EnterpriseCard>
          </div>

          <EnterpriseCard title="Portfolio Analytics" icon="📊" subtitle="Real-time financial telemetry & forecasting">
            <FintechAnalytics />
          </EnterpriseCard>

          <EnterpriseCard title="Lender Marketplace" icon="🏛️" subtitle="Side-by-side comparison & quick apply">
            <FintechMarketplace />
          </EnterpriseCard>

          <EnterpriseCard title="Document Vault" icon="🔒" subtitle="End-to-end encrypted verification center">
            <DocumentVault />
          </EnterpriseCard>
        </div>

        <div className="grid-side-panel">
          {/* Portfolio Officer */}
          <EnterpriseCard title="Portfolio Officer" icon="👔">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--blue-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🤵</div>
              <div>
                <h4 style={{ margin: 0 }}>Arjun Mehra</h4>
                <p className="summary-label" style={{ fontSize: '0.7rem' }}>Relationship Director</p>
              </div>
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
              <button className="btn-action" style={{ flex: 1, fontSize: '0.75rem' }}>📞 Call</button>
              <button className="btn-action" style={{ flex: 1, fontSize: '0.75rem' }}>📩 Message</button>
            </div>
          </EnterpriseCard>

          {/* Transaction Feed */}
          <EnterpriseCard title="Transaction Feed" icon="📜" subtitle="Latest payment activity">
            <RepaymentTimeline />
          </EnterpriseCard>

          {/* Calendar */}
          <EnterpriseCard title="Repayment Calendar" icon="📅" subtitle="Interactive financial planner">
            <RepaymentCalendar />
          </EnterpriseCard>

          {/* Notifications */}
          <EnterpriseCard title="Live Alerts" icon="🔔" subtitle="Real-time notifications">
            <NotificationPanel />
          </EnterpriseCard>

          {/* Credit Health */}
          <EnterpriseCard title="Credit Health" icon="❤️" subtitle="Score tracking & grade">
            <SmartEligibilityGauge />
          </EnterpriseCard>
        </div>
      </div>

      <AdvancedPaymentModal isOpen={isPayModalOpen} onClose={() => setPayModalOpen(false)} />

      <footer style={{ marginTop: '80px', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center', opacity: 0.25 }}>
        <p style={{ letterSpacing: '0.2em', fontSize: '0.7rem' }}>LOANMATE PLATINUM • v6.0.0 PRODUCTION-GRADE CORE</p>
      </footer>
    </div>
  );
};

export default LoanDetails;
