import ReviewModel from "../models/reviewModel.js";

// Add a review
export const addReview = async (req, res) => {
  try {
    const { restaurantId, rating, comment } = req.body;

    const newReview = new ReviewModel({
      restaurantId,
      userId: req.body.userId, // Coming from auth middleware
      rating,
      comment
    });

    await newReview.save();
    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding review" });
  }
};

// Fetch reviews for a restaurant
export const getReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ restaurantId: req.params.restaurantId }).populate("userId", "name");
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching reviews" });
  }
};

import RestaurantModel from "../models/RestaurantModel.js";

// Fetch restaurants with average rating
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    
    const restaurantData = await Promise.all(
      restaurants.map(async (restaurant) => {
        const reviews = await ReviewModel.find({ restaurantId: restaurant._id });
        const averageRating = reviews.length ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
        return { ...restaurant._doc, averageRating };
      })
    );

    res.json({ success: true, data: restaurantData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching restaurants" });
  }
};
