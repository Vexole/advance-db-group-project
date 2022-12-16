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

const topSellingBooks = async (req, res) => {
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
  pdf.Cell(0, 10, 'TOP SELLING BOOKS', 0, 0, 'C');
  pdf.Ln(15);

  pdf.SetFont('Arial', 'B', 13);

  const sql = 'CALL top_selling_books()';
  await db.query(sql, (err, result) => {
    if (err) console.log(err);

    pdf.Cell(2, 1, '', 0, 0, 'C');
    pdf.Cell(15, 20, 'S.N.', 0, 0, 'C');
    pdf.Cell(60, 20, 'Book Name', 0, 0, 'L');
    pdf.Cell(60, 20, 'Authors', 0, 0, 'L');
    pdf.Cell(33, 20, 'Copies Sold', 0, 0, 'C');
    pdf.Cell(20, 20, 'Revenue', 0, 0, 'C');
    pdf.Ln(10);
    pdf.SetFont('Arial', '', 12);
    result[0].forEach((book, index) => {
      const lines = Math.ceil(book['Authors'].length / 26);
      let height = 15;
      if (lines > 1) {
        height = 8;
      }
      const totalHeight = lines * height;
      pdf.Cell(2, 1, '', 0, 0, 'C');
      pdf.Cell(15, totalHeight, index + 1, 0, 0, 'C');
      pdf.Cell(60, totalHeight, book['Book Name'], 0, 0, 'L');
      const xPosition = pdf.GetX();
      const yPosition = pdf.GetY();
      pdf.MultiCell(60, height, book['Authors'], 0);
      pdf.SetXY(xPosition + 60, yPosition);
      pdf.Cell(33, totalHeight, book['Number of Copies Sold'], 0, 0, 'C');
      pdf.Cell(20, totalHeight, `$${book['Revenue Generated']}`, 0, 0, 'C');
      pdf.Ln(totalHeight);
    });

    pdf.Output('P');
  });
  res.redirect('/report');
};

module.exports = { topSellingBooks };
