// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Get username and userType from localStorage
  const username = localStorage.getItem('username');
  const userType = localStorage.getItem('userType');

  // Logout function to clear user information
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    alert('Logged out successfully!');
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
        {/* Display logged-in user information and logout button */}
        {username && (
          <div className="user-info" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', color: 'white' }}>
              Logged in as: {username} ({userType})
            </span>
            <button onClick={handleLogout} style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
