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

import WeeklyChart from "../../components/charts/WeeklyChart";
import WeeklyComparison from "../../components/charts/WeeklyComparison";

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
    const avg = expenses.length > 0 ? Math.round(total / expenses.length) : 0;

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <div className="p-5 max-w-5xl mx-auto">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    <StatsCard
                        title="Total Spent"
                        value={`₹${total}`}
                        sub={`${expenses.length} transactions`}
                        variant="hero"
                    />
                    <StatsCard
                        title="Transactions"
                        value={expenses.length}
                    />
                    <StatsCard
                        title="Avg per txn"
                        value={`₹${avg}`}
                    />
                </div>

                <ExpenseFilters onFilter={handleFilter} />

                {/* AI Insights */}
                <div className="mb-5">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                        AI Insights
                    </h2>

                    {loadingAI ? (
                        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.15s]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.3s]" />
                            <span className="ml-1">Generating insights...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <InsightCard title="💰 Total Spent" value={insight.total} />
                            <InsightCard title="📊 Top Category" value={insight.topCategory} />
                            <InsightCard title="💡 Advice" value={insight.advice} />
                        </div>
                    )}
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-3 mb-5">
                    <MonthlyChart expenses={expenses} />
                    <CategoryPie expenses={expenses} />
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-5">
                    <WeeklyChart expenses={expenses} />
                    <WeeklyComparison expenses={expenses} />
                </div>

                {/* Add Expense */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl mb-5">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                        {editing ? "Edit Expense" : "Add Expense"}
                    </h2>
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