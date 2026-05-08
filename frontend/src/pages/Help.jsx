import { useState } from "react";

const Help = () => {
	const [activeFaq, setActiveFaq] = useState(null);

	const faqs = [
		{
			q: "How long does it take for loan approval?",
			a: "For digital loans like MSME and Mudra, initial approval typically takes less than 59 minutes. For Home and Auto loans, it may take 24-48 hours for final verification."
		},
		{
			q: "Is there any hidden processing fee?",
			a: "FinFlow Elite believes in absolute transparency. All fees are disclosed upfront in your sanction letter. Most Mudra loans have zero processing fees."
		},
		{
			q: "What is the minimum credit score required?",
			a: "While a credit score above 700 is preferred, we use AI-driven alternative data to assess applications, allowing us to serve those with developing credit histories as well."
		},
		{
			q: "Can I prepay my loan?",
			a: "Yes, most of our personal and home loan products offer zero prepayment charges after a certain period. Check your specific product terms for details."
		}
	];

	return (
		<div className="help-page">
			<section className="section section--grey">
				<div className="section__header">
					<h1>FinFlow Elite Support</h1>
					<p>How can we assist you today?</p>
					<div className="search-bar-wrap">
						<input type="text" placeholder="Search for topics, e.g. 'MSME eligibility'..." className="help-search" />
					</div>
				</div>
			</section>

			<section className="section">
				<div className="help-container">
					<div className="faq-section">
						<h2>Frequently Asked Questions</h2>
						<div className="faq-accordion">
							{faqs.map((faq, index) => (
								<div 
									key={index} 
									className={`faq-item ${activeFaq === index ? 'active' : ''}`}
									onClick={() => setActiveFaq(activeFaq === index ? null : index)}
								>
									<div className="faq-question">
										<span>{faq.q}</span>
										<span className="faq-toggle">{activeFaq === index ? '−' : '+'}</span>
									</div>
									<div className="faq-answer">
										<p>{faq.a}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="contact-section">
						<div className="contact-card">
							<h2>Talk to an Expert</h2>
							<p>Need personalized assistance? Send us a message and our Elite Advisors will get back to you within 2 hours.</p>
							<form className="contact-form" onSubmit={(e) => e.preventDefault()}>
								<div className="form-group">
									<label>Full Name</label>
									<input type="text" placeholder="John Doe" />
								</div>
								<div className="form-group">
									<label>Work Email</label>
									<input type="email" placeholder="john@company.com" />
								</div>
								<div className="form-group">
									<label>Message</label>
									<textarea placeholder="How can we help?" rows="4"></textarea>
								</div>
								<button className="btn btn--solid">Send Message</button>
							</form>
						</div>
						
						<div className="support-channels">
							<div className="channel">
								<span className="channel-icon">📞</span>
								<div>
									<strong>Elite Helpline</strong>
									<p>1800-FIN-ELITE</p>
								</div>
							</div>
							<div className="channel">
								<span className="channel-icon">💬</span>
								<div>
									<strong>Live Chat</strong>
									<p>Available 24/7</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Help;
