const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// STEP 4: fake database
let orders = [];

// test route
app.get("/", (req, res) => {
  res.send("Checkout API running");
});

// STEP 5: create order API
app.post("/api/order", (req, res) => {
  const { items, address, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  let totalAmount = 0;
  items.forEach(item => {
    totalAmount += item.price * item.quantity;
  });

  const order = {
    id: Date.now(),
    items,
    address,
    paymentMethod,
    totalAmount,
    status: "PENDING"
  };

  orders.push(order);

  res.json({
    message: "Order created",
    orderId: order.id
  });
});

// NEW: Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Make sure routes are defined before listen
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
