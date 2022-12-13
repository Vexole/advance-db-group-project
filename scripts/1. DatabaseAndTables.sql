DROP DATABASE IF EXISTS bookstore;

CREATE DATABASE bookstore;

USE bookstore;

DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS languages;

DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS publishers;

DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS employees;

DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS passwords;

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS book_details;
DROP TABLE IF EXISTS stocks;
DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS sale_details;
DROP TABLE IF EXISTS payments;


CREATE TABLE genres (
	ID INT NOT NULL AUTO_INCREMENT,
    genre VARCHAR(20),
    is_active BOOLEAN,
	PRIMARY KEY(ID)
);

CREATE TABLE payment_methods (
	ID INT NOT NULL AUTO_INCREMENT,
    payment_mode VARCHAR(20) NOT NULL,
    is_active BOOLEAN,
    PRIMARY KEY(ID)
);

CREATE TABLE languages (
	ID INT NOT NULL AUTO_INCREMENT,
    book_language VARCHAR(20) NOT NULL,
    PRIMARY KEY(ID)
);

CREATE TABLE authors (
	ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(ID)
);

CREATE TABLE customers (
	ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone BIGINT UNIQUE NOT NULL,
	PRIMARY KEY(ID)
);

CREATE TABLE employees (
	ID INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    hire_date DATE,
    is_active BOOLEAN,
    PRIMARY KEY(ID),
    FOREIGN KEY(customer_id) REFERENCES customers(ID) 
);

CREATE TABLE logins (
	ID INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT 1,
    PRIMARY KEY (ID),
    FOREIGN KEY(employee_id) REFERENCES employees(ID)
);

CREATE TABLE passwords (
	ID INT NOT NULL AUTO_INCREMENT,
    login_id INT NOT NULL,
    password VARCHAR(80) NOT NULL,
    is_current BOOLEAN,
    PRIMARY KEY(ID),
    FOREIGN KEY(login_id) REFERENCES logins(ID)
);

CREATE TABLE books (
	ID INT NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2),
    published_date DATETIME,
    PRIMARY KEY(ID)
);

CREATE TABLE book_details (
	ID INT NOT NULL AUTO_INCREMENT,
	book_id INT NOT NULL,
    genre_id INT NOT NULL,
	language_id INT NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY(book_id) REFERENCES books(ID),
    FOREIGN KEY(genre_id) REFERENCES genres(ID),
	FOREIGN KEY(language_id) REFERENCES languages(ID)
);

CREATE TABLE book_author (
	ID INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    FOREIGN KEY(book_id) REFERENCES books(ID),
    FOREIGN KEY(author_id) REFERENCES authors(ID),
    PRIMARY KEY(ID)
);

CREATE TABLE stocks (
	ID INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    count INT NOT NULL DEFAULT 0,
    PRIMARY KEY(ID),
    FOREIGN KEY(book_id) REFERENCES books(ID)
);

CREATE TABLE sales (
	ID INT NOT NULL AUTO_INCREMENT,
    customer_id INT,
    employee_id INT,
    total_price DECIMAL(10,2),
    tax DECIMAL(4,2),
    purchase_date DATETIME NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY(customer_id) REFERENCES customers(ID),
    FOREIGN KEY(employee_id) REFERENCES employees(ID)
);

CREATE TABLE sale_details (
	ID INT NOT NULL AUTO_INCREMENT,
    sale_id INT NOT NULL,
    quantity INT NOT NULL,
    book_id INT NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY(sale_id) REFERENCES sales(ID),
    FOREIGN KEY(book_id) REFERENCES books(ID)
);

CREATE TABLE payments (
	ID INT NOT NULL AUTO_INCREMENT,
    sale_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY(sale_id) REFERENCES sales(ID),
    FOREIGN KEY(payment_method_id) REFERENCES payment_methods(ID)
);






