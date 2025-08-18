import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
      <Link to="/products" style={{ marginRight: "10px", color: "white" }}>Products</Link>
      <Link to="/about" style={{ color: "white" }}>About</Link>
    </nav>
  );
}

export default Navbar;
