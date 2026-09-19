import "./Splash.css";
import { useNavigate } from "react-router-dom";
function Splash() {
  const navigate = useNavigate();
  return (
    <div className="splash">

      <div className="overlay">

        <h3 className="welcome">
          👨‍🍳 Welcome
        </h3>

        <h1 className="title">
          COTEPS
        </h1>

        <p className="meaning">
          <span>C</span>hoose •
          <span> O</span>rder •
          <span> T</span>ake •
          <span> E</span>nergy •
          <span> P</span>rotein •
          <span> S</span>atisfaction
        </p>

        <p className="quote">
          "Every Meal Has A Story"
        </p>

        <button className="start-btn" onClick={() => navigate("/login")}>
          START JOURNEY 🚀
        </button>

      </div>

    </div>
  );
}

export default Splash;