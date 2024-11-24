import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/MoviesUpdateForm.css';

const MoviesUpdateForm = () => {
  const { movie_id } = useParams();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageOptions, setImageOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch available image options
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/movieimages/images.json');
        if (!response.ok) throw new Error('Failed to fetch images.json');
        const data = await response.json();
        setImageOptions(data.images || []);
      } catch (error) {
        console.error('Error fetching image options:', error);
      }
    };
    loadImages();
  }, []);

  // Fetch movie details and populate state
  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/movies/getMovieById/${movie_id}`);
        const movie = await response.json();
        if (movie) {
          setTitle(movie.title);
          setGenre(movie.genre);
          setDescription(movie.description);
          setPrice(movie.price);
          setRating(movie.rating);

          // Fetch the stored image from localStorage
          const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
          const movieImage = storedImages[movie_id];
          setImage(movieImage || '');
          setImagePreview(movieImage ? `/movieimages/${movieImage}` : '');
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.value;
    setImage(selectedImage);
    setImagePreview(`/movieimages/${selectedImage}`);
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/movies/putMovieDetails/${movie_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, description, price, rating }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update movie.');
      }

      // Update the stored image in localStorage
      const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
      storedImages[movie_id] = image;
      localStorage.setItem('movieImages', JSON.stringify(storedImages));

      setSuccess(true);
      alert('Movie updated successfully!');
      navigate('/movies'); // Redirect after successful update
    } catch (err) {
      setError(err.message || 'Failed to update movie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movies-update-form-container">
      <h2 className="movies-update-form-title">Update Movie</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Movie updated successfully!</p>}
      <form className="movie-update-form" onSubmit={handleUpdateMovie}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="New Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          placeholder="New Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="New Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="1"
          required
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          placeholder="New Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="10"
          step="0.1"
          required
        />

        <label htmlFor="image">Image</label>
        <select id="image" value={image} onChange={handleImageChange} required>
          <option value="">Select an image</option>
          {imageOptions.map((img) => (
            <option key={img} value={img}>
              {img}
            </option>
          ))}
        </select>
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Selected preview" className="image-preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Movie'}
        </button>
      </form>
    </div>
  );
};

export default MoviesUpdateForm;
