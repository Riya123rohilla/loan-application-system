const express = require('express');
const router = express.Router();
const { getBanksByCategory, calculateEMI, checkEligibility, getRepayments, getNotifications } = require('../controllers/bankController');

router.get('/category/:type', getBanksByCategory);
router.post('/emi/calculate', calculateEMI);
router.post('/eligibility/check', checkEligibility);
router.get('/repayments/:loanId', getRepayments);
router.get('/notifications', getNotifications);

module.exports = router;
