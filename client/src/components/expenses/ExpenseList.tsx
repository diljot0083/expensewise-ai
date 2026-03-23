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
            <h2 className="text-xl font-semibold mb-3">Your Expenses</h2>

            <div className="space-y-3">
                {expenses.length === 0 && (
                    <p className="text-gray-500">No expenses yet</p>
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