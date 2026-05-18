const Loan = require('../models/Loan');

/**
 * @desc    Get loan details by ID
 * @route   GET /api/loans/:id
 * @access  Private
 */
const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found',
      });
    }

    // Security check: Only the owner of the loan (or an admin) can view it
    // Assuming the user ID is stored in the loan record as 'userId'
    if (loan.userId !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this loan',
      });
    }

    res.json({
      success: true,
      loan,
    });
  } catch (error) {
    console.error(`Error fetching loan: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

/**
 * @desc    Get all loans for the logged-in user
 * @route   GET /api/loans
 * @access  Private
 */
const getMyLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user._id });

    res.json({
      success: true,
      count: loans.length,
      loans,
    });
  } catch (error) {
    console.error(`Error fetching user loans: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

module.exports = {
  getLoanById,
  getMyLoans,
};
