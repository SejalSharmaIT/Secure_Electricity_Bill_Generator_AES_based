const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    nameAES: { type: String, required: true },
    nameCaesar: { type: String, required: true },
    nameRail: { type: String, required: true },

    emailAES: { type: String, required: true },
    addressAES: { type: String, required: true },
    phoneAES: { type: String, required: true },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Customer", CustomerSchema);
