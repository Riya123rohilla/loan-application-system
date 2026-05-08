import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import LoanApplication from "./pages/Application/LoanApplication";
import Products from "./pages/Products";
import Help from "./pages/Help";

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/apply" element={<LoanApplication />} />
						<Route path="/loan-details" element={<Products />} />
						<Route path="/help" element={<Help />} />
						<Route path="/auth" element={<AuthPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;



