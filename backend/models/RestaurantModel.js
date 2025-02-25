import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 } // ⭐ Added rating field
});

const RestaurantModel = mongoose.model("restaurant", restaurantSchema);
export default RestaurantModel;
