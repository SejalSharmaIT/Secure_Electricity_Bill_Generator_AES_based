
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewBills.css";

const ViewBills = () => {
  const [bills, setBills] = useState([]);

  // Load decrypted bills from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bills/decrypted")
      .then((res) => setBills(res.data))
      .catch((err) => console.log("Error fetching bills:", err));
  }, []);

  // Mark bill as Paid
  const markAsPaid = async (billId) => {
    try {
      await axios.put(`http://localhost:5000/api/bills/${billId}/pay`);

      // update status instantly in UI
      setBills((prev) =>
        prev.map((bill) =>
          bill.billId === billId ? { ...bill, status: "Paid" } : bill
        )
      );
    } catch (error) {
      console.log("Error updating bill:", error);
    }
  };

  return (
    <div className="view-bills-container">
      <h2 className="title">Generated Bills</h2>

      <table className="bills-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Customer ID</th>
            <th>Meter ID</th>
            <th>Units Consumed</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill.billId}</td>
              <td>{bill.customerId}</td>
              <td>{bill.meterId}</td>
              <td>{bill.units}</td>
              <td>{bill.amount}</td>

              {/* Status Column */}
              <td
                style={{
                  color: bill.status === "Paid" ? "lime" : "red",
                  fontWeight: "bold",
                }}
                
              >
                {bill.status === "Paid" ? "Paid" : "Unpaid"}
              </td>

              {/* Action Column */}
              <td>
                {bill.status === "Paid" ? (
                  <span style={{ fontSize: "22px", color: "white" }}>✓</span>
                ) : (
                  <button
                    className="pay-btn"
                    onClick={() => markAsPaid(bill.billId)}
                  >
                    Mark as Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="back-btn"
        onClick={() => (window.location.href = "/")}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default ViewBills;
