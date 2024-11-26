import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../assets/Movies.css';

const WatchlistMovies = () => {
  const { id } = useParams(); // Watchlist ID from the route
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/watchlist/${id}/movies` // Correct endpoint
        );
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();

        const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
        const moviesWithImages = data.map((movie) => ({
          ...movie,
          image: storedImages[movie.movie_id] || 'placeholder.png',
        }));
        setMovies(moviesWithImages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchWatchlistMovies();
  }, [id]);

  // Function to handle removing a movie from the watchlist
  const handleRemoveMovie = async (movieId) => {
    const confirmRemove = window.confirm('Are you sure you want to remove this movie from the watchlist?');
    if (!confirmRemove) return;

    try {
      // Send DELETE request to remove the movie from the watchlist
      const response = await fetch(
        `http://localhost:8080/api/watchlist/${id}/removeMovie/${movieId}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('Failed to remove movie from watchlist');
      
      // Remove the movie from the state
      setMovies(movies.filter((movie) => movie.movie_id !== movieId));
      alert('Movie removed from watchlist successfully');
    } catch (error) {
      console.error('Error removing movie from watchlist:', error);
      alert('Failed to remove movie from watchlist. Please check the console for details.');
    }
  };

  return (
    <div className="movies-container">
      <h1>Watchlist Movies</h1>
      <div className="movies-list">
        {movies.length === 0 ? (
          <p>No movies in this watchlist</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.movie_id} className="movie-item">
              <Link to={`/movie/${movie.movie_id}`}>
                <img
                  src={`/movieimages/${movie.image}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <p><strong>Title:</strong> {movie.title}</p>
              </Link>
              {/* Remove movie button */}
              <button onClick={() => handleRemoveMovie(movie.movie_id)}>
                Remove from Watchlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistMovies;
