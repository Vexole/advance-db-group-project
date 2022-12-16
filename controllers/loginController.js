// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

const db = require('../utils/dbConnection');
const bcrypt = require('bcrypt');

const login = (req, res) => {
  let username, hasError;
  if (req.session.loginFailed) {
    hasError = true;
    username = req.session.username;
  }
  req.session.loginFailed = false;
  res.render('login', { username, password: '', hasError });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT l.employee_id AS employeeId, p.password FROM passwords p JOIN logins l ON l.id = p.login_id WHERE p.is_current = 1 AND l.username = '${username}'`;
  await db.query(sql, async (err, result) => {
    if (err || result.length == 0) {
      req.session.loginFailed = true;
      req.session.username = username;
      return res.redirect('/login');
    }
  
    if (result && await bcrypt.compare(password, result[0].password)) {
      req.session.employeeId = result[0].employeeId;
      isLoggedIn = true;
      req.session.username = username;
      return res.redirect('/dashboard');
    }
    req.session.loginFailed = true;
    req.session.username = username;
    res.redirect('/login');
  });
};

const logOut = (req, res) => {
  req.session.destroy();
  isLoggedIn = false;
  res.redirect('/');
};

module.exports = { login, loginUser, logOut };
