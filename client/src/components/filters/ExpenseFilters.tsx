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

    return (
        <div className="bg-white p-4 rounded-2xl shadow mb-6">
            <h2 className="text-lg font-semibold mb-3">Filters</h2>

            <div className="grid md:grid-cols-4 gap-3">

                <input
                    className="border p-2 rounded"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="date"
                    className="border p-2 rounded"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />

                <input
                    type="date"
                    className="border p-2 rounded"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ExpenseFilters;