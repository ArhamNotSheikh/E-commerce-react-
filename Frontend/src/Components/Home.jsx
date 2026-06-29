import "../Css/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";  // ✅ added

function Prod(props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      // ✅ send to backend first
      const res = await axios.post(props.BASE_URL, {
        productId: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
      });

      // ✅ check if item already existed or is new
      const savedItem = res.data.item;

      const existing = props.cart.find(
        (product) => product.productId === props.id
      );

      if (existing) {
        // ✅ update quantity in React state
        props.setCart(
          props.cart.map((product) =>
            product.productId === props.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        );
      } else {
        // ✅ add new item to React state using data from DB
        props.setCart([...props.cart, savedItem]);
      }

      setAdded(true);
      setTimeout(() => setAdded(false), 1000);

    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="Products">
      <div className="Product-image">
        <img src={props.image} alt={props.title} />
      </div>

      <div className="Product-Details">
        <h3>{props.title}</h3>
        <p>${props.price.toFixed(2)}</p>

        <button onClick={handleAddToCart}>  
          Add to Cart
        </button>

        {added && <p className="added-message">Item added to cart!</p>}
      </div>
    </div>
  );
}

function Home({ cart, setCart, BASE_URL }) {  // ✅ added BASE_URL
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSearch(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="home">
        {filteredProducts.map((product) => (
          <Prod
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            cart={cart}
            setCart={setCart}
            BASE_URL={BASE_URL}  // ✅ pass BASE_URL to each Prod
          />
        ))}
      </div>
    </>
  );
}

export default Home;