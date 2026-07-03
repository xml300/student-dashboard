"use client";
import React, { JSX, useEffect, useState } from 'react';
import { DevicePhoneMobileIcon,  ArrowLeftIcon, PencilSquareIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, TrashIcon, PowerIcon, BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Device } from '@/types/data';



const DeviceDetailsPage = () => {
    const { deviceId } = useParams();
    const [device, setDevice] = useState<Device | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!deviceId) return;
        setLoading(true);
        setError(null);
        fetch(`/api/devices/${deviceId}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch device');
                return res.json();
            })
            .then(data => {
                setDevice(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch device details'+" "+err.message);
                setLoading(false);
            });
    }, [deviceId]);

    
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editName, setEditName] = useState("");
    const [editType, setEditType] = useState("");
    const [editModel, setEditModel] = useState("");

    
    const handlePing = async () => {
        setActionLoading("ping");
        setActionMessage(null);
        try {
            const res = await fetch(`/api/devices/${deviceId}/actions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "ping" })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to ping device.");
            setActionMessage(data.message);
        } catch (err) {
            if(err instanceof Error){
            setActionMessage(err.message || "Failed to ping device.");
            }
        }
        setActionLoading(null);
    };

    
    const handleRestart = async () => {
        setActionLoading("restart");
        setActionMessage(null);
        try {
            const res = await fetch(`/api/devices/${deviceId}/actions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "restart" })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to restart device.");
            setActionMessage(data.message);
        } catch (err) {
            if(err instanceof Error){
            setActionMessage(err.message || "Failed to restart device.");
            }
        }
        setActionLoading(null);
    };

    
    const handleEdit = () => {
        if (!device) return;
        setEditName(device.name);
        setEditType(device.type);
        setEditModel(device.model);
        setShowEdit(true);
    };

    const handleEditSave = async () => {
        setActionLoading("edit");
        setActionMessage(null);
        try {
            const res = await fetch(`/api/devices/${deviceId}/actions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "edit", data: { name: editName, type: editType, model: editModel } })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update device.");
            setDevice(prev => prev ? { ...prev, name: editName, type: editType, model: editModel } : prev);
            setShowEdit(false);
            setActionMessage(data.message);
        } catch (err) {
            if(err instanceof Error){
            setActionMessage(err.message || "Failed to update device.");
            }
        }
        setActionLoading(null);
    };

    
    const handleDelete = async () => {
        setActionLoading("delete");
        setActionMessage(null);
        try {
            const res = await fetch(`/api/devices/${deviceId}/actions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete" })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to delete device.");
            setDevice(null);
            setShowDeleteConfirm(false);
            setActionMessage(data.message);
        } catch (err) {
            if(err instanceof Error){
            setActionMessage(err.message || "Failed to delete device.");
            }
        }
        setActionLoading(null);
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!device) return <div className="p-6">No device found.</div>;

    const renderStatusBadge = (status: Device['status']) => {
        const styles: {[key: string]: string} = {
            active: "bg-green-500/10 text-green-500",
            inactive: "bg-foreground/10 text-foreground/80",
            maintenance: "bg-yellow-500/10 text-yellow-500",
        };
        const icons: {[key: string]: JSX.Element} = {
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

 

    
    return (
        <div className="flex-1 p-6 bg-background">
            <div className="flex items-center mb-6">
                <Link href="/admin/devices" className="text-primary-accent hover:underline flex items-center">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Devices
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
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
                        </div>
                    </div>

                    <div className="bg-card-background p-6 rounded-lg border border-border-color">
                        <h2 className="text-lg font-semibold mb-4">Remote Actions</h2>
                        <div className="space-y-2">
                            <button
                                className="w-full flex items-center justify-center px-4 py-2 bg-primary-accent/10 border border-primary-accent text-primary-accent rounded-md hover:bg-primary-accent/20 transition-colors text-sm disabled:opacity-60"
                                onClick={handlePing}
                                disabled={!!actionLoading}
                            >
                                <BellIcon className="h-5 w-5 mr-2" />
                                {actionLoading === "ping" ? "Pinging..." : "Ping Device"}
                            </button>
                            <button
                                className="w-full flex items-center justify-center px-4 py-2 bg-yellow-500/10 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500/20 transition-colors text-sm disabled:opacity-60"
                                onClick={handleRestart}
                                disabled={!!actionLoading}
                            >
                                <PowerIcon className="h-5 w-5 mr-2" />
                                {actionLoading === "restart" ? "Restarting..." : "Restart Device"}
                            </button>
                            {actionMessage && (
                                <div className="text-xs text-foreground/80 mt-2">{actionMessage}</div>
                            )}
                        </div>
                    </div>
                    
                    <div className="bg-card-background p-6 rounded-lg border border-border-color">
                        <h2 className="text-lg font-semibold mb-4">Management</h2>
                        <div className="space-y-2">
                            <button
                                className="w-full flex items-center justify-center px-4 py-2 bg-foreground/10 border border-border-color text-foreground/80 rounded-md hover:bg-foreground/20 transition-colors text-sm"
                                onClick={handleEdit}
                                disabled={!!actionLoading}
                            >
                                <PencilSquareIcon className="h-5 w-5 mr-2" />
                                Edit Details
                            </button>
                            <button
                                className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 border border-red-500 text-red-500 rounded-md hover:bg-red-500/20 transition-colors text-sm"
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={!!actionLoading}
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Delete Device
                            </button>
                        </div>
                        
                        {showEdit && (
                            <div className="fixed inset-0 bg-black/30 dark:bg-black/60 flex items-center justify-center z-50">
                                <div className="bg-white dark:bg-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg min-w-[320px]">
                                    <h3 className="text-lg font-bold mb-4">Edit Device</h3>
                                    <div className="mb-2">
                                        <label className="block text-sm mb-1">Name</label>
                                        <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm mb-1">Type</label>
                                        <input value={editType} onChange={e => setEditType(e.target.value)} className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm mb-1">Model</label>
                                        <input value={editModel} onChange={e => setEditModel(e.target.value)} className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-primary-accent text-white rounded" onClick={handleEditSave} disabled={!!actionLoading}>Save</button>
                                        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded" onClick={() => setShowEdit(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {showDeleteConfirm && (
                            <div className="fixed inset-0 bg-black/30 dark:bg-black/60 flex items-center justify-center z-50">
                                <div className="bg-white dark:bg-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg min-w-[320px]">
                                    <h3 className="text-lg font-bold mb-4">Delete Device?</h3>
                                    <p className="mb-4">Are you sure you want to delete this device? This action cannot be undone.</p>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete} disabled={!!actionLoading}>Delete</button>
                                        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                
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
                                        <Link href={`/admin/courses/${course.split('-')[0]}`} className="text-primary-accent hover:underline text-sm">View Course</Link>
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
