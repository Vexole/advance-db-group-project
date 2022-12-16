// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

const db = require('../utils/dbConnection');

const dashboard = (req, res) => {
  const startDate = req.session.startDate;
  const endDate = req.session.endDate;
  let getSalesListQuery = `SELECT SUM(total_price) AS revenue, DATE(purchase_date) AS purchase_date FROM sales`;

  if (startDate && endDate) {
    getSalesListQuery += ` WHERE purchase_date BETWEEN '${startDate}' AND '${endDate}'`;
  } else if (startDate) {
    getSalesListQuery += ` WHERE purchase_date > '${startDate}'`;
  } else if (endDate) {
    getSalesListQuery += ` WHERE purchase_date < '${endDate}'`;
  }
  getSalesListQuery += ` GROUP BY DATE(purchase_date);`;

  req.session.startDate = null;
  req.session.endDate = null;
  db.query(getSalesListQuery, (err, salesList) => {
    if (err) console.log(err);
    const getBooksStockQuery = `SELECT ISBN, name, price, count FROM books b JOIN stocks s ON b.id = s.book_id ORDER BY count`;
    db.query(getBooksStockQuery, (err, booksList) => {
      if (err) console.log(err);

      res.render('dashboard', { salesList, booksList, startDate, endDate });
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
