// src/components/MoviesList.jsx 
import React, { useEffect, useState } from 'react';
import '../assets/MoviesList.css';
import { Link } from 'react-router-dom';

const MoviesList = () => { 
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
        console.log('Fetched movies:', data); // Log fetched movies for debugging
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
    <div className="movie-container">
      <h2>Movie List</h2>
      <div className="movie-list">
        {movies.length === 0 ? (  
          <p>No movies available</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.movie_id} className="movie-list-item">
              <p>Movie ID: {movie.movie_id}</p> {/* Displaying movie_id */}
              <p>Title: {movie.title}</p> {/* Displaying title */}
              <p>Genre: {movie.genre}</p> {/* Displaying genre */}
              <p>Description: {movie.description}</p> {/* Displaying description */}
              <p>Rating: {movie.rating}</p> {/* Displaying rating */}

              {userType === 'admin' && (
                <>
                  <Link to={`/update-movie/${movie.movie_id}`}>
                    <button className="update-button">Update</button>
                  </Link>
                  <button onClick={() => handleDeleteMovie(movie.movie_id)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesList;
