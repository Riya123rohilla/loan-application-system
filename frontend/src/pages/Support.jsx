import { useState } from "react";

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }
    setStatus("Sending...");
    // Simulating API call
    setTimeout(() => {
      setStatus("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const faqs = [
    {
      q: "How do I apply for a loan?",
      a: "Click on 'Loan Details' to review products and then start an application from your dashboard. You will be guided step-by-step.",
    },
    {
      q: "What documents are required?",
      a: "Typically an ID, proof of income, and address verification. Specific requirements vary by product.",
    },
    {
      q: "How long does the approval process take?",
      a: "Approval time depends on verification; most decisions are returned within 1-3 business days.",
    },
    {
      q: "Can I check my application status?",
      a: "Yes, you can track your application status in real-time from your personal dashboard.",
    },
    {
      q: "What is the minimum credit score required?",
      a: "While it varies by loan type, we typically look for a minimum credit score of 600 for most products.",
    },
    {
      q: "Can I pay off my loan early?",
      a: "Yes, all our loans allow for early repayment without any additional fees or prepayment penalties.",
    },
    {
      q: "Is my personal data safe with LoanMate?",
      a: "We use 256-bit SSL encryption and follow strict data protection laws to ensure your information remains confidential and secure.",
    },
    {
      q: "What happens if I miss a payment?",
      a: "We recommend contacting us early if you foresee any issues. Late payments may incur fees and could impact your credit score.",
    },
  ];

  return (
    <div className="support-page">
      {/* Hero Section */}
      <section className="support-hero">
        <div className="support-hero__content">
          <p className="support-hero__eyebrow">SUPPORT CENTER</p>
          <h1 className="support-hero__title">Help & Support</h1>
          <p className="support-hero__text">
            Find answers to common questions or reach out to our support team for any assistance you need with your loan application.
          </p>
        </div>
      </section>

      <section className="section section--support-main">
        <div className="support-container-narrow">
          <div className="support-main">
            <h2 className="support-section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div key={i} className={`faq-card ${openIndex === i ? "active" : ""}`}>
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="faq-query">{f.q}</span>
                    <span className="faq-icon">▼</span>
                  </button>
                  <div className="faq-content">
                    <div className="faq-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="support-footer">
            <div className="contact-card">
              <h3 className="contact-card__title">Get in Touch</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">
                  Send Message
                </button>
                {status && <p className={`form-status ${status.includes("success") ? "success" : ""}`}>{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
