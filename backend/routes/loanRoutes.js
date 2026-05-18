const express = require('express');
const router = express.Router();
const { getLoanById, getMyLoans } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

// All loan routes should be protected
router.use(protect);

router.route('/')
  .get(getMyLoans);

router.route('/:id')
  .get(getLoanById);

module.exports = router;
