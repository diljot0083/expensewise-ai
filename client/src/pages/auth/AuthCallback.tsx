import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { setAxiosToken } from "../../api/axios";

const AuthCallback = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const error = params.get("error");

        if (error) {
            navigate("/login?error=google_failed");
            return;
        }

        if (token) {
            setAxiosToken(token);

            api.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => {
                    login(token, res.data);
                    navigate("/dashboard");
                })
                .catch(() => navigate("/login"));
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center landing-bg">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.15s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.3s]" />
                <span className="text-sm text-violet-500 ml-1">Signing you in...</span>
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
};

export default AuthCallback;