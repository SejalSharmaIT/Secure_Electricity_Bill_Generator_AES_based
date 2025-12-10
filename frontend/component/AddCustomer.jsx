
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./AddCustomer.css"; // Import the CSS file


// ================== ENCRYPTION FUNCTIONS ==================

// 1. AES Encryption
const encryptAES = (text) => {
  return CryptoJS.AES.encrypt(text, "secret-key").toString();
};

// 2. Caesar Cipher Encryption
const caesarEncrypt = (str, shift = 3) => {
  return str
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

// 3. Rail Fence Cipher Encryption
const railFenceEncrypt = (text, key = 3) => {
  if (key <= 1) return text;
  let rail = Array.from({ length: key }, () => []);
  let dir = 1,
    row = 0;

  for (let char of text) {
    rail[row].push(char);
    row += dir;
    if (row === 0 || row === key - 1) dir *= -1;
  }

  return rail.flat().join("");
};

// ================== ADD CUSTOMER PAGE ==================
const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        // RAW DATA (Decrypted)
    const decryptedData = {
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
    };


    // Encrypt all fields before storing
    const encryptedData = {
      nameAES: encryptAES(customer.name),
      nameCaesar: caesarEncrypt(customer.name),
      nameRail: railFenceEncrypt(customer.name),

      emailAES: encryptAES(customer.email),
      addressAES: encryptAES(customer.address),
      phoneAES: encryptAES(customer.phone),
      
    };


    // FINAL DATA SENT TO BACKEND
    const payload = { decryptedData, encryptedData };

    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

const result = await response.json();
alert(result.message || "Customer Added Successfully!");


      // Clear form
      setCustomer({
        name: "",
        email: "",
        address: "",
        phone: "",
      });
    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong!");
    }
  };

return (
    <>
      

      <div className="add-container">
        <div className="add-form-card">
          <h2>Add Customer Details</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={customer.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleChange}
              required
            />

            <button type="submit">Save Customer</button>
            
          </form>
        </div>
      </div>

    </>
  );
  
};

export default AddCustomer;





