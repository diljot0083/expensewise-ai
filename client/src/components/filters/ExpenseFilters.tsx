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
    const [fromType, setFromType] = useState<"text" | "date">("text");
    const [toType, setToType] = useState<"text" | "date">("text");

    useEffect(() => {
        onFilter({ search, category, from, to });
    }, [search, category, from, to]);

    const inputClass =
        "w-full bg-white/50 dark:bg-gray-800 border border-violet-100/60 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-violet-950 dark:text-gray-100 placeholder-violet-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-600 focus:border-transparent transition-all duration-200";

    return (
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 dark:text-gray-500 mb-3">
                Filters
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
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
                    type={fromType}
                    className={inputClass}
                    placeholder="Date From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onFocus={() => setFromType("date")}
                    onBlur={() => { if (!from) setFromType("text"); }}
                />
                <input
                    type={toType}
                    className={inputClass}
                    placeholder="Date To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => setToType("date")}
                    onBlur={() => { if (!to) setToType("text"); }}
                />
            </div>
        </div>
    );
};

export default ExpenseFilters;