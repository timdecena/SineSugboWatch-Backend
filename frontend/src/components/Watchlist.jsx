// Watchlist.js
import React from 'react';

const Watchlist = () => {
  // Sample data for the watchlist
  const watchlist = [
    { title: 'Inception', year: 2010, length: '2h 28m' },
    { title: 'The Dark Knight', year: 2008, length: '2h 32m' },
    { title: 'Interstellar', year: 2014, length: '2h 49m' },
    { title: 'Parasite', year: 2019, length: '2h 12m' },
    { title: 'Joker', year: 2019, length: '2h 2m' },
    { title: 'Avengers: Endgame', year: 2019, length: '3h 2m' },
    { title: 'The Matrix', year: 1999, length: '2h 16m' },
    { title: 'Pulp Fiction', year: 1994, length: '2h 34m' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#fff' }}>My Watchlist</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {watchlist.map((movie, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#fff', 
              padding: '20px', 
              textAlign: 'center',
              borderRadius: '8px'
            }}
          >
            <div style={{ width: '150px', height: '200px', backgroundColor: '#ddd', marginBottom: '10px' }}></div>
            <p style={{ fontWeight: 'bold', color: '#333' }}>{movie.title}</p>
            <p style={{ color: '#666' }}>{movie.year} | {movie.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
