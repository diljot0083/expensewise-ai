import type { Expense } from "../../services/ExpenseService";

const getWeekTotal = (expenses: Expense[], offset = 0) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() - 7 * offset);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return expenses
        .filter((e) => { const d = new Date(e.date); return d >= start && d < end; })
        .reduce((sum, e) => sum + e.amount, 0);
};

const WeeklyComparison = ({ expenses }: { expenses: Expense[] }) => {
    const thisWeek = getWeekTotal(expenses, 0);
    const lastWeek = getWeekTotal(expenses, 1);
    const diff = thisWeek - lastWeek;
    const percent = lastWeek === 0 ? 100 : Math.abs(Number(((diff / lastWeek) * 100).toFixed(1)));
    const isUp = diff >= 0;

    return (
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 dark:text-gray-500 mb-4">
                Weekly Comparison
            </h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-violet-500 dark:text-gray-400">This week</span>
                    <span className="text-sm font-semibold text-violet-950 dark:text-gray-100 tabular-nums">₹{thisWeek}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-violet-500 dark:text-gray-400">Last week</span>
                    <span className="text-sm font-semibold text-violet-950 dark:text-gray-100 tabular-nums">₹{lastWeek}</span>
                </div>
                <div className="w-full bg-violet-50 dark:bg-gray-800 rounded-full h-1.5 mt-2">
                    <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${isUp ? "bg-red-400" : "bg-emerald-400"}`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                </div>
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${isUp
                        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                        : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    }`}>
                    {isUp ? "↑" : "↓"} {percent}% vs last week
                </div>
            </div>
        </div>
    );
};

export default WeeklyComparison;