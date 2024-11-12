// PopularMovies.jsx
import React, { useEffect, useState } from 'react';
import '../assets/PopularMovies.css';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies from an API or use sample data
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    // Replace with actual API call
    const sampleMovies = [
      { id: 1, title: 'Inception', imageUrl: '/path/to/inception.jpg' },
      { id: 2, title: 'Interstellar', imageUrl: '/path/to/interstellar.jpg' },
      { id: 3, title: 'The Dark Knight', imageUrl: '/path/to/darkknight.jpg' },
      { id: 4, title: 'Despicable Me 4', imageUrl: '/path/to/despicable Me 4.jpg' },
      { id: 5, title: 'Deadpool & Wolverine', imageUrl: '/path/to/deadpool & wolverine.jpg' },
      { id: 5, title: 'Venom: The Last Dance', imageUrl: '/path/to/venom: the last dance.jpg' },
    
    ];
    setMovies(sampleMovies);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MovieApp</h1>
          <p>Discover the most popular movies, TV shows, and more!</p>
          <Link to="/watchlist" className="explore-btn">Explore Now</Link>
        </div>
      </div>

      {/* Movie Grid Section */}
      <h2 className="section-title">Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
            <h3 className="movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
