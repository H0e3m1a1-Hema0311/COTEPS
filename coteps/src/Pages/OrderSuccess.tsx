import "./OrderSuccess.css";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Order Placed Successfully 🎉</h1>

        <p>
          Thank you for choosing COTEPS.
          Your delicious food is being prepared by our chefs.
        </p>

        <div className="order-details">

          <p><strong>Order ID :</strong> #COT20260001</p>

          <p><strong>Estimated Delivery :</strong> 25 - 30 mins</p>

        </div>

        <button
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;