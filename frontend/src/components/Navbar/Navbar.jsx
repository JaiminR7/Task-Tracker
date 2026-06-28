import { Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="navbar">
      <div
        className="navbar__brand"
        aria-label="Task Tracker application logo and name"
      >
        <div className="navbar__logo" aria-hidden="true">
          TT
        </div>
        <div>
          <p className="navbar__eyebrow">Task Tracker</p>
          <h1 className="navbar__title">Task Tracker</h1>
        </div>
      </div>

      <div className="navbar__actions">
        <button
          type="button"
          className="navbar__toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? (
            <>
              <Sun size={18} />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={logout}
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", gap: "0.45rem", display: "inline-flex", alignItems: "center" }}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

        <div className="navbar__user" aria-label="User profile">
          <span className="navbar__avatar" aria-hidden="true">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </span>
          <div>
            <small className="navbar__label">Signed in as</small>
            <p className="navbar__name">{user?.name || "User"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
