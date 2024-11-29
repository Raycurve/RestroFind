import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";


function StarRating({ rating, ratingColor }) {
    const filledStars = Math.floor(rating);
    const partialStar = rating % 1;
    const emptyStars = 5 - Math.ceil(rating);
  
    return (
      <div className="star-rating" style={{ background: `#${ratingColor}`} }>
        {[...Array(filledStars)].map((_, i) => (
          <span key={`filled-${i}`} className="star">★</span>
        ))}
        {partialStar > 0 && (
          <span className="star partial-star" style={{ width: `${partialStar * 100}%` }}>★</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty-star">☆</span>
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  }


function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
// console.log(id);

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
      setRestaurant(response.data);
        console.log(response.data);
        
    } catch (err) {
      setError(err.message);
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!restaurant) return null;

  const generateAbout = () => {
    return `${restaurant.name} is a ${restaurant.cuisines.join(', ')} restaurant located in ${restaurant.location.locality}, ${restaurant.location.city}. With an average cost of ${restaurant.average_cost_for_two} ${restaurant.currency} for two, it offers a ${restaurant.rating.rating_text} dining experience as rated by our customers. ${restaurant.has_table_booking ? 'Table booking is available for your convenience.' : 'Please note that table booking is not available.'} Come and enjoy the flavors of ${restaurant.cuisines[0]} in a welcoming atmosphere.`;
  };

  return (
    
    <div className="restaurant-detail">
      <h1>{restaurant.name}</h1>
      <img src={restaurant.image_url} alt={restaurant.name} className="restaurant-image-large" />
      <div className="restaurant-info">
        <p className="restaurant-about">{generateAbout()}</p>
        <p>Address: {restaurant.location.address}, {restaurant.location.locality}, {restaurant.location.city}, {restaurant.location.country_id}</p>
        <p>Coordinates: {restaurant.location.latitude}, {restaurant.location.longitude}</p>
        <p>Cuisines: {restaurant.cuisines.join(', ')}</p>
        <StarRating rating={restaurant.rating.aggregate_rating } ratingColor={restaurant.rating.rating_color}/>
        <p>Average cost for two: {restaurant.average_cost_for_two} {restaurant.currency}</p>
        <p>Table booking: {restaurant.has_table_booking ? 'Available' : 'Not available'}</p>
      </div>
    </div>
  );
}

export default RestaurantDetail;