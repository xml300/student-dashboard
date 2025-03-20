// Modified Table Component (components/Table.js - if you want striped rows and no rounded corners *in the table itself*)
import React from 'react';

const Table = ({ headers, rows, emptyMessage, striped = false, roundedCorners = true }: {headers: string[], rows: object[], emptyMessage: string, striped?: boolean, roundedCorners?: boolean}) => { // Added striped and roundedCorners props with defaults
    if (!rows || rows.length === 0) {
        return <div className="bg-white rounded-xl shadow-md p-6 text-center">{emptyMessage}</div>; // Container for empty message
    }

    return (
        <div className={`${roundedCorners ? 'rounded-xl overflow-hidden' : 'overflow-hidden'} w-full`}> {/* Conditional rounded corners for table container */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"> 
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={striped && rowIndex % 2 === 0 ? 'bg-gray-50' : ''}> 
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;