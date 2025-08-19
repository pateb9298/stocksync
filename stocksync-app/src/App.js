import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import BrowseParts from "./pages/BrowseParts.js";
import AddPart from "./pages/AddPart.js";
import MyListings from "./pages/MyListings.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";

function Header({ loggedIn }) {
  return (
    <header className="navbar">
      <div className="nav-logo">StockSync</div>
      <nav>
        {loggedIn && (
          <>
            <NavLink to="/" className="nav-link">Dashboard</NavLink>
            <NavLink to="/browse-parts" className="nav-link">Browse Parts</NavLink>
            <NavLink to="/add-part" className="nav-link">List New Parts</NavLink>
            <NavLink to="/my-listings" className="nav-link">My Listings</NavLink>
          </>
        )}
        {!loggedIn && (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

function Layout({ children, loggedIn }) {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideHeader && <Header loggedIn={loggedIn} />}
      {children}
    </>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Layout loggedIn={loggedIn}>
        <Routes>
          {!loggedIn ? (
            <>
              <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
              <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
              {/* Redirect to login if trying to access dashboard or other pages */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-part" element={<AddPart />} />
              <Route path="/browse-parts" element={<BrowseParts />} />
              <Route path="/my-listings" element={<MyListings />} />
              {/* Redirect login/register if already logged in */}
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
}
