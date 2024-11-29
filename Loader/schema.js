const mongoose = require('mongoose');

//creating the schema for the restaurant
const restaurantSchema = new mongoose.Schema({
  restaurant_id: { type: String, required: true, unique: true },
  name: { type: String },
  location: {
    latitude: { type: Number},
    longitude: { type: Number },
    address: { type: String },
    city: { type: String },
    locality: { type: String },
    country_id: { type: Number }
  },
  cuisines: { type: [String] },
  image_url: { type: String },
  rating: {
    rating_text: { type: String },
    rating_color: { type: String },
    aggregate_rating: { type: Number }
  },
  average_cost_for_two: { type: Number },
  currency: { type: String },
  has_table_booking:  {type: Boolean} 
});

//exporting the model
module.exports = mongoose.model('Restaurant', restaurantSchema);
