const express = require('express');
const Restaurant = require('../models/restaurant.js');

const getRestById= (req,res)=>{
    const restaurantId = req.params.id; 

    Restaurant.findOne({ restaurant_id: restaurantId })
        .then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
        })
        .catch(error => {
        console.error('Error fetching restaurant by id:', error);
        res.status(500).json({ message: error.message });
        });
}

module.exports = {getRestById};