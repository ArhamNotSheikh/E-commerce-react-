import Home from "./Components/Home";
import Navbar from "./Components/navbar";
import { useState, useEffect } from "react";
import Cart from "./Components/cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://cartflow-backend-o172.onrender.com/api/cart"; // ✅ fixed double slash too

function App() {
    const [cart, setCart] = useState([]);

    // ✅ useEffect INSIDE App()
    useEffect(() => {
        axios.get(BASE_URL)
            .then((res) => {
                setCart(res.data.items); // ✅ fixed .item → .items
            })
            .catch((err) => {
                console.error("Failed to load cart", err);
            });
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            cart={cart}
                            setCart={setCart}
                            BASE_URL={BASE_URL}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            setCart={setCart}
                            BASE_URL={BASE_URL}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;