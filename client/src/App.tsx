import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center landing-bg">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-base font-semibold tracking-tight text-violet-950">
            ExpenseWise
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.15s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.3s]" />
        </div>

        <style>{`
                    .landing-bg {
                        background-color: #f5f3ff;
                        background-image:
                            radial-gradient(circle at 15% 10%, rgba(167,139,250,0.3) 0%, transparent 45%),
                            radial-gradient(circle at 85% 80%, rgba(99,179,237,0.18) 0%, transparent 40%);
                    }
                `}</style>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;