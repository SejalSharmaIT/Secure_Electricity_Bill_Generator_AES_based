
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS file

const Header = () => (
  <header className="header">
    <h1>Electricity Bill Generator</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add-customer">Add Customer</Link>
      <Link to="/add-meter">Add Meter</Link>
      <Link to="/generate-bill">Generate Bill</Link>
      <Link to="/view-bills">View Bills</Link>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="footer">
    © 2025 Electricity Bill Generator · Simplifying Electricity Management
  </footer>
);

const HomePage = () => {
  return (
    <>
      <Header />

      <main className="container">
        <section className="intro">
          <h2>Welcome to Electricity Bill Generator</h2>
          <p>
            A simple and reliable system to handle electricity billing with ease. 
            Manage customer details, monitor electricity usage, and generate accurate bills in just a few clicks.
          </p>

          <div className="features">
            <div>✓ Add and manage Customers</div>
            <div>✓ Assign Meters to Customers</div>
            <div>✓ Generate and View Bills</div>
            <div>✓ Automatic Bill Calculation</div>
            <div>✓ Secure Data Management</div>
            <div>✓ Quick Search & Reports</div>
          </div>
        </section>

        <section className="cards">
          <div className="card">
            <h3>Add Customer</h3>
            <p>Create a new customer profile with name, address, and email.</p>
            <Link to="/add-customer" className="card-button">Open Form →</Link>
          </div>

          <div className="card">
            <h3>Add Meter</h3>
            <p>Assign a unique meter number to an existing customer.</p>
            <Link to="/add-meter" className="card-button">Open Form →</Link>
          </div>

          <div className="card">
            <h3>Generate Bill</h3>
            <p>Enter a month and units consumed to create a new bill.</p>
            <Link to="/generate-bill" className="card-button">Create Bill →</Link>
          </div>

          <div className="card">
            <h3>View & Manage Bills</h3>
            <p>Search, filter, and mark bills as paid/unpaid.</p>
            <Link to="/view-bills" className="card-button">View Bills →</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
