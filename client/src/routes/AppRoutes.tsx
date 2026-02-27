import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />    
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;