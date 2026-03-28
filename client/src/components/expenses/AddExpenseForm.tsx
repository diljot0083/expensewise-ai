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

    const inputClass =
        "flex-1 min-w-0 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-600 focus:border-transparent transition-all duration-200";

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-center w-full">
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${inputClass} max-w-[110px]`}
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
            />

            <input
                type="text"
                placeholder="Merchant (e.g. Amazon)"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className={inputClass}
            />

            <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-medium px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-150 shadow-sm shadow-violet-200 dark:shadow-violet-900/30"
            >
                {editing ? "Update" : "+ Add"}
            </button>

            {editing && (
                <button
                    type="button"
                    onClick={() => {
                        setEditing?.(null);
                        setAmount("");
                        setCategory("");
                        setMerchant("");
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 transition-colors"
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default AddExpenseForm;