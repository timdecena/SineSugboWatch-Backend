// Movies.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Movies.css';

const Movies = () => {
  const movies = [
    { id: 1, title: 'Movie Title 1', year: '2023', length: '120 mins' },
    { id: 2, title: 'Movie Title 2', year: '2022', length: '115 mins' },
    { id: 3, title: 'Movie Title 3', year: '2021', length: '90 mins' },
    { id: 4, title: 'Movie Title 4', year: '2023', length: '95 mins' },
    { id: 5, title: 'Movie Title 5', year: '2019', length: '110 mins' },
    { id: 6, title: 'Movie Title 6', year: '2019', length: '100 mins' },
    { id: 7, title: 'Movie Title 7', year: '2012', length: '91 mins' },
    { id: 8, title: 'Movie Title 8', year: '2018', length: ' 92 mins' }
  ];

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item">
            <div className="movie-placeholder"></div>
            <p>{movie.title}</p>
            <p>{movie.year} | {movie.length}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
