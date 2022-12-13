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

const topSpendingCustomers = async (req, res) => {
  const pdf = new ExtendedFPDF('P', 'mm', 'A4');
  pdf.AddPage();
  pdf.SetFont('Arial', 'B', 12);

  const sql = "CALL top_spending_customers();";
  await db.query(sql, (err, result) => {
    if (err) console.log(err);
    pdf.Cell(20, 20, 'S.N.', 0, 0, 'L');
    pdf.Cell(80, 20, 'Customer Name', 0, 0, 'L');
    pdf.Cell(50, 20, 'Amount Spent', 0, 0, 'C');
    pdf.Ln(10);
    result[0].forEach((customer, index) => {
      console.log(customer)
      pdf.Cell(20, 20, index + 1, 0, 0, 'L');
      pdf.Cell(80, 20, customer['Customer Name'], 0, 0, 'L');
      pdf.Cell(30, 20, `$${customer['Amount']}`, 0, 0, 'C');
      pdf.Ln(10);
    });

    pdf.Output('P');
  });
  res.redirect('/report');
};

module.exports = { topSpendingCustomers };
