// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Streamlist from './components/Streamlist';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Cart from './components/Cart';
import About from './components/About';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from local storage
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addItemToCart = (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Save to local storage
  };

  const removeItemFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Save to local storage
  };

  const clearCart = () => {
    setCartItems([]); // Clear the cart items
    localStorage.removeItem('cartItems'); // Remove from local storage
  };

  const updateMovieList = (newList) => {
    setMovieList(newList);
    const updatedCartItems = cartItems.map(cartItem => {
      const updatedMovie = newList.find(movie => movie.name === cartItem.name);
      return updatedMovie ? { ...cartItem, price: updatedMovie.price } : cartItem;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save to local storage
  };

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <Link to="/">Streamlist</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Streamlist movieList={movieList} updateMovieList={updateMovieList} addItemToCart={addItemToCart} />} />
          <Route path="/movies" element={<Movies addItemToCart={addItemToCart} />} />
          <Route path="/movies/:id" element={<MovieDetails addItemToCart={addItemToCart} />} />
          <Route path="/cart" element={<Cart items={cartItems} onRemoveItem={removeItemFromCart} totalPrice={totalPrice} onCheckout={clearCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;