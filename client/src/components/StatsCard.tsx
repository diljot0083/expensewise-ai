interface Props {
    title: string;
    value: string | number;
    sub?: string;
    variant?: "default" | "hero";
}

const StatsCard = ({ title, value, sub, variant = "default" }: Props) => {
    if (variant === "hero") {
        return (
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600 dark:from-violet-700 dark:to-indigo-700 p-5 rounded-2xl col-span-2">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -right-2 w-20 h-20 rounded-full bg-white/5" />
                <p className="text-xs text-violet-200 uppercase tracking-widest mb-1.5 relative">
                    {title}
                </p>
                <h2 className="text-4xl font-semibold text-white relative">{value}</h2>
                {sub && (
                    <p className="text-xs text-violet-300 mt-2 relative">{sub}</p>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl hover:border-violet-300 dark:hover:border-violet-800 transition-all duration-200">
            <p className="text-xs text-violet-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-semibold">
                {title}
            </p>
            <h2 className="text-2xl font-semibold text-violet-950 dark:text-white mt-1">
                {value}
            </h2>
            {sub && (
                <p className="text-xs text-violet-400 dark:text-gray-500 mt-1">{sub}</p>
            )}
        </div>
    );
};

export default StatsCard;