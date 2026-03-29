interface Props {
    title: string;
    value: string;
}

const InsightCard = ({ title, value }: Props) => {
    return (
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-violet-100/60 dark:border-violet-900/50 p-4 rounded-2xl hover:border-violet-300 dark:hover:border-violet-700 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
            <p className="text-xs text-violet-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-semibold">
                {title}
            </p>
            <p className="text-sm font-semibold text-violet-950 dark:text-gray-100 mt-1 leading-snug">
                {value || "—"}
            </p>
        </div>
    );
};

export default InsightCard;