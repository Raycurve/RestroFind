const express = require('express');
const Restaurant = require('../models/restaurant.js');
const { getRest } = require('../Controllers/getAll.js');
const { getRestById } = require('../Controllers/getById.js');
const { getByLoc } = require('../Controllers/getByLoc.js');

const router = express.Router();


// Get the list of restaurants with pagination
router.get('/', getRest);

//get nearby restaurants
router.get('/nearby', getByLoc);

//Get restaurants by id
router.get('/:id', getRestById);




module.exports = router;
