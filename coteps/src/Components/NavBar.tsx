import { Link } from "react-router-dom";
import { FaUserCircle, FaMoon } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">

      {/* Logo */}

      <div className="logo-section">

        <h2 className="logo">
          COT<span>EPS</span>
        </h2>

      </div>

      {/* Navigation */}

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/explore">Explore</Link>
        </li>

        <li>
          <Link to="/journey">Journey</Link>
        </li>

        <li>
          <Link to="/community">Community</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

      </ul>

      {/* Right Side */}

      <div className="right-section">

        <button className="theme-btn">

          <FaMoon />

        </button>

        <button className="login-btn">

          Login

        </button>

        <FaUserCircle className="profile-icon"/>

      </div>

    </nav>
  );
};

export default Navbar;