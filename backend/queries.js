const queries = {
  create: {
    database: `CREATE DATABASE erp;`,

    customerTable: `
        CREATE TABLE IF NOT EXISTS customers (
          customer_id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          phone_number VARCHAR(20),
          address VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    invoiceTable: `
        CREATE TABLE IF NOT EXISTS invoices (
          invoice_id SERIAL PRIMARY KEY,
          customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
          order_id INT,
          total_amount DECIMAL(10, 2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status VARCHAR(50) CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
          due_date TIMESTAMP,
          discount DECIMAL(5, 2),
          notes TEXT
        );
      `,
    ordersTable: `
        CREATE TABLE IF NOT EXISTS orders (
          order_id SERIAL PRIMARY KEY,
          customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
          order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          total_amount DECIMAL(10, 2),
          status VARCHAR(50) CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    paymentTable: `
        CREATE TABLE IF NOT EXISTS payments (
          payment_id SERIAL PRIMARY KEY,
          invoice_id INT REFERENCES invoices(invoice_id) ON DELETE CASCADE,
          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          payment_amount DECIMAL(10, 2),
          payment_method VARCHAR(50),
          status VARCHAR(50) CHECK (status IN ('pending', 'paid', 'fail')),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    productTable: `
        CREATE TABLE IF NOT EXISTS products (
          product_id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    reportTable: `
        CREATE TABLE IF NOT EXISTS reports (
          report_id SERIAL PRIMARY KEY,
          report_name VARCHAR(100) NOT NULL,
          report_data TEXT,
          user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    userTable: `
        CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(100) NOT NULL,
          password TEXT NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          phone_number VARCHAR(20),
          status VARCHAR(50) CHECK (status IN ('active', 'inactive', 'suspended', 'banned')),
          last_login TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
  },

  insert: {
    customer: `
        INSERT INTO customers (name, email, phone_number, address, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP);
      `,
    invoice: `
        INSERT INTO invoices (customer_id, order_id, total_amount, created_at, updated_at, status, due_date, discount, notes)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, $6, $7, $8);
      `,
    order: `
        INSERT INTO orders (customer_id, order_date, total_amount, status, created_at, updated_at)
        VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4, CURRENT_TIMESTAMP);
      `,
    payment: `
        INSERT INTO payments (invoice_id, payment_date, payment_amount, payment_method, status, created_at, updated_at)
        VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `,
    product: `
        INSERT INTO products (name, description, price, created_at, updated_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `,
    report: `
        INSERT INTO reports (report_name, report_data, user_id, created_at, updated_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `,
    user: `
        INSERT INTO users (username, password, email, phone_number, status, last_login, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `,
  },

  update: {
    customer: `
        UPDATE customers
        SET name = $1, email = $2, phone_number = $3, address = $4, updated_at = CURRENT_TIMESTAMP
        WHERE customer_id = $5;
      `,
    invoice: `
        UPDATE invoices
        SET customer_id = $1, order_id = $2, total_amount = $3, status = $4, due_date = $5, discount = $6, notes = $7, updated_at = CURRENT_TIMESTAMP
        WHERE invoice_id = $8;
      `,
    order: `
        UPDATE orders
        SET customer_id = $1, order_date = $2, total_amount = $3, status = $4, updated_at = CURRENT_TIMESTAMP
        WHERE order_id = $5;
      `,
    payment: `
        UPDATE payments
        SET invoice_id = $1, payment_date = CURRENT_TIMESTAMP, payment_amount = $2, payment_method = $3, status = $4, updated_at = CURRENT_TIMESTAMP
        WHERE payment_id = $5;
      `,
    product: `
        UPDATE products
        SET name = $1, description = $2, price = $3, updated_at = CURRENT_TIMESTAMP
        WHERE product_id = $4;
      `,
    report: `
        UPDATE reports
        SET report_name = $1, report_data = $2, updated_at = CURRENT_TIMESTAMP
        WHERE report_id = $3;
      `,
    user: `
        UPDATE users
        SET username = $1, password = $2, email = $3, phone_number = $4, status = $5, last_login = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $6;
      `,
  },

  delete: {
    customer: `
        DELETE FROM customers WHERE customer_id = $1;
      `,
    invoice: `
        DELETE FROM invoices WHERE invoice_id = $1;
      `,
    order: `
        DELETE FROM orders WHERE order_id = $1;
      `,
    payment: `
        DELETE FROM payments WHERE payment_id = $1;
      `,
    product: `
        DELETE FROM products WHERE product_id = $1;
      `,
    report: `
        DELETE FROM reports WHERE report_id = $1;
      `,
    user: `
        DELETE FROM users WHERE user_id = $1;
      `,
  },

  get: {
    customer: `
        SELECT * FROM customers WHERE customer_id = $1;
      `,
    invoice: `
        SELECT * FROM invoices WHERE invoice_id = $1;
      `,
    order: `
        SELECT * FROM orders WHERE order_id = $1;
      `,
    payment: `
        SELECT * FROM payments WHERE payment_id = $1;
      `,
    product: `
        SELECT * FROM products WHERE product_id = $1;
      `,
    report: `
        SELECT * FROM reports WHERE report_id = $1;
      `,
    user: `
        SELECT * FROM users WHERE user_id = $1;
      `,
  },

  getAll: {
    customers: `
        SELECT * FROM customers;
      `,
    invoices: `
        SELECT * FROM invoices;
      `,
    orders: `
        SELECT * FROM orders;
      `,
    payments: `
        SELECT * FROM payments;
      `,
    products: `
        SELECT * FROM products;
      `,
    reports: `
        SELECT * FROM reports;
      `,
    users: `
        SELECT * FROM users;
      `,
  },

  getIds: {
    customers: `
      SELECT customer_id FROM customers;
    `,
    invoices: `
      SELECT invoice_id FROM invoices;
    `,
    orders: `
      SELECT order_id FROM orders;
    `,
    payments: `
      SELECT payment_id FROM payments;
    `,
    products: `
      SELECT product_id FROM products;
    `,
    reports: `
      SELECT report_id FROM reports;
    `,
    users: `
      SELECT user_id FROM users;
    `,
  },

  deleteAll: `
    DO $$ 
    DECLARE
        r RECORD;
    BEGIN
        -- Loop through each table in the public schema and drop them
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
        LOOP
            EXECUTE 'DROP TABLE IF EXISTS public.' || r.tablename || ' CASCADE';
        END LOOP;
    END $$;
  `,
};

module.exports = {
  queries,
};
