import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand" aria-label="Task Tracker application logo and name">
        <div className="navbar__logo" aria-hidden="true">
          TT
        </div>
        <div>
          <p className="navbar__eyebrow">Task Tracker</p>
          <h1 className="navbar__title">Task Tracker</h1>
        </div>
      </div>

      <div className="navbar__actions">
        <button type="button" className="navbar__toggle" aria-label="Dark mode toggle placeholder">
          <span aria-hidden="true">◐</span>
          <span>Dark Mode</span>
        </button>

        <div className="navbar__user" aria-label="User placeholder">
          <span className="navbar__avatar" aria-hidden="true">
            U
          </span>
          <div>
            <small className="navbar__label">Signed in as</small>
            <p className="navbar__name">User</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;