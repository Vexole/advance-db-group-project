const FPDF = require('node-fpdf');
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

const invoice = (req, res) => {
  const pdf = new ExtendedFPDF('P', 'mm', 'A4');
  pdf.AddPage();
  pdf.SetFont('Arial', 'B', 12);

  const sale = JSON.parse(req.session.invoice);
  const customerName = req.session.customerName ?? '';
  console.log(customerName);

  pdf.Cell(30, 20, 'Sold To: ', 0, 0, 'C');
  pdf.Cell(30, 20, customerName, 0, 0, 'C');

  pdf.Cell(30, 20, 'Payment Mode: ', 0, 0, 'L');
  pdf.Cell(30, 20, sale.paymentMode.split('|')[1], 0, 0, 'C');
  pdf.Ln(10);

  pdf.Cell(30, 20, 'Date: ', 0, 0, 'C');
  pdf.Cell(30, 20, new Date().toISOString().split('T')[0], 0, 0, 'C');

  pdf.Cell(30, 20, 'Sold By: ', 0, 0, 'C');
  pdf.Cell(30, 20, req.session.username, 0, 0, 'C');
  pdf.Ln(10);

  pdf.Cell(20, 20, 'S.N.', 0, 0, 'C');
  pdf.Cell(30, 20, 'Book ID', 0, 0, 'C');
  pdf.Cell(30, 20, 'Qty', 0, 0, 'C');
  pdf.Cell(30, 20, 'Unit Price', 0, 0, 'C');
  pdf.Cell(30, 20, 'Price', 0, 0, 'C');
  pdf.Ln(10);

  sale.items.forEach((item, index) => {
    pdf.Cell(20, 20, index + 1, 0, 0, 'C');
    pdf.Cell(30, 20, item.bookNumber, 0, 0, 'C');
    pdf.Cell(30, 20, item.bookQty, 0, 0, 'C');
    pdf.Cell(30, 20, `$${item.bookPrice}`, 0, 0, 'C');
    pdf.Cell(30, 20, `$${+item.bookQty * +item.bookPrice}`, 0, 0, 'C');
    pdf.Ln(10);
  });

  pdf.Cell(30, 20, 'Total', 0, 0, 'C');
  pdf.Cell(30, 20, `$${sale.total}`, 0, 0, 'C');

  pdf.Output('P');
  res.redirect('/sell');
};

module.exports = { invoice };
