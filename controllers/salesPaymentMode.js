const FPDF = require('node-fpdf');
const db = require('../utils/dbConnection');
const path = require('path');

class ExtendedFPDF extends FPDF {
  // Set header with logo and the college name for the pdf
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
    this.SetFont('Arial', '', 13);
    this.Cell(0, 10, 'Conestoga College', 0, 0, 'C');
    this.Ln(30);
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
  pdf.AddPage();
  pdf.SetFont('Arial', 'B', 12);

  const sql =
    'SELECT payment_mode AS `Mode`, IFNULL(SUM(total_price),0) AS Sales FROM payment_methods pm LEFT JOIN payments p ON pm.id = p.payment_method_id LEFT JOIN sales s ON p.sale_id = s.id GROUP BY payment_mode;';
  await db.query(sql, (err, result) => {
    if (err) console.log(err);
    pdf.Cell(20, 20, 'S.N.', 0, 0, 'C');
    pdf.Cell(50, 20, 'Payment Mode', 0, 0, 'L');
    pdf.Cell(40, 20, 'Sales amount', 0, 0, 'C');
    pdf.Ln(10);
    result.forEach((payment, index) => {
      pdf.Cell(20, 20, index + 1, 0, 0, 'C');
      pdf.Cell(50, 20, payment['Mode'], 0, 0, 'L');
      pdf.Cell(40, 20, `$${payment['Sales']}`, 0, 0, 'C');
      pdf.Ln(10);
    });

    pdf.Output('P');
  });
  res.redirect('/report');
};

module.exports = { salesPaymentMode };
