import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/Movies.css';

const SearchedMovies = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const filters = location.state;

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies/getAllMovies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();

        // Retrieve images from localStorage and associate with movies
        const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
        const moviesWithImages = data.map((movie) => ({
          ...movie,
          image: storedImages[movie.movie_id] || 'placeholder.png',
        }));

        // Filter movies based on the filters
        const filteredMovies = moviesWithImages.filter((movie) => {
            return (
              (!filters.title || movie.title.toLowerCase().includes(filters.title.toLowerCase())) &&
              (!filters.genre || movie.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
              (!filters.priceRange.min || movie.price >= parseFloat(filters.priceRange.min)) &&
              (!filters.priceRange.max || movie.price <= parseFloat(filters.priceRange.max)) &&
              (!filters.ratingRange.min || movie.rating >= parseFloat(filters.ratingRange.min)) &&
              (!filters.ratingRange.max || movie.rating <= parseFloat(filters.ratingRange.max))
            );
          });
          

        setMovies(filteredMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchFilteredMovies();
  }, [filters]);

  return (
    <div className="movies-container">
      <h1>Searched Movies</h1>
      <div className="movies-list">
        {movies.length === 0 ? (
          <p>No movies match your search criteria.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.movie_id} className="movie-item">
              <Link to={`/movie/${movie.movie_id}`}>
                <img
                  src={`/movieimages/${movie.image}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <p>{movie.title}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchedMovies;
