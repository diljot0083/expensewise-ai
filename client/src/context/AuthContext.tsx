import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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
        setUser(user);
    };

    const logout = async () => {
        await axios.post("/api/logout", {}, { withCredentials: true });
        setUser(null);
        setAccessToken(null);
    };

    useEffect(() => {
        const fetchMe = async () => {
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get("/api/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, [accessToken]);

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