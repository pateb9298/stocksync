import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import PartCard from "../components/PartCard.js";
import "./browseparts.css";
import axios from "axios";

export default function BrowseParts() {
  const token = localStorage.getItem("token");
  const [listings, setListings] = useState([]); // always an array
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    listing_type: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  // Fetch all parts
  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/get_parts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      setListings(res.data || []);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setListings([]);
    }
    setLoading(false);
  };

  // Handle search + filters
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/search_item", {
        search_term: searchTerm,
        ...filters,
      });
      setListings(res.data || []);
    } catch (err) {
      console.error("Error searching parts:", err);
      setListings([]);
    }
    setLoading(false);
  };

  // Update filter values
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="browse-parts-container">
      {/* Header */}
      <div className="browse-parts-header">
        <h1>Browse Spare Parts</h1>
        <p>Discover {listings?.length || 0} spare parts from companies worldwide</p>
      </div>

      {/* Search Bar */}
      <div className="browse-parts-search">
        <input
          type="text"
          placeholder="Search by part name, model number, manufacturer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FiSearch /> Search
        </button>
      </div>

      {/* Main Content */}
      <div className="browse-parts-main">
        {/* Filters */}
        <aside className="browse-parts-filters">
          <h3><FaFilter /> Filters</h3>

          <div className="filter-group">
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Automotive">Automotive</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Condition</label>
            <select name="condition" value={filters.condition} onChange={handleFilterChange}>
              <option value="">All Conditions</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Listing Type</label>
            <select name="listing_type" value={filters.listing_type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="For Sale">For Sale</option>
              <option value="For Trade">For Trade</option>
              <option value="Wanted">Wanted</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter city or country"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>

          <button className="btn primary" onClick={handleSearch}>Apply Filters</button>
        </aside>

        {/* Parts Grid */}
        <main className="browse-parts-grid">
          <div className="grid-header">
            <p>{listings?.length || 0} Parts Found</p>
            <select>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid-items">
            {loading ? (
              <p>Loading...</p>
            ) : listings?.length > 0 ? (
              listings.map((part) => (
                <PartCard
                  key={part.id}
                  title={part.part_name}
                  manufacturer={part.manufacturer || "N/A"}
                  model={part.model_number || "N/A"}
                  price={part.price ? `$${part.price}` : "N/A"}
                  conditionTags={[part.category, part.condition].filter(Boolean)}
                  quantity={part.quantity || 0}
                  location={part.location || "N/A"}
                  company={part.manufacturer || "N/A"}
                  date={part.date_listed ? new Date(part.date_listed).toLocaleDateString() : "N/A"}
                />
              ))
            ) : (
              <p>No parts found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
