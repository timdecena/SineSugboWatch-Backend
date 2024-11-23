import React, { useState } from 'react';
import '../assets/MoviesForm.css';

const MoviesForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  // Retrieve the admin ID from localStorage
  const adminId = localStorage.getItem('admin_id'); // Use admin_id for admins


  const handleCreateMovie = async (e) => {
    e.preventDefault();

    if (!adminId) {
      alert('Admin ID not found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/movies/postMovieRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          genre,
          description,
          rating: parseFloat(rating),
          admin: { adminId: parseInt(adminId) }, // Automatically use adminId from localStorage
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating movie');
      }

      const data = await response.json();
      alert(`Movie created successfully: ${data.title}`);
      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      setGenre('');
      setRating('');
    } catch (error) {
      console.error('Error creating movie:', error);
      alert(`Error creating movie: ${error.message}`);
    }
  };

  return (
    <div className="movies-form-container">
      <h2 className="movies-form-title">Create Movie</h2>
      <form className="movie-form" onSubmit={handleCreateMovie}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          placeholder="Enter genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter movie description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <label htmlFor="rating">Rating (0.0 - 10.0)</label>
        <input
          id="rating"
          type="number"
          step="0.1"
          placeholder="Enter rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        
        <button type="submit">Create Movie</button>
      </form>
    </div>
  );
};

export default MoviesForm;
