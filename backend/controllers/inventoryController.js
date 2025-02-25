import Inventory from "../models/inventoryModel.js"; // Ensure this model exists

// Get all inventory items
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
};

// Add a new inventory item
export const addInventoryItem = async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;
    const newItem = new Inventory({ name, quantity, price, category });
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
};

// Remove an inventory item
export const removeInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Inventory.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};
