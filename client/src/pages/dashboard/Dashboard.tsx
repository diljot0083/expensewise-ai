import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../services/ExpenseService";
import type { Expense } from "../../services/ExpenseService";

import ExpenseList from "../../components/expenses/ExpenseList";
import AddExpenseForm from "../../components/expenses/AddExpenseForm";

import Navbar from "../../components/Navbar";
import StatsCard from "../../components/StatsCard";

import MonthlyChart from "../../components/charts/MonthlyChart";
import CategoryPie from "../../components/charts/CategoryPie";

import ExpenseFilters from "../../components/filters/ExpenseFilters";

const Dashboard = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editing, setEditing] = useState<Expense | null>(null);

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    const loadExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data.items);
    };

    const handleFilter = async (filters: any) => {
        const data = await getExpenses({
            q: filters.search,
            category: filters.category,
            from: filters.from,
            to: filters.to,
        });

        setExpenses(data.items);
    };

    const handleDelete = async (id: string) => {
        await deleteExpense(id);
        loadExpenses();
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

                <ExpenseFilters onFilter={handleFilter} />

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <MonthlyChart expenses={expenses} />
                    <CategoryPie expenses={expenses} />
                </div>

                {/* Add Expense */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <AddExpenseForm
                        onCreated={loadExpenses}
                        editing={editing}
                        setEditing={setEditing}
                    />
                </div>

                {/* Expense List */}
                <ExpenseList
                    expenses={expenses}
                    onDelete={handleDelete}
                    onEdit={setEditing}
                />
            </div>
        </div>
    );
};

export default Dashboard;