import Home from "./Components/Home";
import Navbar from "./Components/navbar";
import { useState } from "react";
import Cart from "./Components/cart";




function App() {
    const [cart, setCart] = useState([]);
    return (
        <div>
            <Navbar />
            <Home cart={cart} setCart={setCart} />
            <Cart cart={cart} setCart={setCart} />
            
        </div>
    );
}
export default App;