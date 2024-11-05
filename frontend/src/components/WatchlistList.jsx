import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Button, Typography, Grid } from '@mui/material';

const WatchlistList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username');
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
    <Box className="container" sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {username ? `${username}'s Watchlist` : 'Your Watchlist'}
      </Typography>

      {watchlist.length > 0 ? (
        <Grid container spacing={3}>
          {watchlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.watchlist_id}>
              <Paper
                className="watchlist-card"
                sx={{
                  position: 'relative',
                  backgroundSize: 'cover',
                  backgroundImage: `url(https://via.placeholder.com/400x200)`, // Add dynamic background if you have image links
                  height: 200,
                  color: 'white',
                  borderRadius: 3,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <Box sx={{ padding: 2, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                  <Typography variant="body1" noWrap>
                    {item.listname}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteWatchlist(item.watchlist_id)}
                    sx={{ marginRight: 1 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditWatchlist(item.watchlist_id)}
                  >
                    Edit
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" color="textSecondary">
          No watchlist found.
        </Typography>
      )}

      <Box textAlign="center" mt={2}>
        <Button variant="contained" color="success" onClick={handleCreateWatchlist}>
          Create Watchlist
        </Button>
      </Box>
    </Box>
  );
};

export default WatchlistList;
