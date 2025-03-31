import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Check if the API key is set in the environment variables
const API_KEY = process.env.REACT_APP_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Handle case where API_KEY is not defined
      if (!API_KEY) {
        setErrorMessage('API key is not defined. Please check your environment variables.'); // User-friendly error message
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        if (error.response) {
          // If the server responded with a status code outside the range of 2xx
          setErrorMessage(`Failed to fetch movie details: ${error.response.status} - ${error.response.data.status_message}`);
        } else if (error.request) {
          // If the request was made but no response was received
          setErrorMessage('Failed to fetch movie details: No response from server. Please check your network connection.');
        } else {
          // Something happened in setting up the request
          setErrorMessage(`Failed to fetch movie details: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails(); // Call the function to fetch movie details
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>; // Show loading message while fetching
  }

  if (errorMessage) {
    return <h2 style={{ color: 'red' }}>{errorMessage}</h2>; // Display error message to the user
  }

  if (!movie) {
    return <h2>Movie not found</h2>; // Show error message if movie not found
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Display full-size poster
          alt={movie.title}
        />
      )}
    </div>
  );
};

export default MovieDetails;