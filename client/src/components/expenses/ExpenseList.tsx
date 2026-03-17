import type { Expense } from "../../services/ExpenseService";
import ExpenseItem from "./ExpenseItem";

interface Props {
    expenses: Expense[];
}

const ExpenseList = ({ expenses }: Props) => {
    return (
        <div className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>

            {expenses.length === 0 && (
                <p className="text-gray-500">No expenses yet</p>
            )}

            {expenses.map((expense) => (
                <ExpenseItem key={expense._id} expense={expense} />
            ))}
        </div>
    );
};

export default ExpenseList;