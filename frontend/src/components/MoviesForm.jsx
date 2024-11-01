import React, { useState } from 'react';
import axios from 'axios';

function MovieForm({ adminId }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');

  const handleAddMovie = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Create movie data object
      const movieData = { 
        title, 
        genre, 
        description, 
        rating: parseFloat(rating), // Ensure rating is a number
        admin_id: adminId // Include admin_id in the request body
      };

      // POST request to add the movie using the correct endpoint
      const response = await axios.post('http://localhost:8080/api/movies/postMovieRecord', movieData);
      console.log('Movie added:', response.data); // Log success
      alert('Movie added successfully');
      // Reset form fields
      setTitle('');
      setGenre('');
      setDescription('');
      setRating('');
    } catch (error) {
      // Log error details to console for debugging
      console.error('Error adding movie:', error.response ? error.response.data : error.message);
      // Display a user-friendly error message
      setError('Failed to add movie. Please check the console for details.');
    }
  };

  return (
    <form onSubmit={handleAddMovie}>
      <h2>Add a New Movie</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" step="0.1" min="0" max="10" value={rating} onChange={(e) => setRating(e.target.value)} required />
      </div>
      <button type="submit">Add Movie</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
    </form>
  );
}

export default MovieForm;
