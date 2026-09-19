import "./Wishlist.css";
import { useWishlist } from "../Context/WishlistContext";

function Wishlist() {

  const { wishlist } = useWishlist();

  return (
    <div className="wishlist">

      <h1>❤️ My Wishlist</h1>

      <div className="wishlist-grid">

        {wishlist.length === 0 ? (

          <h2>No favourite foods yet.</h2>

        ) : (

          wishlist.map((item) => (

            <div className="wish-card" key={item.id}>

              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              <p>₹ {item.price}</p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Wishlist;