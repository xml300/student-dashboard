import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import ActionButton from "./ActionButton";

const Table = ({
    headers,
    rows,
    onEdit,
    onDelete,
    emptyMessage
}: {
    headers: string[];
    rows: Object[];
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
    emptyMessage: string;
}) => {
    if (rows.length === 0) {
        return <div className="bg-white shadow-md rounded-md p-4 text-gray-500">{emptyMessage}</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                        {(onEdit || onDelete) && (
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((value, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {value}
                                </td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        {onEdit && (
                                            <ActionButton
                                                variant="ghost"
                                                onClick={() => onEdit(row)}
                                                icon={<FontAwesomeIcon icon={faEdit} className="w-4 h-4" />}
                                                label="Edit"
                                            />
                                        )}
                                        {onDelete && (
                                            <ActionButton
                                                variant="ghost"
                                                onClick={() => onDelete(row)}
                                                icon={<FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-red-500" />}
                                                label="Delete"
                                            />
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default Table;