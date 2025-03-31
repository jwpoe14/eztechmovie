import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Streamlist from './components/Streamlist';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails'; // Import MovieDetails component
import Cart from './components/Cart';
import About from './components/About';
import NotFound from './components/NotFound'; // Import NotFound component
import './App.css';

function App() {
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
          <Route path="/" element={<Streamlist />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} /> {/* Route for MovieDetails */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback route for undefined paths */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;