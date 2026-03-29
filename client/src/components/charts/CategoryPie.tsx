import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { Expense } from "../../services/ExpenseService";

const COLORS = ["#7c3aed", "#0d9488", "#d97706", "#db2777", "#2563eb", "#16a34a", "#dc2626"];

const groupByCategory = (expenses: Expense[]) => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
        map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
};

const CategoryPie = ({ expenses }: { expenses: Expense[] }) => {
    const data = groupByCategory(expenses);
    const isDark = document.documentElement.classList.contains("dark");

    return (
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 dark:text-gray-500 mb-4">
                Category Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data} dataKey="value" outerRadius={80} innerRadius={40} paddingAngle={3} strokeWidth={0}>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: isDark ? "#111827" : "rgba(255,255,255,0.9)",
                            border: `1px solid ${isDark ? "#1f2937" : "#ede9fe"}`,
                            borderRadius: "12px",
                            fontSize: "12px",
                            color: isDark ? "#f3f4f6" : "#2e1065",
                        }}
                        formatter={(value, name) => [`₹${Number(value ?? 0)}`, name]}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[index % COLORS.length] }} />
                        <span className="text-xs text-violet-600 dark:text-gray-400 capitalize font-medium">
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPie;