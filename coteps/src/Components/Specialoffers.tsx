import "./SpecialOffers.css";

function SpecialOffers() {
  return (
    <section className="offers">

      <div className="offer-card">

        <h2>🍔 Burger Festival</h2>

        <p>Buy 1 Get 1 Free</p>

        <button>Order Now</button>

      </div>

      <div className="offer-card">

        <h2>🍕 Pizza Combo</h2>

        <p>Flat 40% OFF</p>

        <button>Grab Deal</button>

      </div>

      <div className="offer-card">

        <h2>🥤 Free Drink</h2>

        <p>On Orders Above ₹499</p>

        <button>Claim Now</button>

      </div>

    </section>
  );
}

export default SpecialOffers;