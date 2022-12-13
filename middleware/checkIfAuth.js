const checkAuth = (req, res, next) => {
  if (req.session.employeeId) {
    isLoggedIn = true;
    next();
  } else {
    isLoggedIn = false;
    res.redirect('/login');
  }
};

module.exports = { checkAuth };
