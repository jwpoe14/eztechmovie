// src/components/Streamlist.js
import React, { useState } from 'react';

const Streamlist = () => {
  const [movieName, setMovieName] = useState('');
  const [price, setPrice] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (movieName && price) {
      if (editIndex !== null) {
        // Edit existing movie
        const updatedList = movieList.map((movie, index) =>
          index === editIndex ? { name: movieName, price: price, completed: movie.completed } : movie
        );
        setMovieList(updatedList);
        setEditIndex(null); // Reset edit index
      } else {
        // Add new movie
        const movieData = { name: movieName, price: price, completed: false };
        console.log(movieData); // Log the movie name and price to the console
        setMovieList([...movieList, movieData]); // Add the movie data to the list
      }
      setMovieName(''); // Clear the movie name input
      setPrice(''); // Clear the price input
    }
  };

  const handleDelete = (index) => {
    const newList = movieList.filter((_, i) => i !== index); // Create a new list excluding the item at the specified index
    setMovieList(newList); // Update the state with the new list
  };

  const handleEdit = (index) => {
    const movieToEdit = movieList[index];
    setMovieName(movieToEdit.name); // Set the input fields with the movie data
    setPrice(movieToEdit.price);
    setEditIndex(index); // Set the index to edit
  };

  const handleComplete = (index) => {
    const updatedList = movieList.map((movie, i) => 
      i === index ? { ...movie, completed: !movie.completed } : movie
    );
    setMovieList(updatedList); // Update the state with the new list
  };

  return (
    <div>
      <h2>Streamlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieName}
          onChange={handleMovieNameChange}
          placeholder="Enter movie name..."
        />
        <input
          type="text"
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