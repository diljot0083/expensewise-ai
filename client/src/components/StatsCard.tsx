interface Props {
    title: string;
    value: string | number;
}

const StatsCard = ({ title, value }: Props) => {
    return (
        <div className="bg-white shadow rounded-2xl p-4">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold mt-1">{value}</h2>
        </div>
    );
};

export default StatsCard;