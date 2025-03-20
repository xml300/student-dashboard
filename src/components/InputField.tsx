
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
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                w-full px-4 py-2 rounded-md border
                ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
                focus:outline-none focus:ring-2
                transition-colors duration-200
            `}
            {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default InputField;