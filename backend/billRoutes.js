const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");
const DecryptedBill = require("../models/DecryptedBill");
const crypto = require("crypto");

// ------------------------
//  AES ENCRYPTION
// ------------------------
function encryptAES(text) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return { encrypted, key: key.toString("hex"), iv: iv.toString("hex") };
}

// ------------------------
// VERNAME CIPHER
// ------------------------
function vernamEncrypt(text) {
  let key = "";
  let encrypted = "";

  for (let i = 0; i < text.length; i++) {
    const rand = Math.floor(Math.random() * 256);
    key += String.fromCharCode(rand);
    encrypted += String.fromCharCode(text.charCodeAt(i) ^ rand);
  }

  return {
    encrypted: Buffer.from(encrypted).toString("hex"),
    key: Buffer.from(key).toString("hex")
  };
}

// ------------------------
// MONOALPHABETIC CIPHER
// ------------------------
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const shuffled = alphabet.split("").sort(() => Math.random() - 0.5).join("");

function monoEncrypt(text) {
  let encrypted = "";

  for (let char of text) {
    let index = alphabet.indexOf(char);
    encrypted += index === -1 ? char : shuffled[index];
  }

  return encrypted;
}

// -----------------------------
// SAVE BILL API
// -----------------------------
router.post("/add", async (req, res) => {
  try {
    const { meterId, customerId, unitsConsumed } = req.body;

    if (!meterId || !customerId || !unitsConsumed) {
      return res.status(400).json({ message: "All fields required" });
    }

    // AES
    const aes = encryptAES(unitsConsumed);

    // Vernam
    const vernam = vernamEncrypt(unitsConsumed);

    // Monoalphabetic
    const mono = monoEncrypt(unitsConsumed);

    // Combine all encrypted results into one string or save separately
    const encryptedUnits =
      `AES:${aes.encrypted}|VER:${vernam.encrypted}|MONO:${mono}`;

    // Save encrypted bill
    const bill = new Bill({
      meterId,
      customerId,
      unitsConsumed: encryptedUnits,
    });

    await bill.save();

    // -----------------------------
    // SAVE DECRYPTED (PLAIN) BILL
    // -----------------------------
    await DecryptedBill.create({
      billId: bill._id.toString(),
      meterId: meterId,                 
      customerId: customerId,           
      units: unitsConsumed,             
      amount: Number(unitsConsumed) * 10 // amount calculation
    });

    res.json({ message: "Bill generated, encrypted & decrypted saved!" });

  } catch (err) {
    console.error("Error saving bill:", err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/decrypted", async (req, res) => {
  try {
    const bills = await DecryptedBill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: "Error loading decrypted bills" });
  }
});

router.put("/:id/pay", async (req, res) => {
  try {
    await DecryptedBill.findOneAndUpdate(
      { billId: req.params.id },
      { status: "Paid" }
    );
    res.json({ message: "Bill marked as Paid" });
  } catch (err) {
    res.status(500).json({ message: "Error updating bill" });
  }
});


module.exports = router;
