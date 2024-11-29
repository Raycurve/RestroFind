const express = require('express');
const Restaurant = require('../models/restaurant.js');

const getRest= (req,res)=>{
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

  
    Restaurant.find()
      .skip(skip)
      .limit(limit)
      .then(restaurants => {
        console.log("gotcha"+restaurants);
        
        Restaurant.countDocuments() // Count total documents for pagination info
          .then(count => {
            res.json({
              restaurants,
              totalPages: Math.ceil(count / limit),
              currentPage: page,
              totalItems: count
            });
          });
      })
      .catch(err => {
        console.error('Error retrieving restaurants:', err);
        res.status(500).json({ message: err.message });
      });
}

module.exports = {getRest};