interface Props {
    title: string;
    value: string;
}

const InsightCard = ({ title, value }: Props) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-semibold mt-1">{value || "-"}</p>
        </div>
    );
};

export default InsightCard;