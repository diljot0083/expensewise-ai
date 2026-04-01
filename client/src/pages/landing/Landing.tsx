import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Typing from "../../hooks/Typing";

const FEATURES = [
  { icon: "✦", label: "AI-powered insights" },
  { icon: "✦", label: "Real-time tracking" },
  { icon: "✦", label: "Smart analytics" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden landing-bg">

      {/* Animated floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        {/* Subtle grid */}
        <div className="absolute inset-0 landing-grid opacity-40" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-base font-semibold tracking-tight text-violet-950">
            ExpenseWise AI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-violet-700 hover:text-violet-900 font-medium transition-colors px-4 py-2 rounded-xl hover:bg-violet-50 border border-transparent hover:border-violet-100"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-sm shadow-violet-200"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100svh-80px)] px-6 text-center">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          AI-Powered Finance Tracker
        </div>

        {/* Headline with typing effect */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-violet-950 leading-tight tracking-tight max-w-3xl transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          <Typing message="Smart Expense Tracker" speed={55} />
        </h1>

        {/* Subtext */}
        <p
          className={`mt-5 text-base sm:text-lg text-violet-500 max-w-xl leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Track your expenses with AI-powered insights and take full control of your finances effortlessly.
        </p>

        {/* Feature pills */}
        <div
          className={`flex flex-wrap justify-center gap-2 mt-6 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {FEATURES.map((f) => (
            <span
              key={f.label}
              className="flex items-center gap-1.5 text-xs text-violet-600 bg-white/60 backdrop-blur-sm border border-violet-100 px-3 py-1.5 rounded-full font-medium"
            >
              <span className="text-violet-400 text-[10px]">{f.icon}</span>
              {f.label}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-row gap-3 mt-8 transition-all duration-700 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <button
            onClick={() => navigate("/signup")}
            className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md shadow-violet-200"
          >
            Start for free →
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-white/70 backdrop-blur-sm hover:bg-white/90 border border-violet-100 text-violet-700 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
          >
            Sign in
          </button>
        </div>

        {/* Bottom trust line */}
        <p
          className={`mt-8 text-xs text-violet-300 transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          No credit card required · Free forever
        </p>
      </div>

      <style>{`
                .landing-bg {
                    background-color: #f5f3ff;
                    background-image:
                        radial-gradient(circle at 15% 10%, rgba(167,139,250,0.3) 0%, transparent 45%),
                        radial-gradient(circle at 85% 20%, rgba(99,179,237,0.18) 0%, transparent 40%),
                        radial-gradient(circle at 50% 85%, rgba(196,181,253,0.25) 0%, transparent 45%);
                }
                .landing-grid {
                    background-image: radial-gradient(circle, rgba(109,40,217,0.08) 1px, transparent 1px);
                    background-size: 32px 32px;
                }
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(70px);
                    animation: floatOrb ease-in-out infinite;
                }
                .orb-1 {
                    width: 400px; height: 400px;
                    top: -100px; left: -80px;
                    background: rgba(167,139,250,0.22);
                    animation-duration: 9s;
                }
                .orb-2 {
                    width: 350px; height: 350px;
                    top: 0; right: -60px;
                    background: rgba(99,179,237,0.15);
                    animation-duration: 12s;
                    animation-delay: -4s;
                }
                .orb-3 {
                    width: 300px; height: 300px;
                    bottom: -80px; left: 35%;
                    background: rgba(196,181,253,0.2);
                    animation-duration: 10s;
                    animation-delay: -2s;
                }
                @keyframes floatOrb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(20px, -25px) scale(1.04); }
                    66% { transform: translate(-15px, 15px) scale(0.97); }
                }
            `}</style>
    </div>
  );
};

export default Landing;