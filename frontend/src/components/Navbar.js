import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <nav className="nav-center">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}

          {user && (
            <NavLink to="/donors" className={linkClass}>
              Donors
            </NavLink>
          )}

          {user && (
            <NavLink to="/notifications" className={linkClass}>
              Notifications
            </NavLink>
          )}

          <NavLink to="/register-donor" className={linkClass}>
            Register Donor
          </NavLink>

          <NavLink to="/request-blood" className={linkClass}>
            Request Blood
          </NavLink>
        </nav>

        <div className="nav-right">
          {user ? (
            <>
              <span className="welcome">
                Hello, {user.email}
              </span>

              <button className="nav-right-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;
