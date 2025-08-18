import React from "react";
import "./mylistings.css";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiMapPin } from "react-icons/fi";

export default function MyListings() {
  return (
    <div className="mylistings-container">

      {/* Page Title */}
      <h1 className="page-title">My Listings</h1>
      <p className="page-subtitle">Manage your 9 spare part listings</p>

      {/* Header Stats */}
      <div className="stats-header">
        <div className="stat-box">
          <p>AVAILABLE PARTS</p>
          <h2>9</h2>
        </div>
        <div className="stat-box">
          <p>TOTAL VALUE</p>
          <h2>$8,512.83</h2>
        </div>
        <div className="stat-box">
          <p>PARTS SOLD</p>
          <h2>0</h2>
        </div>
        <Link to="/add-part" className="add-btn">+ Add New Listing</Link>
      </div>

      {/* Listings Section */}
      <div className="listings-section">
        <h2>Your Listings</h2>

        {/* Listing Card */}
        <div className="listing-card">
          <div className="listing-left">
            <div className="listing-icon">📦</div>
            <div className="listing-info">
              <h3>StockSync Pallete</h3>
              <p>StockSync Pallete • Model: StockSync Pallete</p>
              <div className="listing-tags">
                <span className="tag">hvac</span>
                <span className="qty">Qty: 1</span>
              </div>
              <div className="listing-meta">
                <span><FiMapPin /> StockSync Pallete</span>
                <span>Listed Aug 17, 2025</span>
              </div>
            </div>
          </div>
          <div className="listing-actions">
            <span className="status available">Available • for sale</span>
            <div className="action-buttons">
              <button className="edit"><FiEdit /> Edit</button>
              <button className="delete"><FiTrash2 /> Delete</button>
            </div>
          </div>
        </div>

        {/* Example of another listing */}
        <div className="listing-card">
          <div className="listing-left">
            <div className="listing-icon">🔧</div>
            <div className="listing-info">
              <h3>Wrench</h3>
              <p>Siemens • Model: MC-450X</p>
              <div className="listing-tags">
                <span className="tag red">construction</span>
                <span className="qty">Qty: 24</span>
              </div>
              <div className="listing-meta">
                <span><FiMapPin /> Cambridge</span>
                <span>Listed Aug 17, 2025</span>
              </div>
            </div>
          </div>
          <div className="listing-actions">
            <span className="status available">$3.25</span>
            <div className="action-buttons">
              <button className="edit"><FiEdit /> Edit</button>
              <button className="delete"><FiTrash2 /> Delete</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
