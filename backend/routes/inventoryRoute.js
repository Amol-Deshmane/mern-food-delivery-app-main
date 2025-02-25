import express from "express";
import { getInventory, addInventoryItem, removeInventoryItem } from "../controllers/inventoryController.js";

const inventoryRouter = express.Router();

inventoryRouter.get("/list", getInventory);
inventoryRouter.post("/add", addInventoryItem);
inventoryRouter.delete("/remove/:id", removeInventoryItem);

export default inventoryRouter;
