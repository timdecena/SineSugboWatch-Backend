// Recents.jsx
import React, { useEffect, useState } from 'react';
import '../assets/Recents.css';

const Recents = () => {
  const [recentMovies, setRecentMovies] = useState([]);

  
  useEffect(() => {
    const placeholderData = [
      { id: 1, title: "Movie A", image: "https://via.placeholder.com/150" },
      { id: 2, title: "Movie B", image: "https://via.placeholder.com/150" },
      { id: 3, title: "Movie C", image: "https://via.placeholder.com/150" },
      { id: 4, title: "Movie D", image: "https://via.placeholder.com/150" },
      { id: 5, title: "Movie E", image: "https://via.placeholder.com/150" },
    ];
    setRecentMovies(placeholderData);
  }, []);

  return (
    <div className="recents-container">
      <h1>Recent Releases</h1>
      <div className="recents-grid">
        {recentMovies.map((movie) => (
          <div key={movie.id} className="recents-card">
            <img src={movie.image} alt={movie.title} className="recents-image" />
            <h2 className="recents-title">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recents;
