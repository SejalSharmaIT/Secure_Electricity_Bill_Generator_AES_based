/*
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");

const billRoutes = require("./routes/billRoutes");
const customerRoutes = require("./routes/customerRoutes");
const meterRoutes = require("./routes/meterRoutes");


const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// API ROUTES
app.use("/api/customers", customerRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/meters", meterRoutes);

app.get("/", (req, res) => {
  res.send("Electricity Billing System Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/



// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config");

const billRoutes = require("./routes/billRoutes");
const customerRoutes = require("./routes/customerRoutes");
const meterRoutes = require("./routes/meterRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const AES_KEY = process.env.AES_KEY; // You can use this in your routes

// Connect MongoDB using your config
connectDB(process.env.MONGO_URI); // pass URI from .env

// API ROUTES
app.use("/api/customers", customerRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/meters", meterRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Electricity Billing System Backend Running");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
