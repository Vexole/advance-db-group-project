// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

const FPDF = require('node-fpdf');
const db = require('../utils/dbConnection');
const path = require('path');

class ExtendedFPDF extends FPDF {
  Header() {
    this.Image(
      path.join(__dirname, '..', 'public', 'images', 'conestogalogo.png'),
      95,
      10,
      20,
      0,
      'PNG'
    );
    this.Ln(16);
    this.SetFont('Arial', 'B', 16);
    this.Cell(0, 10, 'DIGITAL BOOK STORE', 0, 0, 'C');
    this.Ln(10);
    this.SetFont('Arial', '', 13);
    this.Cell(0, 10, 'NORTHTOWN S. C. 392 NORTHTOWN DRIVE NE', 0, 0, 'C');
    this.Ln(8);
    this.Cell(0, 10, 'MINNEAPOLIS, MN 55434', 0, 0, 'C');
    this.Ln(8);
    this.Cell(0, 10, '176-378-6362 x.1', 0, 0, 'C');
    this.Ln(10);
    this.Cell(
      0,
      10,
      '_______________________________________________________________________',
      0,
      0,
      'C'
    );
    this.Ln(10);
  }

  // Set footer with page number for the pdf
  Footer() {
    this.SetY(-15);
    this.SetFont('Arial', 'I', 8);
    this.Cell(0, 10, this.PageNo(), 0, 0, 'C');
  }
}

const salesPaymentMode = async (req, res) => {
  const pdf = new ExtendedFPDF('P', 'mm', 'A4');
  const date = new Date();
  pdf.AddPage();
  pdf.SetFont('Arial', 'B', 14);

  pdf.Cell(10, 20, '', 0, 0, 'L');
  pdf.Cell(50, 20, 'Store: 6', 0, 0, 'L');
  pdf.Ln(10);

  pdf.Cell(10, 20, '', 0, 0, 'L');
  pdf.Cell(20, 20, 'Date: ', 0, 0, 'L');
  pdf.Cell(38, 20, date.toISOString().split('T')[0], 0, 0, 'L');
  pdf.Ln(10);

  pdf.Cell(10, 20, '', 0, 0, 'L');
  pdf.Cell(20, 20, 'Time: ', 0, 0, 'L');
  pdf.Cell(
    38,
    20,
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    0,
    0,
    'L'
  );
  pdf.Ln(10);

  pdf.Cell(
    0,
    20,
    '____________________________________________________________________',
    0,
    0,
    'C'
  );

  pdf.Ln(25);

  pdf.SetFont('Arial', 'B', 16);
  pdf.Cell(0, 10, 'SALES BY PAYMENT MODE', 0, 0, 'C');
  pdf.Ln(10);

  pdf.SetFont('Arial', 'B', 13);

  const sql =
    'SELECT payment_mode AS `Mode`, IFNULL(SUM(total_price),0) AS Sales FROM payment_methods pm LEFT JOIN payments p ON pm.id = p.payment_method_id LEFT JOIN sales s ON p.sale_id = s.id GROUP BY payment_mode ORDER BY Sales DESC;';
  await db.query(sql, (err, result) => {
    if (err) console.log(err);
    pdf.Cell(20, 20, '', 0, 0, 'C');
    pdf.Cell(30, 20, 'S.N.', 0, 0, 'C');
    pdf.Cell(50, 20, 'Payment Mode', 0, 0, 'L');
    pdf.Cell(40, 20, 'Sales amount', 0, 0, 'C');
    pdf.Ln(10);
    pdf.SetFont('Arial', '', 13);
    result.forEach((payment, index) => {
      pdf.Cell(20, 20, '', 0, 0, 'C');
      pdf.Cell(30, 20, index + 1, 0, 0, 'C');
      pdf.Cell(50, 20, payment['Mode'], 0, 0, 'L');
      pdf.Cell(40, 20, `$${Number(payment['Sales']).toFixed(2)}`, 0, 0, 'C');
      pdf.Ln(10);
    });

    pdf.Output('P');
  });
  res.redirect('/report');
};

module.exports = { salesPaymentMode };
