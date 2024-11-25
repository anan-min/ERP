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

app.get("/users", async (req, res) => {
  try {
    const result = await database.getReports();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const result = await database.getUserById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 5000");
});
