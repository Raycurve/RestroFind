import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
const BASE="http://localhost:5000/api/restaurants";

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

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sim, setSim] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, [page]);

  useEffect(() => {
    // Simulate loader
    const time = Math.floor(Math.random() * 1500);
    setTimeout(() => {
      setSim(false);
    }, time);
  }, [page]);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE}?page=${page}`);
    // console.log(response);
    
      const data =  response.data;
      setRestaurants(data.restaurants);
    } catch (err) {
      setError(err.message);
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
        {(sim || loading)? 
            (<div><img className="loaderI" src="/loading.gif" alt="Loading..."  style={{justifyItems:'center'}}/></div>)
        :
        (
            <div>
                <h1>Restaurants</h1>
                <div className="restaurant-list">
                
                {restaurants.map(restaurant => (
                    <Link to={`/restaurant/${restaurant.restaurant_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div key={restaurant.restaurant_id} className="restaurant-card">
                    <img src={restaurant.image_url} alt={restaurant.name} className="restaurant-image" />
                    <div className="restaurant-info">
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.location.address}, {restaurant.location.locality}, {restaurant.location.city}</p>
                        <p>Average cost for two: {restaurant.average_cost_for_two} {restaurant.currency}</p>
                        <StarRating rating={parseFloat(restaurant.rating.aggregate_rating)} ratingColor={restaurant.rating.rating_color}/>
                    </div>
                    </div>
                    </Link>
                ))}
                </div>
                <div className="pagination">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
                    <span style={{position:'relative', margin:'1vh'}}>Page {page}</span>
                    <button onClick={() => setPage(p => p + 1)}>Next</button>
                </div>
            </div>
        )};
            
        
        
    </>
  );
}

export default RestaurantList;