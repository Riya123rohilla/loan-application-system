import { NavLink } from "react-router-dom";

const Products = () => {
	const products = [
		{
			id: "msme",
			title: "MSME Elite",
			icon: "🏭",
			description: "Hyper-speed funding for small and medium enterprises.",
			features: ["Up to ₹5 Crore", "Collateral-free options", "Interest starts at 8.25%"],
			eligibility: "Business vintage > 2 years, GST registered.",
			docs: "Last 12 months bank statement, GST returns, PAN."
		},
		{
			id: "mudra",
			title: "Mudra Digital",
			icon: "🏪",
			description: "Empowering the backbone of Indian commerce.",
			features: ["Up to ₹10 Lakhs", "Nil processing fees", "Flexible repayment"],
			eligibility: "Individuals, Proprietary concerns, Partnership firms.",
			docs: "ID proof, Address proof, Business registration."
		},
		{
			id: "home",
			title: "Elite Home Finance",
			icon: "🏠",
			description: "Turn your dream address into reality.",
			features: ["Up to 30 years tenure", "Balance transfer facility", "Zero prepayment charges"],
			eligibility: "Salaried or Self-employed individuals.",
			docs: "Salary slips, Form 16, Property documents."
		},
		{
			id: "personal",
			title: "Personal Capital",
			icon: "👤",
			description: "Instant liquidity for your personal milestones.",
			features: ["Disbursal in 24 hours", "No end-use restriction", "Minimal documentation"],
			eligibility: "Min income ₹25,000 per month.",
			docs: "KYC docs, Income proof, Bank statements."
		}
	];

	return (
		<div className="products-page">
			<section className="section section--blue-dark">
				<div className="section__header">
					<h1 style={{ color: '#fff', fontSize: '3rem' }}>Elite Lending Solutions</h1>
					<p style={{ color: 'rgba(255,255,255,0.7)' }}>A precision-engineered product for every financial milestone.</p>
				</div>
			</section>

			<section className="section">
				<div className="product-grid-detail">
					{products.map(product => (
						<div key={product.id} className="product-detail-card">
							<div className="product-detail-header">
								<span className="product-icon">{product.icon}</span>
								<h2>{product.title}</h2>
							</div>
							<p className="product-desc">{product.description}</p>
							
							<div className="product-info-grid">
								<div className="info-block">
									<h4>Key Features</h4>
									<ul>
										{product.features.map((f, i) => <li key={i}>{f}</li>)}
									</ul>
								</div>
								<div className="info-block">
									<h4>Eligibility</h4>
									<p>{product.eligibility}</p>
								</div>
								<div className="info-block">
									<h4>Documentation</h4>
									<p>{product.docs}</p>
								</div>
							</div>
							
							<div className="product-actions">
								<NavLink to="/apply" className="btn btn--solid">Apply for {product.title}</NavLink>
								<button className="btn btn--outline">Download Brochure</button>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Products;
