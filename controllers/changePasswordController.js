// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

const db = require('../utils/dbConnection');
const bcrypt = require('bcrypt');

const changePassword = (req, res) => {
  let username, hasError;
  if (req.session.resetPasswordFailed) {
    hasError = true;
    username = req.session.username;
  }
  req.session.resetPasswordFailed = false;
  res.render('change_password', { username, hasError });
};

const changeUserPassword = (req, res) => {
  const { username, password, new_password: newPassword } = req.body;
  const sql = `SELECT l.id, p.password FROM passwords p JOIN logins l ON l.id = p.login_id WHERE p.is_current = 1 AND l.username = '${username}'`;
  db.query(sql, async (err, result) => {
    if (err || result.length == 0) {
      req.session.resetPasswordFailed = true;
      req.session.username = username;
      return res.redirect('/reset');
    }

    if (result && (await bcrypt.compare(password, result[0].password))) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      const passwordInsertQuery = `INSERT INTO passwords(login_id, password, is_current) VALUES(${result[0].id}, '${newHashedPassword}', 1);`;
      const updateOldPasswordQuery = `UPDATE passwords SET is_current = 0 WHERE login_id = ${result[0].id} AND is_current = 1;`;

      db.query(updateOldPasswordQuery, (err, updateResult) => {
        if (err) console.log(err);
        db.query(passwordInsertQuery, (err, insertPassword) => {
          if (err) console.log(err);
          return res.redirect('/login');
        });
      });
    } else {
      req.session.resetPasswordFailed = true;
      req.session.username = username;
      res.redirect('/changePassword');
    }
  });
};

module.exports = { changePassword , changeUserPassword};
