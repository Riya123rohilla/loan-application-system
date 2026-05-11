import { NavLink } from "react-router-dom";
import { useState } from "react";

const navLinkClass = ({ isActive }) =>
	`navbar__link${isActive ? " navbar__link--active" : ""}`;

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="navbar">
			<div className="navbar__brand">
				<NavLink to="/" className="logo-placeholder">
					FinFlow<span>Elite</span>
				</NavLink>
			</div>
			
			<button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? "✕" : "☰"}
			</button>

			<nav className={`navbar__menu ${isOpen ? "open" : ""}`}>
				<NavLink className={navLinkClass} to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
				<NavLink className={navLinkClass} to="/apply" onClick={() => setIsOpen(false)}>Apply Now</NavLink>
				<NavLink className={navLinkClass} to="/loan-details" onClick={() => setIsOpen(false)}>Products</NavLink>
				<NavLink className={navLinkClass} to="/help" onClick={() => setIsOpen(false)}>Help</NavLink>
				<div className="mobile-actions">
					<NavLink to="/auth" className="btn btn--solid w-100" onClick={() => setIsOpen(false)}>Login / Register</NavLink>
				</div>
			</nav>
			<div className="navbar__actions desktop-only">
				<button className="btn btn--outline">Watch Video</button>
				<NavLink to="/auth" className="btn btn--solid">Login / Register</NavLink>
			</div>
		</header>
	);
};


export default Navbar;
