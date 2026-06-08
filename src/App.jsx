import Home from "./Components/Home";
import Navbar from "./Components/navbar";
import { useState } from "react";
import Cart from "./Components/cart";
import { BrowserRouter,Routes,Route } from "react-router-dom";









function App() {
    const [cart, setCart] = useState([]);
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
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
    );
}
export default App;