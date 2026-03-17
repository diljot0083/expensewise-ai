import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
            <h1 className="text-xl font-bold">ExpenseWise</h1>

            <div className="flex items-center gap-4">
                <span className="text-gray-600">Hi, {user?.name}</span>

                <button
                    onClick={logout}
                    className="text-red-500 hover:underline"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;