const express = require('express');
const Restaurant = require('../models/restaurant.js');


// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (deg) => deg * (Math.PI / 180);
  const R = 6371; 

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

// Controller to get nearby restaurants based on lat/long and max distance
const getByLoc = (req, res) => {
    // console.log("responded")
    //     res.json({name:"yayyyyyyy"}).then(()=>{console.log("responded")});
  const { latitude, longitude, maxDistance } = req.query;
  
  if (!latitude || !longitude || !maxDistance) {
    return res.status(400).json({ message: 'Latitude, longitude, and maxDistance are required.' });
  }

  const lat = parseFloat(latitude);
  const long = parseFloat(longitude);
  const maxDist = parseFloat(maxDistance);

  // Find all restaurants and filter by distance
  Restaurant.find({})
    .then(restaurants => {
      const nearbyRestaurants = restaurants.filter(restaurant => {
        const { latitude: restLat, longitude: restLong } = restaurant.location;
        const distance = getDistance(lat, long, restLat, restLong);
        return distance <= maxDist;
      });

      res.json(nearbyRestaurants);
    })
    .catch(error => {
      console.error('Error fetching nearby restaurants:', error);
      res.status(500).json({ message: 'Error fetching nearby restaurants' });
    });
};

module.exports = {getByLoc};