// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // State for toggling dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Get username and userType from localStorage
  const username = localStorage.getItem('username');
  const userType = localStorage.getItem('userType');

  // Logout function to clear user information
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    alert('Logged out successfully!');
    setDropdownVisible(false);  // Hide dropdown on logout
    navigate('/login'); // Redirect to login page
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
        
        {username ? (
          // Display logged-in user info and logout button
          <div className="user-info" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', color: 'white' }}>
              Logged in as: {username} ({userType})
            </span>

            {/* Conditionally render dropdown for userType 'user' or 'admin' */}
            <div
              className="dropdown"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
              style={{ position: 'relative' }}
            >
              <button className="dropdown-toggle">Options</button>
              {dropdownVisible && (
                <div className="dropdown-menu" style={{ position: 'absolute', backgroundColor: '#333', padding: '10px' }}>
                  <Link to="/users" className="dropdown-item">View All Users</Link>
                  <Link to="/admins" className="dropdown-item">View All Admins</Link>
                  <Link to="/pref" className="dropdown-item">View Current Preferences</Link>
                  {/* Additional options for admin */}
                  {userType === 'admin' && (
                    <>
                      <Link to="/manage-users" className="dropdown-item">Manage Users</Link>
                      <Link to="/manage-admins" className="dropdown-item">Manage Admins</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={handleLogout} style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        ) : (
          // Display "Please Login" message when logged out
          <div className="please-login" style={{ marginLeft: 'auto', color: 'white' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Please Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
