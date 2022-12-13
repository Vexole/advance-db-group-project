-- Stored Procedures
DROP PROCEDURE IF EXISTS top_selling_books;
DROP PROCEDURE IF EXISTS top_spending_customers;

-- List the books that have been sold the most
DELIMITER $$
CREATE PROCEDURE top_selling_books()
BEGIN
	SELECT b.name AS `Book Name`, 
		a.Authors,
        SUM(sd.quantity) AS `Number of Copies Sold`,
        SUM(s.total_price) AS `Revenue Generated`
	FROM sales s 
		JOIN sale_details sd ON s.id = sd.sale_id
		JOIN books b ON b.ID = sd.book_id
        JOIN book_details bd ON b.id = bd.book_id
		JOIN (
			SELECT b.id AS ID, GROUP_CONCAT(CONCAT(a.first_name, ' ', a.last_name)) AS Authors
			FROM books b 
				JOIN book_author ba ON b.id = ba.book_id 
				JOIN authors a ON a.id = ba.author_id
				GROUP BY b.id) a
		ON a.ID = b.ID
		GROUP BY sd.book_id
        ORDER BY `Number of Copies Sold` DESC, `Revenue Generated` DESC;
END$$

DELIMITER $$
CREATE PROCEDURE top_spending_customers()
BEGIN
	SELECT CONCAT(first_name, ' ',  last_name) AS `Customer Name`, 
        SUM(total_price) AS Amount FROM customers c 
        INNER JOIN sales s ON c.id = s.customer_id 
        GROUP BY c.id 
        ORDER BY Amount DESC;
END$$

DELIMITER ;