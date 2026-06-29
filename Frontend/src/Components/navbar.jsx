import "../Css/nav.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/">
      <h2>Shop</h2>
      </Link>
      <Link to="/cart">
      <button className="cart">cart

      </button>
      </Link>
     
    </nav>
  );
}

export default Navbar;