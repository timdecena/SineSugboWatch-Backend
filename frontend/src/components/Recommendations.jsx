import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/Recommendations.css'; // Adjust the path to your CSS file

const Recommendations = () => {
  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [preferredGenre, setPreferredGenre] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      // Fetch user preferences
      const preferenceResponse = await axios.get('http://localhost:8080/api/preferences/getAllPreferences');
      const userPreference = preferenceResponse.data.find(
        (pref) => pref.user && String(pref.user.user_id) === String(userId)
      );

      if (userPreference && userPreference.preferredgenres) {
        setPreferredGenre(userPreference.preferredgenres);
      }

      // Fetch all movies
      const moviesResponse = await axios.get('http://localhost:8080/api/movies/getAllMovies');
      const allMovies = moviesResponse.data;

      // Retrieve images from localStorage and associate with movies
      const storedImages = JSON.parse(localStorage.getItem('movieImages')) || {};
      const moviesWithImages = allMovies.map((movie) => ({
        ...movie,
        image: storedImages[movie.movie_id] || 'placeholder.png', // Use localStorage images or fallback
      }));

      // Filter movies by preferred genre
      if (userPreference && userPreference.preferredgenres) {
        const filteredMovies = moviesWithImages.filter((movie) =>
          movie.genre && movie.genre.toLowerCase().includes(userPreference.preferredgenres.toLowerCase())
        );
        setRecommendations(filteredMovies);
      } else {
        setRecommendations([]);
      }

      setMovies(moviesWithImages); // Store all movies for fallback
    } catch (error) {
      console.error('Error fetching preferences or movies:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="recommendations-container">
      <h2>Recommendations</h2>
      {preferredGenre && recommendations.length > 0 ? (
        <div className="movie-grid">
          {recommendations.map((movie) => (
            <div
              key={movie.movie_id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.movie_id)}
            >
              <img
                src={`/movieimages/${movie.image}`} // Access localStorage image or fallback
                alt={movie.title}
                className="movie-image"
                onError={(e) => (e.target.src = '/movieimages/placeholder.png')} // Fallback image
              />
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recommendations">No Recommendations</p>
      )}
    </div>
  );
};

export default Recommendations;
