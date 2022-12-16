// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

const db = require('../utils/dbConnection');
const bcrypt = require('bcrypt');

const signup = (req, res) => {
  let errors = [];
  if (req.session.error) {
    errors.push(req.session.error);
    req.session.error = null;

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      username,
      password,
    } = req.session.body;

    return res.render('signup', {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
      selectedUserType: userType,
      errors,
    });
  }

  res.render('signup', {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    selectedUserType: '',
    username: '',
    password: '',
    errors,
  });
};

const signupUser = (req, res) => {
  const { phoneNumber, username } = req.body;

  const phoneNumberDupCheck = `SELECT id FROM customers WHERE phone = ${phoneNumber};`;
  db.query(phoneNumberDupCheck, (err, result) => {
    if (result && result.length > 0) {
      req.session.error =
        'Phone Number Already Registered! Try with a different one.';
      req.session.body = req.body;
      return res.redirect('/signup');
    }

    if (username) {
      const userNameDupCheck = `SELECT id FROM logins WHERE username = '${username}';`;
      db.query(userNameDupCheck, (err, result) => {
        if (result && result.length > 0) {
          req.session.error =
            'Username Already Exists! Try with a different one.';
          req.session.body = req.body;
          return res.redirect('/signup');
        }
        insertUser(req, res);
      });
    } else {
      insertUser(req, res);
    }
  });
};

const insertUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    userType,
    username,
    password,
  } = req.body;
  const sql = `INSERT INTO customers(first_name, last_name, email, phone) VALUES ('${firstName}', '${lastName}', '${email}', ${phoneNumber})`;
  db.query(sql, async (err, customerResult) => {
    if (err) {
      console.log(err);
      req.session.error = 'Error Occured! Please Try Again.';
      req.session.body = req.body;
      return res.redirect('/signup');
    }

    if (userType == 'Admin') {
      const employeeSQL = `INSERT INTO employees(customer_id, hire_date, is_active) VALUES (${customerResult.insertId}, NOW(), 1)`;
      db.query(employeeSQL, async (err, employeeResult) => {
        if (err) {
          console.log(err);
          req.session.error = 'Error Occured! Please Try Again.';
          req.session.body = req.body;
          return res.redirect('/signup');
        }

        insertLogin(req, res, employeeResult.insertId, username, password);
      });
    } else {
      res.redirect('/');
    }
  });
};

const insertLogin = async (req, res, employeeId, username, password) => {
  const loginSQL = `INSERT INTO logins(employee_id, username, is_active) VALUES (${employeeId}, '${username}', 1)`;
  db.query(loginSQL, async (err, loginResult) => {
    if (err) {
      console.log(err);
      req.session.error = 'Error Occured! Please Try Again.';
      req.session.body = req.body;
      return res.redirect('/signup');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    insertPassword(req, res, loginResult.insertId, hashedPassword);
  });
};

const insertPassword = (req, res, loginId, password) => {
  const passwordSQL = `INSERT INTO passwords(login_id, password, is_current) VALUES (${loginId}, '${password}', 1)`;
  db.query(passwordSQL, (err, result) => {
    if (err) {
      console.log(err);
      req.session.error = 'Error Occured! Please Try Again.';
      req.session.body = req.body;
      return res.redirect('/signup');
    }
    return res.redirect('/signup');
  });
};

module.exports = { signup, signupUser };
