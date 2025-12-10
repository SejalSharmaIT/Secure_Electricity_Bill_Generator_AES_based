const express = require("express");
const router = express.Router();
const Meter = require("../models/Meter");

// ==================== Add Meter ====================
router.post("/", async (req, res) => {
  try {
    const {
      meterIdAES,
      meterIdCaesar,
      meterIdRail,
      customerIdAES,
      customerIdCaesar,
      customerIdRail,
      meterTypeAES,
      meterTypeCaesar,
      installationDateAES,
      installationDateCaesar,
      initialReadingAES,
      initialReadingCaesar,
    } = req.body;

    // Required field validation
    if (!meterIdAES || !customerIdAES || !meterTypeAES) {
      return res.status(400).json({
        message: "Meter ID, Customer ID and Meter Type are required.",
      });
    }

    const newMeter = new Meter({
      meterIdAES,
      meterIdCaesar,
      meterIdRail,
      customerIdAES,
      customerIdCaesar,
      customerIdRail,
      meterTypeAES,
      meterTypeCaesar,
      installationDateAES,
      installationDateCaesar,
      initialReadingAES,
      initialReadingCaesar,
    });

    await newMeter.save();

    return res.status(201).json({ message: "Meter added successfully!" });
  } catch (err) {
    console.error("Meter Save Error:", err);
    return res.status(500).json({ message: "Failed to save meter." });
  }
});

// ==================== Get All Meters ====================
router.get("/", async (req, res) => {
  try {
    const meters = await Meter.find();
    return res.status(200).json(meters);
  } catch (err) {
    console.error("Fetch Meters Error:", err);
    return res.status(500).json({ message: "Failed to fetch meters." });
  }
});

module.exports = router;
