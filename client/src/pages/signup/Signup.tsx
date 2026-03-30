import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await api.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    const inputClass =
        "w-full bg-white/50 border border-violet-100/60 rounded-xl px-4 py-3 text-sm text-violet-950 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200";

    return (
        <div className="min-h-screen flex items-center justify-center px-4 landing-bg relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-base font-semibold tracking-tight text-violet-950">
                        ExpenseWise
                    </span>
                </div>

                <div className="bg-white/70 backdrop-blur-sm border border-violet-100/60 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-violet-950 text-center mb-1">
                        Create account
                    </h2>
                    <p className="text-sm text-violet-400 text-center mb-6">
                        Start tracking your expenses smarter
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-xs px-3 py-2 rounded-lg mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={inputClass}
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={inputClass}
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={`${inputClass} pr-11`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-300 hover:text-violet-500 transition-colors p-1"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-700 active:scale-95 disabled:opacity-60 text-white font-medium py-3 rounded-xl text-sm transition-all duration-150 shadow-sm shadow-violet-200 mt-1"
                        >
                            {loading ? "Creating account..." : "Sign up"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-violet-100" />
                        <span className="text-xs text-violet-300 font-medium">OR</span>
                        <div className="flex-1 h-px bg-violet-100" />
                    </div>

                    <button
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-violet-50 border border-violet-100 text-violet-900 text-sm font-medium py-3 rounded-xl transition-all duration-150"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-4 h-4"
                        />
                        Sign up with Google
                    </button>

                    <p className="text-center text-xs text-violet-400 mt-5">
                        Already have an account?{" "}
                        <Link to="/login" className="text-violet-600 font-semibold hover:text-violet-800 transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            <style>{`
                .landing-bg {
                    background-color: #f5f3ff;
                    background-image:
                        radial-gradient(circle at 20% 15%, rgba(167,139,250,0.3) 0%, transparent 45%),
                        radial-gradient(circle at 80% 80%, rgba(99,179,237,0.18) 0%, transparent 40%),
                        radial-gradient(circle at 50% 50%, rgba(196,181,253,0.15) 0%, transparent 50%);
                }
                .orb { position:absolute;border-radius:50%;filter:blur(70px);animation:floatOrb ease-in-out infinite; }
                .orb-1 { width:350px;height:350px;top:-100px;left:-80px;background:rgba(167,139,250,0.2);animation-duration:9s; }
                .orb-2 { width:280px;height:280px;bottom:-60px;right:-40px;background:rgba(99,179,237,0.15);animation-duration:11s;animation-delay:-3s; }
                .orb-3 { width:200px;height:200px;top:40%;left:60%;background:rgba(196,181,253,0.18);animation-duration:13s;animation-delay:-6s; }
                @keyframes floatOrb {
                    0%,100%{transform:translate(0,0) scale(1)}
                    50%{transform:translate(18px,-22px) scale(1.04)}
                }
            `}</style>
        </div>
    );
};

export default Signup;