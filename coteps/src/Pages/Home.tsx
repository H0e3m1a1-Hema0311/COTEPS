import "./Home.css";
import Navbar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import FoodCard from "../Components/FoodCard";
import { foods } from "../data/foods";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home">

        <div className="home-header">

          <h1>Discover Your Favorite Food 🍽️</h1>

          <p>
            Fresh • Tasty • Fast Delivery
          </p>

        </div>

        <SearchBar />

        <div className="category-section">

          <button className="active">All</button>
          <button>Burger</button>
          <button>Pizza</button>
          <button>Chicken</button>
          <button>Healthy</button>
          <button>Drinks</button>
          <button>Desserts</button>

        </div>

        <div className="food-grid">

          {foods.map((food) => (

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

      </div>
    </>
  );
}

export default Home;