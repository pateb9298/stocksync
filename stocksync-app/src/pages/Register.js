import React, { useState } from "react";
import "./AuthForm.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    console.log("Register data:", formData);
    // Here you’ll call your backend API later
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
      <div className="auth-footer">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
}
