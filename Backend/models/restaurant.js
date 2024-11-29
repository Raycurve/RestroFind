const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurant_id: { type: String, unique: true },
  name: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    city: String,
    locality: String,
    country_id: String,
  },
  cuisines: [String],
  image_url: String,
  rating: {
    rating_text: String,
    rating_color: String,
    aggregate_rating: Number,
  },
  average_cost_for_two: Number,
  currency: String,
  has_table_booking: Boolean,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
