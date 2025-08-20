import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch current user info
        const userRes = await fetch("http://localhost:5000/get_user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch all parts
        const partsRes = await fetch("http://localhost:5000/get_parts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!partsRes.ok) throw new Error("Failed to fetch parts");
        const allParts = await partsRes.json();
        setParts(allParts);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!user) return <p>Error loading user data.</p>;

  // Filter parts that belong to current user
  const userParts = parts.filter((p) => p.user_id === user.id);
  const totalInventoryValue = userParts.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero">
        <p className="welcome">Welcome back, {user.first_name}!</p>
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
          <h2>{userParts.length}</h2>
          <p className="sub">{userParts.length} total</p>
        </div>
        <div className="stat-card">
          <p className="label">TOTAL INVENTORY VALUE</p>
          <h2>${totalInventoryValue.toFixed(2)}</h2>
          <p className="sub green">Based on listed prices</p>
        </div>
        <div className="stat-card">
          <p className="label">PARTS IN MARKETPLACE</p>
          <h2>{parts.length}</h2>
          <p className="sub purple">Updated hourly</p>
        </div>
        <div className="stat-card">
          <p className="label">RECENT ACTIVITY</p>
          <h2>{parts.slice(0, 5).length}</h2>
          <p className="sub orange">New this week</p>
        </div>
      </div>

      {/* Recent Parts */}
      <div className="parts-sections">
        <div className="recent-parts card">
          <div className="section-header">
            <h3>Recent Parts Listed</h3>
            <Link to="/browse-parts" className="view-all">
              View All →
            </Link>
          </div>
          {userParts.slice(0, 5).map((part) => (
            <div key={part.id} className="part-item">
              {/* Image */}
              <div className="part-image">
                {part.image ? (
                  <img
                    src={part.image}
                    alt={part.listing_title || part.part_name || "Part"}
                  />
                ) : (
                  <div className="part-icon">🔧</div>
                )}
              </div>

              {/* Info */}
              <div className="part-info">
                <strong>{part.listing_title || part.part_name || "N/A"}</strong>
                <p>
                  {part.manufacturer || "N/A"} • Model:{" "}
                  {part.model_number || "N/A"}
                </p>
              </div>

              {/* Price */}
              <span className="price">
                {part.price ? `$${part.price}` : "For Trade"}
              </span>
            </div>
          ))}
          {userParts.length === 0 && <p>No listings yet.</p>}
        </div>
      </div>
    </div>
  );
}
