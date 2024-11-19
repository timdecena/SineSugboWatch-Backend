import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const username = localStorage.getItem('username');
  const userType = localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    alert('Logged out successfully!');
    setDropdownVisible(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>SineSugboWatch HD</h1>
          </Link>
        </div>
        <ul className="nav-links">
          {/* Remove the Home link */}
          <li><Link to="/genre">Genre</Link></li>
          <li><Link to="/watchlists">Watchlist</Link></li>
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
          <div className="user-info" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', color: 'white' }}>
              Logged in as: {username} ({userType})
            </span>

            <div
              className="dropdown"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
              style={{ position: 'relative' }}
            >
              <button className="dropdown-toggle">Options</button>
              {dropdownVisible && (
                <div className="dropdown-menu" style={{ position: 'absolute', backgroundColor: '#333', padding: '10px' }}>
                  

                  {userType === 'user' && (
                    <>
                    <Link to="/users" className="dropdown-item">User Details</Link>
                    <Link to="/search" className="dropdown-item">Search History</Link>
                    <Link to="/pref" className="dropdown-item">View Current Preferences</Link>
                    <Link to="/transactions" className="dropdown-item">View Current Transactions</Link>
                    <Link to="/watchlists" className="dropdown-item">View Current Watchlists</Link>
                    <Link to="/movies" className="dropdown-item">View All Movies</Link>
                    </>
                  )}

                  {userType === 'admin' && (
                    <>
                      <Link to="/users" className="dropdown-item">View All Users</Link>
                      <Link to="/admins" className="dropdown-item">View All Admins</Link>
                      <Link to="/movies" className="dropdown-item">View All Movies</Link>
                      <Link to="/create-movie" className="dropdown-item">Add New Movie</Link>
                      <Link to="/create-admin" className="dropdown-item">Create Admin</Link>
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
          <div className="please-login" style={{ marginLeft: 'auto', color: 'white' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Please Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
