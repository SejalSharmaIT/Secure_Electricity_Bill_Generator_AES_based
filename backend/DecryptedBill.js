const mongoose = require("mongoose");

const DecryptedBillSchema = new mongoose.Schema({
  billId: { type: String, required: true },
  meterId: { type: String, required: true },
  customerId: { type: String, required: true },
  units: { type: Number, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DecryptedBill", DecryptedBillSchema);
