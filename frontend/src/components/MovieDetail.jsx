// MovieDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();

 
  const movieData = {
    title: 'Movie Title',
    year: '2024',
    length: '85',
    imdbRating: '8.3',
    releaseDate: '2024-05-02',
    genre: 'Mystery, Drama',
    country: 'Philippines',
    production: 'Lifetime',
    cast: 'Christian Barry Alico',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  return (
    <div className="movie-detail">
      <div className="movie-poster">
        <div className="poster-placeholder"></div>
        <p className="movie-title-year">
          {movieData.title} <br />
          [{movieData.year}] [{movieData.length} mins]
        </p>
      </div>
      <div className="movie-info">
        <h1>{movieData.title}</h1>
        <div className="movie-stats">
          <span className="hd-label">HD</span>
          <span className="imdb-rating">IMDB: {movieData.imdbRating}</span>
          <span className="movie-length">{movieData.length} mins</span>
        </div>
        <div className="movie-buttons">
          <button className="upload-button">UPCLOUD</button>
          <button className="vidcloud-button">VIDCLOUD</button>
        </div>
        <p className="movie-overview">{movieData.description}</p>
        <div className="movie-details">
          <p><strong>Released:</strong> {movieData.releaseDate}</p>
          <p><strong>Genre:</strong> {movieData.genre}</p>
          <p><strong>Country:</strong> {movieData.country}</p>
          <p><strong>Duration:</strong> {movieData.length} mins</p>
          <p><strong>Cast:</strong> {movieData.cast}</p>
          <p><strong>Production:</strong> {movieData.production}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
