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
        onClick={() => {
  const existing = props.cart.find(
    (product) => product.id === props.id
  );

  if (existing) {
    props.setCart(
      props.cart.map((product) =>
        product.id === props.id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      )
    );
  } else {
    props.setCart([
      ...props.cart,
      {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        quantity: 1,
      },
    ]);
  }

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
