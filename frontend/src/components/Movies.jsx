import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchMovies = async () => {
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

        setMovies(moviesWithImages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleDeleteMovie = async (movie_id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the movie with ID ${movie_id}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/movies/deleteMovieDetails/${movie_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }

      // Remove the movie from the state
      setMovies(movies.filter((movie) => movie.movie_id !== movie_id));

      // Remove the image from localStorage
      const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
      delete storedImages[movie_id];
      localStorage.setItem('movieImages', JSON.stringify(storedImages));

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
                <img
                  src={`/movieimages/${movie.image}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <p>{movie.title}</p>
              </Link>
              {userType === 'admin' && (
                <div className="admin-buttons">
                  <Link to={`/update-movie/${movie.movie_id}`}>
                    <button className="update-button">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteMovie(movie.movie_id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
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
