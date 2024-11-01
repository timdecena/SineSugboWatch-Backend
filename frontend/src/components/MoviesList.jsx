import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/movies/getAllMovies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Failed to fetch movies. Please check the console for details.');
            }
        };

        fetchMovies();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Movies List</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>Genre: {movie.genre}</p>
                        <p>Description: {movie.description}</p>
                        <p>Rating: {movie.rating}</p>
                        <p>Admin ID: {movie.admin_id}</p> {/* Display the associated admin ID */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesList;
