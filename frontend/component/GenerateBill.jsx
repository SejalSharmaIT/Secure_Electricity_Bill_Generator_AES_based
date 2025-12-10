// GenerateBill.jsx
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./GenerateBill.css";

// ================== Encryption Utilities ==================

// AES Encryption
const encryptAES = (text) => {
  if (!text && text !== 0) return "";
  return CryptoJS.AES.encrypt(String(text), "secret-key").toString();
};

// Caesar Cipher
const caesarEncrypt = (str, shift = 3) => {
  if (str === null || str === undefined) return "";
  return String(str)
    .split("")
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const base = char <= "Z" ? 65 : 97;
        return String.fromCharCode(
          ((char.charCodeAt(0) - base + shift) % 26) + base
        );
      }
      return char;
    })
    .join("");
};

// Rail Fence Cipher
const railFenceEncrypt = (text, key = 3) => {
  if (!text || key <= 1) return text || "";
  const str = String(text);
  const rail = Array.from({ length: key }, () => []);
  let row = 0,
    dir = 1;

  for (let ch of str) {
    rail[row].push(ch);
    row += dir;
    if (row === 0 || row === key - 1) dir *= -1;
  }

  return rail.flat().join("");
};

// Monoalphabetic Substitution Cipher
const monoAlphabeticEncrypt = (text) => {
  if (!text) return "";

  const plain = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cipher = "QWERTYUIOPASDFGHJKLZXCVBNM";

  return String(text)
    .toUpperCase()
    .split("")
    .map((char) => {
      const idx = plain.indexOf(char);
      return idx !== -1 ? cipher[idx] : char;
    })
    .join("");
};

// ================== GenerateBill Component ==================
const GenerateBill = () => {
  const [form, setForm] = useState({
    meterId: "",
    customerId: "",
    unitsConsumed: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      meterId: "",
      customerId: "",
      unitsConsumed: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.meterId || !form.customerId || !form.unitsConsumed) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    // ENCRYPTION ONLY FOR DISPLAY / PROJECT REQUIREMENT
    const aes = encryptAES(form.unitsConsumed);
    const caesar = caesarEncrypt(form.unitsConsumed);
    const rail = railFenceEncrypt(form.unitsConsumed);
    const mono = monoAlphabeticEncrypt(form.unitsConsumed);

    console.log("AES:", aes);
    console.log("Caesar:", caesar);
    console.log("Rail Fence:", rail);
    console.log("Mono:", mono);

    // Backend expects ONLY these fields:
    const payload = {
      meterId: form.meterId,
      customerId: form.customerId,
      unitsConsumed: form.unitsConsumed,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bills/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Bill generated successfully!");
        resetForm();
      } else {
        alert(result.message || "Failed to generate bill.");
      }
    } catch (err) {
      console.error("GenerateBill Error:", err);
      alert("Error generating bill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-container">
        <div className="add-form-card">
          <h2>Generate Bill</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="meterId"
              placeholder="Meter ID"
              value={form.meterId}
              onChange={handleChange}
              required
            />

            <input
              name="customerId"
              placeholder="Customer ID"
              value={form.customerId}
              onChange={handleChange}
              required
            />

            <input
              name="unitsConsumed"
              type="number"
              placeholder="Units Consumed"
              value={form.unitsConsumed}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Bill"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GenerateBill;
