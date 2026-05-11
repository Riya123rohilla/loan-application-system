import Calculator from "../components/Calculator";
import { NavLink } from "react-router-dom";

const Home = () => {
	return (
		<>
			<section className="hero">
				<div className="hero__container">
					<div className="hero__content">
						<span className="hero__tagline">The Future of Digital Lending</span>
						<h1>Empowering Your Ambitions with FinFlow Elite.</h1>
						<p>Experience India's most sophisticated lending ecosystem. From MSME growth to personal milestones, we deliver capital at the speed of thought.</p>
						<div className="hero__cta">
							<NavLink to="/apply" className="btn btn--accent" style={{ padding: '18px 45px', fontSize: '1.15rem', borderRadius: '50px' }}>Start Application</NavLink>
							<div className="hero__quick-links">
								<span className="quick-link">Business Growth</span>
								<span className="quick-link">Home Equity</span>
								<span className="quick-link">Asset Finance</span>
							</div>
						</div>
					</div>
					<div className="hero__image">
						<img 
							src="/hero-banner.png" 
							alt="FinFlow Elite Digital Experience" 
							style={{ width: '100%', height: 'auto', borderRadius: '30px', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(255,255,255,0.1)' }} 
						/>
					</div>
				</div>
			</section>

			{/* ===== Bank Partners Section ===== */}
			<div className="partners-bar">
				<p>Trusted by India's Leading Financial Institutions</p>
				<div className="partners-grid">
					<div className="partner-logo"><span>SBI</span></div>
					<div className="partner-logo"><span>HDFC</span></div>
					<div className="partner-logo"><span>ICICI</span></div>
					<div className="partner-logo"><span>AXIS</span></div>
					<div className="partner-logo"><span>PNB</span></div>
					<div className="partner-logo"><span>BOB</span></div>
				</div>
			</div>

			<div className="stats-band">
				<div className="stat-item">
					<h3>25+</h3>
					<p>Institutional Partners</p>
				</div>
				<div className="stat-item">
					<h3>59 Min</h3>
					<p>Elite Approval</p>
				</div>
				<div className="stat-item :highlight">
					<h3>₹ 85k Cr+</h3>
					<p>Capital Disbursed</p>
				</div>
				<div className="stat-item">
					<h3>98%</h3>
					<p>Success Rate</p>
				</div>
			</div>

			{/* ===== Elite Services Grid ===== */}
			<section className="section section--light">
				<div className="section__header">
					<h2 className="section__title">The Elite Advantage</h2>
					<p>Why FinFlow Elite is the preferred choice for discerning borrowers.</p>
				</div>
				<div className="elite-grid">
					<div className="elite-card">
						<div className="elite-icon">🛡️</div>
						<h3>Bank-Grade Security</h3>
						<p>Your data is protected by 256-bit encryption and multi-factor authentication protocols.</p>
					</div>
					<div className="elite-card">
						<div className="elite-icon">⚡</div>
						<h3>Hyper-Speed Processing</h3>
						<p>Proprietary algorithms ensure your application is processed in real-time, not days.</p>
					</div>
					<div className="elite-card">
						<div className="elite-icon">💎</div>
						<h3>Tailored Solutions</h3>
						<p>We don't do one-size-fits-all. Our AI matches you with the perfect lending product.</p>
					</div>
				</div>
			</section>

			<section className="section section--grey">
				<div className="section__header">
					<h2 className="section__title">Precision EMI Planning</h2>
				</div>
				<div style={{ maxWidth: '900px', margin: '0 auto' }}>
					<Calculator />
				</div>
			</section>

			{/* ===== Testimonials Section ===== */}
			<section className="section">
				<div className="section__header">
					<h2 className="section__title">Success Stories</h2>
				</div>
				<div className="testimonial-grid">
					<div className="testimonial-card">
						<p className="quote">"FinFlow Elite transformed our manufacturing business. The MSME loan approval was seamless and faster than we ever imagined."</p>
						<div className="author">
							<div className="author-info">
								<strong>Rajesh Khanna</strong>
								<span>CEO, Khanna Textiles</span>
							</div>
						</div>
					</div>
					<div className="testimonial-card">
						<p className="quote">"Finally a platform that respects your time. Got my home loan approved digitally while sitting in my office. Brilliant!"</p>
						<div className="author">
							<div className="author-info">
								<strong>Ananya Sharma</strong>
								<span>Creative Director</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section section--blue-dark">
				<div className="section__header">
					<h2 className="section__title" style={{ color: '#fff' }}>Business & Commercial Lending</h2>
				</div>
				<div className="loan-grid">
					<div className="loan-card loan-card--elite">
						<span className="loan-card__icon">🏭</span>
						<h3>MSME Elite</h3>
						<p>Capital up to ₹5 Cr for business expansion, equipment, and working capital needs.</p>
						<NavLink to="/apply" className="btn btn--solid">Initiate Request</NavLink>
					</div>
					<div className="loan-card loan-card--elite">
						<span className="loan-card__icon">🏪</span>
						<h3>Mudra Digital</h3>
						<p>Empowering small vendors and micro-units with collateral-free digital lending.</p>
						<NavLink to="/apply" className="btn btn--solid">Initiate Request</NavLink>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="section__header">
					<h2 className="section__title">How We Redefined Lending</h2>
				</div>
				<div className="process-grid">
					<div className="process-item">
						<div className="process-icon-wrap">1</div>
						<h4>Smart Profile</h4>
						<p>Create your digital identity with secure document vaulting.</p>
					</div>
					<div className="process-item">
						<div className="process-icon-wrap">2</div>
						<h4>AI Matching</h4>
						<p>Our engine finds the best interest rates from 25+ banks.</p>
					</div>
					<div className="process-item">
						<div className="process-icon-wrap">3</div>
						<h4>Digital Consent</h4>
						<p>E-sign your documents and complete KYC in minutes.</p>
					</div>
					<div className="process-item">
						<div className="process-icon-wrap">4</div>
						<h4>Instant Approval</h4>
						<p>Receive your digital sanction letter instantly.</p>
					</div>
				</div>
			</section>

			{/* ===== Newsletter Section ===== */}
			<section className="newsletter">
				<div className="newsletter__content">
					<h2>Stay Ahead with FinFlow Insights</h2>
					<p>Join 50,000+ subscribers for the latest in financial trends and elite lending tips.</p>
					<form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
						<input type="email" placeholder="Your professional email" />
						<button className="btn btn--solid">Subscribe</button>
					</form>
				</div>
			</section>
		</>
	);
};

export default Home;

