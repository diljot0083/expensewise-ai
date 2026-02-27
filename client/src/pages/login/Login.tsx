import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post(
      "/api/login",
      { email, password },
      { withCredentials: true }
    );
    login(res.data.accessToken, res.data.user);
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // later: Google OAuth
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to manage your expenses</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
