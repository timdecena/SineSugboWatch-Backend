// PopularMovies.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import '../assets/PopularMovies.css';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/movies/getAllMovies'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleExploreClick = () => {
    navigate('/movies'); // Navigate to /movies
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to MovieDetail page with movieId
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MovieApp</h1>
          <p>Discover the most popular movies, TV shows, and more!</p>
          <button className="explore-btn" onClick={handleExploreClick}>Explore Now</button>
        </div>
      </div>

      {/* Movie Grid Section */}
      <h2 className="section-title">Popular Movies</h2>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.movie_id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.movie_id)} // Handle movie click
            >
              <img
                src={movie.imageUrl || '/path/to/default.jpg'}
                alt={movie.title}
                className="movie-image"
              />
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>No popular movies available</p>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
