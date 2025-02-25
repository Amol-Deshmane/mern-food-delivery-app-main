import DishModel from "../models/DishModel.js";
import RestaurantModel from "../models/RestaurantModel.js";

// Add a new dish
export const addDish = async (req, res) => {
    try {
        const { name, description, price, category, inventory, restaurantId } = req.body;

        // Check if restaurant exists
        const restaurant = await RestaurantModel.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });

        const dish = new DishModel({
            name,
            description,
            price,
            category,
            inventory,
            restaurantId,
            image: req.file.filename
        });

        await dish.save();
        res.status(201).json({ success: true, message: "Dish added successfully", dish });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding dish" });
    }
};

// Get dishes by restaurant
export const getDishesByRestaurant = async (req, res) => {
    try {
        const dishes = await DishModel.find({ restaurantId: req.params.id });
        res.json({ success: true, data: dishes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching dishes" });
    }
};

// Remove a dish
export const removeDish = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Dish ID is required" });
        }

        const dish = await DishModel.findByIdAndDelete(id);
        if (!dish) {
            return res.status(404).json({ success: false, message: "Dish not found" });
        }

        res.json({ success: true, message: "Dish deleted successfully" });
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({ success: false, message: "Error deleting dish" });
    }
};

export const updateStock = async (req, res) => {
    try {
        const { id, stock } = req.body;
        const dish = await DishModel.findById(id);
        
        if (!dish) {
            return res.status(404).json({ success: false, message: "Dish not found" });
        }

        dish.stock = stock;
        await dish.save();

        res.status(200).json({ success: true, message: "Stock updated successfully!" });
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).json({ success: false, message: "Error updating stock" });
    }
};

// Allow users to rate a dish
export const rateDish = async (req, res) => {
    try {
        const { dishId, rating } = req.body;
        await DishModel.findByIdAndUpdate(dishId, { $set: { rating } });
        res.json({ success: true, message: "Rating submitted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error rating dish" });
    }
};