import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
<<<<<<< HEAD
import LoanDetails from "./pages/LoanDetails";

const navLinkClass = ({ isActive }) =>
	`navbar__link${isActive ? " navbar__link--active" : ""}`;

const navCtaClass = ({ isActive }) =>
	`navbar__link navbar__link--cta${isActive ? " navbar__link--active" : ""}`;
=======
import LoanApplication from "./pages/Application/LoanApplication";
import Products from "./pages/Products";
import Help from "./pages/Help";
>>>>>>> origin/main

function App() {
	return (
		<BrowserRouter>
			<div className="app">
<<<<<<< HEAD
				{/* ===== Navbar Component ===== */}
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
					<nav className="navbar__menu">
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
						<button
							className="theme-toggle"
							onClick={() => setIsLightMode((prev) => !prev)}
							aria-label="Toggle light or dark theme"
							type="button"
						>
							💡
						</button>
					</nav>
				</header>

				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/loan-details/:id" element={<LoanDetails />} />
						<Route path="/loan-details" element={<LoanDetails />} />
						<Route path="/help" element={<HelpPage />} />
=======
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/apply" element={<LoanApplication />} />
						<Route path="/loan-details" element={<Products />} />
						<Route path="/help" element={<Help />} />
>>>>>>> origin/main
						<Route path="/auth" element={<AuthPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

<<<<<<< HEAD
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

// ===== Loan Details Section has been moved to src/pages/LoanDetails.jsx

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

// Auth Section has been moved to src/pages/Auth.jsx

=======
>>>>>>> origin/main
export default App;



