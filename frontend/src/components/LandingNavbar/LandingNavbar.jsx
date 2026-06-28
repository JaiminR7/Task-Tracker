import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import { useAuth } from "../../context/AuthContext";
import "./LandingNavbar.css";

function LandingNavbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="landing-navbar">
      <div className="landing-navbar__container">
        <Link to="/" className="landing-navbar__brand">
          <div className="landing-navbar__logo">TT</div>
          <span className="landing-navbar__title">Task Tracker</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="landing-navbar__menu landing-navbar__menu--desktop">
          <a href="#features" className="landing-navbar__link">Features</a>
          <a href="#how-it-works" className="landing-navbar__link">How It Works</a>
          <a href="#statistics" className="landing-navbar__link">Capabilities</a>
          <Link to="/dashboard" className="landing-navbar__link">Dashboard</Link>
          
          <div className="landing-navbar__divider"></div>

          <button
            type="button"
            className="landing-navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <>
              <button 
                onClick={logout} 
                className="btn btn-secondary landing-navbar__btn" 
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <LogOut size={16} /> Logout
              </button>
              <Link to="/dashboard" className="btn btn-primary landing-navbar__btn">Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary landing-navbar__btn">Login</Link>
              <Link to="/signup" className="btn btn-primary landing-navbar__btn">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="landing-navbar__mobile-actions">
          <button
            type="button"
            className="landing-navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="landing-navbar__menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen ? (
        <div className="landing-navbar__menu--mobile">
          <a href="#features" className="landing-navbar__link" onClick={toggleMenu}>Features</a>
          <a href="#how-it-works" className="landing-navbar__link" onClick={toggleMenu}>How It Works</a>
          <a href="#statistics" className="landing-navbar__link" onClick={toggleMenu}>Capabilities</a>
          <Link to="/dashboard" className="landing-navbar__link" onClick={toggleMenu}>Dashboard</Link>
          
          <div className="landing-navbar__divider--mobile"></div>
          
          {isAuthenticated ? (
            <div className="landing-navbar__mobile-buttons">
              <button 
                onClick={() => { logout(); toggleMenu(); }} 
                className="btn btn-secondary" 
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", width: "100%" }}
              >
                <LogOut size={16} /> Logout
              </button>
              <Link to="/dashboard" className="btn btn-primary" onClick={toggleMenu}>Dashboard</Link>
            </div>
          ) : (
            <div className="landing-navbar__mobile-buttons">
              <Link to="/login" className="btn btn-secondary" onClick={toggleMenu}>Login</Link>
              <Link to="/signup" className="btn btn-primary" onClick={toggleMenu}>Sign Up</Link>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
}

export default LandingNavbar;
