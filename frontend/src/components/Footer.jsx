const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__col">
					<div className="logo-placeholder" style={{ color: '#fff', marginBottom: '20px' }}>
						FinFlow<span>Elite</span>
					</div>
					<p style={{ fontSize: '0.9rem', opacity: 0.8 }}>India's premier digital lending ecosystem providing elite financial solutions and instant capital.</p>
				</div>
				<div className="footer__col">
					<h4>Loan Products</h4>
					<ul>
						<li><a href="#">MSME Loans</a></li>
						<li><a href="#">Mudra Loans</a></li>
						<li><a href="#">Home Loans</a></li>
						<li><a href="#">Personal Loans</a></li>
					</ul>
				</div>
				<div className="footer__col">
					<h4>Calculators</h4>
					<ul>
						<li><a href="#">EMI Calculator</a></li>
						<li><a href="#">Eligibility Calculator</a></li>
						<li><a href="#">GST Calculator</a></li>
					</ul>
				</div>
				<div className="footer__col">
					<h4>Contact Us</h4>
					<p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Email: support@loanmate.com</p>
					<p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Phone: 1800-XXX-XXXX</p>
				</div>
			</div>
			<div className="footer__bottom">
				<p>&copy; 2026 FinFlow Elite Financial Systems. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
