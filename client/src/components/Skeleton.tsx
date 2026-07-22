const Shimmer = ({ className }: { className: string }) => (
    <div className={`relative overflow-hidden bg-violet-100/60 dark:bg-gray-800/60 rounded-xl ${className}`}>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" />
    </div>
);

export const ExpenseListSkeleton = () => (
    <div className="mt-6">
        <Shimmer className="h-3.5 w-24 mb-3" />
        <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl flex justify-between items-center"
                >
                    <div className="flex items-center gap-3">
                        <Shimmer className="w-9 h-9 rounded-xl flex-shrink-0" />
                        <div className="space-y-1.5">
                            <Shimmer className="h-3.5 w-24" />
                            <Shimmer className="h-3 w-16" />
                            <Shimmer className="h-2.5 w-12" />
                        </div>
                    </div>
                    <Shimmer className="h-4 w-14" />
                </div>
            ))}
        </div>
    </div>
);

export const InsightSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {[1, 2, 3].map((i) => (
            <div
                key={i}
                className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-gray-800 p-4 rounded-2xl"
            >
                <Shimmer className="h-2.5 w-20 mb-2" />
                <Shimmer className="h-4 w-32" />
            </div>
        ))}
    </div>
);