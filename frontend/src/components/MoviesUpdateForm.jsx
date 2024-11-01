// src/components/MovieUpdateForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/MoviesUpdateForm.css';

const MovieUpdateForm = () => {
  const { movie_id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/movies/getAllMovies/${movie_id}`);
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setReleaseDate(data.releaseDate);
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
    try {
      await fetch(`http://localhost:8080/api/movies/putMovieDetails/${movie_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, releaseDate }),
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to update movie.');
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
        <textarea
          placeholder="New Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Movie'}
        </button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
