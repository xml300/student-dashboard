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

    let variantClasses = ""; // Separate variable for variant-specific classes



    switch (variant) {
        case 'primary':
            variantClasses = "bg-primary-accent text-white hover:bg-blue-600 focus:ring-primary-accent"; // Using primary-accent variable
            break;
        case 'secondary': // New 'secondary' variant
            variantClasses = " bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500"; // Example: use secondary color
            break;
        case 'danger':
            variantClasses = "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500";
            break;
        case 'ghost':
            variantClasses = "hover:bg-gray-100 text-gray-700 focus:ring-gray-200";
            break;
        default:
            variantClasses = "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-200";
    }

    return (
        <button
            { ...(onClick ? { onClick } : {}) }
            className={`${baseClasses} ${variantClasses} ${className}`}
            disabled={disabled} // Apply disabled prop to button
        >
            {icon}
            {label}
        </button>
    );
};

export default ActionButton;