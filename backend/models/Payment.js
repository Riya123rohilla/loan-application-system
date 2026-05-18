const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  loanId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Success' },
  method: { type: String, required: true },
  reference: { type: String, unique: true },
  type: { type: String, enum: ['EMI', 'Foreclosure', 'Prepayment'], default: 'EMI' }
});

module.exports = mongoose.model('Payment', PaymentSchema);
