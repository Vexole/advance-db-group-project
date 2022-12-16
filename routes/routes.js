// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

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
  changePassword,
  changeUserPassword,
} = require('../controllers/controllers');

const { checkAuth } = require('../middleware/checkIfAuth');

const router = express.Router();

router.get('/', home);
router.get('/logout', checkAuth, logOut);
router.get('/login', login);
router.post('/login', loginUser);
router.get('/changePassword', changePassword);
router.post('/changePassword', changeUserPassword);
router.get('/signup', checkAuth, signup);
router.post('/signup', checkAuth, signupUser);
router.get('/report', checkAuth, report);
router.get('/dashboard', checkAuth, dashboard);
router.post('/filterSale', checkAuth, filterSale);
router.get('/sell', checkAuth, sell);
router.post('/sell', checkAuth, makeSell);
router.get('/invoice', checkAuth, invoice);
router.get('/topSellingBooks', checkAuth, topSellingBooks);
router.get('/topSpendingCustomers', checkAuth, topSpendingCustomers);
router.get('/salesPaymentMode', checkAuth, salesPaymentMode);
module.exports = router;
