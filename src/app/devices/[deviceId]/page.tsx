"use client";
import React from 'react';
import { Clock, Smartphone, Wifi, Battery, ArrowLeft, Edit, BarChart, Home, CheckCircle, XCircle, AlertTriangle, Trash2 } from 'lucide-react';

interface Device2 {
    id: string;
    name: string;
    type: string;
    model: string;
    room: string;
    roomId: string;
    status: string;
    battery: number,
    lastSync: string;
    lastUsed: string;
    wifiStrength: string;
    assignedCourses: string[];
}


const DeviceDetailsPage = ({ device }: {device: Device2}) => {
    device = {    id: 'DEV001',
        name: 'Main Hall Scanner',
        type: 'Tablet',
        model: 'iPad Air (2022)',
        room: 'Main Lecture Hall',
        roomId: 'R101',
        status: 'active',
        battery: 87,
        lastSync: '19 Mar 2025, 08:32 AM',
        lastUsed: '19 Mar 2025, 08:32 AM',
        wifiStrength: 'strong',
        assignedCourses: ['CSC301', 'ENG205']
      };
    if (!device) {
        return <div>Device not found.</div>; // Handle case where device data is not provided
    }

    // Helper function to render status badge (copied from your code)
    const renderStatusBadge = (status: string) => {
        switch(status) {
            case 'active':
                return (
                    <span className="flex items-center text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Active
                    </span>
                );
            case 'inactive':
                return (
                    <span className="flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        <XCircle size={12} className="mr-1" />
                        Inactive
                    </span>
                );
            case 'maintenance':
                return (
                    <span className="flex items-center text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        <AlertTriangle size={12} className="mr-1" />
                        Maintenance
                    </span>
                );
            default:
                return (
                    <span className="flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    // Helper function to render wifi strength indicator (copied from your code)
    const renderWifiStrength = (strength: string) => {
        switch(strength) {
            case 'strong':
                return <Wifi size={16} className="text-green-600" />;
            case 'medium':
                return <Wifi size={16} className="text-yellow-600" />;
            case 'weak':
                return <Wifi size={16} className="text-red-600" />;
            default:
                return <Wifi size={16} className="text-gray-400" />;
        }
    };

    // Helper function to render battery level (copied from your code)
    const renderBatteryLevel = (level: number) => {
        let color = "text-gray-400";
        if (level >= 70) color = "text-green-600";
        else if (level >= 30) color = "text-yellow-600";
        else color = "text-red-600";

        return (
            <div className="flex items-center">
                <Battery size={16} className={color} />
                <span className="ml-1">{level}%</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
            {/* Back Button */}
            <a href="/devices" className="mb-4 flex items-center text-primary-accent hover:underline text-sm w-fit">
                <ArrowLeft size={16} className="mr-1" />
                Back to Devices List
            </a>

            {/* Device Header */}
            <div className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">{device.name}</h1>
                <div className="text-sm text-gray-500 mt-1">{device.id} • {device.type}</div>
                <div className="mt-2">{renderStatusBadge(device.status)}</div>
            </div>

            {/* Device Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Location</h3>
                        <div className="px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                            <div className="flex items-center mb-2">
                                <Home size={16} className="text-gray-500 mr-2" />
                                <span className="font-medium text-gray-600">Room:</span>
                            </div>
                            <div className="text-gray-800">{device.room || 'Unassigned'} ({device.roomId || 'N/A'})</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Device Information</h3>
                        <div className="px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                            <div className="flex items-center mb-2">
                                <Smartphone size={16} className="text-gray-500 mr-2" />
                                <span className="font-medium text-gray-600">Model:</span>
                            </div>
                            <div className="text-gray-800">{device.model}</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Connectivity</h3>
                        <div className="px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                            <div className="flex items-center mb-2">
                                <Wifi size={16} className="text-gray-500 mr-2" />
                                <span className="font-medium text-gray-600">WiFi Strength:</span>
                            </div>
                            <div className="flex items-center text-gray-800">{renderWifiStrength(device.wifiStrength)} <span className="ml-1 capitalize">{device.wifiStrength}</span></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Power</h3>
                        <div className="px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                            <div className="flex items-center mb-2">
                                <Battery size={16} className="text-gray-500 mr-2" />
                                <span className="font-medium text-gray-600">Battery Level:</span>
                            </div>
                            <div className="flex items-center text-gray-800">{renderBatteryLevel(device.battery)}</div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Activity</h3>
                        <div className="px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                            <div className="flex items-center mb-2">
                                <Clock size={16} className="text-gray-500 mr-2" />
                                <span className="font-medium text-gray-600">Last Sync:</span>
                            </div>
                            <div className="text-gray-800">{device.lastSync}</div>
                            <div className="flex items-center mt-2">
                                <Clock size={16} className="text-gray-500 mr-2" />
                                <span className="font-medium text-gray-600">Last Used:</span>
                            </div>
                            <div className="text-gray-800">{device.lastUsed}</div>
                        </div>
                    </div>

                    {device.assignedCourses && device.assignedCourses.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Assigned Courses</h3>
                            <div className="px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                                <ul className="list-disc pl-5 text-gray-800">
                                    {device.assignedCourses.map(course => (
                                        <li key={course}>{course}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions Bar at the bottom */}
            <div className="mt-8 border-t pt-4 flex justify-end space-x-4">
                <button className="flex items-center px-4 py-2 bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors">
                    <Trash2 size={16} className="mr-2" />
                    Delete Device
                </button>
                <button className="flex items-center px-4 py-2 bg-white border border-border-color rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                    <BarChart size={16} className="mr-2" />
                    Check Status
                </button>
                <button className="flex items-center px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-primary-accent/90 transition-colors">
                    <Edit size={16} className="mr-2" />
                    Edit Device
                </button>
            </div>
        </div>
    );
};

export default DeviceDetailsPage;