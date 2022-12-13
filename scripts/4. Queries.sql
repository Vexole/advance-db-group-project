-- QUERIES

-- 1 Transaction grouped by payment modes
select payment_mode, IFNULL(SUM(total_price),0) AS Sales from payment_methods pm
left join payments p
	on pm.id = p.payment_method_id
left join sales s on p.sale_id = s.id
group by payment_mode;


-- 2 Top spending customers.
select concat(first_name, ' ',  last_name) as `Customer Name`, SUM(total_price) AS Amount from customers c
inner join sales s
on c.id = s.customer_id
group by c.id
order by Amount desc;

select * from customers;
select * from employees;
select * from logins;
select * from passwords;
select * from payment_methods;
select * from books;
SELECT b.id, name, price, count FROM books b JOIN stocks s ON b.id = s.book_id;
CALL top_selling_books();
CALL top_spending_customers();

select * from payments;
SELECT * FROM sales;
SELECT * FROM sale_details;
SELECT id FROM logins WHERE username ='qqq';

select * from customers;
SELECT id FROM customers c WHERE c.phone = '1243567890';

SELECT SUM(total_price) AS revenue, DATE(purchase_date) AS purchase_date FROM sales
WHERE purchase_date BETWEEN '2022-08-01' AND '2022-12-12' GROUP BY DATE(purchase_date);

SELECT b.id, isbn, name, price, count FROM books b JOIN stocks s ON b.id = s.book_id;

select * from stocks;

select ISBN, name, price, count from books b join stocks s on b.id = s.book_id;
