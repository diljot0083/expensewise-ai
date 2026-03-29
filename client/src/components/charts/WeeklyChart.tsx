import {
    AreaChart,
    Area,
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
    return days.map((day) => ({ day, total: map[day] }));
};

const WeeklyChart = ({ expenses }: { expenses: Expense[] }) => {
    const data = groupByWeek(expenses);
    const isDark = document.documentElement.classList.contains("dark");

    return (
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 dark:text-gray-500 mb-4">
                Weekly Spending
            </h2>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="weekGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: isDark ? "#6b7280" : "#a78bfa" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: isDark ? "#6b7280" : "#a78bfa" }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip
                        contentStyle={{
                            background: isDark ? "#111827" : "rgba(255,255,255,0.9)",
                            border: `1px solid ${isDark ? "#1f2937" : "#ede9fe"}`,
                            borderRadius: "12px",
                            fontSize: "12px",
                            color: isDark ? "#f3f4f6" : "#2e1065",
                        }}
                        formatter={(value) => [`₹${Number(value ?? 0)}`, "Spent"]}
                    />
                    <Area type="monotone" dataKey="total" stroke="#0d9488" strokeWidth={2.5} fill="url(#weekGrad)" dot={{ r: 4, fill: "#0d9488", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#0d9488" }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyChart;