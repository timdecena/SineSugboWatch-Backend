// src/components/WatchlistList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WatchlistList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username'); // Retrieve username from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/watchlist/getAllWatchlists');
        const userWatchlist = response.data.filter(
          (item) => item.user && String(item.user.user_id) === String(userId)
        );

        setWatchlist(userWatchlist);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchWatchlist();
  }, [userId]);

  const handleDeleteWatchlist = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/watchlist/deleteWatchlistDetails/${id}`);
      setWatchlist(watchlist.filter((item) => item.watchlist_id !== id));
      alert('Watchlist deleted successfully');
    } catch (error) {
      console.error('Error deleting watchlist:', error);
      alert('Failed to delete watchlist. Please check the console for details.');
    }
  };

  const handleEditWatchlist = (id) => {
    navigate(`/update-watchlist/${id}`);
  };

  const handleCreateWatchlist = () => {
    navigate('/create-watchlist');
  };

  return (
    <div className="container">
      <h2>{username ? `${username}'s Watchlist` : 'Your Watchlist'}</h2>
      {watchlist.length > 0 ? (
        watchlist.map((item) => (
          <div key={item.watchlist_id} className="watchlist-card">
            <p><span>ID:</span> {item.watchlist_id}</p>
            <p><span>Watchlist Name:</span> {item.listname}</p>
            <button onClick={() => handleDeleteWatchlist(item.watchlist_id)}>Delete</button>
            <button onClick={() => handleEditWatchlist(item.watchlist_id)}>Edit Watchlist</button>
          </div>
        ))
      ) : (
        <p className="no-watchlist-message">No watchlist found.</p>
      )}
      <button onClick={handleCreateWatchlist}>Create Watchlist</button>
    </div>
  );
};

export default WatchlistList;
