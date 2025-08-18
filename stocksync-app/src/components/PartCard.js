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
  featured = false
}) {
  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-3xl">
        📦
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-between h-full">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2 text-xs">
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
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500">
          {manufacturer} • Model: {model}
        </p>

        {/* Location & Date */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <FiMapPin /> {location}
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar /> {date}
          </span>
        </div>

        {/* Company & Button */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-blue-600 font-medium">{company}</span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            Contact
          </button>
        </div>

        {/* Price */}
        <div className="mt-3 text-lg font-bold">
          <span
            className={
              price.startsWith("$") ? "text-green-600" : "text-blue-600"
            }
          >
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
