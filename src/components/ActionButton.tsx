import { JSX } from "react";

const ActionButton = ({
    onClick,
    icon,
    label,
    variant = 'default',
    className,
    size,
    disabled = false // Add disabled prop
}: {
    onClick?: () => void;
    icon?: React.ReactNode;
    label: JSX.Element | string;
    variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    className?: string;
    disabled?: boolean; // Type for disabled prop
}) => {
    const baseClasses = `flex items-center space-x-2 gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${size === 'small' ? 'px-2 py-1 text-sm' : 'px-4 py-2'}`; // Added focus ring offset and disabled styles
    let variantClasses = "";

    switch (variant) {
        case 'primary':
            variantClasses = "bg-primary-accent text-white dark:bg-blue-600 dark:text-gray-100 border border-border-color dark:border-gray-700 hover:bg-blue-700 dark:hover:bg-blue-500hover:bg-blue-500"; // Using primary-accent variable
            break;
        case 'secondary': // New 'secondary' variant
            variantClasses = "bg-secondary-accent text-gray-900 dark:text-gray-900 border border-border-color dark:border-gray-700 hover:bg-yellow-400 dark:hover:bg-yellow-300"; // Example: use secondary color
            break;
        case 'danger':
            variantClasses = "bg-red-500 text-white dark:bg-red-700 dark:text-gray-100 border border-border-color dark:border-gray-700 hover:bg-red-600 dark:hover:bg-red-500";
            break;
        case 'ghost':
            variantClasses = "bg-transparent text-gray-900 dark:text-gray-100 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800";
            break;
        default:
            variantClasses = "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-border-color dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800";
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className || ''}`}
            disabled={disabled}
        >
            {icon && <span>{icon}</span>}
            {label}
        </button>
    );
};

export default ActionButton;