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
import InsightCard from "../../components/ai/InsightCard";

import { getAIInsights } from "../../services/aiService";

const Dashboard = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editing, setEditing] = useState<Expense | null>(null);
    const [insight, setInsight] = useState({
        total: "",
        topCategory: "",
        advice: ""
    });
    const [loadingAI, setLoadingAI] = useState(false);

    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    const loadExpenses = async () => {
        const data = await getExpenses();

        const map = new Map<string, Expense>();

        data.items.forEach((e: Expense) => {
            map.set(e._id, e);
        });

        const unique = Array.from(map.values());

        setExpenses(unique);
    };

    const loadInsights = async () => {
        setLoadingAI(true);
        try {
            const res = await getAIInsights(expenses);
            setInsight(res);
        } finally {
            setLoadingAI(false);
        }
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

    useEffect(() => {
        if (expenses.length === 0) {
            setInsight({
                total: "",
                topCategory: "",
                advice: ""
            });
            return;
        }

        const timer = setTimeout(() => {
            loadInsights();
        }, 500);

        return () => clearTimeout(timer);
    }, [expenses]);

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

                {/* Insights Cards */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">AI Insights</h2>

                    {loadingAI ? (
                        <p className="text-gray-500">Generating insights...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InsightCard title="💰 Total Spent" value={insight.total} />
                            <InsightCard title="📊 Top Category" value={insight.topCategory} />
                            <InsightCard title="💡 Advice" value={insight.advice} />
                        </div>
                    )}
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <MonthlyChart expenses={expenses} />
                    <CategoryPie expenses={expenses} />
                </div>

                {/* Add Expense */}
                <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300 mb-6">
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