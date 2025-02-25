import express from "express";
import multer from "multer";
import { addDish, getDishesByRestaurant, removeDish, updateStock,rateDish } from "../controllers/dishController.js";

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addDish);
router.get("/list/:id", getDishesByRestaurant);
router.post("/remove", removeDish);
router.post("/updateStock", updateStock);  // ✅ Fix: Added updateStock Route
router.post("/rate", rateDish); // ⭐ Allow users to rate dishes



export default router;



//router.get("/list/:restaurantId", getDishes);