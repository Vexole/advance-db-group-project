const express = require('express');
const {
  home,
  login,
  loginUser,
  logOut,
  signup,
  signupUser,
  report,
  sell,
  makeSell,
  topSellingBooks,
  topSpendingCustomers,
  salesPaymentMode,
  invoice,
  dashboard,
  filterSale,
} = require('../controllers/controllers');

const { checkAuth } = require('../middleware/checkIfAuth');

const router = express.Router();

router.get('/', home);
router.get('/logout', logOut);
router.get('/login', login);
router.post('/login', loginUser);
router.get('/signup', signup);
router.post('/signup', signupUser);
router.get('/report', report);
router.get('/dashboard', dashboard);
router.post('/filterSale', filterSale);
router.get('/sell', sell);
router.post('/sell',  makeSell);
router.get('/invoice', invoice);
router.get('/topSellingBooks', topSellingBooks);
router.get('/topSpendingCustomers', topSpendingCustomers);
router.get('/salesPaymentMode', salesPaymentMode);
module.exports = router;
