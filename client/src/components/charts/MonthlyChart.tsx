import {
    AreaChart,
    Area,
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
    const isDark = document.documentElement.classList.contains("dark");

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                Monthly Spending
            </h2>

            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: isDark ? "#6b7280" : "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: isDark ? "#6b7280" : "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                    />
                    <Tooltip
                        contentStyle={{
                            background: isDark ? "#111827" : "#ffffff",
                            border: `1px solid ${isDark ? "#1f2937" : "#e5e7eb"}`,
                            borderRadius: "12px",
                            fontSize: "12px",
                            color: isDark ? "#f3f4f6" : "#111827",
                        }}
                        formatter={(value, name) => [`₹${Number(value ?? 0)}`, name]}
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#7c3aed"
                        strokeWidth={2.5}
                        fill="url(#monthGrad)"
                        dot={{ r: 4, fill: "#7c3aed", strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: "#7c3aed" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyChart;