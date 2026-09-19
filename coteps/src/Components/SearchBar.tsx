import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <section className="search-section">

      <h2>Find Your Favorite Food</h2>

      <p>
        Search from burgers, pizza, chicken, drinks and more...
      </p>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search your favorite food..."
        />

        <button>Search</button>

      </div>

    </section>
  );
}

export default SearchBar;