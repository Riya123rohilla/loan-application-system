import { useState, useEffect } from "react";

const Calculator = () => {
	const [amount, setAmount] = useState(500000);
	const [rate, setRate] = useState(8.5);
	const [tenure, setTenure] = useState(5);
	const [emi, setEmi] = useState(0);

	useEffect(() => {
		const r = rate / (12 * 100);
		const n = tenure * 12;
		const emiCalc = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
		setEmi(Math.round(emiCalc));
	}, [amount, rate, tenure]);

	return (
		<div className="calculator-card">
			<h3>Loan EMI Calculator</h3>
			<div className="calc-group">
				<label>Loan Amount (₹): {amount.toLocaleString()}</label>
				<input 
					type="range" 
					min="100000" 
					max="50000000" 
					step="100000" 
					value={amount} 
					onChange={(e) => setAmount(Number(e.target.value))} 
				/>
			</div>
			<div className="calc-group">
				<label>Interest Rate (%): {rate}</label>
				<input 
					type="range" 
					min="5" 
					max="20" 
					step="0.1" 
					value={rate} 
					onChange={(e) => setRate(Number(e.target.value))} 
				/>
			</div>
			<div className="calc-group">
				<label>Tenure (Years): {tenure}</label>
				<input 
					type="range" 
					min="1" 
					max="30" 
					step="1" 
					value={tenure} 
					onChange={(e) => setTenure(Number(e.target.value))} 
				/>
			</div>
			<div className="calc-result">
				<p>Your Monthly EMI</p>
				<h2>₹ {emi.toLocaleString()}</h2>
			</div>
		</div>
	);
};

export default Calculator;
