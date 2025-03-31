import axios from 'axios';

// Check if the API key is set in the environment variables
const API_KEY = process.env.REACT_APP_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

// Function to fetch movies from TMDB
export const fetchMovies = async () => {
  // Check if API_KEY is defined and provide a fallback
  if (!API_KEY) {
    console.error('REACT_APP_API_KEY is not defined. Please set it in your .env file.');
    return []; // Return an empty array to avoid crashing the app
  }

  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results; // Return the list of movies
  } catch (error) {
    console.error('Error fetching movies:', error);
    if (error.response) {
      // If the server responded with a status code outside the range of 2xx
      throw new Error(`Failed to fetch movies from TMDB: ${error.response.status} - ${error.response.data.status_message}`);
    } else if (error.request) {
      // If the request was made but no response was received
      throw new Error('Failed to fetch movies from TMDB: No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Failed to fetch movies from TMDB: ${error.message}`);
    }
  }
};