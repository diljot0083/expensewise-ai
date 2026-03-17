import { useState, useEffect } from "react";
import { createExpense, updateExpense } from "../../services/ExpenseService";

const AddExpenseForm = ({
    onCreated,
    editing,
    setEditing,
}: {
    onCreated: () => void;
    editing?: any;
    setEditing?: (val: any) => void;
}) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (editing) {
            setAmount(editing.amount.toString()); 
            setCategory(editing.category);
        }
    }, [editing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editing) {
            await updateExpense(editing._id, {
                amount: Number(amount),
                category,
            });
            setEditing?.(null);
        } else {
            await createExpense({
                amount: Number(amount),
                category,
                date: new Date().toISOString(),
            });
        }

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
                {editing ? "Update Expense" : "Add Expense"}
            </button>
        </form>
    );
};

export default AddExpenseForm;