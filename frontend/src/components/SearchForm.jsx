import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/SearchForm.css'; // Make sure to include your CSS file

const SearchForm = () => {
  const [searchquery, setSearchQuery] = useState('');
  const [searchdate, setSearchDate] = useState('');
  const [allowMultiple, setAllowMultiple] = useState(false); // State for checkbox
  const userId = parseInt(localStorage.getItem('user_id'), 10);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setSearchDate(today);
  }, []);

  const handleCreateSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/search/postSearchRecord', {
        searchquery,
        searchdate,
        user: { user_id: userId },
      });

      alert(`Search record added: ${response.data.searchquery}`);
      setSearchQuery('');
      // Reset the date to today's date again after submission
      const today = new Date().toISOString().split('T')[0];
      setSearchDate(today);

      // Redirect to SearchList if allowMultiple is false
      if (!allowMultiple) {
        navigate('/search'); // Adjust the path according to your routing setup
      }
    } catch (error) {
      console.error('Error adding search record:', error);
      alert('Error adding search record.');
    }
  };

  return (
    <div className="search-form-container">
      <h2>Add Search</h2>
      <form onSubmit={handleCreateSearch}>
        <input
          type="text"
          placeholder="Search Query"
          value={searchquery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <input
          type="date"
          value={searchdate}
          onChange={(e) => setSearchDate(e.target.value)}
          required
        />
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={allowMultiple}
              onChange={() => setAllowMultiple(!allowMultiple)}
            />
            Allow multiple queries
          </label>
        </div>
        <button type="submit">Add Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
