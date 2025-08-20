import React from "react";
import { FiMapPin, FiCalendar } from "react-icons/fi";

export default function PartCard({
  title,
  manufacturer,
  model,
  price,
  conditionTags = [],
  quantity,
  location,
  company,
  date,
  featured = false,
  image,
  userId, // ID of the seller
  handleContact, // function from parent component
}) {
  return (
    <div className="part-card">
      {/* Image Container */}
      <div className="image-container">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="placeholder-icon">📦</div>
        )}
      </div>

      {/* Info Section */}
      <div className="info">
        {/* Tags */}
        <div className="tags">
          {featured && (
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
          {conditionTags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            Qty: {quantity}
          </span>
        </div>

        {/* Title */}
        <h3>{title}</h3>
        <p>
          {manufacturer} • Model: {model}
        </p>

        {/* Location & Date */}
        <div className="meta">
          <span className="flex items-center gap-1">
            <FiMapPin /> {location}
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar /> {date}
          </span>
        </div>

        {/* Company & Contact */}
        <div className="company-button">
          <span className="text-sm text-blue-600 font-medium">{company}</span>
          <button
            onClick={() => handleContact(userId, title)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Contact
          </button>
        </div>

        {/* Price */}
        <div className="price">
          <span
            className={price.startsWith("$") ? "text-green-600" : "text-blue-600"}
          >
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
