import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String,required: true},
    description: {type: String,required: true},
    price: {type: Number,required: true},
    image: {type: String,required: true},
    category: {type: String,required: true},
    stock: { type: Number, required: true, default: 10 } // ✅ Added stock quantity

})

const foodModel = mongoose.model.food || mongoose.model("food",foodSchema);

export default foodModel;