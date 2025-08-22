import React, { useState, useEffect } from "react";
import "./mylistings.css";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiMapPin, FiX } from "react-icons/fi";
import axios from "axios";

export default function MyListings() {
  const token = localStorage.getItem("token");
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Define fetchListings first
  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_parts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setListings([]);
    }
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.post("http://localhost:5000/delete_part", { id });
      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete listing.");
    }
  };

  const handleEditClick = (listing) => {
    setEditingId(listing.id);
    setEditForm({
      part_name: listing.part_name || "",
      manufacturer: listing.manufacturer || "",
      model_number: listing.model_number || "",
      category: listing.category || "",
      quantity: listing.quantity || 0,
      price: listing.price || 0,
      availability: listing.availability || "Available",
      location: listing.location || "",
      image: listing.image || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      await axios.post(
        "http://localhost:5000/edit_part",
        { id, ...editForm },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setListings((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...editForm } : item))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating listing:", err);
      alert("Failed to update listing.");
    }
  };

  const totalValue = Array.isArray(listings)
    ? listings.reduce((sum, item) => sum + Number(item.price || 0), 0)
    : 0;

  return (
    <div className="mylistings-container">
      <h1 className="page-title">My Listings</h1>
      <p className="page-subtitle">
        Manage your {listings.length} spare part listings
      </p>

      <div className="stats-header">
        <div className="stat-box">
          <p>AVAILABLE PARTS</p>
          <h2>{listings.length}</h2>
        </div>
        <div className="stat-box">
          <p>TOTAL VALUE</p>
          <h2>${totalValue.toFixed(2)}</h2>
        </div>
        <div className="stat-box">
          <p>PARTS SOLD</p>
          <h2>0</h2>
        </div>
        <Link to="/add-part" className="add-btn">
          + Add New Listing
        </Link>
      </div>

      <div className="listings-section">
        <h2>Your Listings</h2>

        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          listings.map((listing) => (
            <div className="listing-card" key={listing.id}>
              <div className="listing-left">
                <div className="listing-image">
                  {listing.image ? (
                    <img
                      src={listing.image}
                      alt={listing.part_name || "Part Image"}
                    />
                  ) : (
                    <div className="listing-icon">📦</div>
                  )}
                </div>

                {editingId === listing.id ? (
                  <div className="edit-form">
                    {/* Edit form fields */}
                  </div>
                ) : (
                  <div className="listing-info">
                    <h3>{listing.part_name || "N/A"}</h3>
                    <p>
                      {listing.manufacturer || "N/A"} • Model:{" "}
                      {listing.model_number || "N/A"}
                    </p>
                    <div className="listing-tags">
                      <span className="tag">{listing.category || "N/A"}</span>
                      <span className="qty">Qty: {listing.quantity || 0}</span>
                    </div>
                    <div className="listing-meta">
                      <span>
                        <FiMapPin /> {listing.location || "N/A"}
                      </span>
                      <span>
                        Listed{" "}
                        {listing.date_listed
                          ? new Date(listing.date_listed).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="listing-actions">
                <span className="status available">
                  {listing.availability || "N/A"}
                </span>
                <div className="action-buttons">
                  {editingId === listing.id ? null : (
                    <button
                      className="edit"
                      onClick={() => handleEditClick(listing)}
                    >
                      <FiEdit /> Edit
                    </button>
                  )}
                  <button
                    className="delete"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
