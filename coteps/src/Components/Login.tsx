import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowRight, FiCheck } from 'react-icons/fi';

interface LoginProps {
  onLoginSuccess: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = emailOrPhone.trim();
    const userName = trimmedValue ? trimmedValue.split(/[\s@]+/)[0] || 'COTEPS User' : 'COTEPS User';

    if (trimmedValue && password.trim()) {
      onLoginSuccess(userName);
    }
  };

  return (
    <div className="coteps-login-shell">
      <style>{`
        .coteps-login-shell {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background:
            linear-gradient(rgba(15, 18, 27, 0.74), rgba(15, 18, 27, 0.78)),
            url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
          font-family: 'Segoe UI', sans-serif;
        }

        .coteps-login-box {
          width: min(1180px, 100%);
          min-height: 700px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          border-radius: 28px;
          overflow: hidden;
          background: rgba(18, 22, 33, 0.68);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
        }

        .login-visual {
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 42px 42px 32px;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.62)),
            url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
        }

        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 111, 41, 0.28), rgba(0,0,0,0.4));
        }

        .visual-content {
          position: relative;
          z-index: 1;
          color: white;
          max-width: 480px;
        }

        .brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.18em;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .visual-content h1 {
          font-size: clamp(2.2rem, 3vw, 4rem);
          line-height: 1.1;
          margin: 0 0 12px;
          font-weight: 800;
        }

        .visual-content p {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
          max-width: 420px;
        }

        .visual-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 28px;
        }

        .stat-box {
          min-width: 120px;
          padding: 16px 18px;
          border-radius: 18px;
          background: rgba(15, 17, 22, 0.38);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
        }

        .stat-box strong {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 2px;
        }

        .stat-box span {
          color: rgba(255,255,255,0.72);
          font-size: 0.76rem;
          letter-spacing: 0.04em;
        }

        .login-panel {
          background: rgba(17, 20, 28, 0.82);
          padding: 42px 32px 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card {
          width: min(100%, 420px);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          padding: 28px 24px 18px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 40px rgba(0,0,0,0.28);
        }

        .login-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }

        .logo-mark {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ff8a3d, #ff5a36);
          color: white;
          font-size: 1.2rem;
          font-weight: 800;
          box-shadow: 0 16px 28px rgba(255, 96, 46, 0.35);
        }

        .login-card-header h2 {
          margin: 0;
          font-size: 1.7rem;
          color: white;
          letter-spacing: -0.04em;
        }

        .login-card-header span {
          color: rgba(255,255,255,0.7);
          font-size: 0.8rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field label {
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.68);
          font-weight: 700;
        }

        .input-wrap {
          position: relative;
        }

        .input-wrap svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.46);
          font-size: 1rem;
        }

        .input-wrap input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          color: white;
          font-size: 0.97rem;
          padding: 15px 16px 15px 46px;
          outline: none;
          transition: all 0.25s ease;
        }

        .input-wrap input::placeholder {
          color: rgba(255,255,255,0.38);
        }

        .input-wrap input:focus {
          border-color: rgba(255, 145, 77, 0.8);
          box-shadow: 0 0 0 4px rgba(255, 145, 77, 0.12);
          background: rgba(255,255,255,0.06);
        }

        .toggle-password {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.62);
          cursor: pointer;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 4px;
          font-size: 0.88rem;
        }

        .remember-box {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.74);
          cursor: pointer;
          user-select: none;
        }

        .remember-box input {
          accent-color: #ff7f3f;
          width: 16px;
          height: 16px;
        }

        .link-btn {
          background: none;
          border: none;
          color: #ffc38a;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        .primary-btn {
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #ff8a3d, #ff5a36);
          color: white;
          padding: 16px 18px;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 18px 28px rgba(255, 96, 46, 0.28);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 32px rgba(255, 96, 46, 0.35);
        }

        .register-line {
          margin-top: 10px;
          color: rgba(255,255,255,0.7);
          font-size: 0.92rem;
          text-align: center;
        }

        .register-line button {
          background: none;
          border: none;
          color: #ffb27d;
          font-weight: 800;
          cursor: pointer;
          margin-left: 6px;
        }

        .tiny-crest {
          margin-top: 22px;
          display: flex;
          justify-content: center;
          gap: 10px;
          color: rgba(255,255,255,0.44);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        @media (max-width: 940px) {
          .coteps-login-box {
            grid-template-columns: 1fr;
          }

          .login-visual {
            min-height: 300px;
          }

          .login-panel {
            padding-top: 24px;
          }
        }

        @media (max-width: 560px) {
          .coteps-login-shell {
            padding: 16px;
          }

          .login-card {
            padding: 22px 16px 14px;
          }

          .login-visual {
            padding: 28px 20px 22px;
          }

          .visual-content h1 {
            font-size: 2.1rem;
          }
        }
      `}</style>

      <div className="coteps-login-box">
        <div className="login-visual">
          <div className="visual-overlay" />
          <div className="visual-content">
            <div className="brand-pill">COTEPS</div>
            <h1>Fresh food, faster delivery.</h1>
            <p>
              Discover chef-crafted meals, comfort favorites, and exclusive deals made for your daily cravings.
            </p>

            <div className="visual-stats">
              <div className="stat-box">
                <strong>50K+</strong>
                <span>Happy diners</span>
              </div>
              <div className="stat-box">
                <strong>15 min</strong>
                <span>Avg. delivery</span>
              </div>
              <div className="stat-box">
                <strong>4.8/5</strong>
                <span>Customer love</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-card">
            <div className="login-card-header">
              <div className="logo-mark">C</div>
              <div>
                <h2>Welcome back</h2>
                <span>Sign in to continue</span>
              </div>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="email-or-phone">Email or phone</label>
                <div className="input-wrap">
                  <FiMail />
                  <input
                    id="email-or-phone"
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <FiLock />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="meta-row">
                <label className="remember-box">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((value) => !value)}
                  />
                  <span>Remember me</span>
                </label>

                <button type="button" className="link-btn">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="primary-btn">
                Login to COTEPS <FiArrowRight />
              </button>

              <div className="register-line">
                New here?
                <button type="button">Create account</button>
              </div>

              <div className="tiny-crest">
                <FiCheck />
                <span>Freshly served</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};