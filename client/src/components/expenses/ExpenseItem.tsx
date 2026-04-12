import { useState } from "react";
import type { Expense } from "../../services/ExpenseService";

interface Props {
    expense: Expense;
    onDelete: (id: string) => void;
    onEdit: (expense: Expense) => void;
}

const CATEGORY_STYLES: Record<string, { emoji: string; bg: string; dark: string }> = {
    food:          { emoji: "🍱", bg: "bg-green-50",   dark: "dark:bg-green-900/20" },
    petrol:        { emoji: "⛽", bg: "bg-blue-50",    dark: "dark:bg-blue-900/20" },
    fuel:          { emoji: "⛽", bg: "bg-blue-50",    dark: "dark:bg-blue-900/20" },
    transport:     { emoji: "🚌", bg: "bg-sky-50",     dark: "dark:bg-sky-900/20" },
    shopping:      { emoji: "🛍️", bg: "bg-pink-50",   dark: "dark:bg-pink-900/20" },
    health:        { emoji: "💊", bg: "bg-red-50",     dark: "dark:bg-red-900/20" },
    education:     { emoji: "📚", bg: "bg-amber-50",   dark: "dark:bg-amber-900/20" },
    juice:         { emoji: "🧃", bg: "bg-orange-50",  dark: "dark:bg-orange-900/20" },
    drinks:        { emoji: "☕", bg: "bg-amber-50",   dark: "dark:bg-amber-900/20" },
    entertainment: { emoji: "🎬", bg: "bg-purple-50",  dark: "dark:bg-purple-900/20" },
};

const getCategoryStyle = (category: string) => {
    const key = category.toLowerCase();
    return CATEGORY_STYLES[key] ?? { emoji: "💳", bg: "bg-violet-50", dark: "dark:bg-gray-800" };
};

const ExpenseItem = ({ expense, onEdit, onDelete }: Props) => {
    const style = getCategoryStyle(expense.category);
    const [tapped, setTapped] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteConfirm = () => {
        setShowDeleteModal(false);
        onDelete(expense._id);
    };

    return (
        <>
            <div
                className="group flex justify-between items-center bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl hover:border-violet-300 dark:hover:border-violet-800 hover:translate-x-0.5 transition-all duration-200"
                onClick={() => setTapped((p) => !p)}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${style.bg} ${style.dark}`}>
                        {style.emoji}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-violet-950 dark:text-gray-100 capitalize">
                            {expense.category}
                        </p>
                        {expense.merchant && (
                            <p className="text-xs text-violet-400 dark:text-gray-500">
                                {expense.merchant}
                            </p>
                        )}
                        <p className="text-xs text-violet-300 dark:text-gray-600">
                            {new Date(expense.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`flex gap-2 transition-opacity duration-150
                        md:opacity-0 md:group-hover:opacity-100
                        ${tapped ? "opacity-100" : "opacity-0 md:opacity-0"}
                    `}>
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(expense); }}
                            className="text-xs text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-900/30 px-2.5 py-1 rounded-lg transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true); }}
                            className="text-xs text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 px-2.5 py-1 rounded-lg transition-colors"
                        >
                            Delete
                        </button>
                    </div>

                    <p className="text-sm font-semibold text-violet-950 dark:text-gray-100 tabular-nums">
                        ₹{expense.amount}
                    </p>
                </div>
            </div>

            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

                    <div
                        className="relative bg-white/90 dark:bg-gray-900/95 backdrop-blur-md border border-violet-100/60 dark:border-gray-800 rounded-2xl p-6 w-full max-w-xs shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-lg">🗑️</span>
                        </div>

                        <h3 className="text-base font-semibold text-violet-950 dark:text-white text-center mb-1">
                            Delete expense?
                        </h3>
                        <p className="text-xs text-violet-400 dark:text-gray-500 text-center mb-1">
                            <span className="capitalize font-medium text-violet-600 dark:text-violet-400">
                                {expense.category}
                            </span>
                            {expense.merchant ? ` · ${expense.merchant}` : ""}
                        </p>
                        <p className="text-sm font-semibold text-center text-violet-950 dark:text-white mb-6">
                            ₹{expense.amount}
                        </p>

                        <div className="flex gap-2.5">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 bg-violet-50 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-gray-700 text-violet-700 dark:text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-all duration-150 border border-violet-100/60 dark:border-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-150"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpenseItem;