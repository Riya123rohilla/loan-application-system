import "./styles/main.css";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Products from "./pages/Products";
import LoanApplication from "./pages/Application/LoanApplication";
import UserDashboard from "./userdashboard/UserDashboard";

const navLinkClass = ({ isActive }) =>
	`navbar__link${isActive ? " navbar__link--active" : ""}`;

const navCtaClass = ({ isActive }) =>
	`navbar__link navbar__link--cta${isActive ? " navbar__link--active" : ""}`;

const LogoComponent = () => (
	<div className="navbar__brand">
		<span className="logo" aria-label="LoanMate" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
			<svg className="logo__mark" viewBox="0 0 100 100" style={{ width: '42px', height: '42px' }}>
				<path d="M20 20 L50 40 L50 90 L20 90 Z" fill="#1a4fff" />
				<path d="M50 40 L75 25 L85 35 L85 90 L65 75 L50 90 Z" fill="#0b1b33" />
			</svg>
			<span className="logo__text" style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
				<span className="logo__text--light" style={{ color: '#1a4fff' }}>Loan</span>
				<span className="logo__text--dark" style={{ color: '#0b1b33' }}>Mate</span>
			</span>
		</span>
	</div>
);

function AppShell() {
	const location = useLocation();

	const isDashboard = location.pathname.startsWith("/dashboard");

	return (
		<div className="app">
			{/* ===== Navbar Component ===== */}
			{!isDashboard && (
				<header className="navbar">
					<LogoComponent />
					<nav className="navbar__menu">
						<NavLink className={navLinkClass} to="/">
							Home
						</NavLink>
						<NavLink className={navLinkClass} to="/products">
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



