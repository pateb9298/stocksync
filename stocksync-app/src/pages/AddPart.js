import React, { useState } from "react";
import "./AddPart.css";

export default function AddPart() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="add-part-container">
      <h1 className="page-title">List New Spare Part</h1>
      <p className="subtitle">
        Share your spare parts with the marketplace
      </p>

      {/* Step Indicators */}
      <div className="steps">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          <span>1</span> Part Details
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          <span>2</span> Listing Info
        </div>
        <div className={`step ${step === 3 ? "active" : ""}`}>
          <span>3</span> Photos & Review
        </div>
      </div>

      {/* Step 1 Form */}
      {step === 1 && (
        <div className="form-card">
          <h2 className="form-title">📦 Part Details</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Part Name *</label>
              <input type="text" placeholder="e.g. Industrial Motor Controller" />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select>
                <option>Select category</option>
                <option>Electronics</option>
                <option>Automotive</option>
                <option>Industrial</option>
              </select>
            </div>
            <div className="form-group">
              <label>Model/Part Number *</label>
              <input type="text" placeholder="e.g. MC-450X" />
            </div>
            <div className="form-group">
              <label>Manufacturer *</label>
              <input type="text" placeholder="e.g. Siemens" />
            </div>
            <div className="form-group">
              <label>Condition *</label>
              <select>
                <option>Select condition</option>
                <option>New</option>
                <option>Used</option>
                <option>Refurbished</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity *</label>
              <input type="number" defaultValue={1} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Technical Specifications</label>
            <textarea placeholder="Enter detailed specifications, dimensions, power requirements, etc." />
          </div>

          <div className="form-actions">
            <button className="btn secondary" disabled>
              ← Previous Step
            </button>
            <button className="btn primary" onClick={nextStep}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* Placeholder for future steps */}
      {step === 2 && (
  <div className="form-card">
    <h2 className="form-title">📝 Listing Info</h2>

    <div className="form-grid">
      <div className="form-group">
        <label>Listing Title *</label>
        <input type="text" placeholder="e.g. Siemens Motor Controller - New" />
      </div>

      <div className="form-group">
        <label>Listing Type *</label>
        <select>
          <option>Select type</option>
          <option>For Sale</option>
          <option>For Trade</option>
          <option>Wanted</option>
        </select>
      </div>

      <div className="form-group">
        <label>Price (USD) *</label>
        <input type="number" placeholder="e.g. 250.00" />
      </div>

      <div className="form-group">
        <label>Currency *</label>
        <select>
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
        </select>
      </div>

      <div className="form-group">
        <label>Location *</label>
        <input type="text" placeholder="e.g. Toronto, Canada" />
      </div>

      <div className="form-group">
        <label>Availability *</label>
        <select>
          <option>Select availability</option>
          <option>In Stock</option>
          <option>Lead Time</option>
          <option>Out of Stock</option>
        </select>
      </div>
    </div>

    <div className="form-group full-width">
      <label>Additional Notes</label>
      <textarea placeholder="Add shipping info, warranty, or other details" />
    </div>

    <div className="form-actions">
      <button className="btn secondary" onClick={prevStep}>
        ← Previous Step
      </button>
      <button className="btn primary" onClick={nextStep}>
        Next Step →
      </button>
    </div>
  </div>
)}


      {step === 3 && (
  <div className="form-card">
    {/* Photos Section */}
    <h2 className="form-title">📷 Photos & Documentation</h2>
    <div className="upload-box">
      <div className="upload-content">
        <div className="upload-icon">🖼️</div>
        <p className="upload-title">Add Photos</p>
        <p className="upload-sub">Drag & drop images here or click to browse</p>
        <button className="btn secondary">Select Photos</button>
      </div>
    </div>
    <div className="photo-tips">
      <strong>📌 Photo Tips:</strong> Include clear photos showing the part condition, model numbers, and any certifications.  
      First photo will be used as the main image.
    </div>

    {/* Preview Section */}
    <h2 className="form-title">👁️ Preview Your Listing</h2>
    <div className="preview-card">
      <div className="preview-left">
        <div className="preview-icon">📦</div>
        <div>
          <h3 className="preview-title">StockSync Pallete</h3>
          <p className="preview-sub">Model: StockSync Pallete</p>
          <p className="preview-sub">Manufacturer: StockSync Pallete</p>
        </div>
      </div>
      <div className="preview-price">$0</div>
    </div>

    <div className="form-actions">
      <button className="btn secondary" onClick={prevStep}>
        ← Previous Step
      </button>
      <button className="btn primary">Submit Listing</button>
    </div>
  </div>
)}

    </div>
  );
}
