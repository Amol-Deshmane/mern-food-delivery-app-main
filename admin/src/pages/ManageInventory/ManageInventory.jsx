import React, { useEffect, useState } from "react";
import "./ManageInventory.css";
import axios from "axios";
import { toast } from "react-toastify";

const ManageInventory = ({ url }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${url}/api/dishes/list`);
      if (response.data.success) {
        setDishes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const updateStock = async (dishId, stock) => {
    try {
      const response = await axios.post(`${url}/api/dish/update-stock`, { id: dishId, stock });
      if (response.data.success) {
        toast.success("Stock updated!");
        fetchDishes();
      } else {
        toast.error("Failed to update stock");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div className="manage-inventory">
      <h2>Manage Inventory</h2>
      <div className="inventory-list">
        {dishes.map((dish) => (
          <div key={dish._id} className="inventory-item">
            <p>{dish.name}</p>
            <input type="number" value={dish.stock} onChange={(e) => updateStock(dish._id, e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageInventory; // ✅ Ensure default export
