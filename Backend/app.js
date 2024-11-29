const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurantRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 5000;


console.log(process.env.USER)
// mongodb+srv://Admin:<db_password>
const MONGO_URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@restros.gxjhj.mongodb.net/?retryWrites=true&w=majority&appName=restros`;
const mongo_url = `mongodb+srv://${process.env.USER}:${process.env.PASS}@restros.gxjhj.mongodb.net/`;
// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors());

//mongo connection
mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Use routes
app.use('/api/restaurants', restaurantRoutes)


// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
