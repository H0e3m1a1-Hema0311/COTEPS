import "./Login.css";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

function Login() {
  return (
    <div className="login-container">

      <div className="login-left">

        <h1>COTEPS</h1>

        <h2>Welcome Back 👨‍🍳</h2>

        <p>
          Login to continue your delicious journey with COTEPS.
        </p>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Sign In</h2>

          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="input-box">
            <FaLock />
            <input
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="#">Forgot Password?</a>
          </div>

          <button className="login-btn">
            Login
          </button>

          <button className="google-btn">
            <FaGoogle />
            Continue with Google
          </button>

          <p className="register-text">
            Don't have an account?
            <span> Register</span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;