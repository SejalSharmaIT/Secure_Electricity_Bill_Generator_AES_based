const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const DecryptedCustomer = require("../models/DecryptedCustomer");


// ADD CUSTOMER
router.post("/", async (req, res) => {
  try {
    const { decryptedData, encryptedData } = req.body;

    // Store encrypted version
    const newEnc = new Customer(encryptedData);
    await newEnc.save();

    // Store decrypted version
    const newDec = new DecryptedCustomer(decryptedData);
    await newDec.save();

    res.status(200).json({ message: "Customer added successfully!!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding customer" });
  }
});


module.exports = router;
