import { useState } from "react";

const LoanApplication = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		loanType: "",
		amount: "500000",
		pan: "",
		income: "1200000",
		email: "",
		phone: ""
	});

	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);

	const renderStep = () => {
		switch(step) {
			case 1:
				return (
					<div className="form-step">
						<span className="step-count">Step 1 of 4</span>
						<h2>Select Loan Type</h2>
						<div className="type-grid">
							{["MSME", "Mudra", "Home", "Personal", "Auto"].map(type => (
								<button 
									key={type}
									className={`type-btn ${formData.loanType === type ? 'active' : ''}`}
									onClick={() => setFormData({...formData, loanType: type})}
								>
									{type} Loan
								</button>
							))}
						</div>
						<button className="btn btn--solid w-100" disabled={!formData.loanType} onClick={nextStep}>Continue</button>
					</div>
				);
			case 2:
				return (
					<div className="form-step">
						<span className="step-count">Step 2 of 4</span>
						<h2>Financial Details</h2>
						<div className="form-group">
							<label>Required Amount (₹)</label>
							<input type="number" placeholder="5,00,000" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
							<small>Min: ₹1,00,000 | Max: ₹5,00,00,000</small>
						</div>
						<div className="form-group">
							<label>Annual Income (₹)</label>
							<input type="number" placeholder="12,00,000" value={formData.income} onChange={(e) => setFormData({...formData, income: e.target.value})} />
						</div>
						<div className="form-group">
							<label>PAN Number</label>
							<input type="text" placeholder="ABCDE1234F" style={{ textTransform: 'uppercase' }} value={formData.pan} onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})} />
						</div>
						<div className="btn-group">
							<button className="btn btn--outline" onClick={prevStep}>Back</button>
							<button className="btn btn--solid" onClick={nextStep}>Continue</button>
						</div>
					</div>
				);
			case 3:
				return (
					<div className="form-step">
						<span className="step-count">Step 3 of 4</span>
						<h2>Document Upload</h2>
						<p className="step-desc">Securely upload your digital documents for instant verification.</p>
						<div className="upload-zone">
							<div className="upload-item">
								<span>📄 Last 6 Months Bank Statement</span>
								<button className="btn btn--outline btn--sm">Upload</button>
							</div>
							<div className="upload-item">
								<span>📄 Income Tax Returns (2 Years)</span>
								<button className="btn btn--outline btn--sm">Upload</button>
							</div>
							<div className="upload-item">
								<span>📄 Identity Proof (Aadhar/Voter ID)</span>
								<button className="btn btn--outline btn--sm">Upload</button>
							</div>
						</div>
						<div className="btn-group">
							<button className="btn btn--outline" onClick={prevStep}>Back</button>
							<button className="btn btn--solid" onClick={nextStep}>Continue</button>
						</div>
					</div>
				);
			case 4:
				return (
					<div className="form-step">
						<span className="step-count">Step 4 of 4</span>
						<h2>Contact Information</h2>
						<div className="form-group">
							<label>Work Email</label>
							<input type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
						</div>
						<div className="form-group">
							<label>Phone Number</label>
							<input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
						</div>
						<div className="consent-check">
							<input type="checkbox" id="consent" />
							<label htmlFor="consent">I authorize FinFlow Elite to fetch my credit report and verify my documents.</label>
						</div>
						<div className="btn-group">
							<button className="btn btn--outline" onClick={prevStep}>Back</button>
							<button className="btn btn--solid" onClick={() => setStep(5)}>Submit Application</button>
						</div>
					</div>
				);
			case 5:
				return (
					<div className="form-step success-state">
						<div className="success-icon">✅</div>
						<h2>Application Submitted!</h2>
						<p>Your reference number is <strong>#FF-ELITE-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
						<div className="next-steps">
							<h4>What happens next?</h4>
							<ul>
								<li>AI verification of documents (Estimated: 15 mins)</li>
								<li>Matchmaking with partner banks</li>
								<li>Digital Sanction letter on your email</li>
							</ul>
						</div>
						<button className="btn btn--solid" onClick={() => window.location.href = '/'}>Go to Dashboard</button>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="application-page">
			<div className="application-container-elite">
				<div className="application-main">
					<div className="progress-bar">
						<div className="progress-fill" style={{ width: `${(step/4)*100}%` }}></div>
					</div>
					{renderStep()}
				</div>
				
				{step < 5 && (
					<div className="application-sidebar">
						<h3>Loan Summary</h3>
						<div className="summary-item">
							<span>Type:</span>
							<strong>{formData.loanType || "Not Selected"}</strong>
						</div>
						<div className="summary-item">
							<span>Amount:</span>
							<strong>₹ {Number(formData.amount).toLocaleString()}</strong>
						</div>
						<div className="summary-info">
							<p>Estimated Interest: <strong>8.5% p.a.</strong></p>
							<p>Processing: <strong>Digital Only</strong></p>
						</div>
						<div className="support-box">
							<p>Need help?</p>
							<strong>1800-FIN-ELITE</strong>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default LoanApplication;

