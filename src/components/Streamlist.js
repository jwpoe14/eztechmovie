import React, { useEffect, useState } from 'react';

const Streamlist = () => {
  const [movieName, setMovieName] = useState('');
  const [price, setPrice] = useState(''); // State for price input
  const [movieList, setMovieList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  useEffect(() => {
    // Check if localStorage is available
    const isLocalStorageAvailable = () => {
      try {
        const testKey = '__test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (isLocalStorageAvailable()) {
      try {
        const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
        setMovieList(storedMovies);
        console.log('Loaded movies from local storage:', storedMovies); // Log loaded movies
        setErrorMessage(''); // Clear any previous error messages
      } catch (error) {
        setErrorMessage('Failed to load movies from local storage. Please try again later.'); // Updated error message
        console.error('Error loading movies from local storage:', error);
      }
    } else {
      setErrorMessage('Local storage is not available. Please check your browser settings.'); // Handle local storage unavailability
    }
  }, []);

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value); // Update price state
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setErrorMessage(''); // Clear previous error messages

    // Validate price input
    const priceValue = parseFloat(price);
    if (!movieName) {
      setErrorMessage('Movie name is required.'); // Ensure movie name is provided
      return;
    }
    if (isNaN(priceValue) || priceValue <= 0) { // Change < 0 to <= 0 to ensure price is positive
      setErrorMessage('Price must be a positive number.'); // Updated error message for price validation
      return;
    }

    const newMovie = { name: movieName, price: priceValue.toFixed(2), completed: false }; // Format price to 2 decimal places
    if (editIndex !== null) {
      // Edit existing movie
      const updatedList = movieList.map((movie, index) =>
        index === editIndex ? { ...newMovie, completed: movie.completed } : movie
      );
      setMovieList(updatedList);
      localStorage.setItem('movies', JSON.stringify(updatedList)); // Save to local storage
      console.log('Updated movie list:', updatedList); // Log updated movie list
      setEditIndex(null); // Reset edit index
    } else {
      // Add new movie
      const updatedList = [...movieList, newMovie]; // Add the movie data to the list
      setMovieList(updatedList);
      localStorage.setItem('movies', JSON.stringify(updatedList)); // Save to local storage
      console.log('Added new movie:', newMovie); // Log the new movie added
    }
    setMovieName(''); // Clear the movie name input
    setPrice(''); // Clear the price input
  };

  const handleDelete = (index) => {
    const newList = movieList.filter((_, i) => i !== index); // Create a new list excluding the item at the specified index
    setMovieList(newList); // Update the state with the new list
    localStorage.setItem('movies', JSON.stringify(newList)); // Save to local storage
    console.log('Deleted movie at index:', index, 'Updated movie list:', newList); // Log the updated list after deletion
  };

  const handleEdit = (index) => {
    const movieToEdit = movieList[index];
    setMovieName(movieToEdit.name); // Set the input fields with the movie data
    setPrice(movieToEdit.price); // Set the price input for editing
    setEditIndex(index); // Set the index to edit
  };

  const handleComplete = (index) => {
    const updatedList = movieList.map((movie, i) =>
      i === index ? { ...movie, completed: !movie.completed } : movie
    );
    setMovieList(updatedList); // Update the state with the new list
    localStorage.setItem('movies', JSON.stringify(updatedList)); // Save to local storage
    console.log('Toggled completion for movie at index:', index, 'Updated movie list:', updatedList); // Log the updated list after toggle
  };

  return (
    <div>
      <h2>Streamlist</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieName}
          onChange={handleMovieNameChange}
          placeholder="Enter movie name..."
        />
        <input
          type="text" // Input for price
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter price..."
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
      </form>

      <h3>Movie Results</h3>
      <ul>
        {movieList.map((movie, index) => (
          <li key={index} style={{ textDecoration: movie.completed ? 'line-through' : 'none' }}>
            {movie.name} - ${movie.price}
            <button onClick={() => handleComplete(index)}>
              {movie.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Streamlist;