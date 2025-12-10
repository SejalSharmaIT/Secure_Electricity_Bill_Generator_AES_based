const mongoose = require("mongoose");

const MeterSchema = new mongoose.Schema({
  // Meter ID (3 encrypted versions)
  meterIdAES: { type: String, required: true },
  meterIdCaesar: { type: String, required: true },
  meterIdRail: { type: String, required: true },

  // Customer ID (3 encrypted versions)
  customerIdAES: { type: String, required: true },
  customerIdCaesar: { type: String, required: true },
  customerIdRail: { type: String, required: true },

  // Meter Type (AES + Caesar)
  meterTypeAES: { type: String, required: true },
  meterTypeCaesar: { type: String, required: true },

  // Installation Date (AES + Caesar)
  installationDateAES: { type: String },
  installationDateCaesar: { type: String },

  // Initial Reading (AES + Caesar)
  initialReadingAES: { type: String },
  initialReadingCaesar: { type: String },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meter", MeterSchema);
