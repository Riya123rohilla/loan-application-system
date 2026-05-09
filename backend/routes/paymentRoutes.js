const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/pay-emi', paymentController.payEMI);
router.get('/history/:loanId', paymentController.getPaymentHistory);

module.exports = router;
