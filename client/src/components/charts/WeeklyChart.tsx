import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { Expense } from "../../services/ExpenseService";

const groupByWeek = (expenses: Expense[]) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const map: Record<string, number> = {};

    days.forEach((d) => (map[d] = 0));

    expenses.forEach((e) => {
        const day = days[new Date(e.date).getDay()];
        map[day] += e.amount;
    });

    return days.map((day) => ({
        day,
        total: map[day],
    }));
};

const WeeklyChart = ({ expenses }: { expenses: Expense[] }) => {
    const data = groupByWeek(expenses);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Weekly Spending</h2>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyChart;