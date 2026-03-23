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
    const [merchant, setMerchant] = useState("");

    useEffect(() => {
        if (editing) {
            setAmount(editing.amount.toString());
            setCategory(editing.category);
            setMerchant(editing.merchant || "");
        }
    }, [editing]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editing) {
            await updateExpense(editing._id, {
                amount: Number(amount),
                category,
                merchant,
            });
            setEditing?.(null);
        } else {
            await createExpense({
                amount: Number(amount),
                category,
                merchant,
                date: new Date().toISOString(),
            });
        }

        setAmount("");
        setCategory("");
        setMerchant("");

        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 items-center w-full">
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 min-w-[120px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 min-w-[150px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <input
                type="text"
                placeholder="Merchant (e.g. Amazon)"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="flex-1 min-w-[200px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg whitespace-nowrap"
            >
                {editing ? "Update" : "Add"}
            </button>
        </form>
    );
};

export default AddExpenseForm;