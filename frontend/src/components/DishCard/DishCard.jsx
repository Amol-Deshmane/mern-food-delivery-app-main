import React, { useContext } from "react";
import { StoreContext } from "../../components/context/StoreContext";
import "./DishCard.css";
import { assets } from "../../assets/assets"; // ✅ Import icons

const DishCard = ({ dish }) => {
    const { url, cartItems, addToCart, removeFromCart } = useContext(StoreContext); // ✅ Context

    return (
        <div className="dish-card">
            <img src={`${url}/images/${dish.image}`} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p className="price">₹{dish.price}</p>

            {cartItems[dish._id] ? (
                <div className="food-item-counter">
                    <img onClick={() => removeFromCart(dish._id)} src={assets.remove_icon_red} alt="Remove" />
                    <p>{cartItems[dish._id]}</p>
                    <img onClick={() => addToCart(dish._id)} src={assets.add_icon_green} alt="Add" />
                </div>
            ) : (
                <button onClick={() => addToCart(dish._id)}>🛒 Add to Cart</button>
            )}
        </div>
    );
};

export default DishCard;
