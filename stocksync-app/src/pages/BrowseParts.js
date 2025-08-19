import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import PartCard from "../components/PartCard.js";
import "./browseparts.css";
import axios from "axios";

export default function BrowseParts() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_parts");
      setListings(res.data); // res.data is an array of all parts
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  return (
    <div className="browse-parts-container">
      {/* Header */}
      <div className="browse-parts-header">
        <h1>Browse Spare Parts</h1>
        <p>Discover {listings.length} spare parts from companies worldwide</p>
      </div>

      {/* Search Bar */}
      <div className="browse-parts-search">
        <input
          type="text"
          placeholder="Search by part name, model number, manufacturer..."
        />
        <button>
          <FiSearch /> Search
        </button>
      </div>

      {/* Main Content */}
      <div className="browse-parts-main">
        {/* Filters */}
        <aside className="browse-parts-filters">
          <h3>
            <FaFilter /> Filters
          </h3>

          <div className="filter-group">
            <label>Category</label>
            <select>
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Auto</option>
              <option>Industrial</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Condition</label>
            <select>
              <option>All Conditions</option>
              <option>New</option>
              <option>Used</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Listing Type</label>
            <select>
              <option>All Types</option>
              <option>For Sale</option>
              <option>For Trade</option>
              <option>Free</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input type="text" placeholder="Enter city or country" />
          </div>
        </aside>

        {/* Parts Grid */}
        <main className="browse-parts-grid">
          <div className="grid-header">
            <p>{listings.length} Parts Found</p>
            <select>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid-items">
            {listings.map((part) => (
              <PartCard
                key={part.id}
                title={part.listing_title || part.part_name}
                manufacturer={part.manufacturer}
                model={part.model_number}
                price={part.price ? `$${part.price}` : part.listing_type}
                conditionTags={[part.category, part.condition]}
                quantity={part.quantity}
                location={part.location}
                company={part.manufacturer || "N/A"}
                date={new Date(part.id).toLocaleDateString()} // You can replace with proper date if you add a date field
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
