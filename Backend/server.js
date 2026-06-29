const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config();

const cartRoutes = require("./Routes/CartRouter");

const app = express();
app.use(cors());  

app.use(express.json());
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Failed:", err.message);
    });