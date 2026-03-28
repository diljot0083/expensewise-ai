import { useState, useEffect } from "react";

interface Props {
    onFilter: (filters: {
        search: string;
        category: string;
        from: string;
        to: string;
    }) => void;
}

const ExpenseFilters = ({ onFilter }: Props) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const applyFilters = () => {
        onFilter({ search, category, from, to });
    };

    useEffect(() => {
        applyFilters();
    }, [search, category, from, to]);

    const inputClass =
        "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-600 focus:border-transparent transition-all duration-200";

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl shadow-sm mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                Filters
            </h2>

            <div className="grid md:grid-cols-4 gap-2.5">
                <input
                    className={inputClass}
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <input
                    className={inputClass}
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="date"
                    className={inputClass}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />

                <input
                    type="date"
                    className={inputClass}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ExpenseFilters;