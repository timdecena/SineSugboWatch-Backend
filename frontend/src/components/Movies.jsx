// src/components/Movies.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const userType = localStorage.getItem('userType'); // Get the user type from local storage

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies/getAllMovies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        console.log('Fetched movies:', data); // Log for debugging
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (movie_id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movies/deleteMovieDetails/${movie_id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      setMovies(movies.filter((movie) => movie.movie_id !== movie_id));
      alert(`Movie with ID ${movie_id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete movie.');
    }
  };

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <div className="movies-list">
        {movies.length === 0 ? (
          <p>No movies available</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.movie_id} className="movie-item">
              <Link to={`/movie/${movie.movie_id}`}>
                <div className="movie-placeholder"></div>
                <p><strong>Movie ID:</strong> {movie.movie_id}</p>
                <p><strong>Title:</strong> {movie.title}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Description:</strong> {movie.description}</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
              </Link>
              {userType === 'admin' && ( // Check if user is admin
                <div className="admin-buttons">
                  <Link to={`/update-movie/${movie.movie_id}`}>
                    <button className="update-button">Update</button>
                  </Link>
                  <button onClick={() => handleDeleteMovie(movie.movie_id)} className="delete-button">Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;
