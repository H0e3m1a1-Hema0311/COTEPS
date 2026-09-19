import "./Checkout.css";
import { useState } from "react";

function Checkout() {

  const [payment, setPayment] = useState("UPI");

  return (
    <div className="checkout">

      <h1>Checkout 💳</h1>

      <div className="checkout-container">

        <div className="address-box">

          <h2>Delivery Address</h2>

          <input type="text" placeholder="Full Name" />

          <input type="text" placeholder="Mobile Number" />

          <textarea
            placeholder="Enter Delivery Address"
            rows={5}
          ></textarea>

        </div>

        <div className="payment-box">

          <h2>Payment Method</h2>

          <label>
            <input
              type="radio"
              checked={payment === "UPI"}
              onChange={() => setPayment("UPI")}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              checked={payment === "CARD"}
              onChange={() => setPayment("CARD")}
            />
            Debit / Credit Card
          </label>

          <label>
            <input
              type="radio"
              checked={payment === "COD"}
              onChange={() => setPayment("COD")}
            />
            Cash On Delivery
          </label>

          <button>
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;