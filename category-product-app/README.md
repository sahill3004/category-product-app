##   Changes  ##

- Please make changes in database .
In .env file add your db details as per given names

## DB details ##

- Create database using below query.

       CREATE DATABASE category_product_db;

- Create categories  table in category_product_db database using below query.

        CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );

- Create categories  table in category_product_db database using below query.

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            category_id INTEGER REFERENCES categories(id)
        );
		
# Run the project#
Open the terminal and use below command

		node index.js
