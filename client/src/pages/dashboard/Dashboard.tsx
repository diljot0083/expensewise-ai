import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getExpenses } from "../../services/ExpenseService";
import type { Expense } from "../../services/ExpenseService";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const data = await getExpenses();
                setExpenses(data.items);
            } catch (err) {
                console.error(err);
            }
        };

        loadExpenses();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Welcome {user?.name}</p>

            <button onClick={logout}>Logout</button>

            <h2 className="text-xl font-semibold">Your Expenses</h2>

            {expenses.map((expense) => (
                <div key={expense._id}>
                    <p>{expense.amount} - {expense.category}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;