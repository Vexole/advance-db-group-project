// CodeCrunchers - Ayush Daverani (8786826), Bhupesh Shrestha (8811567)

const FPDF = require('node-fpdf');
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

const invoice = (req, res) => {
  const pdf = new ExtendedFPDF('P', 'mm', 'A4');
  const date = new Date();
  pdf.AddPage();
  pdf.SetFont('Arial', 'B', 12);

  const sale = JSON.parse(req.session.invoice);
  const customerName = req.session.customerName ?? '';

  pdf.Cell(20, 1, '', 0, 0, 'C');
  pdf.Cell(50, 20, 'Store: 6', 0, 0, 'L');
  pdf.Cell(40, 20, 'Register: 1', 0, 0, 'L');
  pdf.Ln(10);

  pdf.Cell(20, 1, '', 0, 0, 'C');
  pdf.Cell(12, 20, 'Date: ', 0, 0, 'L');
  pdf.Cell(38, 20, date.toISOString().split('T')[0], 0, 0, 'L');

  pdf.Cell(12, 20, 'Time: ', 0, 0, 'L');
  pdf.Cell(
    28,
    20,
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    0,
    0,
    'L'
  );

  pdf.Ln(10);

  pdf.Cell(20, 1, '', 0, 0, 'C');
  pdf.Cell(20, 20, 'Cashier: ', 0, 0, 'L');
  pdf.Cell(18, 20, req.session.username, 0, 0, 'L');
  pdf.Ln(10);

  pdf.Cell(20, 1, '', 0, 0, 'C');
  pdf.Cell(30, 20, 'Sold To: ', 0, 0, 'L');
  pdf.Cell(18, 20, customerName, 0, 0, 'L');
  pdf.Ln(10);

  pdf.Cell(20, 1, '', 0, 0, 'C');
  pdf.Cell(40, 20, 'Payment Mode: ', 0, 0, 'L');
  pdf.Cell(18, 20, sale.paymentMode.split('|')[1], 0, 0, 'C');
  pdf.Ln(10);

  pdf.SetFont('Arial', 'B', 16);
  pdf.Cell(0, 20, 'SALE INVOICE', 0, 0, 'C');
  pdf.Ln(10);

  pdf.Cell(
    0,
    10,
    '___________________________________________________________',
    0,
    0,
    'C'
  );

  pdf.Ln(10);
  pdf.SetFont('Arial', 'B', 14);

  pdf.Cell(15, 1, '', 0, 0, 'C');
  pdf.Cell(20, 20, 'S.N.', 0, 0, 'C');
  pdf.Cell(40, 20, 'Book ID', 0, 0, 'C');
  pdf.Cell(35, 20, 'Qty', 0, 0, 'C');
  pdf.Cell(40, 20, 'Unit Price', 0, 0, 'C');
  pdf.Cell(30, 20, 'Price', 0, 0, 'C');
  pdf.Ln(10);
  pdf.SetFont('Arial', '', 12);

  sale.items.forEach((item, index) => {
    pdf.Cell(15, 1, '', 0, 0, 'C');
    pdf.Cell(20, 20, index + 1, 0, 0, 'C');
    pdf.Cell(40, 20, item.bookNumber, 0, 0, 'C');
    pdf.Cell(35, 20, item.bookQty, 0, 0, 'C');
    pdf.Cell(40, 20, `$${item.bookPrice}`, 0, 0, 'C');
    pdf.Cell(30, 20, `$${+item.bookQty * +item.bookPrice}`, 0, 0, 'C');
    pdf.Ln(10);
  });

  pdf.SetFont('Arial', 'B', 12);

  pdf.Cell(150, 20, 'Tax', 0, 0, 'R');
  pdf.Cell(30, 20, `$${sale.tax}`, 0, 0, 'C');
  pdf.Ln(10);

  pdf.Cell(150, 20, 'Total', 0, 0, 'R');
  pdf.Cell(30, 20, `$${sale.total}`, 0, 0, 'C');
  pdf.Ln(25);

  pdf.SetFont('Arial', '', 12);

  pdf.Cell(0, 20, 'Thank You for Shopping with Digital Book Store!', 0, 0, 'C');
  pdf.Ln(20);

  pdf.MultiCell(
    0,
    8,
    `Tell Us About Your Experience! Complete a short survey about this
  shopping experience and receive a coupon for 30% off one regular priced
  item* on a future purchase just by providing your review.`,
    0,
    'C'
  );

  pdf.Output('P');
  res.redirect('/sell');
};

module.exports = { invoice };
