import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/MovieDetail.css';

function MovieDetail() {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movieData, setMovieData] = useState(null); // State to hold the movie data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posterImage, setPosterImage] = useState(''); // State to hold the movie poster image
  const navigate = useNavigate(); // To navigate to TransactionForm

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/getMovieById/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovieData(data);

        // Retrieve the image for this movie from localStorage
        const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
        const image = storedImages[id] || 'placeholder.png'; // Fallback to a placeholder image if not found
        setPosterImage(`/movieimages/${image}`);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleAddTransaction = () => {
    // Navigate to TransactionForm with movieId and price as query parameters
    navigate(`/transactionform?movieId=${movieData.movie_id}&price=${movieData.price}`);
  };

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    movieData && (
      <div className="movie-detail">
        <div className="movie-poster">
          <img src={posterImage} alt={`${movieData.title} Poster`} className="poster-image" />
          <p className="movie-title-year">
            {movieData.title} <br />
            [HD MOVIE] [125 mins]
          </p>
        </div>
        <div className="movie-info">
          <h1>{movieData.title}</h1>
          <div className="movie-stats">
            <span className="hd-label">HD</span>
            <span className="imdb-rating">IMDB: Rating {movieData.rating}</span>
            <span className="movie-length">Length: 125 mins</span>
          </div>
          <div className="movie-buttons">
            <button className="upload-button">UPCLOUD</button>
            <button className="vidcloud-button">VIDCLOUD</button>
          </div>
          <p className="movie-overview">{movieData.description}</p>
          <div className="movie-details">
            <p><strong>ID:</strong> {movieData.movie_id}</p>
            <p><strong>Genre:</strong> {movieData.genre}</p>
            <p><strong>Price:</strong> {movieData.price}</p>
            <p><strong>Rating:</strong> {movieData.rating}</p>
          </div>
          <button onClick={handleAddTransaction} className="transaction-button">
            Add Transaction
          </button>
        </div>
      </div>
    )
  );
}

export default MovieDetail;
