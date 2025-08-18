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



