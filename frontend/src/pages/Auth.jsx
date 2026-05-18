import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();

	const toggleMode = () => setIsLogin(!isLogin);
	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const userEmail = formData.get("email");
		const userName = formData.get("name") || "User";
		
		// Logic: If user is registering (isLogin is false) OR if we haven't seen this email before
		// we treat them as a "new user" for the dashboard.
		const existingUsers = JSON.parse(localStorage.getItem("all_users") || "{}");
		const isFirstTime = !existingUsers[userEmail];

		const userData = {
			name: userName,
			email: userEmail,
			isNew: isLogin ? (isFirstTime) : true // Registering is always new, Login is new if never seen
		};

		// Track this email so next time they login they aren't "new"
		if (!existingUsers[userEmail]) {
			existingUsers[userEmail] = { name: userName };
			localStorage.setItem("all_users", JSON.stringify(existingUsers));
		}

		localStorage.setItem("user", JSON.stringify(userData));
		navigate("/dashboard");
	};

	return (
		<section className="auth-section">
			<div className="auth-container">
				<div className="auth-card">
					<div className="auth-header">
						<h2 className="auth-title">{isLogin ? "Welcome Back" : "Create an Account"}</h2>
						<p className="auth-subtitle">
							{isLogin
								? "Enter your credentials to access your account."
								: "Sign up to get started with LoanMate."}
						</p>
					</div>

					<form className="auth-form" onSubmit={handleSubmit}>
						{!isLogin && (
							<div className="form-group">
								<label htmlFor="name">Full Name</label>
								<input type="text" id="name" name="name" placeholder="John Doe" required />
							</div>
						)}
						<div className="form-group">
							<label htmlFor="email">Email Address</label>
							<input type="email" id="email" name="email" placeholder="you@example.com" required />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" id="password" placeholder="••••••••" required />
						</div>
						
						{isLogin && (
							<div className="form-options">
								<label className="remember-me">
									<input type="checkbox" />
									<span>Remember me</span>
								</label>
								<a href="#" className="forgot-password">Forgot password?</a>
							</div>
						)}

						<button type="submit" className="auth-button">
							{isLogin ? "Sign In" : "Register"}
						</button>
					</form>

					<div className="auth-footer">
						<p>
							{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
							<button type="button" className="auth-link-button" onClick={toggleMode}>
								{isLogin ? "Sign up" : "Log in"}
							</button>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AuthPage;
