import express from "express";
import { 
    addRestaurant, 
    removeRestaurant, 
    listRestaurants, 
    getDishes, 
    getRestaurantById,
    rateRestaurant
} from "../controllers/restaurantController.js";
import multer from "multer";

const router = express.Router();

// ✅ Multer for Image Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ API Routes
router.post("/add", upload.single("image"), addRestaurant);
router.post("/remove", removeRestaurant);
router.get("/list", listRestaurants);  // ✅ FIXED: Correct route
router.get("/dishes/:id", getDishes);
router.get("/:id", getRestaurantById);
router.post("/rate", rateRestaurant); // ⭐ Allow users to rate restaurants


export default router;
