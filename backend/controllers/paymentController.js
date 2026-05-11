const Payment = require('../models/Payment');
const Loan = require('../models/Loan');

exports.payEMI = async (req, res) => {
  try {
    const { loanId, amount, method } = req.body;
    
    // 1. Validate loan existence
    // const loan = await Loan.findById(loanId);
    
    // 2. Create payment record
    const payment = new Payment({
      loanId,
      amount,
      method,
      reference: `PAY-${Math.floor(Math.random() * 1000000)}`,
      status: 'Success'
    });
    
    // await payment.save();
    
    // 3. Update loan balance (simulated)
    // loan.remainingBalance -= amount;
    // await loan.save();

    res.status(200).json({
      success: true,
      message: 'EMI Payment successful',
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    // const payments = await Payment.find({ loanId: req.params.loanId }).sort({ date: -1 });
    // Using mock for now as requested
    const payments = [
      { id: '1', amount: 42731, date: new Date(), status: 'Success', method: 'UPI' },
      { id: '2', amount: 42731, date: new Date(Date.now() - 30*24*60*60*1000), status: 'Success', method: 'Net Banking' }
    ];
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
