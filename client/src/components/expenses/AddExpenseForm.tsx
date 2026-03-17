import { useState } from "react";
import { createExpense } from "../../services/ExpenseService";

const AddExpenseForm = ({ onCreated }: { onCreated: () => void }) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createExpense({
            amount: Number(amount),
            category,
            date: new Date().toISOString(),
        });

        setAmount("");
        setCategory("");

        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
            <input
                className="border p-2"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <input
                className="border p-2"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <button className="bg-emerald-500 text-white px-4 py-2">
                Add Expense
            </button>
        </form>
    );
};
export default AddExpenseForm;