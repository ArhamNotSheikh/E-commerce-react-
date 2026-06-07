import "../Css/cart.css";

function Item(props) {
    return (
        <div className="cart-item">
            <div className="product">
                <div className="prodimage">
                    <img
                        src={props.img}
                        alt={props.item}
                    />
                </div>

                <div className="prodName">
                    {props.item}
                </div>
            </div>

            <div className="prodquantity">
                1
            </div>

            <div className="prodprice">
                ${props.price}
            </div>
        </div>
    );
}

function Cart({ cart }) {
    return (
        <div className="container">
            <h1>Cart</h1>

            <div className="cart-header">
                <span className="product-name">Product Name</span>
                <span className="quantity">Quantity</span>
                <span className="price">Price</span>
            </div>

            {cart.map((product) => (
                <Item
                    key={product.id}
                    img={product.image}
                    item={product.title}
                    price={product.price}
                />
            ))}
        </div>
    );
}

export default Cart;