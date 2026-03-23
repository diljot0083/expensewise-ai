import type { Expense } from "../../services/ExpenseService";

interface Props {
    expense: Expense;
    onDelete: (id: string) => void;
    onEdit: (expense: Expense) => void;
}

const ExpenseItem = ({ expense, onEdit, onDelete }: Props) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div>
                <p className="font-semibold">{expense.category}</p>
                <p className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <p className="font-bold text-red-500">₹{expense.amount}</p>

                <button
                    onClick={() => onEdit(expense)}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(expense._id)}
                    className="text-sm text-red-500 hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ExpenseItem;