import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import LocationSearch from './components/LocationSearch';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<RestaurantList/>} />
          <Route path="/restaurant/:id" element={<RestaurantDetail/>} />
          <Route path="/search" element={<LocationSearch/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;