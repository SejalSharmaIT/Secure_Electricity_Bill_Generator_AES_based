const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  meterId: { type: String, required: true },
  customerId: { type: String, required: true },
  unitsConsumed: { type: String, required: true }, // encrypted string
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", BillSchema);
