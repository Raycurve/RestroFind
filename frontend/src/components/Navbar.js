import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/burger.png" alt="Restaurant Finder Logo" className="navbar-logo-image" />
          <span className="navbar-logo-text">Restaurant Finder</span>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Nearby</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;