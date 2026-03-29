import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { dark, toggleTheme } = useTheme();

    return (
        <div className="flex justify-between items-center px-6 py-3.5 border-b border-violet-100/60 dark:border-gray-800 bg-white/60 dark:bg-gray-950/90 sticky top-0 z-50 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <h1 className="text-base font-semibold tracking-tight text-violet-900 dark:text-white">
                    ExpenseWise
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
                    onClick={logout}
                    className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;