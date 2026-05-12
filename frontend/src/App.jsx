import "./styles/main.css";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/Auth";
import LoanDetails from "./pages/LoanDetails";

const navLinkClass = ({ isActive }) =>
	`navbar__link${isActive ? " navbar__link--active" : ""}`;

const navCtaClass = ({ isActive }) =>
	`navbar__link navbar__link--cta${isActive ? " navbar__link--active" : ""}`;

function AppShell() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLightMode, setIsLightMode] = useState(false);

	const isDashboard = location.pathname.startsWith("/dashboard");

	// Close menu on route change
	useEffect(() => {
		setIsMenuOpen(false);
	}, [location.pathname]);

	// Theme toggle effect
	useEffect(() => {
		document.body.classList.toggle("theme-light", isLightMode);
		return () => document.body.classList.remove("theme-light");
	}, [isLightMode]);

	return (
		<div className="app">
			{/* ===== Navbar Component ===== */}
			{!isDashboard && (
				<header className="navbar">
					<div className="navbar__brand">
						<span className="logo" aria-label="LoanMate">
							<svg
								className="logo__mark"
								viewBox="0 0 64 64"
								role="img"
								aria-hidden="true"
								focusable="false"
							>
								<path
									className="logo__mark--light"
									d="M8 8 L30 22 L30 56 L8 56 Z"
								/>
								<path
									className="logo__mark--dark"
									d="M30 22 L48 10 L56 18 L56 56 L42 44 L30 56 Z"
								/>
							</svg>
							<span className="logo__text">
								<span className="logo__text--light">Loan</span>
								<span className="logo__text--dark">Mate</span>
							</span>
						</span>
					</div>

					<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
						<button 
							className="theme-toggle"
							onClick={() => setIsLightMode(!isLightMode)}
							aria-label="Toggle theme"
						>
							{isLightMode ? '🌙' : '☀️'}
						</button>

						<button 
							className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} 
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label="Toggle menu"
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>

					<nav className={`navbar__menu ${isMenuOpen ? 'is-open' : ''}`}>
						<NavLink className={navLinkClass} to="/">
							Home
						</NavLink>
						<NavLink className={navLinkClass} to="/loan-details/loan-456">
							Loan Details
						</NavLink>
						<NavLink className={navLinkClass} to="/help">
							Help
						</NavLink>
						<NavLink className={navCtaClass} to="/auth">
							Login / Register
						</NavLink>
					</nav>
				</header>
			)}

			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/loan-details/:id" element={<LoanDetails />} />
					<Route path="/loan-details" element={<LoanDetails />} />
					<Route path="/help" element={<HelpPage />} />
					<Route path="/auth" element={<AuthPage />} />
				</Routes>
			</main>
		</div>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppShell />
		</BrowserRouter>
	);
}

// ===== Home Section =====
function HomePage() {
	return (
		<section className="section section--hero">
			<div className="section__content">
				<p className="section__eyebrow">Loan Application System</p>
				<h1 className="section__title">Simple. Secure. Smart Lending.</h1>
				<p className="section__text">
					A modern, streamlined platform for submitting and tracking loan
					applications with confidence.
				</p>
			</div>
		</section>
	);
}

// ===== How It Works Section =====
function HelpPage() {
	return (
		<section className="section section--alt">
			<div className="section__content">
				<h2 className="section__title">How It Works</h2>
				<p className="section__text">
					Placeholder for guidance, FAQs, and application support.
				</p>
			</div>
		</section>
	);
}

export default App;
