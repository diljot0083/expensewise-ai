interface Props {
    title: string;
    value: string;
}

const InsightCard = ({ title, value }: Props) => {
    return (
        <div className="bg-white dark:bg-gray-900 border border-violet-100 dark:border-violet-900/50 p-4 rounded-2xl hover:border-violet-300 dark:hover:border-violet-700 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                {title}
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1 leading-snug">
                {value || "—"}
            </p>
        </div>
    );
};

export default InsightCard;