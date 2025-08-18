import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import "./App.css";
import BrowseParts from "./pages/BrowseParts.js";
import AddPart from "./pages/AddPart.js";
import MyListings from "./pages/MyListings.js";

function Header() {
  return (
    <header className="navbar">
      <div className="nav-logo">StockSync</div>
      <nav>
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <NavLink to="/browse-parts" className="nav-link">Browse Parts</NavLink>
        <NavLink to="/add-part" className="nav-link">List New Parts</NavLink>
        <NavLink to="/my-listings" className="nav-link">My Listings</NavLink>
      </nav>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero">
        <p className="welcome">Welcome back!</p>
        <h1>Your Spare Parts Marketplace</h1>
        <p className="subtitle">
          Turn excess inventory into revenue. Connect with companies worldwide
          to buy, sell, and trade industrial spare parts efficiently.
        </p>
        <div className="hero-buttons">
          <Link to="/add-part" className="btn primary">
            + List New Part
          </Link>
          <Link to="/browse-parts" className="btn secondary">
            Browse Parts
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card">
          <p className="label">MY ACTIVE LISTINGS</p>
          <h2>6</h2>
          <p className="sub">6 total</p>
        </div>
        <div className="stat-card">
          <p className="label">TOTAL INVENTORY VALUE</p>
          <h2>$8,434.83</h2>
          <p className="sub green">Based on listed prices</p>
        </div>
        <div className="stat-card">
          <p className="label">PARTS IN MARKETPLACE</p>
          <h2>6</h2>
          <p className="sub purple">Updated hourly</p>
        </div>
        <div className="stat-card">
          <p className="label">RECENT ACTIVITY</p>
          <h2>6</h2>
          <p className="sub orange">New this week</p>
        </div>
      </div>

      {/* Parts Sections */}
      <div className="parts-sections">
        {/* Recent Parts Listed */}
        <div className="recent-parts card">
          <div className="section-header">
            <h3>Recent Parts Listed</h3>
            <Link to="/browse-parts" className="view-all">View All →</Link>
          </div>
          <div className="part-item">
            <div className="part-icon">🔌</div>
            <div className="part-info">
              <strong>Medical Grade Power Supply</strong>
              <p>TDK-Lambda • Model: MPS-65-24</p>
            </div>
            <span className="price">$125</span>
          </div>
          <div className="part-item">
            <div className="part-icon">⚙️</div>
            <div className="part-info">
              <strong>ABB VFD Drive ACS580</strong>
              <p>ABB • Model: ACS580-01-026A-4</p>
            </div>
            <span className="price">for trade</span>
          </div>
          <div className="part-item">
            <div className="part-icon">🌡️</div>
            <div className="part-info">
              <strong>Honeywell Thermostat Controller</strong>
              <p>Honeywell • Model: T6 Pro WiFi</p>
            </div>
            <span className="price">$89.99</span>
          </div>
        </div>

        {/* Featured Parts */}
        <div className="featured-parts card">
          <div className="section-header">
            <h3>Featured Parts</h3>
            <Link to="/browse-parts" className="view-all">See More →</Link>
          </div>
          <div className="part-item">
            <div className="part-icon">⭐</div>
            <div className="part-info">
              <strong>ABB VFD Drive ACS580</strong>
              <p>ABB</p>
            </div>
            <span className="price">for trade</span>
          </div>
          <div className="part-item">
            <div className="part-icon">💻</div>
            <div className="part-info">
              <strong>Siemens S7-1200 CPU 1214C</strong>
              <p>Siemens</p>
            </div>
            <span className="price">$285.99</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// function AddPart() {
//   return (
//     <div className="page">
//       <h1>Add New Part</h1>
//       <p>This is a placeholder page for adding a part.</p>
//     </div>
//   );
// }

// function BrowseParts() {
//   return (
//     <div className="page">
//       <h1>Browse Parts</h1>
//       <p>This is a placeholder page for browsing parts.</p>
//     </div>
//   );
// }

// function MyListings() {
//   return (
//     <div className="page">
//       <h1>My Listings</h1>
//       <p>This is a placeholder page for your listings.</p>
//     </div>
//   );
// }

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route path="/browse-parts" element={<BrowseParts />} />
        <Route path="/my-listings" element={<MyListings />} />
      </Routes>
    </Router>
  );
}



// //Main React component - acts as the root of app's UI
// //Everything you see in the browser starts from here
// //It pulls in other components or pages

// // Import React and hooks
// import React, { useState, useEffect } from "react";

// function App() {
//   // State to store products fetched from the backend
//   const [products, setProducts] = useState([]);
//   // State to store the form input values
//   const [form, setForm] = useState({ id: "", name: "", stock: "" });

//   // Fetch products from Flask API
//   useEffect(() => {
//     fetch("http://localhost:5000/api/products") // GET request
//       .then((res) => res.json()) // Parse JSON response
//       .then((data) => setProducts(data)) // Save products to state
//       .catch((err) => console.error(err)); // Log errors
//   }, []); // Empty dependency array = run once on mount

//   // Update form state when input fields change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     // ...form keeps other values, [e.target.name] updates the field that changed
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // POST request to Flask API to add a new product
//     fetch("http://localhost:5000/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" }, // Sending JSON
//       body: JSON.stringify({
//         id: Number(form.id), // Convert string input to number
//         name: form.name,
//         stock: Number(form.stock)
//       }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         // After adding, fetch the updated product list
//         return fetch("http://localhost:5000/api/products")
//           .then((res) => res.json())
//           .then((data) => setProducts(data)); // Update products state
//       })
//       .catch((err) => console.error(err)); // Log errors

//     // Clear the form inputs after submission
//     setForm({ id: "", name: "", stock: "" });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>StockSync</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           name="id"
//           placeholder="ID"
//           value={form.id}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock"
//           value={form.stock}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Add Product</button>
//       </form>

//       <h2>Product List</h2>
//       <ul>
//         {products.map((p) => (
//           <li key={p.id}>
//             {p.id} - {p.name} ({p.stock} in stock)
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // Export the component for use in index.js
// export default App;
