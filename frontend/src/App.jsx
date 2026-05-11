import "./styles/main.css";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/Auth";
import LoanDetails from "./pages/LoanDetails";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Products from "./pages/Products";
import LoanApplication from "./pages/Application/LoanApplication";
import UserDashboard from "./userdashboard/UserDashboard";

const navLinkClass = ({ isActive }) =>
	`navbar__link${isActive ? " navbar__link--active" : ""}`;

const navCtaClass = ({ isActive }) =>
	`navbar__link navbar__link--cta${isActive ? " navbar__link--active" : ""}`;

function AppShell() {
	const [isLightMode, setIsLightMode] = useState(false);
	const location = useLocation();

	useEffect(() => {
		document.body.classList.toggle("theme-light", isLightMode);
		return () => document.body.classList.remove("theme-light");
	}, [isLightMode]);

	const isDashboard = location.pathname.startsWith("/dashboard");

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
					<nav className="navbar__menu">
						<NavLink className={navLinkClass} to="/">
							Home
						</NavLink>
						<NavLink className={navLinkClass} to="/loan-details/loan-456">
							Loan Details
						<NavLink className={navLinkClass} to="/products">
							Products
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
		</BrowserRouter>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/help" element={<Help />} />
					<Route path="/auth" element={<AuthPage />} />
					<Route path="/apply" element={<LoanApplication />} />
					<Route path="/dashboard/*" element={<UserDashboard />} />
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

export default App;



