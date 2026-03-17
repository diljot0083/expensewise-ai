import { useEffect, useState } from "react";
import { getExpenses } from "../../services/ExpenseService";
import type { Expense } from "../../services/ExpenseService";

import ExpenseList from "../../components/expenses/ExpenseList";
import AddExpenseForm from "../../components/expenses/AddExpenseForm";

import Navbar from "../../components/Navbar";
import StatsCard from "../../components/StatsCard";

const Dashboard = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    const loadExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data.items);
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-6 max-w-5xl mx-auto">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <StatsCard title="Total Spent" value={`₹${total}`} />
                    <StatsCard title="Transactions" value={expenses.length} />
                </div>

                {/* Add Expense */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <AddExpenseForm onCreated={loadExpenses} />
                </div>

                {/* Expense List */}
                <ExpenseList expenses={expenses} />
            </div>
        </div>
    );
};

export default Dashboard;