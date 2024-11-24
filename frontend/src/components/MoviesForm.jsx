import React, { useState, useEffect } from 'react';
import '../assets/MoviesForm.css';

const MoviesForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageOptions, setImageOptions] = useState([]);
  const adminId = localStorage.getItem('admin_id');

  useEffect(() => {
    // Fetch image options from JSON file
    const loadImages = async () => {
      try {
        const response = await fetch('/movieimages/images.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch images.json: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data.images)) {
          setImageOptions(data.images);
        } else {
          console.error('images.json does not contain a valid "images" array.');
        }
      } catch (error) {
        console.error('Error loading images.json:', error);
      }
    };

    loadImages();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.value;
    setImage(selectedImage);
    setImagePreview(`/movieimages/${selectedImage}`);
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();

    if (!adminId) {
      alert('Admin ID not found. Please log in.');
      return;
    }

    try {
      // Send movie metadata to the API
      const response = await fetch('http://localhost:8080/api/movies/postMovieRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          genre,
          description,
          price: parseFloat(price),
          rating: parseFloat(rating),
          admin: { adminId: parseInt(adminId) },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating movie');
      }

      const savedMovie = await response.json();

      // Save the image locally in localStorage using the movie ID
      const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
      storedImages[savedMovie.movie_id] = image;
      localStorage.setItem('movieImages', JSON.stringify(storedImages));

      alert('Movie created successfully!');
      setTitle('');
      setDescription('');
      setGenre('');
      setPrice('');
      setRating('');
      setImage('');
      setImagePreview('');
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          required
        />

        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter genre"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
          required
        />

        <label htmlFor="rating">Rating (0.0 - 10.0)</label>
        <input
          id="rating"
          type="number"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Enter rating"
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
        {imagePreview && <img src={imagePreview} alt="Selected preview" className="image-preview" />}

        <button type="submit">Create Movie</button>
      </form>
    </div>
  );
};

export default MoviesForm;
