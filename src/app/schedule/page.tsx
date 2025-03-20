"use client";
import React, { useState } from 'react';
import { Calendar, List, ChevronLeft, ChevronRight, Filter, Search, Plus, MapPin, Clock } from 'lucide-react';

const LecturerSchedulePage = () => {
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [filterType, setFilterType] = useState('all'); // 'all', 'lecture', 'meeting', 'officeHours', etc.
    const [searchQuery, setSearchQuery] = useState('');

    // Sample schedule events data (replace with actual data fetching)
    const sampleScheduleEvents = [
        {
            id: 'SCH001',
            title: 'CSC301 - Lecture',
            date: '2025-03-20', // YYYY-MM-DD format for easy sorting/filtering
            startTime: '09:00', // HH:MM format
            endTime: '10:30',
            location: 'Lecture Hall 101',
            type: 'Lecture', // Event type for filtering
            courseCode: 'CSC301'
        },
        {
            id: 'SCH002',
            title: 'Office Hours',
            date: '2025-03-21',
            startTime: '14:00',
            endTime: '15:00',
            location: 'Office 205',
            type: 'Office Hours'
        },
        {
            id: 'SCH003',
            title: 'ENG205 - Seminar',
            date: '2025-03-20',
            startTime: '11:00',
            endTime: '12:30',
            location: 'Seminar Room B',
            type: 'Seminar',
            courseCode: 'ENG205'
        },
        {
            id: 'SCH004',
            title: 'Faculty Meeting',
            date: '2025-03-22',
            startTime: '10:00',
            endTime: '12:00',
            location: 'Faculty Lounge',
            type: 'Meeting'
        },
        {
            id: 'SCH005',
            title: 'CSC301 - Lab Session',
            date: '2025-03-23',
            startTime: '13:00',
            endTime: '15:00',
            location: 'Computer Lab A',
            type: 'Lab',
            courseCode: 'CSC301'
        },
        {
            id: 'SCH006',
            title: 'ENG205 - Lecture',
            date: '2025-03-27',
            startTime: '14:30',
            endTime: '16:00',
            location: 'Lecture Hall 102',
            type: 'Lecture',
            courseCode: 'ENG205'
        },
        {
            id: 'SCH007',
            title: 'Student Consultation',
            date: '2025-03-27',
            startTime: '11:00',
            endTime: '12:00',
            location: 'Office 205',
            type: 'Office Hours'
        },
        {
            id: 'SCH008',
            title: 'Department Curriculum Meeting',
            date: '2025-04-05', // Example in April
            startTime: '09:30',
            endTime: '11:00',
            location: 'Conference Room 3B',
            type: 'Meeting'
        },
        {
            id: 'SCH009',
            title: 'CSC402 - Project Presentation',
            date: '2025-04-10', // Example in April
            startTime: '13:00',
            endTime: '16:00',
            location: 'Presentation Hall',
            type: 'Presentation',
            courseCode: 'CSC402'
        },
    ];

    // Function to filter events based on type and search query
    const filteredEvents = sampleScheduleEvents.filter(event => {
        const typeFilter = filterType === 'all' || event.type.toLowerCase() === filterType;
        const searchFilter = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                             (event.courseCode && event.courseCode.toLowerCase().includes(searchQuery.toLowerCase()));
        return typeFilter && searchFilter;
    });

    // --- Calendar View Helpers ---
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 (Sunday) to 6 (Saturday)
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInCurrentMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const currentMonthEvents = filteredEvents.filter(event => new Date(event.date).getMonth() === currentMonth.getMonth());

    const getEventsForDay = (day) => {
        const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return currentMonthEvents.filter(event => event.date === dateString);
    };

    // --- List View Helpers ---
    const sortedEventsForList = [...filteredEvents].sort((a, b) => new Date(a.date + 'T' + a.startTime) - new Date(b.date + 'T' + b.startTime));


    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b border-border-color p-4">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">Lecturer Schedule</div>
                    <div className="flex space-x-4 items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search schedule..."
                                className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                        <button className="flex items-center px-3 py-2 bg-white border border-border-color rounded-md text-gray-600 hover:bg-gray-50">
                            <Filter size={16} className="mr-2" />
                            Filter
                        </button> {/* Add dropdown/modal for filter options later */}
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                {/* View Mode Toggle & Actions */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-3 py-2 rounded-md flex items-center ${viewMode === 'calendar' ? 'bg-primary-accent text-white' : 'bg-white border border-border-color text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Calendar size={16} className="mr-2" />
                            Calendar
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-2 rounded-md flex items-center ${viewMode === 'list' ? 'bg-primary-accent text-white' : 'bg-white border border-border-color text-gray-600 hover:bg-gray-50'}`}
                        >
                            <List size={16} className="mr-2" />
                            List
                        </button>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-primary-accent/90">
                        <Plus size={16} className="mr-2" />
                        Add Event
                    </button>
                </div>

                {/* Calendar View */}
                {viewMode === 'calendar' && (
                    <div className="bg-white rounded-lg border border-border-color overflow-hidden">
                        <div className="p-4 flex justify-between items-center border-b border-border-color">
                            <button onClick={prevMonth} className="hover:text-primary-accent"><ChevronLeft size={20} /></button>
                            <h2 className="font-semibold text-lg">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
                            <button onClick={nextMonth} className="hover:text-primary-accent"><ChevronRight size={20} /></button>
                        </div>
                        <div className="grid grid-cols-7 border-b border-border-color">
                            {daysOfWeek.map((day, index) => (
                                <div key={index} className="p-2 text-center text-gray-600">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {Array.from({ length: firstDayOfMonth }, (_, i) => ( // Empty days before first day of month
                                <div key={`empty-${i}`} className="p-2 border-r border-b border-border-color bg-gray-50"></div>
                            ))}
                            {Array.from({ length: daysInCurrentMonth }, (_, day) => {
                                const dayNumber = day + 1;
                                const eventsOnDay = getEventsForDay(dayNumber);
                                const hasEvents = eventsOnDay.length > 0;
                                return (
                                    <div key={`day-${dayNumber}`} className={`p-2 border-r border-b border-border-color hover:bg-gray-100 cursor-pointer ${hasEvents ? 'has-events' : ''}`}>
                                        <div className="text-sm font-medium mb-1">{dayNumber}</div>
                                        {eventsOnDay.slice(0, 2).map(event => ( // Display max 2 events per day in calendar
                                            <div key={event.id} className="text-xs bg-primary-accent/10 text-primary-accent px-1 py-0.5 rounded mb-0.5 truncate" title={event.title}>
                                                {event.title}
                                            </div>
                                        ))}
                                        {eventsOnDay.length > 2 && (
                                            <div className="text-xs text-gray-500 mt-0.5">+{eventsOnDay.length - 2} more</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="bg-white rounded-lg border border-border-color overflow-x-auto">
                        <table className="min-w-full divide-y divide-border-color">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Time
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Event
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th scope="col" className="relative px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-border-color">
                                {sortedEventsForList.map((event) => (
                                    <tr key={event.id}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{new Date(event.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{event.startTime} - {event.endTime}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">
                                            <div className="font-medium">{event.title}</div>
                                            <div className="text-gray-500 text-xs">{event.type}</div>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                            <div className="flex items-center">
                                                <MapPin size={14} className="text-gray-400 mr-1" />
                                                {event.location || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{event.courseCode || 'N/A'}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-primary-accent hover:text-primary-accent/80">View Details</a>
                                        </td>
                                    </tr>
                                ))}
                                {sortedEventsForList.length === 0 && (
                                    <tr>
                                        <td className="px-4 py-4 text-center text-gray-500" colSpan={6}>No events found for current filter and search.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LecturerSchedulePage;