import type { Expense } from "../../services/ExpenseService";

interface Props {
    expense: Expense;
    onDelete: (id: string) => void;
    onEdit: (expense: Expense) => void;
}

const CATEGORY_STYLES: Record<string, { emoji: string; bg: string; dark: string }> = {
    food: { emoji: "🍱", bg: "bg-green-50", dark: "dark:bg-green-900/20" },
    petrol: { emoji: "⛽", bg: "bg-blue-50", dark: "dark:bg-blue-900/20" },
    fuel: { emoji: "⛽", bg: "bg-blue-50", dark: "dark:bg-blue-900/20" },
    transport: { emoji: "🚌", bg: "bg-sky-50", dark: "dark:bg-sky-900/20" },
    shopping: { emoji: "🛍️", bg: "bg-pink-50", dark: "dark:bg-pink-900/20" },
    health: { emoji: "💊", bg: "bg-red-50", dark: "dark:bg-red-900/20" },
    education: { emoji: "📚", bg: "bg-amber-50", dark: "dark:bg-amber-900/20" },
    juice: { emoji: "🧃", bg: "bg-orange-50", dark: "dark:bg-orange-900/20" },
    drinks: { emoji: "☕", bg: "bg-amber-50", dark: "dark:bg-amber-900/20" },
    entertainment: { emoji: "🎬", bg: "bg-purple-50", dark: "dark:bg-purple-900/20" },
};

const getCategoryStyle = (category: string) => {
    const key = category.toLowerCase();
    return CATEGORY_STYLES[key] ?? { emoji: "💳", bg: "bg-gray-100", dark: "dark:bg-gray-800" };
};

const ExpenseItem = ({ expense, onEdit, onDelete }: Props) => {
    const style = getCategoryStyle(expense.category);

    return (
        <div className="group flex justify-between items-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl hover:border-violet-200 dark:hover:border-violet-800 hover:translate-x-0.5 transition-all duration-200">
            <div className="flex items-center gap-3">
                {/* Category icon bubble */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${style.bg} ${style.dark}`}>
                    {style.emoji}
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 capitalize">
                        {expense.category}
                    </p>
                    {expense.merchant && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {expense.merchant}
                        </p>
                    )}
                    <p className="text-xs text-gray-300 dark:text-gray-600">
                        {new Date(expense.date).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Actions — hidden until hover */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <button
                        onClick={() => onEdit(expense)}
                        className="text-xs text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-900/30 px-2.5 py-1 rounded-lg transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(expense._id)}
                        className="text-xs text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 px-2.5 py-1 rounded-lg transition-colors"
                    >
                        Delete
                    </button>
                </div>

                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 tabular-nums">
                    ₹{expense.amount}
                </p>
            </div>
        </div>
    );
};

export default ExpenseItem;