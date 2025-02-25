import React, { useEffect, useState, useContext } from "react";
import "./Reviews.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Reviews = ({ url }) => {
  const { id } = useParams();
  const { token } = useContext(StoreContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get(`${url}/api/review/${id}`);
    if (response.data.success) {
      setReviews(response.data.data);
    }
  };

  const submitReview = async () => {
    if (!token) {
      alert("You need to log in to leave a review.");
      return;
    }

    const response = await axios.post(`${url}/api/review/add`, { restaurantId: id, rating, comment }, { headers: { token } });

    if (response.data.success) {
      fetchReviews();
      setComment("");
    }
  };

  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>
      {reviews.map((rev, index) => (
        <div key={index} className="review-card">
          <p><strong>{rev.userId.name}</strong>: {rev.comment}</p>
          <p>⭐ {rev.rating}</p>
        </div>
      ))}
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a review..."></textarea>
      <button onClick={submitReview}>Submit</button>
    </div>
  );
};

export default Reviews;
