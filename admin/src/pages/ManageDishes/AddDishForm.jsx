import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddDishForm.css";  // ✅ Import the CSS

const AddDishForm = ({ url, restaurantId, fetchDishes }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "veg",
    inventory: "",
    image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      toast.error("Please select a restaurant first!");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("restaurantId", restaurantId);

    try {
      const response = await axios.post(`${url}/api/dishes/add`, data);
      if (response.data.success) {
        toast.success("Dish added successfully!");
        fetchDishes(restaurantId);
      }
    } catch (error) {
      toast.error("Error adding dish");
    }
  };

  return (
    <form className="add-dish-form" onSubmit={handleSubmit}>
      <h3>Add New Dish</h3>
      <input type="text" name="name" placeholder="Dish Name" onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="number" name="price" placeholder="Price (₹)" onChange={handleChange} required />
      <select name="category" onChange={handleChange}>
        <option value="Veg">Veg</option>
        <option value="Vonveg">Non-Veg</option>
      </select>
      <input type="number" name="inventory" placeholder="Inventory" onChange={handleChange} required />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Add Dish</button>
    </form>
  );
};

export default AddDishForm;
