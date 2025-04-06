// src/components/Movies.js

import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/tmdbService'; // Ensure the path is correct
import { Link } from 'react-router-dom';

const Movies = ({ addItemToCart }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // State to hold error messages

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies(); // Fetch movies from TMDB
        if (moviesData.length === 0) {
          throw new Error('No movies found.'); // Handle case if no movies are returned
        }
        setMovies(moviesData);
      } catch (err) {
        console.error('Error fetching movies:', err);
        // Handle more specific errors if available
        if (err.response && err.response.status === 404) {
          setError('Unable to find movies. Please check the API connection.'); // Specific error for 404
        } else if (err.response && err.response.status === 500) {
          setError('Server error. Please try again later.'); // Specific error for 500
        } else if (err.message.includes('Network Error')) {
          setError('Network error. Please check your internet connection.'); // Handle network issues
        } else {
          setError('Failed to fetch movies. Please try again later.'); // Generic error message for unexpected errors
        }
      } finally {
        setLoading(false); // Ensure loading state is turned off
      }
    };

    getMovies(); // Call the function to fetch movies
  }, []);

  if (loading) {
    return <h2>Loading...</h2>; // Show loading message while fetching
  }

  if (error) {
    return <h2 style={{ color: 'red' }}>{error}</h2>; // Display error message
  }

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} poster - A ${movie.release_date} release with a rating of ${movie.vote_average}.`} // More descriptive alt text for accessibility
                />
              )}
            </Link>
            <button onClick={() => addItemToCart({ name: movie.title, price: 19.99 })}>
              Add to Cart
            </button> {/* Add button to add movie to cart */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;