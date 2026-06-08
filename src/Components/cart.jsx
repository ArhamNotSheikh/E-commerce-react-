import { Link } from "react-router-dom";
import "../Css/cart.css";

function Item(props) {
  return (
    <div className="cart-item">
      <div className="product">
        <div className="edit-bts">
          <button
            className="minusitem"
            onClick={() => {
              props.setCart(
                props.cart.map((product) =>
                  product.id === props.id
                    ? {
                        ...product,
                        quantity: Math.max(1, product.quantity - 1),
                      }
                    : product
                )
              );
            }}
          >
            Less
          </button>

          <button
            className="deletebutton"
            onClick={() => {
              props.setCart(
                props.cart.filter(
                  (product) => product.id !== props.id
                )
              );
            }}
          >
            Delete
          </button>

          <button
            className="additem"
            onClick={() => {
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
            }}
          >
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

      <div className="prodquantity">
        {props.quantity}
      </div>

      <div className="prodprice">
        ${props.price.toFixed(2)}
      </div>

      <div className="totalprice">
        ${(props.quantity * props.price).toFixed(2)}
      </div>
    </div>
  );
}

function Cart({ cart, setCart }) {
  const totalPrice = cart.reduce(
    (sum, product) =>
      sum + product.price * product.quantity,
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
            key={product.id}
            id={product.id}
            img={product.image}
            item={product.title}
            price={product.price}
            quantity={product.quantity}
            setCart={setCart}
            cart={cart}
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