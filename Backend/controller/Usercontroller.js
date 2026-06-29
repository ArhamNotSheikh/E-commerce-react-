const Cart = require("../models/cartModel");

// 1. GET - get all cart items
const getCart = async (req, res) => {
    try {
        const items = await Cart.find();
        res.json({ items });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 2. INCREASE quantity
const increase = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { $inc: { quantity: 1 } }, // ✅ $inc is MongoDB operator to increment
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Quantity Increased", item: updatedItem });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 3. DECREASE quantity (delete if reaches 0)
const decrease = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Cart.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // ✅ if quantity is 1, delete instead of going to 0
        if (item.quantity === 1) {
            await Cart.findByIdAndDelete(id);
            return res.json({ message: "Item Removed" });
        }

        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { $inc: { quantity: -1 } }, // ✅ $inc with -1 to decrement
            { new: true }
        );

        res.json({ message: "Quantity Decreased", item: updatedItem });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 4. POST - add item (or increase quantity if already exists)
const PostCart = async (req, res) => {
    try {
        const { productId, title, image, price } = req.body;

        if (!productId || !title || !image || !price) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        // ✅ check by productId not MongoDB _id
        const exists = await Cart.findOne({ productId: productId });

        if (exists) {
            // product already in cart → just increase quantity
            const updatedItem = await Cart.findOneAndUpdate(
                { productId: productId },
                { $inc: { quantity: 1 } },
                { new: true }
            );
            return res.json({ message: "Quantity Increased", item: updatedItem });
        }

        // product not in cart → create new
        const newItem = await Cart.create({
            productId,
            title,
            image,
            price,
            quantity: 1  // ✅ always starts at 1
        });

        res.status(201).json({ message: "Item Added", item: newItem });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 5. DELETE - remove item completely
const DeleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Cart.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item Deleted", item: deletedItem });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { getCart, PostCart, increase, decrease, DeleteCart };