import "./TrendingFoods.css";
import FoodCard from "./FoodCard";
import { foods } from "../data/foods";

function TrendingFoods() {
  const trendingFoods = foods.slice(0, 4);

  return (
    <section className="trending-section">

      <div className="trending-header">

        <h2>🔥 Trending Today</h2>

        <p>
          Most Loved Foods by Our Customers
        </p>

      </div>

      <div className="trending-grid">

        {trendingFoods.map((food) => (

          <FoodCard
            key={food.id}
            image={food.image}
            name={food.name}
            price={food.price}
            rating={food.rating}
            protein={food.protein}
            energy={food.energy}
          />

        ))}

      </div>

    </section>
  );
}

export default TrendingFoods;