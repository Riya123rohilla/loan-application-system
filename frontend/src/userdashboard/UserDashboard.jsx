import React, { useMemo, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const navItemClass = ({ isActive }) =>
  `loanmate__navItem${isActive ? " loanmate__navItem--active" : ""}`;

// ===== User Dashboard Component =====
const UserDashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const isNewUser = userData.isNew;

  // Global Dashboard Data based on user type
  const dashboardData = useMemo(() => {
    if (isNewUser) {
      return {
        stats: [
          { label: "Active Loans", value: "0", trend: "0%", color: "#667085" },
          { label: "Total Debt", value: "₹0", trend: "0%", color: "#667085" },
          { label: "Documents", value: "0", trend: "+0", color: "#667085" },
          { label: "Credit Score", value: "N/A", trend: "Pending", color: "#1a4fff" },
        ],
        recentLoans: [],
        upcomingEMI: null
      };
    }
    // Return existing dummy data for demo/returning users
    return {
      stats: [
        { label: "Active Loans", value: "2", trend: "+12%", color: "#1a4fff" },
        { label: "Total Debt", value: "₹4,35,000", trend: "-5%", color: "#00c853" },
        { label: "Documents", value: "8", trend: "+2", color: "#ffab00" },
        { label: "Credit Score", value: "742", trend: "Excellent", color: "#1a4fff" },
      ],
      recentLoans: [
        { id: 1, bank: "SBI", amount: "₹3,50,000", status: "Active", progress: 70 },
        { id: 2, bank: "HDFC", amount: "₹85,000", status: "Completed", progress: 100 },
      ],
      upcomingEMI: { amount: "12,500", date: "June 15, 2024" }
    };
  }, [isNewUser]);

  return (
    <div className="loanmate">
      {/* ===== Sidebar Section ===== */}
      <aside className="loanmate__sidebar">
        <div className="loanmate__brand" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <svg className="loanmate__logo-svg" viewBox="0 0 100 100" style={{ width: '40px', height: '40px' }}>
            <path d="M20 20 L50 40 L50 90 L20 90 Z" fill="#1a4fff" />
            <path d="M50 40 L75 25 L85 35 L85 90 L65 75 L50 90 Z" fill="#ffffff" />
          </svg>
          <div>
            <h2 style={{ fontSize: '16px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              <span style={{ color: '#1a4fff' }}>{userData.name?.split(' ')[0] || 'Loan'}</span>
              <span style={{ color: '#ffffff' }}>Mate</span>
            </h2>
          </div>
        </div>

        <nav className="loanmate__nav">
          <NavLink className={navItemClass} to="/dashboard" end>
            📊 Dashboard
          </NavLink>
          <NavLink className={navItemClass} to="/dashboard/loans">
            📄 My Loans
          </NavLink>
          <NavLink className={navItemClass} to="/dashboard/documents">
            📁 Documents
          </NavLink>
          <NavLink className={navItemClass} to="/dashboard/payments">
            💳 Payments
          </NavLink>
          
          <button 
            className="loanmate__navItem loanmate__navItem--logout" 
            onClick={() => navigate("/auth")}
            style={{ marginTop: 'auto' }}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="loanmate__content">
        <Routes>
          <Route index element={<DashboardOverview stats={dashboardData.stats} recentLoans={dashboardData.recentLoans} upcoming={dashboardData.upcomingEMI} isNew={isNewUser} />} />
          <Route path="loans" element={<LoansPage recentLoans={dashboardData.recentLoans} isNew={isNewUser} />} />
          <Route path="documents" element={<DocumentsPage isNew={isNewUser} />} />
          <Route path="payments" element={<PaymentsPage isNew={isNewUser} />} />
        </Routes>
      </main>
    </div>
  );
};

// ===== Dashboard Overview Section =====
const DashboardOverview = ({ stats, recentLoans, upcoming, isNew }) => {
  return (
    <div className="loanmate__overview">
      <header className="loanmate__header">
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0b0f1c' }}>Overview</h1>
          <p style={{ color: '#667085', marginTop: '4px' }}>Welcome back! Here's what's happening with your loans.</p>
        </div>
        <div className="loanmate__dateRange">
          <select style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #d0d5dd', fontWeight: '500' }}>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </header>

      <div className="loanmate__stats">
        {stats.map((stat, i) => (
          <div key={i} className="loanmate__statCard">
            <div className="loanmate__statLabel">
              <span>{stat.label}</span>
              <span className={`loanmate__trend ${stat.trend === '0%' || stat.trend === '+0' ? 'trend--neutral' : stat.trend === 'Pending' ? 'trend--pending' : ''}`}
                    style={{ color: stat.trend.includes('-') ? '#d92d20' : (stat.trend.includes('+') && stat.trend !== '+0') ? '#039855' : undefined }}>
                {stat.trend}
              </span>
            </div>
            <div className="loanmate__statValue">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="loanmate__grid">
        {/* Progress Tracker based on screenshot - only show if not new or has loans */}
        <section className="loanmate__panel">
          <div className="loanmate__panelHeader">
            <h2>Active Loan Progress</h2>
          </div>
          {isNew ? (
            <div className="loanmate__emptyContent">
              <p>You don't have any active loans yet.</p>
              <NavLink to="/apply" className="loanmate__applyNowBtn">Apply for your first loan</NavLink>
            </div>
          ) : (
            <>
              {recentLoans.length > 0 && <ProgressTracker loan={recentLoans[0]} />}
            </>
          )}
        </section>

        {/* Payment Summary */}
        <section className="loanmate__panel">
          <div className="loanmate__panelHeader">
            <h2>Upcoming Payment</h2>
          </div>
          {isNew ? (
            <div className="loanmate__emptyContent">
              <p>No upcoming payments scheduled.</p>
            </div>
          ) : (
            <div className="loanmate__paymentSummary">
               {/* ...existing code... */}
            </div>
          )}
        </section>
      </div>

      {/* Issued Loans Section */}
      <section className="loanmate__panel loanmate__fullWidth">
        <div className="loanmate__panelHeader">
          <h2>Your Recent Loan History</h2>
        </div>
        {isNew ? (
           <div className="loanmate__emptyContent" style={{ padding: '40px', textAlign: 'center' }}>
             <div style={{ fontSize: '40px', marginBottom: '20px' }}>📄</div>
             <h3>No usage history found</h3>
             <p>As a new user, your recent loan activities will appear here once you start an application.</p>
           </div>
        ) : (
           <div className="loanmate__bankLogos">
             {/* ...existing bank logo display code... */}
           </div>
        )}
      </section>
    </div>
  );
};

// ===== Loans Section =====
const LoansPage = ({ recentLoans, isNew }) => {
  return (
    <section className="loanmate__panel loanmate__panel--fullwidth">
      <div className="loanmate__panelHeader">
        <h2>My Loans</h2>
      </div>
      {isNew ? (
        <div className="loanmate__emptyState" style={{ padding: '100px 20px' }}>
          <h3>No Active Loans Found</h3>
          <p>It looks like you haven't applied for a loan yet.</p>
          <NavLink to="/products" className="loanmate__uploadSubmit" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
            Choose Loan
          </NavLink>
        </div>
      ) : (
        <div className="loanmate__tableWrapper">
          <table className="loanmate__table">
            {/* ...existing table headers and rows... */}
          </table>
        </div>
      )}
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
const DocumentsPage = ({ isNew }) => {
  const [docs, setDocs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Pre-fill name with filename without extension
      setDocName(file.name.split('.').slice(0, -1).join('.'));
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !docName.trim()) {
      alert("Please select a file and provide a document name.");
      return;
    }

    setIsUploading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: docName.trim(),
        fileName: selectedFile.name,
        status: "Uploaded",
        date: new Date().toISOString().split('T')[0]
      };
      
      setDocs([newDoc, ...docs]);
      setSelectedFile(null);
      setDocName("");
      setIsUploading(false);
    }, 800);
  };

  const removeDoc = (id) => {
    setDocs(docs.filter(doc => doc.id !== id));
  };

  return (
    <section className="loanmate__panel">
      <div className="loanmate__panelHeader">
        <div>
          <h2>Documents</h2>
          <p className="subtitle">Securely upload and manage your verified documents.</p>
        </div>
        {/* Only show top upload controls if user has documents already */}
        {docs.length > 0 && (
          <div className="loanmate__quickUpload">
            <label className="loanmate__uploadBtnSmall">
              <input type="file" hidden onChange={handleFileChange} />
              <span>+ Quick Upload</span>
            </label>
          </div>
        )}
      </div>

      {docs.length === 0 ? (
        <div className="loanmate__emptyState" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>📥</div>
          <h3>Your Document Vault is Ready</h3>
          <p style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
            To process your loan faster, please upload your identity proof, income statements, and business records.
          </p>
          
          <div className="loanmate__uploadBox" style={{ width: '100%', maxWidth: '600px', margin: '0' }}>
            <div className="loanmate__uploadControls" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '15px', alignItems: 'flex-end' }}>
              <div className="loanmate__inputGroup">
                <label>Document Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Identity Proof" 
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                />
              </div>
              <div className="loanmate__inputGroup">
                <label>Select File</label>
                <label className={`loanmate__fileInput ${selectedFile ? 'has-file' : ''}`}>
                  <input type="file" hidden onChange={handleFileChange} />
                  <span>{selectedFile ? `📎 ${selectedFile.name}` : "📁 Choose..."}</span>
                </label>
              </div>
              <button 
                className="loanmate__uploadSubmit" 
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? "..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="loanmate__uploadBox">
            <h3>Add Another Document</h3>
            <div className="loanmate__uploadControls">
              <div className="loanmate__inputGroup">
                <label>Document Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Income Tax Return" 
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                />
              </div>
              <div className="loanmate__inputGroup">
                <label>Select File</label>
                <label className={`loanmate__fileInput ${selectedFile ? 'has-file' : ''}`}>
                  <input type="file" hidden onChange={handleFileChange} />
                  <span>{selectedFile ? `📎 ${selectedFile.name}` : "📁 Choose File"}</span>
                </label>
              </div>
              <button 
                className="loanmate__uploadSubmit" 
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? "Uploading..." : "Click to Upload"}
              </button>
            </div>
          </div>

          <div className="loanmate__docsGrid">
            {docs.length === 0 ? (
              <div className="loanmate__emptyState" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                <h3>Your Vault is Empty</h3>
                <p>You haven't uploaded any documents yet. Keep your records safe here.</p>
                <label className="loanmate__uploadSubmit" style={{ display: 'inline-block', marginTop: '20px', cursor: 'pointer' }}>
                  <input type="file" hidden onChange={handleFileChange} />
                  Upload Document
                </label>
              </div>
            ) : (
              docs.map((doc) => (
                <div key={doc.id} className="loanmate__docCard">
                  <div className="loanmate__docIcon">📄</div>
                  <div className="loanmate__docInfo">
                    <h4>{doc.name}</h4>
                    <p>{doc.fileName} • {doc.date}</p>
                  </div>
                  <div className="loanmate__docActions">
                    <div className={`loanmate__docStatus status--${doc.status.toLowerCase()}`}>
                      {doc.status}
                    </div>
                    <button 
                      className="loanmate__deleteBtn" 
                      onClick={() => removeDoc(doc.id)}
                      title="Remove Document"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
};

// ===== Payments Section =====
const PaymentsPage = ({ isNew }) => {
  const [payments, setPayments] = useState([
    { id: 1, type: "EMI Payment", date: "2024-06-15", amount: 12500, status: "Upcoming", method: "Auto-Debit" },
    { id: 2, type: "EMI Payment", date: "2024-05-15", amount: 12500, status: "Paid", method: "HDFC Bank" },
    { id: 3, type: "Registration Fee", date: "2024-05-02", amount: 2500, status: "Paid", method: "UPI" },
    { id: 4, type: "EMI Payment", date: "2024-04-15", amount: 12500, status: "Paid", method: "HDFC Bank" },
  ]);

  const handlePayEarly = () => {
    const upcoming = payments.find(p => p.status === "Upcoming");
    if (!upcoming) {
      alert("No upcoming payments found.");
      return;
    }

    if (window.confirm(`Do you want to pay the upcoming EMI of ₹${upcoming.amount.toLocaleString('en-IN')} now?`)) {
      setPayments(payments.map(p => 
        p.id === upcoming.id 
          ? { ...p, status: "Paid", method: "Instant Pay", date: new Date().toISOString().split('T')[0] }
          : p
      ));
      alert("Payment Successful! Your status has been updated.");
    }
  };

  return (
    <section className="loanmate__panel loanmate__panel--fullwidth">
      <div className="loanmate__panelHeader">
        <div>
          <h2>Payments</h2>
          <p className="subtitle">View transaction history and manage upcoming EMIs.</p>
        </div>
        {!isNew && <button className="loanmate__payBtn" onClick={handlePayEarly}>💳 Pay Early</button>}
      </div>

      {isNew ? (
        <div className="loanmate__emptyState" style={{ padding: '100px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
          <h3>No Payments Due</h3>
          <p>Once your loan is approved, your repayment schedule will appear here.</p>
          <button 
            className="loanmate__uploadSubmit" 
            style={{ marginTop: '20px' }}
            onClick={() => window.alert("Redirecting to payment setup...")}
          >
            Start Payment
          </button>
        </div>
      ) : (
        <>
          <div className="loanmate__paymentsSummary">
            <div className="loanmate__paymentCard">
              <span>Next Payment</span>
              <h3>₹12,500.00</h3>
              <p>Due on June 15, 2024</p>
            </div>
            <div className="loanmate__paymentCard">
              <span>Total Paid</span>
              <h3>₹27,500.00</h3>
              <p>Across 3 transactions</p>
            </div>
            <div className="loanmate__paymentCard">
              <span>Outstanding balance</span>
              <h3>₹4,22,500.00</h3>
              <p>Estimated payoff: 2027</p>
            </div>
          </div>

          <div className="loanmate__tableWrapper loanmate__tableWrapper--screenfit">
            <table className="loanmate__table loanmate__table--clean loanmate__table--expanded">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Type</th>
                  <th style={{ textAlign: 'center' }}>Date</th>
                  <th style={{ textAlign: 'center' }}>Method</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                  <th style={{ textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="font-medium" style={{ textAlign: 'left' }}>{p.type}</td>
                    <td style={{ textAlign: 'center', color: '#667085' }}>{p.date}</td>
                    <td style={{ textAlign: 'center', color: '#667085' }}>{p.method}</td>
                    <td className="font-bold" style={{ textAlign: 'right' }}>
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`loanmate__badge badge--${p.status.toLowerCase()}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
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
