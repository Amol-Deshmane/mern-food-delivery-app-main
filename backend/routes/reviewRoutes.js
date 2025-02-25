import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Route to add a review
router.post("/add", authMiddleware, addReview);

// Route to fetch reviews for a restaurant
router.get("/:restaurantId", getReviews);

export default router;
