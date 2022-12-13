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

const topSellingBooks = async (req, res) => {
  const pdf = new ExtendedFPDF('P', 'mm', 'A4');
  pdf.AddPage();
  pdf.SetFont('Arial', 'B', 12);

  const sql = 'CALL top_selling_books()';
  await db.query(sql, (err, result) => {
    if (err) console.log(err);
    pdf.Cell(50, 20, 'Book Name', 0, 0, 'L');
    pdf.Cell(50, 20, 'Authors', 0, 0, 'L');
    pdf.Cell(35, 20, 'Copies Sold', 0, 0, 'C');
    pdf.Cell(25, 20, 'Revenue', 0, 0, 'C');
    pdf.Ln(10);
    result[0].forEach((book) => {
      pdf.Cell(50, 20, book['Book Name'], 0, 0, 'L');
      pdf.Cell(50, 20, book['Authors'], 0, 0, 'L');
      pdf.Cell(35, 20, book['Number of Copies Sold'], 0, 0, 'C');
      pdf.Cell(25, 20, `$${book['Revenue Generated']}`, 0, 0, 'C');
      pdf.Ln(10);
    });

    pdf.Output('P');
  });
  res.redirect('/report');
};

module.exports = { topSellingBooks };
