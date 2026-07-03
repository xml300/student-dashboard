"use client";
import React, { useState } from 'react';
import { UserIcon, ClockIcon, CalendarDaysIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Activity } from '@/data/types/types';

type ExtenActivity = Omit<Activity, 'timestamp'> & {
  timestamp: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const LecturerAdminActivitiesClient = ({ initialActivities }: { initialActivities: ExtenActivity[] }) => {
    const [activities] = useState<ExtenActivity[]>(initialActivities);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('timestamp-desc'); 

    const categories = ['all', 'Device Management', 'User Management', 'Course Management', 'Reporting']; 

    const filteredActivities = activities.filter(activity => {
        const textMatch = (activity.userName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (activity.action?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (activity.details?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (activity.affectedItem?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const categoryMatch = filterCategory === 'all' || activity.category === filterCategory;
        return textMatch && categoryMatch;
    });

    const sortedActivities = [...filteredActivities].sort((a, b) => {
        if (sortBy === 'timestamp-desc') {
            return b.timestamp!.getTime() - a.timestamp!.getTime(); 
        } else if (sortBy === 'timestamp-asc') {
            return a.timestamp!.getTime() - b.timestamp!.getTime(); 
        } else if (sortBy === 'user-asc') {
            return (a.userName || '').localeCompare(b.userName || '');
        } else if (sortBy === 'user-desc') {
            return (b.userName || '').localeCompare(a.userName || '');
        }
        return 0;
    });
    
    return (
        <div>
            
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                
                <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full md:w-auto mb-2 md:mb-0"
                />
                
                <div className="flex items-center space-x-2">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="select select-bordered"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="timestamp-desc">Newest First</option>
                        <option value="timestamp-asc">Oldest First</option>
                        <option value="user-asc">User (A-Z)</option>
                        <option value="user-desc">User (Z-A)</option>
                    </select>
                </div>
            </div>

            
            <div className="hidden md:block">
                <table className="min-w-full bg-card-background border border-border-color">
                    <thead>
                        <tr className="bg-foreground/5">
                            <th className="py-2 px-3 border-b text-left text-foreground/80">Action</th>
                            <th className="py-2 px-3 border-b text-left text-foreground/80">Details</th>
                            <th className="py-2 px-3 border-b text-left text-foreground/80">Category</th>
                            <th className="py-2 px-3 border-b text-left text-foreground/80">Timestamp</th>
                            <th className="py-2 px-3 border-b text-right text-foreground/80"></th> 
                        </tr>
                    </thead>
                    <tbody>
                        {sortedActivities.length > 0 ? (
                            sortedActivities.map(activity => (
                                <tr key={activity.id} className="hover:bg-foreground/5 transition-colors">
                                    <td className="py-2 px-3 border-b text-foreground/80">{activity.action}</td>
                                    <td className="py-2 px-3 border-b text-foreground/80">{activity.details}</td>
                                    <td className="py-2 px-3 border-b text-foreground/80">{activity.category}</td>
                                    <td className="py-2 px-3 border-b text-foreground/80">
                                        <div className="flex items-center">
                                            <CalendarDaysIcon className="h-4 w-4 mr-1 text-foreground/60" />
                                            {activity.timestamp!.toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <ClockIcon className="h-4 w-4 mr-1 text-foreground/60" />
                                            {activity.timestamp!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="py-2 px-3 border-b text-right">
                                        <button className="text-foreground/50 hover:text-foreground/80">
                                            <EllipsisVerticalIcon className="h-5 w-5" />
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

            
            <div className="md:hidden space-y-4">
                {sortedActivities.length > 0 ? (
                    sortedActivities.map(activity => (
                        <div key={activity.id} className="bg-card-background border border-border-color rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-foreground">{activity.action}</p>
                                    <p className="text-sm text-foreground/80">{activity.details}</p>
                                </div>
                                <button className="text-foreground/50 hover:text-foreground/80">
                                    <EllipsisVerticalIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border-color">
                                <div className="flex items-center text-sm text-foreground/80 mb-2">
                                    <UserIcon className="h-4 w-4 mr-2" />
                                    {activity.userName} {activity.user && <>({activity.user})</>}
                                </div>
                                <div className="flex items-center text-sm text-foreground/80">
                                    <ClockIcon className="h-4 w-4 mr-2" />
                                    {activity.timestamp!.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-foreground/60 py-8">
                        No activities found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default LecturerAdminActivitiesClient;
