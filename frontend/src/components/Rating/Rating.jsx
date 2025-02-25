import React from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";

const Rating = ({ value, onClick }) => {
    return (
        <div className="rating">
            {[...Array(5)].map((_, index) => (
                <FaStar key={index} onClick={() => onClick(index + 1)} color={index < value ? "#ffcc00" : "#ccc"} />
            ))}
        </div>
    );
};

export default Rating;
