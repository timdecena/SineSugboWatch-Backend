import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
          <button onClick={toggleDropdown} className="user-dropdown-button">Users ▼</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/create-user">Create User</Link>
              <Link to="/users">View Users</Link>
              <Link to="/update-user">Update User</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
