import React, { useState } from "react";
import "./AddRestaurant.css";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;


const AddRestaurant = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    location: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/restaurants/add`, formData);

    if (response.data.success) {
      setData({ name: "", location: "" });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add-restaurant">
      <h2>Add Restaurant</h2>
      <form onSubmit={onSubmitHandler}>
        <label>Restaurant Name</label>
        <input type="text" name="name" value={data.name} onChange={onChangeHandler} required />
        <label>Location</label>
        <input type="text" name="location" value={data.location} onChange={onChangeHandler} required />
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
