import { Link } from "react-router-dom";
import "../Css/cart.css";
import axios from "axios";  // ✅ added

function Item(props) {

  // ✅ increase quantity
  const handleIncrease = async () => {
    try {
      await axios.put(`${props.BASE_URL}/increase/${props._id}`);

      props.setCart(
        props.cart.map((product) =>
          product._id === props._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  // ✅ decrease quantity (backend deletes if quantity reaches 1)
  const handleDecrease = async () => {
    try {
      await axios.put(`${props.BASE_URL}/decrease/${props._id}`);

      if (props.quantity === 1) {
        // ✅ remove from React state if quantity was 1
        props.setCart(props.cart.filter((product) => product._id !== props._id));
      } else {
        props.setCart(
          props.cart.map((product) =>
            product._id === props._id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );
      }
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  // ✅ delete item completely
  const handleDelete = async () => {
    try {
      await axios.delete(`${props.BASE_URL}/${props._id}`);

      props.setCart(props.cart.filter((product) => product._id !== props._id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className="cart-item">
      <div className="product">
        <div className="edit-bts">
          <button className="minusitem" onClick={handleDecrease}>
            Less
          </button>

          <button className="deletebutton" onClick={handleDelete}>
            Delete
          </button>

          <button className="additem" onClick={handleIncrease}>
            Add
          </button>
        </div>

        <div className="prodimage">
          <img src={props.img} alt={props.item} />
        </div>

        <div className="prodName">
          {props.item}
        </div>
      </div>

      <div className="prodquantity">{props.quantity}</div>
      <div className="prodprice">${props.price.toFixed(2)}</div>
      <div className="totalprice">${(props.quantity * props.price).toFixed(2)}</div>
    </div>
  );
}

function Cart({ cart, setCart, BASE_URL }) {  // ✅ added BASE_URL
  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Cart</h1>

      <div className="cart-header">
        <span className="product-name">Product Name</span>
        <span className="quantity">Quantity</span>
        <span className="price">Price</span>
        <span className="price">Total</span>
      </div>

      {cart.length === 0 ? (
        <Link to="/">
          <div>Cart Empty. Shop now?</div>
        </Link>
      ) : (
        cart.map((product) => (
          <Item
            key={product._id}        // ✅ changed from product.id
            _id={product._id}        // ✅ MongoDB _id
            img={product.image}
            item={product.title}
            price={product.price}
            quantity={product.quantity}
            setCart={setCart}
            cart={cart}
            BASE_URL={BASE_URL}      // ✅ pass BASE_URL down
          />
        ))
      )}

      {cart.length > 0 && (
        <div className="totalcartprice">
          Total Price: ${totalPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
}

export default Cart;