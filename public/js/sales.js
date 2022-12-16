$(document).ready(function () {
  const $bookNumber = $('#book_number');
  const $bookPrice = $('#book_price');
  const $bookQty = $('#book_qty');
  const $sale = $('#sale');
  const $paymentMode = $('#payment_mode');
  const $phone = $('#phone');

  const $startDate = $('#start_date');
  const $endDate = $('#end_date');

  let items = [];
  let isUserSubmit = false;
  let total = 0;
  let tex = 0;
  let books;
  let currentBookId = 0;
  let currentBookName = '';
  let currentBookQty = 0;
  if ($('#book_number').is(':visible')) {
    books = JSON.parse($('#books').val());
  }

  if (
    ($($startDate).is(':visible') && $($startDate).val()) ||
    $($endDate).val()
  ) {
    $('#sales_link')[0].click();
  }

  $($bookNumber).on('blur', (e) => {
    const ISBN = $($bookNumber).val();
    if (ISBN) {
      let book = books.filter((book) => book.isbn == ISBN);
      if (book && book.length > 0) {
        $($bookPrice.val(book[0].price));
        currentBookId = book[0].id;
        currentBookName = book[0].name;
        currentBookQty = book[0].count;
      } else {
        alert('Invalid Book Number');
        $($bookNumber).val('');
        $($bookNumber).focus();
      }
    }
  });

  $('#add_to_cart').on('click', (e) => {
    total = 0;
    tax = 0;
    let alreadyInCart = false;
    const bookNumber = $($bookNumber).val();
    const bookPrice = $($bookPrice).val();
    const bookQty = $($bookQty).val();

    let currentItemQtyInCart = items.filter(
      (item) => item.bookId == currentBookId
    );
    if (currentItemQtyInCart && currentItemQtyInCart.length > 0) {
      let cartItemsCount = currentItemQtyInCart[0].bookQty;
      if (bookQty > currentBookQty - cartItemsCount) {
        alert('Not enough stock');
        return;
      }
    }

    if (bookQty > currentBookQty) {
      alert('Not enough stock');
      return;
    }

    if (bookNumber && bookPrice && bookQty) {
      $($bookNumber).val('');
      $($bookPrice).val('');
      $($bookQty).val('');

      items = items.map((item) => {
        if (item.bookId == currentBookId) {
          alreadyInCart = true;
          return { ...item, bookQty: +bookQty + +item.bookQty };
        }
        return item;
      });

      if (!alreadyInCart) {
        items.push({
          stockQty: currentBookQty,
          bookName: currentBookName,
          bookId: currentBookId,
          bookNumber,
          bookPrice,
          bookQty,
        });
      }
      console.log(items);
      $('#cart tbody').empty();
      items.forEach((item, index) => {
        let row = $('#cart tbody')[0].insertRow(index);
        let snCell = row.insertCell(0);
        snCell.innerText = index + 1;
        let numberCell = row.insertCell(1);
        numberCell.innerText = item.bookName;
        let qtyCell = row.insertCell(2);
        qtyCell.innerText = item.bookQty;
        let priceCell = row.insertCell(3);
        priceCell.innerText = `$${item.bookPrice}`;
        let totalCell = row.insertCell(4);
        total += +item.bookPrice * +item.bookQty;
        totalCell.innerText = `$${+item.bookPrice * +item.bookQty}`;
      });

      tax = (0.13 * total).toFixed(2);
      total = (total + +tax).toFixed(2);
      $('#tax')[0].innerText = `$${tax}`;
      $('#total')[0].innerText = `$${total}`;
    } else {
      alert('Please enter valid details');
    }
    $('.checkout_only').css('display', 'block');
    $($bookNumber).focus();
  });

  $('#submit_btn').on('click', (e) => {
    if (items.length == 0) {
      alert('Cannot proceed with empty cart!');
    } else {
      $($sale).val(
        JSON.stringify({
          items,
          phone: $($phone).val(),
          paymentMode: $($paymentMode).val(),
          tax,
          total,
        })
      );
      isUserSubmit = true;
      $('#complete_sale').click();
    }
  });

  $('#complete_sale').on('click', (e) => {
    if (!isUserSubmit) {
      e.preventDefault();
      $('#add_to_cart').click();
    } else {
      isUserSubmit = false;
    }
  });
});
