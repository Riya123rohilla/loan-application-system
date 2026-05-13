import React, { useMemo, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const navItemClass = ({ isActive }) =>
  `loanmate__navItem${isActive ? " loanmate__navItem--active" : ""}`;

// ===== User Dashboard Component =====
const UserDashboard = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState("last180");

  const dashboardData = useMemo(
    () => ({
      last30: {
        totalLoanVolume: "₹2.1M",
        approvedLoans: "312",
        defaultRate: "1.2%",
        avgInterest: "5.4%",
        largestLoan: "₹1.2L",
        largestLoanCompany: "Rising Tech",
        largestLoanMeta: "18 months @ 4.8% APR",
        paymentHistory: [35, 50, 42, 60, 48, 72],
        progressStage: "Submitted",
      },
      last90: {
        totalLoanVolume: "₹5.9M",
        approvedLoans: "842",
        defaultRate: "1.6%",
        avgInterest: "5.9%",
        largestLoan: "₹2.8L",
        largestLoanCompany: "Northwind",
        largestLoanMeta: "36 months @ 5.1% APR",
        paymentHistory: [40, 58, 45, 70, 63, 78],
        progressStage: "Under Review",
      },
      last180: {
        totalLoanVolume: "₹8.4M",
        approvedLoans: "1,248",
        defaultRate: "1.8%",
        avgInterest: "6.2%",
        largestLoan: "₹4.5L",
        largestLoanCompany: "Acme Corporation",
        largestLoanMeta: "60 months @ 5.2% APR",
        paymentHistory: [40, 55, 35, 70, 60, 80],
        progressStage: "Under Review",
      },
    }),
    []
  );

  return (
    <div className="loanmate">
      {/* ===== Sidebar Section ===== */}
      <aside className="loanmate__sidebar">
        <div className="loanmate__brand">
          <div className="loanmate__logo">LM</div>
          <div>
            <h2>LoanMate</h2>
            <p>Smart lending</p>
          </div>
        </div>

        <nav className="loanmate__nav">
          <NavLink className={navItemClass} to="/dashboard/loans">
            📄 My Loans
          </NavLink>
          <NavLink className={navItemClass} to="/dashboard/documents">
            📂 Documents
          </NavLink>
          <NavLink className={navItemClass} to="/dashboard/payments">
            💳 Payments
          </NavLink>
          <NavLink className={navItemClass} to="/dashboard/settings">
            ⚙️ Settings
          </NavLink>
        </nav>
      </aside>

      <main className="loanmate__content">
        <Routes>
          <Route
            index
            element={(
              <DashboardOverview
                selectedRange={range}
                onRangeChange={setRange}
                data={dashboardData[range]}
              />
            )}
          />
          <Route path="loans" element={<LoansPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

// ===== Dashboard Overview Section =====
const DashboardOverview = ({ selectedRange, onRangeChange, data }) => {
  const navigate = useNavigate();
  const progressIndex = data.progressStage === "Submitted" ? 1 : 2;

  return (
    <>
      {/* ===== Header Section ===== */}
      <header className="loanmate__header">
        <div>
          <h1>Loan Overview</h1>
          <p>Monitor and manage your lending operations</p>
        </div>
        <div className="loanmate__headerActions">
          <select
            className="loanmate__select"
            value={selectedRange}
            onChange={(event) => onRangeChange(event.target.value)}
          >
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="last180">Last 180 days</option>
          </select>
          <button
            className="loanmate__primary"
            type="button"
            onClick={() => navigate("/dashboard/reports")}
          >
            Generate Report
          </button>
        </div>
      </header>

      {/* ===== Summary Cards Section ===== */}
      <section className="loanmate__cards">
        <div className="loanmate__card">
          <p>Total Loan Volume</p>
          <h3>{data.totalLoanVolume}</h3>
          <span className="loanmate__trend loanmate__trend--up">+18.2%</span>
        </div>
        <div className="loanmate__card">
          <p>Approved Loans</p>
          <h3>{data.approvedLoans}</h3>
          <span className="loanmate__trend loanmate__trend--up">+12.5%</span>
        </div>
        <div className="loanmate__card">
          <p>Default Rate</p>
          <h3>{data.defaultRate}</h3>
          <span className="loanmate__trend loanmate__trend--down">-0.4%</span>
        </div>
        <div className="loanmate__card">
          <p>Avg Interest Rate</p>
          <h3>{data.avgInterest}</h3>
          <span className="loanmate__trend loanmate__trend--down">-0.3%</span>
        </div>
      </section>

      {/* ===== Insights Section ===== */}
      <section className="loanmate__grid">
        <div className="loanmate__panel loanmate__panel--history">
          <div className="loanmate__panelHeader">
            <h2>Payment History</h2>
            <span className="loanmate__chip">Last 6 months</span>
          </div>
          <div className="loanmate__historyChart" aria-hidden="true">
            {data.paymentHistory.map((value, index) => (
              <span key={`history-${value}-${index}`} style={{ height: `${value}%` }} />
            ))}
          </div>
          <div className="loanmate__historyLabels">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        <div className="loanmate__panel">
          <div className="loanmate__panelHeader">
            <h2>Largest Loan Issued</h2>
            <button
              className="loanmate__ghost"
              type="button"
              onClick={() => navigate("/dashboard/loans")}
            >
              Details
            </button>
          </div>
          <div className="loanmate__loanInfo">
            <h3>{data.largestLoan}</h3>
            <p>{data.largestLoanCompany}</p>
            <div className="loanmate__loanMeta">
              <span>Business Expansion</span>
              <span>{data.largestLoanMeta}</span>
            </div>
            <div className="loanmate__loanMeta">
              <span>Disbursed</span>
              <span>Mar 15, 2026</span>
            </div>
          </div>
        </div>

        <div className="loanmate__panel loanmate__panel--progress">
          <div className="loanmate__panelHeader">
            <h2>Loan Approval Progress</h2>
          </div>
          <div className="loanmate__progressTrack">
            <div className="loanmate__progressStep loanmate__progressStep--done">
              <span className="loanmate__progressDot">✓</span>
              <p>Submitted</p>
            </div>
            <div
              className={`loanmate__progressLine${
                progressIndex > 1 ? " loanmate__progressLine--active" : ""
              }`}
            />
            <div
              className={`loanmate__progressStep${
                progressIndex >= 2 ? " loanmate__progressStep--active" : ""
              }`}
            >
              <span className="loanmate__progressDot">2</span>
              <p>Under Review</p>
            </div>
            <div
              className={`loanmate__progressLine${
                progressIndex > 2 ? " loanmate__progressLine--active" : ""
              }`}
            />
            <div className="loanmate__progressStep">
              <span className="loanmate__progressDot">3</span>
              <p>Approved</p>
            </div>
          </div>
          <div className="loanmate__progressActions">
            <button
              className="loanmate__primary loanmate__primary--shadow"
              type="button"
              onClick={() => navigate("/dashboard/applications")}
            >
              📝 Apply Loan
            </button>
            <button
              className="loanmate__ghost loanmate__ghost--border"
              type="button"
              onClick={() => navigate("/dashboard/applications")}
            >
              📁 Upload Documents
            </button>
          </div>
        </div>
      </section>

      {/* ===== Issued Loans Section ===== */}
      <section className="loanmate__panel loanmate__panel--issued">
        <div className="loanmate__panelHeader">
          <h2>Issued Loans From</h2>
          <button
            className="loanmate__ghost"
            type="button"
            onClick={() => navigate("/dashboard/reports")}
          >
            View all
          </button>
        </div>
        <div className="loanmate__bankGrid">
          <div className="loanmate__bankCard">
            <span className="loanmate__bankLogo loanmate__bankLogo--hdfc">H</span>
            <div>
              <h3>HDFC Bank</h3>
              <p>2,410 loans issued</p>
              <span className="loanmate__bankMeta">Private Bank</span>
            </div>
          </div>
          <div className="loanmate__bankCard">
            <span className="loanmate__bankLogo loanmate__bankLogo--icici">I</span>
            <div>
              <h3>ICICI Bank</h3>
              <p>1,980 loans issued</p>
              <span className="loanmate__bankMeta">Retail Focus</span>
            </div>
          </div>
          <div className="loanmate__bankCard">
            <span className="loanmate__bankLogo loanmate__bankLogo--sbi">S</span>
            <div>
              <h3>SBI</h3>
              <p>1,540 loans issued</p>
              <span className="loanmate__bankMeta">Public Sector</span>
            </div>
          </div>
          <div className="loanmate__bankCard">
            <span className="loanmate__bankLogo loanmate__bankLogo--axis">A</span>
            <div>
              <h3>Axis Bank</h3>
              <p>1,210 loans issued</p>
              <span className="loanmate__bankMeta">SME Lending</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ===== Loans Section =====
const LoansPage = () => {
  const navigate = useNavigate();

  return (
    <section className="loanmate__panel loanmate__panel--loans">
      <div className="loanmate__panelHeader loanmate__panelHeader--loans">
        <h2>My Loans</h2>
        <button
          className="loanmate__primary loanmate__primary--shadow"
          type="button"
          onClick={() => navigate("/loan-details")}
        >
          + New Loan Application
        </button>
      </div>
      <div className="loanmate__loanTable">
        <div className="loanmate__loanRow loanmate__loanRow--head">
          <span>Loan ID</span>
          <span>Amount</span>
          <span>EMI</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        <div className="loanmate__loanRow">
          <span>LN-1021</span>
          <span>₹2,00,000</span>
          <span>₹8,500</span>
          <span>12 Jan 2024</span>
          <span className="loanmate__status loanmate__status--active">Active</span>
        </div>
        <div className="loanmate__loanRow">
          <span>LN-1005</span>
          <span>₹50,000</span>
          <span>₹4,200</span>
          <span>15 Mar 2022</span>
          <span className="loanmate__status loanmate__status--complete">Completed</span>
        </div>
      </div>
    </section>
  );
};

// ===== Applications Section =====
const ApplicationsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="loanmate__panel">
      <div className="loanmate__panelHeader">
        <h2>Applications</h2>
        <button
          className="loanmate__ghost"
          type="button"
          onClick={() => navigate("/dashboard/loans")}
        >
          Review
        </button>
      </div>
      <p>Review new applications and monitor verification steps.</p>
    </section>
  );
};

// ===== Reports Section =====
const ReportsPage = () => {
  return (
    <section className="loanmate__panel">
      <div className="loanmate__panelHeader">
        <h2>Reports</h2>
        <button
          className="loanmate__ghost"
          type="button"
          onClick={() => window.alert("Report export started")}
        >
          Export
        </button>
      </div>
      <p>Generate performance reports and download analytics.</p>
    </section>
  );
};

// ===== Documents Section =====
const DocumentsPage = () => {
  return (
    <section className="loanmate__panel">
      <div className="loanmate__panelHeader">
        <h2>Documents</h2>
      </div>
      <p>Upload and manage your loan documents securely.</p>
    </section>
  );
};

// ===== Payments Section =====
const PaymentsPage = () => {
  return (
    <section className="loanmate__panel">
      <div className="loanmate__panelHeader">
        <h2>Payments</h2>
      </div>
      <p>Track upcoming payments and view transaction history.</p>
    </section>
  );
};

// ===== Settings Section =====
const SettingsPage = () => {
  return (
    <section className="loanmate__panel">
      <div className="loanmate__panelHeader">
        <h2>Settings</h2>
      </div>
      <p>Update profile preferences and notification settings.</p>
    </section>
  );
};

export default UserDashboard;
