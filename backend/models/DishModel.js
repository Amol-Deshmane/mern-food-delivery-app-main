import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant", required: true },
    rating: { type: Number, default: 0 } // ⭐ Added rating field
});

const DishModel = mongoose.model("dish", dishSchema);
export default DishModel;
