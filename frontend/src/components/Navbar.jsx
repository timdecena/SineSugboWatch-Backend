// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Get username and userType from localStorage
  const username = localStorage.getItem('username');
  const userType = localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    alert('Logged out successfully!');
    // Optionally redirect to login or home
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <h1>SineSugboWatch HD</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/genre">Genre</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/tv-shows">TV Shows</Link></li>
          <li><Link to="/top-imdb">Top IMDB</Link></li>
          <li><Link to="/recents">Recents</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>
        {/* User Dropdown Menu */}
        <div className="user-dropdown">
          <button onClick={toggleDropdown} className="user-dropdown-button">Admin Controls ▼</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/create-user">Create User</Link>
              <Link to="/users">View Users</Link>
            </div>
          )}
        </div>
        {/* Display logged-in user information */}
        {username && (
          <div className="user-info">
            <span>Logged in as: {username} ({userType})</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
