import type { Expense } from "../../services/ExpenseService";

const getWeekTotal = (expenses: Expense[], offset = 0) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() - 7 * offset);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return expenses
        .filter((e) => {
            const d = new Date(e.date);
            return d >= start && d < end;
        })
        .reduce((sum, e) => sum + e.amount, 0);
};

const WeeklyComparison = ({ expenses }: { expenses: Expense[] }) => {
    const thisWeek = getWeekTotal(expenses, 0);
    const lastWeek = getWeekTotal(expenses, 1);

    const diff = thisWeek - lastWeek;
    const percent =
        lastWeek === 0 ? 100 : ((diff / lastWeek) * 100).toFixed(1);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-2">Weekly Comparison</h2>

            <p className="text-gray-600">This Week: ₹{thisWeek}</p>
            <p className="text-gray-600">Last Week: ₹{lastWeek}</p>

            <p
                className={`mt-2 font-semibold ${diff >= 0 ? "text-red-500" : "text-green-500"
                    }`}
            >
                {diff >= 0 ? "↑" : "↓"} {percent}%
            </p>
        </div>
    );
};

export default WeeklyComparison;