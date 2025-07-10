"use client";
import React from 'react';
import { DevicePhoneMobileIcon, WifiIcon, Battery50Icon, ArrowLeftIcon, PencilSquareIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, TrashIcon, PowerIcon, ArrowPathIcon, BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Device {
    id: string;
    name: string;
    type: string;
    model: string;
    status: 'active' | 'inactive' | 'maintenance';
    battery: number;
    lastSync: string;
    lastUsed: string;
    wifiStrength: 'strong' | 'medium' | 'weak';
    assignedCourses: string[];
    recentActivity: {
        event: string;
        timestamp: string;
        status: 'success' | 'failure';
    }[];
}

const DeviceDetailsPage = () => {
    const device: Device = {
        id: 'DEV001',
        name: 'Main Hall Scanner',
        type: 'Tablet',
        model: 'iPad Air (2022)',
        status: 'active',
        battery: 87,
        lastSync: '19 Mar 2025, 08:32 AM',
        lastUsed: '19 Mar 2025, 08:32 AM',
        wifiStrength: 'strong',
        assignedCourses: ['CSC301 - Intro to DB', 'ENG205 - Communication'],
        recentActivity: [
            { event: 'Synced 142 records', timestamp: '19 Mar 2025, 08:32 AM', status: 'success' },
            { event: 'Session started for CSC301', timestamp: '19 Mar 2025, 08:00 AM', status: 'success' },
            { event: 'Failed to sync', timestamp: '18 Mar 2025, 02:15 PM', status: 'failure' },
            { event: 'Device came online', timestamp: '18 Mar 2025, 02:10 PM', status: 'success' },
        ]
    };

    const renderStatusBadge = (status: Device['status']) => {
        const styles = {
            active: "bg-green-500/10 text-green-500",
            inactive: "bg-foreground/10 text-foreground/80",
            maintenance: "bg-yellow-500/10 text-yellow-500",
        };
        const icons = {
            active: <CheckCircleIcon className="h-3 w-3" />,
            inactive: <XCircleIcon className="h-3 w-3" />,
            maintenance: <ExclamationTriangleIcon className="h-3 w-3" />,
        };
        return (
            <span className={`flex items-center text-xs px-2 py-1 rounded-full ${styles[status]}`}>
                {icons[status]}
                <span className="ml-1 capitalize">{status}</span>
            </span>
        );
    };

    const renderWifiStrength = (strength: Device['wifiStrength']) => {
        const colors = { strong: "text-green-500", medium: "text-yellow-500", weak: "text-red-500" };
        return <WifiIcon className={`h-4 w-4 ${colors[strength] || "text-foreground/60"}`} />;
    };

    const renderBatteryLevel = (level: number) => {
        let color = "text-foreground/60";
        if (level >= 70) color = "text-green-500";
        else if (level >= 30) color = "text-yellow-500";
        else color = "text-red-500";
        return (
            <div className="flex items-center">
                <Battery50Icon className={`h-4 w-4 ${color}`} />
                <span className="ml-1">{level}%</span>
            </div>
        );
    };

    return (
        <div className="flex-1 p-6 bg-background">
            <div className="flex items-center mb-6">
                <Link href="/devices" className="text-primary-accent hover:underline flex items-center">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Devices
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Device Info & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card-background p-6 rounded-lg border border-border-color">
                        <div className="flex items-center mb-4">
                            <DevicePhoneMobileIcon className="h-8 w-8 text-primary-accent mr-4" />
                            <div>
                                <h1 className="text-xl font-bold">{device.name}</h1>
                                <p className="text-sm text-foreground/80">{device.id} • {device.model}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-foreground/80">Status</span>
                                {renderStatusBadge(device.status)}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-foreground/80">Battery</span>
                                {renderBatteryLevel(device.battery)}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-foreground/80">WiFi</span>
                                {renderWifiStrength(device.wifiStrength)}
                            </div>
                        </div>
                    </div>

                    <div className="bg-card-background p-6 rounded-lg border border-border-color">
                        <h2 className="text-lg font-semibold mb-4">Remote Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-accent/10 border border-primary-accent text-primary-accent rounded-md hover:bg-primary-accent/20 transition-colors text-sm">
                                <BellIcon className="h-5 w-5 mr-2" />
                                Ping Device
                            </button>
                            <button className="w-full flex items-center justify-center px-4 py-2 bg-foreground/10 border border-border-color text-foreground/80 rounded-md hover:bg-foreground/20 transition-colors text-sm">
                                <ArrowPathIcon className="h-5 w-5 mr-2" />
                                Force Sync
                            </button>
                            <button className="w-full flex items-center justify-center px-4 py-2 bg-yellow-500/10 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500/20 transition-colors text-sm">
                                <PowerIcon className="h-5 w-5 mr-2" />
                                Restart Device
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-card-background p-6 rounded-lg border border-border-color">
                        <h2 className="text-lg font-semibold mb-4">Management</h2>
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-center px-4 py-2 bg-foreground/10 border border-border-color text-foreground/80 rounded-md hover:bg-foreground/20 transition-colors text-sm">
                                <PencilSquareIcon className="h-5 w-5 mr-2" />
                                Edit Details
                            </button>
                            <button className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 border border-red-500 text-red-500 rounded-md hover:bg-red-500/20 transition-colors text-sm">
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Delete Device
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Activity & Courses */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card-background p-6 rounded-lg border border-border-color">
                        <h2 className="text-lg font-semibold mb-4">Activity</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-foreground/80">Last Used:</span>
                                <span>{device.lastUsed}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground/80">Last Sync:</span>
                                <span>{device.lastSync}</span>
                            </div>
                        </div>
                    </div>

                    {device.assignedCourses && device.assignedCourses.length > 0 && (
                        <div className="bg-card-background p-6 rounded-lg border border-border-color">
                            <h2 className="text-lg font-semibold mb-4">Assigned Courses</h2>
                            <ul className="space-y-2">
                                {device.assignedCourses.map(course => (
                                    <li key={course} className="flex items-center justify-between p-3 bg-foreground/5 rounded-md">
                                        <span>{course}</span>
                                        <Link href="#" className="text-primary-accent hover:underline text-sm">View Course</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-card-background p-6 rounded-lg border border-border-color">
                        <h2 className="text-lg font-semibold mb-4">Recent Event Log</h2>
                        <div className="space-y-4">
                            {device.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="mr-3 mt-1">
                                        {activity.status === 'success' ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : <XCircleIcon className="h-4 w-4 text-red-500" />}
                                    </div>
                                    <div>
                                        <p className="font-medium">{activity.event}</p>
                                        <p className="text-xs text-foreground/60">{activity.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceDetailsPage;
