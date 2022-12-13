const { login, loginUser, logOut } = require('./loginController');
const { signup, signupUser } = require('./signupController');
const { sell, makeSell } = require('./sellController');
const { dashboard, filterSale } = require('./dashboardController');
const { topSellingBooks } = require('./topSellingBooks');
const { topSpendingCustomers } = require('./topSpendingCustomers');
const { salesPaymentMode } = require('./salesPaymentMode');
const { invoice } = require('./invoice');

const home = (req, res) => {
  res.render('index');
};

const report = (req, res) => {
  res.render('report');
};

module.exports = {
  home,
  login,
  loginUser,
  logOut,
  signup,
  signupUser,
  report,
  topSellingBooks,
  topSpendingCustomers,
  salesPaymentMode,
  sell,
  makeSell,
  invoice,
  dashboard,
  filterSale,
};
