import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageDishes.css";
import { toast } from "react-toastify";
import AddDishForm from "./AddDishForm";

const ManageDishes = ({ url }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${url}/api/restaurants/list`);
      if (response.data.success) {
        setRestaurants(response.data.restaurants);
      }
    } catch (error) {
      toast.error("Error fetching restaurants");
    }
  };

  const fetchDishes = async (restaurantId) => {
    try {
      const response = await axios.get(`${url}/api/dishes/list/${restaurantId}`);
      if (response.data.success) {
        setDishes(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching dishes");
    }
  };

  // ✅ Function to update inventory (stock)
  const updateInventory = async (dishId, stock) => {
    try {
      const response = await axios.post(`${url}/api/dishes/updateStock`, {
        id: dishId,
        stock,
      });
      if (response.data.success) {
        toast.success("Stock Updated!");
        fetchDishes(selectedRestaurant);
      } else {
        toast.error("Failed to update stock");
      }
    } catch (error) {
      toast.error("Error updating stock");
    }
  };

  // ✅ Function to delete a dish
  const deleteDish = async (dishId) => {
    try {
      const response = await axios.post(`${url}/api/dishes/remove`, { id: dishId });
      if (response.data.success) {
        toast.success("Dish removed successfully!");
        fetchDishes(selectedRestaurant);
      } else {
        toast.error("Failed to remove dish");
      }
    } catch (error) {
      toast.error("Error deleting dish");
    }
  };

  // ✅ Function to delete a restaurant
  const deleteRestaurant = async (restaurantId) => {
    try {
      const response = await axios.post(`${url}/api/restaurants/remove`, { id: restaurantId });
      if (response.data.success) {
        toast.success("Restaurant removed successfully!");
        fetchRestaurants(); // Refresh the restaurant list after deletion
        setSelectedRestaurant(""); // Reset selected restaurant
        setDishes([]); // Clear dish list
      } else {
        toast.error("Failed to remove restaurant");
      }
    } catch (error) {
      toast.error("Error deleting restaurant");
    }
  };

  return (
    <div className="manage-dishes">
      <h2>Manage Dishes & Restaurants</h2>
      
      {/* ✅ Restaurant Selection & Delete Option */}
      <div className="restaurant-actions">
        <label>Select Restaurant</label>
        <select
          onChange={(e) => {
            setSelectedRestaurant(e.target.value);
            fetchDishes(e.target.value);
          }}
          value={selectedRestaurant}
        >
          <option value="">--Select--</option>
          {restaurants.map((res) => (
            <option key={res._id} value={res._id}>
              {res.name}
            </option>
          ))}
        </select>
    
      </div>
      {selectedRestaurant && (
          <button className="delete-btn" onClick={() => deleteRestaurant(selectedRestaurant)}>
            🗑️ Delete Restaurant
          </button>
        )}
      {/* ✅ Add Dish Form */}
      < AddDishForm url={url} restaurantId={selectedRestaurant} fetchDishes={fetchDishes} />

      {/* ✅ List of Dishes */}
      <div className="dish-list">
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <div key={dish._id} className="dish-item">
              <img src={`${url}/images/${dish.image}`} alt={dish.name} />
              <p> Dish Name: {dish.name}</p>
              <p>Price: ₹{dish.price}</p>
              <p>Description: {dish.description}</p>
              <p>Category: {dish.category}</p>
              <div className="inventory-control">
              <input
                type="number"
                value={dish.stock}
                min="0"
                placeholder="Stock" onChange={(e) => updateInventory(dish._id, e.target.value)} // ✅ Fix applied here
              />
            </div>
              <button className="delete-btn" onClick={() => deleteDish(dish._id)}>
                🗑️ Delete
              </button>
            </div>
          ))
        ) : (
          <p>No dishes found for this restaurant.</p>
        )}
      </div>
    </div>
  );
};

export default ManageDishes;
