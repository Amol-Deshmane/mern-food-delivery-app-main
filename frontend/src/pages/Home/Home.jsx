import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import { StoreContext } from "../../components/context/StoreContext";

const Home = () => {
  const [category, setCategory] = useState("All");
  const { url } = useContext(StoreContext);
  
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch restaurant data
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants/list`); // ✅ Ensure correct endpoint
        if (response.data.success) {
          setRestaurants(response.data.restaurants);
        } else {
          throw new Error("Failed to fetch restaurants");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [url]);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />

      <div className="restaurant-list">
  <h2>Restaurants Near You</h2>
  
  <div className="restaurant-cards">  {/* 👈 Wrap inside this div for horizontal scrolling */}
    {restaurants.length > 0 ? (
      restaurants.map((restaurant, index) => (
        <Link to={`/restaurant/${restaurant._id}`} key={index} className="restaurant-card">
          <img src={`${url}/images/${restaurant.image}`} alt={restaurant.name} />
          <h3>{restaurant.name}</h3>
          <p>{restaurant.location}</p>
        </Link>
      ))
    ) : (
      <p>No restaurants found.</p>
    )}
  </div>
</div>


      <AppDownload />
    </div>
  );
};

export default Home;
