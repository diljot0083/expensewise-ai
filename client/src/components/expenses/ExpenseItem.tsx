import type { Expense } from "../../services/ExpenseService";

interface Props {
    expense: Expense;
}

const ExpenseItem = ({ expense }: Props) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <div>
                <p className="font-semibold">{expense.category}</p>
                <p className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                </p>
            </div>

            <p className="font-bold text-red-500">
                ₹{expense.amount}
            </p>
        </div>
    );
};

export default ExpenseItem;