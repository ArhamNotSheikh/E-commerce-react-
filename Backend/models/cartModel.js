const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    productId: Number,       // id from Fake Store API
    title: String,           // product name
    image: String,           // product image URL
    price: Number,           // product price
    quantity: Number,        // how many user added
});

const Cart = mongoose.model("Cart", CartSchema); // ❌ was cartSchema (wrong case)

module.exports = Cart; // ❌ was model.exports (typo)