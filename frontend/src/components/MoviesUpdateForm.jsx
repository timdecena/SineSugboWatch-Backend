import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesUpdateForm = ({ movieId, onUpdateSuccess }) => {
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        description: '',
        rating: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/movies/getAllMovies`);
                const foundMovie = response.data.find(m => m.id === movieId);
                if (foundMovie) {
                    setMovie(foundMovie);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Failed to fetch movie details. Please check the console for details.');
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevMovie => ({
            ...prevMovie,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/movies/putMovieDetails?id=${movieId}`, movie);
            onUpdateSuccess(); // Call success callback to refresh the list or give feedback
        } catch (error) {
            console.error('Error updating movie:', error);
            setError('Failed to update movie. Please check the console for details.');
        }
    };

    return (
        <div>
            <h2>Update Movie Details</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={movie.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={movie.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={movie.rating}
                        onChange={handleChange}
                        required
                        min="0"
                        max="10"
                        step="0.1"
                    />
                </div>
                <button type="submit">Update Movie</button>
            </form>
        </div>
    );
};

export default MoviesUpdateForm;
