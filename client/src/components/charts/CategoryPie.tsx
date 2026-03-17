import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { Expense } from "../../services/ExpenseService";

const groupByCategory = (expenses: Expense[]) => {
    const map: Record<string, number> = {};

    expenses.forEach((e) => {
        map[e.category] = (map[e.category] || 0) + e.amount;
    });

    return Object.entries(map).map(([name, value]) => ({
        name,
        value,
    }));
};

const CategoryPie = ({ expenses }: { expenses: Expense[] }) => {
    const data = groupByCategory(expenses);

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} dataKey="value" outerRadius={90} />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryPie;