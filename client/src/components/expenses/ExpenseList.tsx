import type { Expense } from "../../services/ExpenseService";
import ExpenseItem from "./ExpenseItem";

interface Props {
    expenses: Expense[];
    onDelete: (id: string) => void;
    onEdit: (expense: Expense) => void;
}

const ExpenseList = ({ expenses, onEdit, onDelete }: Props) => {
    return (
        <div className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                Your Expenses
            </h2>

            <div className="space-y-2">
                {expenses.length === 0 && (
                    <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-sm text-gray-400 dark:text-gray-600">
                            No expenses yet. Add one above.
                        </p>
                    </div>
                )}

                {expenses.map((expense) => (
                    <ExpenseItem
                        key={expense._id}
                        expense={expense}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;