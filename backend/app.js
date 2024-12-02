const express = require("express");
const { Database } = require("./database");
const cors = require("cors");

const app = express();
const database = new Database();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.json({ request: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/customers", async (req, res) => {
  try {
    const result = await database.getCustomers();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/customers/:id", async (req, res) => {
  try {
    const result = await database.getCustomerById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/customers/:id", async (req, res) => {
  try {
    const { name, email, phone_number, address } = req.body;
    const id = req.params.id;
    await database.updateCustomerById(id, {
      name,
      email,
      phone_number,
      address,
    });

    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/invoices", async (req, res) => {
  try {
    const result = await database.getInvoices();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/invoices/:id", async (req, res) => {
  try {
    const result = await database.getInvoiceById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Invoices not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const result = await database.getOrders();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const result = await database.getOrderById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/payments", async (req, res) => {
  try {
    const result = await database.getPayments();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/payments/:id", async (req, res) => {
  try {
    const result = await database.getPaymentById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await database.getProducts();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const result = await database.getProductById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/reports", async (req, res) => {
  try {
    const result = await database.getReports();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/reports/:id", async (req, res) => {
  try {
    const result = await database.getReportById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const id = req.params.id;
    await database.updateProductById(id, {
      name,
      description,
      price,
    });

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/invoices/:id", async (req, res) => {
  try {
    const {
      customer_id,
      order_id,
      total_amount,
      status,
      dues_date,
      discount,
      notes,
    } = req.body;
    const id = req.params.id;
    await database.updateInvoiceById(id, {
      customer_id,
      order_id,
      total_amount,
      status,
      dues_date,
      discount,
      notes,
    });

    res.json({ message: "Invoices updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Invoice Update Failed");
  }
});

app.put("/orders/:id", async (req, res) => {
  try {
    const { customer_id, order_date, total_amount, status } = req.body;
    const id = req.params.id;
    await database.updateOrderById(id, {
      customer_id,
      order_date,
      total_amount,
      status,
    });

    res.json({ message: "Orders updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/payments/:id", async (req, res) => {
  try {
    const { invoice_id, payment_date, payment_amount, payment_method, status } =
      req.body;
    const id = req.params.id;
    await database.updatePaymentById(id, {
      invoice_id,
      payment_date,
      payment_amount,
      payment_method,
      status,
    });
    res.json({ message: "Payment updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment update failed");
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await database.deleteProductById(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/customers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await database.deleteCustomerById(id);
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/invoices/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await database.deleteInvoiceById(id);
    res.json({ message: "Invoices deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/orders/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await database.deleteOrderById(id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Order Delete Failed");
  }
});

app.delete("/payments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await database.deletePaymentById(id);
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment Delete Failed");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("username/ password", username, password);
    // Call the database method to validate credentials
    const isAuthenticated = await database.login(username, password);

    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      // Respond with success message if login is successful
      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } else {
      // Respond with error message if login fails
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    console.error(err);
    // Handle unexpected errors
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 5000");
});
