import { createContext, useContext, useEffect, useState } from "react";
import api, { setAxiosToken } from "../api/axios";

interface User {
    id: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const login = (token: string, user: User) => {
        setAccessToken(token);
        setAxiosToken(token);
        setUser(user);
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setAccessToken(null);
        setAxiosToken(null);
        setUser(null);
    };

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const refresh = await api.post("/auth/refreshToken");

                setAccessToken(refresh.data.accessToken);
                setAxiosToken(refresh.data.accessToken);

                const res = await api.get("/auth/me");
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, accessToken, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};