import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { dark, toggleTheme } = useTheme();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutConfirm = async () => {
        setShowLogoutModal(false);
        await logout();
    };

    return (
        <>
            <div className="flex justify-between items-center px-6 py-3.5 border-b border-violet-100/60 dark:border-gray-800 bg-white/60 dark:bg-gray-950/90 sticky top-0 z-50 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <h1 className="text-base font-semibold tracking-tight text-violet-900 dark:text-white">
                        ExpenseWise AI
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="text-xs text-violet-600 dark:text-gray-400 hover:text-violet-800 dark:hover:text-white bg-violet-50 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-all duration-200 border border-violet-100 dark:border-transparent"
                    >
                        {dark ? "☀ Light" : "☾ Dark"}
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-xs font-semibold text-violet-700 dark:text-violet-300">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-violet-700 dark:text-gray-400 hidden sm:block font-medium">
                            {user?.name}
                        </span>
                    </div>

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Logout confirmation modal */}
            {showLogoutModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    onClick={() => setShowLogoutModal(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

                    {/* Modal */}
                    <div
                        className="relative bg-white/90 dark:bg-gray-900/95 backdrop-blur-md border border-violet-100/60 dark:border-gray-800 rounded-2xl p-6 w-full max-w-xs shadow-xl shadow-violet-100/20 dark:shadow-black/40"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-lg">👋</span>
                        </div>

                        <h3 className="text-base font-semibold text-violet-950 dark:text-white text-center mb-1">
                            Logout?
                        </h3>
                        <p className="text-xs text-violet-400 dark:text-gray-500 text-center mb-6">
                            You'll need to sign in again to access your dashboard.
                        </p>

                        <div className="flex gap-2.5">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 bg-violet-50 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-gray-700 text-violet-700 dark:text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-all duration-150 border border-violet-100/60 dark:border-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-red-200 dark:shadow-red-900/30"
                            >
                                Yes, logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;