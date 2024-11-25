const { Pool } = require("pg");
const fs = require("fs");
const { queries } = require("./queries");

class Database {
  pool = new Pool({
    user: "postgres",
    password: "nut12bodin",
    port: 5432,
    database: "erp", // Connect to the 'erp' database
  });

  constructor() {
    console.log("Start database initialization");
    this.createDatabase();
  }

  async createDatabase() {
    try {
      await this.pool.query(queries.deleteAll);
      await this.createTables();
      await this.loadData();
    } catch (error) {
      if (error.code === "42P04") {
        console.log("Database already exists.");
      } else {
        console.error("Error creating database:", error);
      }
    }
  }

  async createTables() {
    try {
      await this.pool.query(queries.create.customerTable);
      console.log("Customer table created successfully.");

      await this.pool.query(queries.create.invoiceTable);
      console.log("Invoice table created successfully.");

      await this.pool.query(queries.create.ordersTable);
      console.log("Orders table created successfully.");

      await this.pool.query(queries.create.paymentTable);
      console.log("Payment table created successfully.");

      await this.pool.query(queries.create.productTable);
      console.log("Product table created successfully.");

      await this.pool.query(queries.create.userTable);
      console.log("User table created successfully.");

      await this.pool.query(queries.create.reportTable);
      console.log("Report table created successfully.");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  }

  async loadData() {
    try {
      await this.loadCustomer();
      await this.loadInvoice();
      await this.loadOrder();
      await this.loadPayment();
      await this.loadProduct();
      await this.loadUser();
      await this.loadReports();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  async loadCustomer() {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonData = JSON.parse(data);

    // Insert each customer into the database
    for (const customer of jsonData.customers) {
      await this.pool.query(queries.insert.customer, [
        customer.name,
        customer.email,
        customer.phone_number,
        customer.address,
      ]);
    }
  }

  async loadInvoice() {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonData = JSON.parse(data);

    for (const invoice of jsonData.invoices) {
      await this.pool.query(queries.insert.invoice, [
        invoice.customer_id,
        invoice.order_id,
        invoice.total_amount,
        invoice.status,
        invoice.due_date,
        invoice.discount,
        invoice.notes,
      ]);
    }
  }

  async loadOrder() {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonData = JSON.parse(data);
    for (const order of jsonData.orders) {
      await this.pool.query(queries.insert.order, [
        order.customer_id,
        order.total_amount,
        order.status,
      ]);
    }
    const response = await this.pool.query("select * from orders");
  }

  async loadPayment() {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonData = JSON.parse(data);
    for (const payment of jsonData.payments) {
      await this.pool.query(queries.insert.payment, [
        payment.invoice_id,
        payment.payment_amount,
        payment.payment_method,
        payment.status,
      ]);
    }
  }

  async loadProduct() {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonData = JSON.parse(data);
    for (const product of jsonData.products) {
      await this.pool.query(queries.insert.product, [
        product.name,
        product.description,
        product.price,
      ]);
    }
    const response = await this.pool.query("select * from products");
  }

  async loadUser() {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonData = JSON.parse(data);
    for (const user of jsonData.users) {
      await this.pool.query(queries.insert.user, [
        user.username,
        user.password,
        user.email,
        user.phone_number,
        user.status,
      ]);
    }
    const response = await this.pool.query("select * from users");
  }

  async loadReports() {
    ``;
    const data = fs.readFileSync("data.json", "utf8");
    const jsonData = JSON.parse(data);
    for (const report of jsonData.reports) {
      await this.pool.query(queries.insert.report, [
        report.report_name,
        report.report_data,
        report.user_id,
      ]);
    }
    const response = await this.pool.query("select * from reports");
  }

  async getCustomers() {
    const response = await this.pool.query(queries.getAll.customers);
    console.log(response.rows);
    return response.rows;
  }

  async getInvoices() {
    const response = await this.pool.query(queries.getAll.invoices);
    return response.rows;
  }

  async getOrders() {
    const response = await this.pool.query(queries.getAll.orders);
    return response.rows;
  }

  async getPayments() {
    const response = await this.pool.query(queries.getAll.payments);
    return response.rows;
  }

  async getProducts() {
    const response = await this.pool.query(queries.getAll.products);
    return response.rows;
  }

  async getReports() {
    const response = await this.pool.query(queries.getAll.reports);
    return response.rows;
  }

  async getUsers() {
    const response = await this.pool.query(queries.getAll.users);
    return response.rows;
  }

  async getCustomerById(id) {
    const response = await this.pool.query(queries.get.customer, [id]);

    if (response.rows.length === 0) {
      return null;
    }

    return response.rows[0];
  }

  async getInvoiceById(id) {
    const response = await this.pool.query(queries.get.invoice, [id]);

    if (response.rows.length === 0) {
      return null;
    }

    return response.rows[0];
  }

  async getOrderById(id) {
    const response = await this.pool.query(queries.get.order, [id]);

    if (response.rows.length === 0) {
      return null;
    }

    return response.rows[0];
  }

  async getPaymentById(id) {
    const response = await this.pool.query(queries.get.payment, [id]);

    if (response.rows.length === 0) {
      return null;
    }

    return response.rows[0];
  }

  async getProductById(id) {
    const response = await this.pool.query(queries.get.product, [id]);

    if (response.rows.length === 0) {
      return null;
    }

    return response.rows[0];
  }

  async getReportById(id) {
    const response = await this.pool.query(queries.get.report, [id]);

    if (response.rows.length === 0) {
      return null;
    }

    return response.rows[0];
  }

  async getUserById(id) {
    const response = await this.pool.query(queries.get.user, [id]);

    if (response.rows.length === 0) {
      return null;
    }

    return response.rows[0];
  }

  async updateCustomerById(id, data) {
    const response = await this.pool.query(queries.update.customer, [
      data.name,
      data.email,
      data.phone_number,
      data.address,
      id,
    ]);
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = {
  Database,
};