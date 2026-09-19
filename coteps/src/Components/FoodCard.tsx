import "./FoodCard.css";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";

type FoodCardProps = {
  image: string;
  name: string;
  price: number;
  rating: number;
  protein: number;
  energy: number;
};

function FoodCard({
  image,
  name,
  price,
  rating,
  protein,
  energy,
}: FoodCardProps) {
  return (
    <div className="food-card">

      <div className="food-image">
        <img src={image} alt={name} />
      </div>

      <div className="food-content">

        <h3>{name}</h3>

        <div className="rating">
          <FaStar /> {rating}
        </div>

        <p>⚡ Energy : {energy} kcal</p>

        <p>💪 Protein : {protein} g</p>

        <div className="bottom">

          <span className="price">
            ₹{price}
          </span>

          <div className="icons">

            <FaHeart className="heart" />

            <button>
              <FaShoppingCart />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;