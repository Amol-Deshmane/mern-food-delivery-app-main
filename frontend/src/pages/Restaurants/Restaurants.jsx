import React, { useEffect, useState } from "react";
import "./Restaurants.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Restaurants = ({ url }) => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const response = await axios.get(`${url}/api/restaurant/list`);
    if (response.data.success) {
      setRestaurants(response.data.data);
    }
  };

  return (
    <div className="restaurants">
      <h2>Top Restaurants</h2>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-card" onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
            <img src={`${url}/images/${restaurant.image}`} alt={restaurant.name} />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
