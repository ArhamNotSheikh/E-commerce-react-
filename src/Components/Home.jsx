import "../Css/Home.css";
import { useEffect, useState } from "react";

function Prod(props) {
  const [added, setAdded] = useState(false);
  return (
    <div className="Products">
      <div className="Product-image">
        <img src={props.image} alt={props.title} />
      </div>

      <div className="Product-Details">
        <h3>{props.title}</h3>
        <p>${props.price.toFixed(2)}</p>
        <button
          className="Add-to-Cart"
          onClick={() => {
            props.setCart([
  ...props.cart,
  {
    id: props.id,
    title: props.title,
    image: props.image,
    price: props.price
  }
]);
            console.log(props.cart);
            setAdded(true);

            setTimeout(() => {
              setAdded(false);
            }, 1000);
          }}
        >
          Add to Cart
        </button>
        {added && <p className="added-message">Item added to cart!</p>}
        
      </div>
     
    </div>
  );
}

function Home({cart, setCart}) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="home">
      {products.map((product) => (
        <Prod
          id={product.id}
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          setCart={setCart}
          cart={cart}
        />
        
      ))}
      
    </div>
  );
}

export default Home;
