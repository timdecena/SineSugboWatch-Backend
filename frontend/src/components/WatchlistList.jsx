import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/WatchlistList.css'; // Adjust the path as needed

const WatchlistList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleViewWatchlist = (id) => {
    navigate(`/watchlist/${id}`);
  };

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

  const handleDeleteWatchlist = async (id, listname) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the watchlist "${listname}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/watchlist/deleteWatchlistDetails/${id}`);
      setWatchlist(watchlist.filter((item) => item.watchlist_id !== id));
      alert(`Watchlist "${listname}" deleted successfully`);
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
    <div className="watchlist-container">
      <h2>{username ? `${username}'s Watchlist` : 'Your Watchlist'}</h2>
      {watchlist.length > 0 ? (
        watchlist.map((item) => (
          <div key={item.watchlist_id} className="watchlist-card">
            <p><span>Watchlist Name:</span> {item.listname}</p>
            <div className="watchlist-actions">
              <button className="delete" onClick={() => handleDeleteWatchlist(item.watchlist_id, item.listname)}>
                Delete
              </button>
              <button className="edit" onClick={() => handleEditWatchlist(item.watchlist_id)}>
                Edit Watchlist
              </button>
              <button className="view" onClick={() => handleViewWatchlist(item.watchlist_id)}>
                View Watchlist
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-watchlist-message">No watchlist found.</p>
      )}
      <button className="create" onClick={handleCreateWatchlist}>Create Watchlist</button>
    </div> 
  );
};

export default WatchlistList;
