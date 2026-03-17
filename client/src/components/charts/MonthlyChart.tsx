import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { Expense } from "../../services/ExpenseService";

const groupByMonth = (expenses: Expense[]) => {
    const map: Record<string, number> = {};

    expenses.forEach((e) => {
        const month = new Date(e.date).toLocaleString("default", {
            month: "short",
        });

        map[month] = (map[month] || 0) + e.amount;
    });

    return Object.entries(map).map(([month, total]) => ({
        month,
        total,
    }));
};

const MonthlyChart = ({ expenses }: { expenses: Expense[] }) => {
    const data = groupByMonth(expenses);

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Monthly Spending</h2>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyChart;