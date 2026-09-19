import "./Hero.css";
import { FaArrowRight, FaSearch } from "react-icons/fa";

function Hero() {
  return (
    <div className="hero">

      {/* Navbar */}
      <header className="navbar">

        <div className="logo">
          COTEPS
        </div>

        <nav>
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">Offers</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        <button className="login-btn">
          Login
        </button>

      </header>

      {/* Hero Content */}

      <div className="hero-content">

        <p className="welcome">
          👨‍🍳 Welcome to
        </p>

        <h1>
          COTEPS
        </h1>

        <h2>
          Choice • Order • Take • Energy • Protein • Satisfaction
        </h2>

        <p className="description">
          Discover delicious meals crafted with quality ingredients,
          packed with taste, energy and satisfaction.
        </p>

        {/* Search */}

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search your favourite food..."
          />

          <button>
            Search
          </button>

        </div>

        <div className="hero-buttons">

          <button className="start-btn">
            Start Journey
            <FaArrowRight />
          </button>

          <button className="menu-btn">
            Explore Menu
          </button>

        </div>

      </div>

    </div>
  );
}

export default Hero;