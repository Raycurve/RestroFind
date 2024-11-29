const mongoose = require('mongoose');
const Restaurant = require('./schema');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

//mongoDB connection
console.log(process.env.USER);
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@restros.gxjhj.mongodb.net/?retryWrites=true&w=majority&appName=restros`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to DB");

  // Read and parse JSON file
  const filePath = path.join(__dirname, './archive/file5.json'); 
  return fs.promises.readFile(filePath, 'utf-8');
})
.then(fileData => {
  const jsonData = JSON.parse(fileData);
  
  // Process data
  const resData = [];
  for (const i of jsonData) {
    for (const j of i.restaurants) {
      resData.push(j.restaurant);
    }
  }
  const image= "https://i.imgur.com/awOoYIo.png";
  const restaurantData = resData.map(item => {
    return {
      restaurant_id: item.id,
      name: item.name,
      location: {
        latitude: parseFloat(item.location.latitude),
        longitude: parseFloat(item.location.longitude),
        address: item.location.address,
        city: item.location.city,
        locality: item.location.locality,
        country_id: item.location.country_id,
      },
      cuisines: item.cuisines.split(',').map(i => i.trim()), //making cuisines string to array of strings
      image_url: (item.thumb)?item.thumb:image,
      rating: {
        rating_text: item.user_rating.rating_text,
        rating_color: item.user_rating.rating_color,
        aggregate_rating: item.user_rating.aggregate_rating,
      },
      average_cost_for_two: item.average_cost_for_two,
      currency: item.currency,
      has_table_booking: item.has_table_booking,
    };
  });

  // Insert data into MongoDB
  return Restaurant.insertMany(restaurantData, { ordered: false });
})
.then(() => {
  console.log("Data inserted successfully");
})
.catch(error => {
  console.error('Error:', error);
})
.finally(() => {
  mongoose.disconnect()
    .then(() => console.log('Disconnected from MongoDB'))
    .catch(disconnectError => console.error('Error disconnecting from MongoDB:', disconnectError));
});
