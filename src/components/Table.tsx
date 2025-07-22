// Modified Table Component (components/Table.js - if you want striped rows and no rounded corners *in the table itself*)
import React from 'react';

const Table = ({ headers, rows, emptyMessage, striped = false, roundedCorners = true }: {headers: string[], rows: object[], emptyMessage: string, striped?: boolean, roundedCorners?: boolean}) => { // Added striped and roundedCorners props with defaults
    if (!rows || rows.length === 0) {
        return <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 text-center text-gray-900 dark:text-gray-100">{emptyMessage}</div>; // Container for empty message
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className={`${roundedCorners ? 'rounded-xl overflow-hidden' : 'overflow-hidden'} w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
                <table className="min-w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-border-color dark:border-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className={striped && rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
