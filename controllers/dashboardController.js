const db = require('../utils/dbConnection');

const dashboard = (req, res) => {
  let getSalesListQuery = `SELECT SUM(total_price) AS revenue, DATE(purchase_date) AS purchase_date FROM sales`;

  if (req.session.startDate && req.session.endDate) {
    getSalesListQuery += ` WHERE purchase_date BETWEEN '${req.session.startDate}' AND '${req.session.endDate}'`;
  } else if (req.session.startDate) {
    getSalesListQuery += ` WHERE purchase_date > '${req.session.startDate}'`;
  } else if (req.session.endDate) {
    getSalesListQuery += ` WHERE purchase_date < '${req.session.endDate}'`;
  }
  getSalesListQuery += ` GROUP BY DATE(purchase_date);`;

  req.session.startDate = null;
  req.session.endDate = null;
  db.query(getSalesListQuery, (err, salesList) => {
    if (err) console.log(err);
    const getBooksStockQuery = `SELECT ISBN, name, price, count FROM books b JOIN stocks s ON b.id = s.book_id ORDER BY count`;
    db.query(getBooksStockQuery, (err, booksList) => {
      if (err) console.log(err);

      res.render('dashboard', { salesList, booksList });
    });
  });
};

const filterSale = (req, res) => {
  const { start_date: startDate, end_date: endDate } = req.body;
  req.session.startDate = startDate;
  req.session.endDate = endDate;
  res.redirect('/dashboard');
};

module.exports = { dashboard, filterSale };
