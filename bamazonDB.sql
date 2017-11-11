DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  dept_name VARCHAR(100) NULL,
  stock_quantity integer NULL,
  price DECIMAL(10,2) NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
department_id int,
department_name VARCHAR(100) NULL,
over_head_cost DECIMAL(10,2) NULL
);

INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Xbox One", "Electronics", 100, 350.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Air Max 95", "Shoes", 75, 110.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Bedding Set", "Home Goods", 60, 85.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Gold Watch", "Accessories/Jewelry", 20, 200.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Mountain Bike", "Outdoors/Sports", 65, 140.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Lawn Mower", "Home Improvement", 40, 180.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Sofa Set", "Home Goods", 17, 450.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("PS4", "Electronics", 120, 355.00, 0);
INSERT INTO products (product_name, dept_name, stock_quantity, price, product_sales)
VALUES ("Basketball", "Outdoors/Sports", 30, 30.00, 0);

Select * from products