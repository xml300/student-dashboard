"use client";
import React, { useState } from 'react';
import { Search, User, Clock, Calendar, ChevronDown, MoreVertical } from 'lucide-react';

const LecturerAdminActivitiesPage = () => {
    const [activities] = useState([ // Sample Activity Data
        {
            id: 1,
            user: 'admin.lecturer1',
            userName: 'Dr. Smith',
            action: 'Device Added',
            details: 'Added new device "Projector - Room 201"',
            affectedItem: 'Projector - Room 201 (DEV006)',
            timestamp: new Date(2025, 2, 20, 10, 30), // Year, Month (0-indexed), Day, Hour, Minute
            category: 'Device Management'
        },
        {
            id: 2,
            user: 'admin.lecturer2',
            userName: 'Prof. Jones',
            action: 'Device Status Changed',
            details: 'Changed status of "Main Hall Scanner" to "Maintenance"',
            affectedItem: 'Main Hall Scanner (DEV001)',
            timestamp: new Date(2025, 2, 20, 9, 15),
            category: 'Device Management'
        },
        {
            id: 3,
            user: 'admin.lecturer1',
            userName: 'Dr. Smith',
            action: 'Course Assigned to Device',
            details: 'Assigned course "CSC402 - Advanced Algorithms" to "Lab A Scanner"',
            affectedItem: 'Lab A Scanner (DEV002), CSC402',
            timestamp: new Date(2025, 2, 19, 16, 48),
            category: 'Course Management'
        },
        {
            id: 4,
            user: 'admin.lecturer3',
            userName: 'Ms. Davis',
            action: 'User Role Updated',
            details: 'Updated role of user "student123" to "Teaching Assistant"',
            affectedItem: 'student123',
            timestamp: new Date(2025, 2, 19, 14, 0),
            category: 'User Management'
        },
        {
            id: 5,
            user: 'admin.lecturer2',
            userName: 'Prof. Jones',
            action: 'Device Edited',
            details: 'Edited details of "Science Hall Scanner" - updated room to "Science Lab 1"',
            affectedItem: 'Science Hall Scanner (DEV003)',
            timestamp: new Date(2025, 2, 18, 11, 22),
            category: 'Device Management'
        },
        {
            id: 6,
            user: 'admin.lecturer1',
            userName: 'Dr. Smith',
            action: 'Report Generated',
            details: 'Generated "Device Status Report" for all devices',
            affectedItem: 'Device Status Report (Mar 18-20, 2025)',
            timestamp: new Date(2025, 2, 18, 8, 55),
            category: 'Reporting'
        },
        {
            id: 7,
            user: 'admin.lecturer3',
            userName: 'Ms. Davis',
            action: 'Device Removed',
            details: 'Removed device "Old Projector - Storeroom"',
            affectedItem: 'Old Projector - Storeroom (DEV007) - *Hypothetical Device*',
            timestamp: new Date(2025, 2, 17, 17, 10),
            category: 'Device Management'
        },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('timestamp-desc'); // Default sort by timestamp descending

    const categories = ['all', 'Device Management', 'User Management', 'Course Management', 'Reporting']; // Available categories for filtering

    const filteredActivities = activities.filter(activity => {
        const textMatch = activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.affectedItem.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = filterCategory === 'all' || activity.category === filterCategory;
        return textMatch && categoryMatch;
    });

    const sortedActivities = [...filteredActivities].sort((a, b) => {
        if (sortBy === 'timestamp-desc') {
            return b.timestamp.getTime() - a.timestamp.getTime(); // Descending (newest first)
        } else if (sortBy === 'timestamp-asc') {
            return a.timestamp.getTime() - b.timestamp.getTime(); // Ascending (oldest first)
        } else if (sortBy === 'user-asc') {
            return a.userName.localeCompare(b.userName);
        } else if (sortBy === 'user-desc') {
            return b.userName.localeCompare(a.userName);
        }
        return 0; // Default no change
    });


    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-card-background border-b border-border-color p-4">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">Lecturer Admin Activities</div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search activities..."
                            className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-64 bg-background"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-foreground/60" size={18} />
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                {/* Filters and Actions Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4 items-center">
                        {/* Category Filter */}
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-background border border-border-color hover:border-foreground/30 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-1 focus:ring-primary-accent"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/80">
                                <ChevronDown className="h-4 w-4" />
                            </div>
                        </div>

                        {/* Sort By Dropdown */}
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-background border border-border-color hover:border-foreground/30 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-1 focus:ring-primary-accent"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="timestamp-desc">Newest First</option>
                                <option value="timestamp-asc">Oldest First</option>
                                <option value="user-asc">User (A-Z)</option>
                                <option value="user-desc">User (Z-A)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/80">
                                <ChevronDown className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    {/* Refresh Button (Optional) */}
                    <div>
                        <button className="flex items-center px-4 py-2 bg-card-background border border-border-color rounded-md text-foreground/80 hover:bg-foreground/5">
                            <RefreshCw size={16} className="mr-2" stroke="currentColor" />
                            Refresh Activities
                        </button>
                    </div>
                </div>

                {/* Activity Log Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-card-background border border-border-color rounded-md">
                        <thead className="bg-foreground/5">
                            <tr>
                                <th className="py-2 px-3 border-b text-left text-foreground/80">User</th>
                                <th className="py-2 px-3 border-b text-left text-foreground/80">Action</th>
                                <th className="py-2 px-3 border-b text-left text-foreground/80">Details</th>
                                <th className="py-2 px-3 border-b text-left text-foreground/80">Category</th>
                                <th className="py-2 px-3 border-b text-left text-foreground/80">Timestamp</th>
                                <th className="py-2 px-3 border-b text-right text-foreground/80"></th> {/* Actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedActivities.length > 0 ? (
                                sortedActivities.map(activity => (
                                    <tr key={activity.id} className="hover:bg-foreground/5 transition-colors">
                                        <td className="py-2 px-3 border-b text-foreground font-medium flex items-center">
                                            <User className="mr-2 text-foreground/60" size={16} />
                                            {activity.userName} <span className="text-foreground/60 ml-1 text-sm">({activity.user})</span>
                                        </td>
                                        <td className="py-2 px-3 border-b text-foreground/80">{activity.action}</td>
                                        <td className="py-2 px-3 border-b text-foreground/80">{activity.details}</td>
                                        <td className="py-2 px-3 border-b text-foreground/80">{activity.category}</td>
                                        <td className="py-2 px-3 border-b text-foreground/80">
                                            <div className="flex items-center">
                                                <Calendar className="mr-1 text-foreground/60" size={14} />
                                                {activity.timestamp.toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="mr-1 text-foreground/60" size={14} />
                                                {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 border-b text-right">
                                            <button className="text-foreground/50 hover:text-foreground/80">
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-4 px-3 text-center text-foreground/60">
                                        No activities found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const RefreshCw = ({ size, className, stroke }: { size?: number, className?: string, stroke?: string }) => { // Using RefreshCw from lucide-react caused a naming conflict, so created a local alias.
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9"/><path d="M16 12h5l-3 3"/></svg>;
};


export default LecturerAdminActivitiesPage;
