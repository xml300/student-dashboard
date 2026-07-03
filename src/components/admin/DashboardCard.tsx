const DashboardCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-md p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h3>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    </div>
);

export default DashboardCard;
