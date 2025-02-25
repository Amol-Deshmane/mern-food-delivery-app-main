import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DishCard from "../../components/DishCard/DishCard";
import { StoreContext } from "../../components/context/StoreContext";
import "./RestaurantDishes.css";

const RestaurantDishes = () => {
    const { id } = useParams(); // ✅ Fix restaurant ID retrieval
    const { url, addToCart } = useContext(StoreContext);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get(`${url}/api/dishes/list/${id}`);
                if (response.data.success) {
                    setDishes(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };
        fetchDishes();
    }, [id]);

    return (
        <div className="restaurant-dishes">
            <h2>Menu</h2>
            <div className="dish-grid">
                {dishes.map((dish) => (
                    <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantDishes;
