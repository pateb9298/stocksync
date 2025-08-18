import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import PartCard from "../components/PartCard.js";
import "./browseparts.css";

export default function BrowseParts() {
  return (
    <div className="browse-parts-container">
      {/* Header */}
      <div className="browse-parts-header">
        <h1>Browse Spare Parts</h1>
        <p>Discover 6+ spare parts from companies worldwide</p>
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

          {/* Category */}
          <div className="filter-group">
            <label>Category</label>
            <select>
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Auto</option>
              <option>Industrial</option>
            </select>
          </div>

          {/* Condition */}
          <div className="filter-group">
            <label>Condition</label>
            <select>
              <option>All Conditions</option>
              <option>New</option>
              <option>Used</option>
            </select>
          </div>

          {/* Listing Type */}
          <div className="filter-group">
            <label>Listing Type</label>
            <select>
              <option>All Types</option>
              <option>For Sale</option>
              <option>For Trade</option>
              <option>Free</option>
            </select>
          </div>

          {/* Location */}
          <div className="filter-group">
            <label>Location</label>
            <input type="text" placeholder="Enter city or country" />
          </div>
        </aside>

        {/* Parts Grid */}
        <main className="browse-parts-grid">
          <div className="grid-header">
            <p>6 Parts Found</p>
            <select>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid-items">
            <PartCard
              title="Medical Grade Power Supply"
              manufacturer="TDK-Lambda"
              model="MPS-65-24"
              price="$125"
              conditionTags={["medical", "new"]}
              quantity={8}
              location="Frankfurt, Germany"
              company="MedTech Components"
              date="Aug 9"
            />
            <PartCard
              title="ABB VFD Drive ACS580"
              manufacturer="ABB"
              model="ACS580-01-026A-4"
              price="for trade"
              conditionTags={["industrial", "used excellent"]}
              quantity={1}
              location="Rotterdam, Netherlands"
              company="Dutch Industrial Exchange"
              date="Aug 9"
              featured
            />
            <PartCard
              title="Honeywell Thermostat Controller"
              manufacturer="Honeywell"
              model="T6 Pro WiFi"
              price="$89.99"
              conditionTags={["hvac", "new"]}
              quantity={2}
              location="Berlin, Germany"
              company="Honeywell Supplies"
              date="Aug 7"
            />
            <PartCard
              title="Caterpillar Engine Oil Filter"
              manufacturer="Caterpillar"
              model="1R-0749"
              price="$24.5"
              conditionTags={["industrial", "new"]}
              quantity={5}
              location="Detroit, USA"
              company="HeavyDuty Parts Co."
              date="Aug 6"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
