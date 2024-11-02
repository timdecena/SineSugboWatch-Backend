// src/components/WatchlistForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const WatchlistForm = () => {
  const [listname, setListname] = useState('');
  const userId = parseInt(localStorage.getItem('user_id'), 10); // Parse user_id as an integer

  const handleCreateWatchlist = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/watchlist/postWatchlistRecord', {
        listname,
        user: { user_id: userId }, // Ensure user_id is an integer
      });

      alert(`Watchlist added: ${response.data.listname}`);
      setListname('');
    } catch (error) {
      console.error('Error adding watchlist:', error);
      alert('Error adding watchlist.');
    }
  };

  return (
    <div>
      <h2>Add Watchlist</h2>
      <form onSubmit={handleCreateWatchlist}>
        <input
          type="text"
          placeholder="Watchlist Name"
          value={listname}
          onChange={(e) => setListname(e.target.value)}
          required
        />
        <button type="submit">Add Watchlist</button>
      </form>
    </div>
  );
};

export default WatchlistForm;
