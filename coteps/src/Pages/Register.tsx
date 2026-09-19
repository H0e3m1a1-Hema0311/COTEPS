import "./Register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
} from "react-icons/fa";

function Register() {
  return (
    <div className="register-container">

      <div className="register-left">

        <h1>COTEPS</h1>

        <h2>Create Your Account 👨‍🍳</h2>

        <p>
          Join COTEPS and start ordering your favorite meals with ease.
        </p>

      </div>

      <div className="register-right">

        <div className="register-card">

          <h2>Create Account</h2>

          <div className="input-box">
            <FaUser />
            <input
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className="input-box">
            <FaPhone />
            <input
              type="tel"
              placeholder="Mobile Number"
            />
          </div>

          <div className="input-box">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="input-box">
            <FaLock />
            <input
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <button className="register-btn">
            Create Account
          </button>

          <p className="login-link">
            Already have an account?
            <span> Login</span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;