import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("/api/register", {
                name,
                email,
                password,
            });

            navigate("/login");

        } catch (error: any) {
            console.error("Signup failed:", error.response?.data || error.message);
        }
    };

    const handleGoogleSignup = () => {
        console.log("Google signup clicked");
        // later:
        // redirect to backend Google OAuth
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create Account</h2>
                <p className="subtitle">Start tracking your expenses smarter</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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
                        Sign Up
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button className="google-btn" onClick={handleGoogleSignup}>
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                    />
                    Sign up with Google
                </button>

                <p className="login-text">
                    Already have an account? <Link to={"/login"}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
