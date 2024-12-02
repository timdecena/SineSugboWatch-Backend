// src/components/WatchlistFormUpdate.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/WatchlistFormUpdate.css';

const WatchlistFormUpdate = () => {
  const { id } = useParams();
  const [watchlist, setWatchlist] = useState({ listname: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/watchlist/getWatchlistDetails/${id}`);
        setWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchWatchlist();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWatchlist((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/watchlist/updateWatchlistDetails/${id}`, watchlist);
      alert('Watchlist updated successfully');
      navigate('/watchlists');
    } catch (error) {
      console.error('Error updating watchlist:', error);
      alert('Failed to update watchlist. Please check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Watchlist</h2>
      <label>
        Watchlist Name:
        <input
          type="text"
          name="listname"
          value={watchlist.listname}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default WatchlistFormUpdate;