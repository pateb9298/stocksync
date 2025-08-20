import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import BrowseParts from "./pages/BrowseParts.js";
import AddPart from "./pages/AddPart.js";
import MyListings from "./pages/MyListings.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";

function Header({ loggedIn, setLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-logo">StockSync</div>
      <nav className="nav-links-container">
        {loggedIn ? (
          <>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/browse-parts" className="nav-link">Browse Parts</NavLink>
            <NavLink to="/add-part" className="nav-link">List New Parts</NavLink>
            <NavLink to="/my-listings" className="nav-link">My Listings</NavLink>

            {/* Profile circle */}
            <div className="profile-container">
              <div
                className="profile-circle"
                onClick={() => setMenuOpen(prev => !prev)}
              >
                U
              </div>
              {menuOpen && (
                <div className="profile-dropdown">
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

function Layout({ children, loggedIn, setLoggedIn }) {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideHeader && <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {children}
    </>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("access_token"));

  return (
    <Router>
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />

          {/* Protected routes */}
          {loggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-part" element={<AddPart />} />
              <Route path="/browse-parts" element={<BrowseParts />} />
              <Route path="/my-listings" element={<MyListings />} />
              {/* Redirect login/register if already logged in */}
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/register" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Layout>
    </Router>
  );
}
