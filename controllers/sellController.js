// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

const db = require('../utils/dbConnection');

const sell = (req, res) => {
  const sql =
    'SELECT b.id, isbn, name, price, count FROM books b JOIN stocks s ON b.id = s.book_id;';
  db.query(sql, (err, result) => {
    res.render('sell', { books: JSON.stringify(result) });
  });
};

const makeSell = async (req, res) => {
  const { sale: saleString } = req.body;
  const userSaleDetails = JSON.parse(saleString);
  let saleQuery = `INSERT INTO sales (total_price, employee_id, purchase_date, tax) VALUES (${userSaleDetails.total}, ${req.session.employeeId}, NOW(), ${+userSaleDetails.tax});`;

  if (userSaleDetails.phone) {
    const customerQuery = `SELECT id, first_name, last_name FROM customers c WHERE c.phone = ${+userSaleDetails.phone};`;
    db.query(customerQuery, (err, customer) => {
      if (err) console.log(err);
      if (customer && customer.length > 0) {
        req.session.customerName = `${customer[0]['first_name']} ${customer[0]['last_name']}`;
        saleQuery = `INSERT INTO sales (total_price, employee_id, customer_id, purchase_date, tax) VALUES (${userSaleDetails.total}, ${req.session.employeeId}, ${customer[0]['id']}, NOW(), ${+userSaleDetails.tax});`;
      }
      insertSale(req, res, saleQuery, userSaleDetails);
    });
  } else {
    insertSale(req, res, saleQuery, userSaleDetails);
  }
};

const insertSale = (req, res, saleQuery, userSaleDetails) => {
  db.query(saleQuery, (err, sale) => {
    if (err) console.log(err);

    let saleDetailQuery = `INSERT INTO sale_details (sale_id, quantity, book_id) VALUES `;
    userSaleDetails.items.forEach((item) => {
      saleDetailQuery += `(${sale.insertId}, ${item.bookQty}, ${item.bookId}),`;
    });
    db.query(saleDetailQuery.substring(0, saleDetailQuery.length - 1) + ';');

    updateStocks(userSaleDetails);
    insertPayment(userSaleDetails, sale.insertId);
  });

  req.session.invoice = req.body.sale;
  res.redirect('/invoice');
};

const updateStocks = (userSaleDetails) => {
  userSaleDetails.items.forEach((item) => {
    let updateStockQuery = `UPDATE stocks SET count = ${
      item.stockQty - item.bookQty
    } WHERE book_id = ${item.bookId};`;
    db.query(updateStockQuery);
  });
};

const insertPayment = (userSaleDetails, saleId) => {
  let paymentModeQuery = `INSERT INTO payments(payment_method_id, sale_id) VALUES (${
    userSaleDetails.paymentMode.split('|')[0]
  }, ${saleId});`;
  db.query(paymentModeQuery);
};

module.exports = { sell, makeSell };
