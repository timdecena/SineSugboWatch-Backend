import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchList = () => {
  const [searches, setSearches] = useState([]);
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/search/getAllSearches');
        const userSearches = response.data.filter(
          (item) => item.user && String(item.user.user_id) === String(userId)
        );

        setSearches(userSearches);
      } catch (error) {
        console.error('Error fetching searches:', error);
      }
    };

    fetchSearches();
  }, [userId]);

  const handleDeleteSearch = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/search/deleteSearchDetails/${id}`);
      setSearches(searches.filter((item) => item.search_id !== id));
      alert('Search record deleted successfully');
    } catch (error) {
      console.error('Error deleting search record:', error);
      alert('Failed to delete search record. Please check the console for details.');
    }
  };

  const handleCreateSearch = () => {
    navigate('/create-search');
  };

  return (
    <div className="container">
      <h2>{username ? `${username}'s Search Records` : 'Your Search Records'}</h2>
      {searches.length > 0 ? (
        searches.map((item) => (
          <div key={item.search_id} className="search-card">
            <p><span>ID:</span> {item.search_id}</p>
            <p><span>Search Query:</span> {item.searchquery}</p>
            <p><span>Search Date:</span> {item.searchdate}</p>
            <button onClick={() => handleDeleteSearch(item.search_id)}>Delete</button>
            {/* Removed the Edit button */}
          </div>
        ))
      ) : (
        <p className="no-search-message">No search records found.</p>
      )}
      <button onClick={handleCreateSearch}>Create Search</button>
    </div>
  );
};

export default SearchList;
