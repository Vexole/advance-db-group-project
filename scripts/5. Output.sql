CALL sales_by_employee('2022-08-01', '2022-08-16');
CALL sales_by_employee(null, null);
CALL top_selling_books();

SELECT get_employee_discount(1, 200);
SELECT get_employee_discount(2, 200);
SELECT get_employee_discount(2, 2000);