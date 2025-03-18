const ActionButton = ({
    onClick,
    icon,
    label,
    variant = 'default',
    className
}: {
    onClick?: () => void;
    icon: React.ReactNode;
    label: string;
    variant?: 'default' | 'primary' | 'danger' | 'ghost';
    className?: string;
}) => {
    let baseClasses = "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200";

    switch (variant) {
        case 'primary':
            baseClasses += " bg-blue-500 text-white hover:bg-blue-600";
            break;
        case 'danger':
            baseClasses += " bg-red-500 text-white hover:bg-red-600";
            break;
        case 'ghost':
            baseClasses += " hover:bg-gray-100 text-gray-700";
            break;
        default:
            baseClasses += " bg-gray-100 text-gray-700 hover:bg-gray-200";
    }

    return (
        <button { ...(onClick ? { onClick } : {}) }  className={`${baseClasses} ${className}`}>
            {icon}
            {label}
        </button>
    );
};

export default ActionButton;