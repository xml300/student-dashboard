const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    error,
    ...props
}: {
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: 'text' | 'number' | 'email';
    error?: string;
    [key: string]: number | string | object | CallableFunction | undefined;
}) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:ring-primary-accent focus:border-primary-accent
                rounded-md p-2
                transition-colors duration-200
                ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400'}
            `}
            {...props}
        />
        {error && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>}
    </div>
);

export default InputField;