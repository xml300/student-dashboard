const DashboardCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
        {icon}
        <div>
            <h3 className="font-semibold text-gray-700">{title}</h3>
            <p className="text-xl font-bold text-blue-600">{value}</p>
        </div>
    </div>
);

export default DashboardCard;