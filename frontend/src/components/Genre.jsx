// Genre.js
import React from 'react';

const Genre = () => {
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
    'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western', 'Animation',
    'Biography', 'Crime', 'Documentary'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#fff' }}>Movie Genres</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {genres.map((genre, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#fff', 
              padding: '20px', 
              textAlign: 'center',
              borderRadius: '8px'
            }}
          >
            <p style={{ fontWeight: 'bold', color: '#333' }}>{genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
