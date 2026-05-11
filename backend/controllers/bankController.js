const Bank = require('../models/Bank');

/**
 * @desc    Get banks by loan category
 * @route   GET /api/banks/category/:type
 * @access  Public
 */
const getBanksByCategory = async (req, res) => {
  try {
    const { type } = req.params;
    const banks = await Bank.findByLoanType(type);
    
    if (!banks || banks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No banks found for this loan category'
      });
    }

    res.json({
      success: true,
      count: banks.length,
      banks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

/**
 * @desc    Calculate EMI
 * @route   POST /api/emi/calculate
 * @access  Public
 */
const calculateEMI = async (req, res) => {
  try {
    const { amount, rate, tenure } = req.body;

    if (!amount || !rate || !tenure) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount, rate, and tenure'
      });
    }

    const monthlyRate = rate / (12 * 100);
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - amount;

    res.json({
      success: true,
      data: {
        monthlyEMI: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Calculation Error'
    });
  }
};

/**
 * @desc    Check Loan Eligibility
 * @route   POST /api/eligibility/check
 * @access  Public
 */
const checkEligibility = async (req, res) => {
  try {
    const { monthlyIncome, existingEmis, creditScore, employmentType } = req.body;

    // Simple logic for eligibility
    const disposableIncome = monthlyIncome - existingEmis;
    const maxEmiPossible = disposableIncome * 0.5; // 50% of disposable income
    
    // Average interest rate and tenure for calculation
    const avgRate = 10.5;
    const tenureMonths = 60;
    const monthlyRate = avgRate / (12 * 100);
    
    const eligibleAmount = (maxEmiPossible * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) / 
                          (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));

    let riskLevel = 'Low';
    let approvalChance = 'High';

    if (creditScore < 650) {
      riskLevel = 'High';
      approvalChance = 'Low';
    } else if (creditScore < 750) {
      riskLevel = 'Moderate';
      approvalChance = 'Moderate';
    }

    res.json({
      success: true,
      data: {
        eligibleAmount: Math.round(eligibleAmount),
        riskLevel,
        approvalChance,
        recommendation: approvalChance === 'High' ? 'You are highly eligible! Apply now.' : 'Consider improving your credit score.'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Eligibility Check Error'
    });
  }
};

/**
 * @desc    Get repayment history
 * @route   GET /api/repayments/:loanId
 */
const getRepayments = async (req, res) => {
  try {
    const repayments = require('../data/repayments.json');
    const filtered = repayments.filter(r => r.loanId === req.params.loanId);
    res.json({ success: true, repayments: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Get notifications
 * @route   GET /api/notifications
 */
const getNotifications = async (req, res) => {
  try {
    const notifications = require('../data/notifications.json');
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getBanksByCategory,
  calculateEMI,
  checkEligibility,
  getRepayments,
  getNotifications
};
