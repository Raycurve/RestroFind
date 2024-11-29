import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


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


function LocationSearch() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notF, setNotF] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurants/nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`);
      console.log(response.data.length);
      setRestaurants(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setNotF(true);
    }
  };

  return (
    <div className="location-search">
      <h1>Search Nearby Restaurants</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
          required
        />
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
          required
        />
        <input
          type="number"
          value={maxDistance}
          onChange={(e) => setMaxDistance(e.target.value)}
          placeholder="Max Distance (km)"
          required
        />
        <button type="submit">Search</button>
      </form>


      {loading && <div><img className="loaderI" src="/loading.gif" alt="Loading..."  style={{justifyItems:'center'}}/></div>}
      {notF && restaurants.length==0 && <div>No restaurants found</div>}
      {error && <div>Error: {error}</div>}
        {!loading &&
      <div className="restaurant-list">
        {restaurants.map(restaurant => (
            <Link to={`/restaurant/${restaurant.restaurant_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>    
                <div key={restaurant.restaurant_id} className="restaurant-card">
                    <img src={restaurant.image_url} alt={restaurant.name} className="restaurant-image" />
                    <div className="restaurant-info">
                    <h2><Link to={`/restaurant/${restaurant.restaurant_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{restaurant.name}</Link></h2>
                    <p>{restaurant.location.address}, {restaurant.location.locality}, {restaurant.location.city}</p>
                    <p>Average cost for two: {restaurant.average_cost_for_two} {restaurant.currency}</p>
                    <StarRating rating={restaurant.rating.aggregate_rating } ratingColor={restaurant.rating.rating_color}/>

                </div>
                </div>
           </Link>
        ))}
      </div>}
    </div>
  );
}

export default LocationSearch;