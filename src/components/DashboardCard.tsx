const DashboardCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export default DashboardCard;