// AddMeter.jsx
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./AddMeter.css";


// ================== Encryption Utilities ==================

// AES encryption
const encryptAES = (text) => {
  // if value empty, return empty string to avoid errors
  if (!text && text !== 0) return "";
  return CryptoJS.AES.encrypt(String(text), "secret-key").toString();
};

// Caesar cipher (shift letters by default 3)
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
      // keep digits/symbols unchanged
      return char;
    })
    .join("");
};

// Rail Fence cipher (simple implementation)
const railFenceEncrypt = (text, key = 3) => {
  if (!text || key <= 1) return text || "";
  const str = String(text);
  const rail = Array.from({ length: key }, () => []);
  let row = 0;
  let dir = 1;
  for (let ch of str) {
    rail[row].push(ch);
    row += dir;
    if (row === 0 || row === key - 1) dir *= -1;
  }
  return rail.flat().join("");
};

// ================== AddMeter Component ==================
const AddMeter = () => {
  const [form, setForm] = useState({
    meterId: "",
    customerId: "",
    meterType: "",
    installationDate: "",
    initialReading: "",
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
      meterType: "",
      installationDate: "",
      initialReading: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic front-end validation
    if (!form.meterId || !form.customerId || !form.meterType) {
      alert("Please fill Meter ID, Customer ID and Meter Type.");
      return;
    }

    setLoading(true);

    // Encrypt each field (store multiple encrypted forms for demo)
    const payload = {
      // Meter ID variants
      meterIdAES: encryptAES(form.meterId),
      meterIdCaesar: caesarEncrypt(form.meterId),
      meterIdRail: railFenceEncrypt(form.meterId),

      // Customer ID variants
      customerIdAES: encryptAES(form.customerId),
      customerIdCaesar: caesarEncrypt(form.customerId),
      customerIdRail: railFenceEncrypt(form.customerId),

      // Other fields - AES for main storage plus simple ciphers for demo
      meterTypeAES: encryptAES(form.meterType),
      meterTypeCaesar: caesarEncrypt(form.meterType),
      installationDateAES: encryptAES(form.installationDate),
      installationDateCaesar: caesarEncrypt(form.installationDate),
      initialReadingAES: encryptAES(form.initialReading),
      initialReadingCaesar: caesarEncrypt(form.initialReading),
    };

    try {
      const response = await fetch("http://localhost:5000/api/meters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // use the server response to avoid ESLint unused-variable warning
      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Meter added successfully!");
        resetForm();
      } else {
        alert(result.message || "Failed to add meter.");
      }
    } catch (err) {
      console.error("AddMeter Error:", err);
      alert("An error occurred while adding meter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-container">
  <div className="add-form-card">
    <h2>Add Meter</h2>
    <form onSubmit={handleSubmit}>
      <input name="meterId" placeholder="Meter ID" value={form.meterId} onChange={handleChange} required />
      <input name="customerId" placeholder="Customer ID (reference)" value={form.customerId} onChange={handleChange} required />
      <select name="meterType" value={form.meterType} onChange={handleChange} required>
        <option value="">Select Meter Type</option>
        <option value="Single Phase">Single Phase</option>
        <option value="Three Phase">Three Phase</option>
        <option value="Prepaid">Prepaid</option>
        <option value="Smart Meter">Smart Meter</option>
      </select>
      <input name="installationDate" type="date" value={form.installationDate} onChange={handleChange} />
      <input name="initialReading" type="number" placeholder="Initial Reading (units)" value={form.initialReading} onChange={handleChange} />
      <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Meter"}</button>
    </form>
  </div>
</div>
     
    </>
  );
};

export default AddMeter;
