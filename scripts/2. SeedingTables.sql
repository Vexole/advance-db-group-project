-- Inserting data in payment_methods table
insert into payment_methods values(1, "Cash", 1), (2, "Credit Card", 1), (3, "Debit Card", 1), (4, "Gift Card", 1), (5, "PLCC Card", 1);

-- Inseting data in languages table
insert into languages values(1, "English"), (2, "French"), (3, "Hindi"), (4, "German"), (5, "Spanish");

-- Inserting data in generes table
insert into genres values(1, "Fiction", 1), (2, "Fantasy", 1), (3, "Thriller", 1), (4, "Comedy", 1), (5, "Motivational", 1);

-- Inserting data in authors table
insert into authors values (1, "Alexandre", "Dumas"), (2, "Joanne", "Rowling"), (3, "Stephen", "King"), (4, "James", "Patterson"),
	(5, "Nora", "Roberts"), (6, "Dean", "Koontz"), (7, "Alice", "Munro");

-- inserting data into books
insert into books values(1, "1001", "Dear Life", 15.19, '2012-01-23 00:00:00'), (2, "1002", "Dance of the Happy Shades", 10.45, '1990-05-20 00:00:00'), 
(3, "1003", "IT", 18.75, '1986-09-15 00:00:00'),  (4, "1004", "Harry Potter", 20.99, '1987-06-08 00:00:00' ), 
(5, "1005", "Misery", 21.50, '1987-06-08 00:00:00' ), (6, "1006", "The Dark Tower", 24.99, '2004-09-21 00:00:00' );

-- Inserting data in book_details table
insert into book_details(book_id, genre_id, language_id) values(1, 1, 1), (2, 1, 1), (3, 3, 2), (4, 1, 5), (5, 4, 3), (6, 4, 4);

-- Inseting data in book_author table
insert into book_author(book_id, author_id) values (1, 6), (1, 7), (2, 7), (2, 5), (3, 2), (4, 2), (5, 5), (5, 1), (6,6);

-- Inserting data in stocks table
insert into stocks (book_id, count) values(1, 25), (2, 20), (3, 5), (4, 1), (5, 13), (6, 17);

-- Inserting data in customers
insert into customers values(1, "John", "Doe", "john.doe@gmail.com", 6471839280), (2, "Tim", "Thomas", "tim.thomas@gmail.com", 6473629000),
	(3, "Larry", "Page", "larry.page@gmail.com", 6471625241), (4, "Jenny", "Hanks", "jenny.hanks@gmail.com", 64710300339),
    (5, "Laura", "Hanna", "laura.hanna@gmail.com", 5123462512),
    (6, "John", "Pitsol", "john.pitsol@gmail.com", 6551239280), (7, "Tom", "Holland", "tom.holland@gmail.com", 6473629010),
	(8, "Dustin", "Marks", "dustin.marks@gmail.com", 6473625241), (9, "Franky", "Junior", "franky.junior@gmail.com", 64715309039),
    (10, "Celin", "Redrose", "celin.redrose@gmail.com", 5123461512);

-- Inserting data in employees
insert into employees(customer_id, hire_date, is_active) values (1, '2002-12-01', 1), (6, '2010-10-10', 1), (7, '2020-03-29', 0);

-- Inserting data in login table
insert into logins(employee_id, username) values(1, 'john.doe'),(2, 'john.pistol'), (3, 'tom.holland');

-- Inserting data in passwords table
insert into passwords values(1, 1, "$2b$10$bHT/Tbduf8JoPWgZLETFHu5MOx1UGHBUjAMcA7mik/2OtFoDZCJrG", 0), 
(2, 1, "$2b$10$bHT/Tbduf8JoPWgZLETFHu5MOx1UGHBUjAMcA7mik/2OtFoDZCJrG", 0), 
(3, 1, "$2b$10$NkT589jKHO.moCrmOc7ctePAbea8VPjgMpbWrbPF.svUM/vZqWaI.", 1), 
(4, 2, "$2b$10$NkT589jKHO.moCrmOc7ctePAbea8VPjgMpbWrbPF.svUM/vZqWaI.", 0), 
(5, 2, "$2b$10$bHT/Tbduf8JoPWgZLETFHu5MOx1UGHBUjAMcA7mik/2OtFoDZCJrG", 1), 
(6, 3, '$2b$10$bHT/Tbduf8JoPWgZLETFHu5MOx1UGHBUjAMcA7mik/2OtFoDZCJrG', 1);

-- Inserting data in sale_details
insert into sales values(1, 2, 3, 52.53, 6.04, '2022-05-23 00:00:00'), (2, 2, 1, 52.53, 6.04, '2022-07-11 00:00:00'),
		(3, 5, 3, 10.45, 0, '2022-07-11 00:00:00'), (4, 1, 2, 94.87, 10.91, '2022-08-10 00:00:00'), 
        (5, 3, 3, 10.5, 2.09, '2022-08-15 00:00:00'), (6, 2, 3, 20.21, 3.5, '2022-08-15 00:00:00'), 
        (7, 4, 1, 50.2, 7.20, '2022-09-11 00:00:00'), (8, NULL, 3, 60.21, 10.20, '2022-09-11 00:00:00'), 
        (9, 8, 2, 64.98, 8.73, '2022-10-10 00:00:00'), (10, NULL, 3, 23.79, 2.74, '2022-10-10 00:00:00');

-- Inserting data in sale_details table
insert into sale_details values(1, 1, 1, 5), (2, 1, 1, 6), (3, 2, 1, 6), (4, 2, 1, 5), (5, 3, 1, 2), (6, 4, 4, 4), (7, 5, 2, 4), 
(8, 6, 3, 1), (9, 7, 1, 2), (10, 8, 2, 4), (11, 9, 7, 3), (12, 10, 1, 1);

-- Inserting data in payments table
insert into payments(sale_id, payment_method_id) values (1, 2), (2, 2), (3, 2), (4, 1), (5, 2), (6, 5), (7, 3), (8, 4), (9, 4), (10, 1);


