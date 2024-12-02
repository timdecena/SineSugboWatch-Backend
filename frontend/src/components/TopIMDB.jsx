// TopIMDB.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/TopIMDB.css';

const TopIMDB = () => {
  const movies = [
    { id: 1, title: 'Top Movie 1', rating: '9.3' },
    { id: 2, title: 'Top Movie 2', rating: '9.2' },
    { id: 3, title: 'Top Movie 3', rating: '9.1' },
    { id: 4, title: 'Top Movie 4', rating: '9.0' }
  ];

  return (
    <div className="topimdb-container">
      <h1>Top IMDB</h1>
      <div className="topimdb-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="topimdb-item">
            <div className="movie-placeholder"></div>
            <p>{movie.title}</p>
            <p>Rating: {movie.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopIMDB;
