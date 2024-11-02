import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/MoviesUpdateForm.css';

const MoviesUpdateForm = () => {
  const { movie_id } = useParams();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/movies/getAllMovies`);
        const data = await response.json();

        console.log('Fetched movies:', data); // Debugging log
        const movie = data.find(movie => movie.movie_id === parseInt(movie_id));
        if (movie) {
          setTitle(movie.title);
          setGenre(movie.genre);
          setDescription(movie.description);
          setRating(movie.rating);
        } else {
          setError('Movie not found.');
        }
      } catch (err) {
        setError('Failed to fetch movie data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [movie_id]);

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message
    try {
      const response = await fetch(`http://localhost:8080/api/movies/putMovieDetails/${movie_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, description, rating }),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json(); // Get error response if available
        throw new Error(errorData.message || 'Failed to update movie.'); // Use the error message from the backend if available
      }
  
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to update movie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Movie</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Movie updated successfully!</p>}
      <form onSubmit={handleUpdateMovie}>
        <input
          type="text"
          placeholder="New Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <textarea
          placeholder="New Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="New Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="10"
          step="0.1"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Movie'}
        </button>
      </form>
    </div>
  );
};

export default MoviesUpdateForm;
