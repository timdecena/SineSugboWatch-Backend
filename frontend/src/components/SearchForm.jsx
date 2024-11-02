import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [searchquery, setSearchQuery] = useState('');
  const [searchdate, setSearchDate] = useState('');
  const userId = parseInt(localStorage.getItem('user_id'), 10);

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
      setSearchDate('');
    } catch (error) {
      console.error('Error adding search record:', error);
      alert('Error adding search record.');
    }
  };

  return (
    <div>
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
        <button type="submit">Add Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
