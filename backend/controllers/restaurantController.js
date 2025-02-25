import RestaurantModel from "../models/RestaurantModel.js";
import DishModel from "../models/DishModel.js";

// ✅ Fetch All Restaurants
export const listRestaurants = async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find();
        res.status(200).json({ success: true, restaurants });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ success: false, message: "Error fetching restaurants" });
    }
};

// ✅ Fetch a Single Restaurant
export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await RestaurantModel.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }
        res.json({ success: true, restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching restaurant" });
    }
};

// ✅ Fetch Dishes of a Specific Restaurant
export const getDishes = async (req, res) => {
    try {
        const dishes = await DishModel.find({ restaurantId: req.params.id });
        res.json({ success: true, dishes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching dishes" });
    }
};

// ✅ Add a New Restaurant
export const addRestaurant = async (req, res) => {
    try {
        const restaurant = new RestaurantModel({
            name: req.body.name,
            location: req.body.location,
            image: req.file.filename,
        });
        await restaurant.save();
        res.status(201).json({ success: true, message: "Restaurant added successfully", restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding restaurant" });
    }
};

// ✅ Remove a Restaurant
export const removeRestaurant = async (req, res) => {
    try {
        await RestaurantModel.findByIdAndDelete(req.body.id);
        await DishModel.deleteMany({ restaurantId: req.body.id }); // Delete dishes from restaurant
        res.json({ success: true, message: "Restaurant removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing restaurant" });
    }
};

// Allow users to rate a restaurant
export const rateRestaurant = async (req, res) => {
    try {
        const { restaurantId, rating } = req.body;
        await RestaurantModel.findByIdAndUpdate(restaurantId, { $set: { rating } });
        res.json({ success: true, message: "Rating submitted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error rating restaurant" });
    }
};