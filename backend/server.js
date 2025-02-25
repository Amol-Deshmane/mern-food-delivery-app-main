import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import restaurantRouter from "./routes/restaurantRoute.js";  // ✅ Ensure Correct Import
import dishRouter from "./routes/dishRoute.js"; // ✅ Ensure Correct Import

import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

// App config
const app = express();
const port = 4000;
connectDB();
// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// ✅ Register API Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurants", restaurantRouter);  // ✅ Ensure Correct Route Name
app.use("/api/dishes", dishRouter);  // ✅ Ensure Correct Route Name

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
