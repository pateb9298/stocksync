import React from "react";
import "./mylistings.css";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiMapPin } from "react-icons/fi";
import axios from "axios";


export default function MyListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_parts");
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  return (
    <div className="mylistings-container">

      {/* Page Title */}
      <h1 className="page-title">My Listings</h1>
      <p className="page-subtitle">Manage your 9 spare part listings</p>

      {/* Header Stats */}
      <div className="stats-header">
        <div className="stat-box">
          <p>AVAILABLE PARTS</p>
          <h2>{listings.length}</h2>
        </div>
        <div className="stat-box">
          <p>TOTAL VALUE</p>
          <h2>${listings.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)}</h2>
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
        {listings.map((listing) => (
        <div className="listing-card" key={listing.id}>
          <div className="listing-left">
            <div className="listing-icon">📦</div>
            <div className="listing-info">
              <h3>{listing.name}</h3>
              <p>{listing.brand} • Model: {listing.model}</p>
              <div className="listing-tags">
                <span className="tag">{listing.category}</span>
                <span className="qty">Qty: {listing.quantity}</span>
              </div>
              <div className="listing-meta">
                <span><FiMapPin /> {listing.location}</span>
                <span>Listed {new Date(listing.data_listed).toLocaleDataString()}</span>
              </div>
            </div>
          </div>
          <div className="listing-actions">
            <span className="status available">{listing.status}</span>
            <div className="action-buttons">
              <button className="edit"><FiEdit /> Edit</button>
              <button className="delete"><FiTrash2 /> Delete</button>
            </div>
          </div>
        </div>
))}

      </div>
    </div>
  );
}
