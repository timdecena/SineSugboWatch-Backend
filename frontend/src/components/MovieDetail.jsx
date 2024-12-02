import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/MovieDetail.css';

function MovieDetail() {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movieData, setMovieData] = useState(null); // State to hold the movie data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posterImage, setPosterImage] = useState(''); // State to hold the movie poster image
  const [watchlists, setWatchlists] = useState([]); // Watchlists to display in dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/getMovieById/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie data');
        const data = await response.json();
        setMovieData(data);

        // Retrieve the image for this movie from localStorage
        const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
        const image = storedImages[id] || 'placeholder.png';
        setPosterImage(`/movieimages/${image}`);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    const fetchWatchlists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/watchlist/getAllWatchlists');
        const userId = localStorage.getItem('user_id');
        const userWatchlists = response.data.filter(
          (watchlist) => watchlist.user && watchlist.user.user_id.toString() === userId
        );
        setWatchlists(userWatchlists);
      } catch (error) {
        console.error('Error fetching watchlists:', error);
      }
    };

    fetchMovieData();
    fetchWatchlists();
  }, [id]);

  const handleAddToWatchlist = async (watchlistId) => {
    try {
      // First, fetch the current movies in the selected watchlist
      const response = await fetch(
        `http://localhost:8080/api/watchlist/${watchlistId}/movies`
      );
      if (!response.ok) throw new Error('Failed to fetch watchlist movies');
      const watchlistMovies = await response.json();

      // Check if the movie is already in the watchlist
      const isMovieAlreadyInWatchlist = watchlistMovies.some(
        (movie) => movie.movie_id === movieData.movie_id
      );

      if (isMovieAlreadyInWatchlist) {
        alert(`This movie is already added to "${watchlists.find(wl => wl.watchlist_id === watchlistId).listname}" watchlist.`);
      } else {
        // If not already in the watchlist, add it
        await axios.post(
          `http://localhost:8080/api/watchlist/${watchlistId}/addMovie/${movieData.movie_id}`
        );
        alert(`Added "${movieData.title}" to watchlist!`);
      }
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      alert('Failed to add movie to watchlist.');
    }
  };

  const handleAddTransaction = () => {
    navigate(`/transactionform?movieId=${movieData.movie_id}&price=${movieData.price}`);
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;

  return (
    movieData && (
      <div className="movie-detail">
        <div className="movie-poster">
          <img src={posterImage} alt={`${movieData.title} Poster`} className="poster-image" />
          <p className="movie-title-year">
            <strong>{movieData.title} </strong><br />
          </p>
        </div>
        <div className="movie-info">
          <h1>{movieData.title}</h1>
          <div className="movie-stats">
            <span className="hd-label">HD</span>
            <span className="imdb-rating">Rating {movieData.rating}</span>

          </div>
          <p className="movie-overview">{movieData.description}</p>
          <div className="movie-details">

            <p><strong>Genre:</strong> {movieData.genre}</p>
            <p><strong>Price:</strong> {movieData.price}</p>
            <p><strong>Rating:</strong> {movieData.rating}</p>
          </div>

          <div className="movie-buttons">
          <div className="dropdown-container">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
              {dropdownOpen ? 'Select Watchlist' : 'Add to Watchlist'}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {watchlists.map((watchlist) => (
                  <button
                    key={watchlist.watchlist_id}
                    className="dropdown-item"
                    onClick={() => {
                      handleAddToWatchlist(watchlist.watchlist_id);
                      setDropdownOpen(false);
                    }}
                  >
                    {watchlist.listname}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleAddTransaction} className="add-transaction-button">
           Add Transaction
          </button>

        </div>
      </div>
      </div>
    )
  );
}

export default MovieDetail;
