// TVShows.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/TVShows.css';

const TVShows = () => {
  const shows = [
    { id: 1, title: 'Show Title 1', year: '2023' },
    { id: 2, title: 'Show Title 2', year: '2022' },
    { id: 3, title: 'Show Title 3', year: '2021' },
    { id: 4, title: 'Show Title 4', year: '2020' }
  ];

  return (
    <div className="tvshows-container">
      <h1>TV Shows</h1>
      <div className="tvshows-list">
        {shows.map((show) => (
          <Link to={`/movie/${show.id}`} key={show.id} className="tvshow-item">
            <div className="tvshow-placeholder"></div>
            <p>{show.title}</p>
            <p>{show.year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
