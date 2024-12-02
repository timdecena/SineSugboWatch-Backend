import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    priceRange: { min: '', max: '' },
    ratingRange: { min: '', max: '' },
  });

  const username = localStorage.getItem('username');
  const userType = localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    alert('Logged out successfully!');
    setDropdownVisible(false);
    navigate('/login');
  };

  const handleSearch = () => {
    setSearchModalVisible(false);
    navigate('/searched-movies', { state: filters });
  };

  const handleChange = (e) => {
    const { name, value } = e.target; 
    if (name.includes('price') || name.includes('rating')) {
      const [key, range] = name.split('-');
      setFilters((prev) => ({
        ...prev,
        [`${key}Range`]: { ...prev[`${key}Range`], [range]: value },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Only show the navbar if the user is logged in
  if (!username || !userType) {
    return null; // Do not render anything if the user is not logged in
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>SineSugboWatch HD</h1>
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/watchlists">Watchlist</Link></li>
          <li><Link to="/recommendations">Recommendations</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
        <div className="search-bar">
          <button onClick={() => setSearchModalVisible(true)}>🔍</button>
        </div>
        
        {username && (
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
              <button className="dropdown-toggled">Options</button>
              {dropdownVisible && (
                <div className="dropdown-menu" style={{ position: 'absolute', backgroundColor: '#333', padding: '10px' }}>
                  {userType === 'user' && (
                    <>
                      <Link to="/user" className="dropdown-item">User Details</Link>
                      <Link to="/transactions" className="dropdown-item">View Current Transactions</Link>
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

            <button onClick={handleLogout} style={{ backgroundColor: '#e63946', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Search Modal */}
      {searchModalVisible && (
        <div className="search-modal">
          <div className="search-modal-content">
            <h2>Search Movies</h2>
            <div className="search-field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleChange}
                placeholder="Enter movie title"
              />
            </div>
            <div className="search-field">
              <label>Genre</label>
              <input
                type="text"
                name="genre"
                value={filters.genre}
                onChange={handleChange}
                placeholder="Enter genre"
              />
            </div>
            <div className="search-field">
              <label>Price Range</label>
              <input
                type="number"
                name="price-min"
                value={filters.priceRange.min}
                onChange={handleChange}
                placeholder="Min"
              />
              <input
                type="number"
                name="price-max"
                value={filters.priceRange.max}
                onChange={handleChange}
                placeholder="Max"
              />
            </div>
            <div className="search-field">
              <label>Rating Range</label>
              <input
                type="number"
                name="rating-min"
                value={filters.ratingRange.min}
                onChange={handleChange}
                placeholder="Min"
              />
              <input
                type="number"
                name="rating-max"
                value={filters.ratingRange.max}
                onChange={handleChange}
                placeholder="Max"
              />
            </div>
            <div className="search-buttons">
              <button onClick={handleSearch}>Search</button>
              <button onClick={() => setSearchModalVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
