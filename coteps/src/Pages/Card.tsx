import "./Cart.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../Context/CartContext";

function Cart() {

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 499 ? 0 : 40;

  const total = subtotal + delivery;

  return (
    <div className="cart-page">

      <h1>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cart.map((item) => (

            <div className="cart-item" key={item.id}>

              <img src={item.image} alt={item.name} />

              <div className="cart-info">

                <h3>{item.name}</h3>

                <p>₹ {item.price}</p>

              </div>

              <div className="qty">

                <button onClick={() => decreaseQty(item.id)}>
                  <FaMinus />
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQty(item.id)}>
                  <FaPlus />
                </button>

              </div>

              <h3>₹ {item.price * item.quantity}</h3>

              <button
                className="delete-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <FaTrash />
              </button>

            </div>

          ))}

          <div className="summary">

            <h2>Order Summary</h2>

            <p>Subtotal : ₹ {subtotal}</p>

            <p>Delivery : ₹ {delivery}</p>

            <h3>Total : ₹ {total}</h3>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

          </div>

        </>
      )}

    </div>
  );
}

export default Cart;