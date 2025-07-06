"use client";
import React, { useState } from 'react';
import { Calendar, List, ChevronLeft, ChevronRight, Filter, Search, Plus } from 'lucide-react';
import Link from 'next/link';

const LecturerSchedulePage = () => {
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [filterType] = useState('all'); // 'all', 'lecture', 'meeting', 'officeHours', etc.
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
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
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

    const getEventsForDay = (day: number) => {
        const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return currentMonthEvents.filter(event => event.date === dateString);
    };

    // --- List View Helpers ---
    const sortedEventsForList = [...filteredEvents].sort((a, b) => new Date(a.date + 'T' + a.startTime).getTime() - new Date(b.date + 'T' + b.startTime).getTime());


    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-card-background border-b border-border-color p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="text-lg font-semibold mb-2 sm:mb-0">Lecturer Schedule</div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search schedule..."
                                className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-full bg-background"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-foreground/60" size={18} />
                        </div>
                        <button className="flex items-center justify-center w-full sm:w-auto px-3 py-2 bg-card-background border border-border-color rounded-md text-foreground/80 hover:bg-foreground/5">
                            <Filter size={16} className="mr-2" />
                            Filter
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-background">
                {/* View Mode Toggle & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-3 py-2 rounded-md flex items-center text-sm ${viewMode === 'calendar' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}
                        >
                            <Calendar size={16} className="mr-2" />
                            Calendar
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-2 rounded-md flex items-center text-sm ${viewMode === 'list' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}
                        >
                            <List size={16} className="mr-2" />
                            List
                        </button>
                    </div>
                    <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-primary-accent/90">
                        <Plus size={16} className="mr-2" />
                        Add Event
                    </button>
                </div>

                {/* Calendar View */}
                {viewMode === 'calendar' && (
                    <div className="bg-card-background rounded-lg border border-border-color overflow-hidden">
                        <div className="p-4 flex justify-between items-center border-b border-border-color">
                            <button onClick={prevMonth} className="hover:text-primary-accent"><ChevronLeft size={20} /></button>
                            <h2 className="font-semibold text-lg">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
                            <button onClick={nextMonth} className="hover:text-primary-accent"><ChevronRight size={20} /></button>
                        </div>
                        <div className="grid grid-cols-7 border-b border-border-color">
                            {daysOfWeek.map((day, index) => (
                                <div key={index} className="p-2 text-center text-foreground/80">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {Array.from({ length: firstDayOfMonth }, (_, i) => ( // Empty days before first day of month
                                <div key={`empty-${i}`} className="p-2 border-r border-b border-border-color bg-foreground/5"></div>
                            ))}
                            {Array.from({ length: daysInCurrentMonth }, (_, day) => {
                                const dayNumber = day + 1;
                                const eventsOnDay = getEventsForDay(dayNumber);
                                const hasEvents = eventsOnDay.length > 0;
                                return (
                                    <div key={`day-${dayNumber}`} className={`p-2 border-r border-b border-border-color hover:bg-foreground/10 cursor-pointer ${hasEvents ? 'has-events' : ''}`}>
                                        <div className="text-sm font-medium mb-1">{dayNumber}</div>
                                        {eventsOnDay.slice(0, 2).map(event => ( // Display max 2 events per day in calendar
                                            <div key={event.id} className="text-xs bg-primary-accent/10 text-primary-accent px-1 py-0.5 rounded mb-0.5 truncate" title={event.title}>
                                                {event.title}
                                            </div>
                                        ))}
                                        {eventsOnDay.length > 2 && (
                                            <div className="text-xs text-foreground/60 mt-0.5">+{eventsOnDay.length - 2} more</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="space-y-4">
                        {sortedEventsForList.length > 0 ? (
                            sortedEventsForList.map((event) => (
                                <div key={event.id} className="bg-card-background rounded-lg border border-border-color p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold">{event.title}</p>
                                            <p className="text-sm text-foreground/80">{event.type}</p>
                                        </div>
                                        <Link href="#" className="text-primary-accent hover:text-primary-accent/80 text-sm">View</Link>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-border-color space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-foreground/80">Date:</span>
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-foreground/80">Time:</span>
                                            <span>{event.startTime} - {event.endTime}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-foreground/80">Location:</span>
                                            <span>{event.location || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-foreground/80">Course:</span>
                                            <span>{event.courseCode || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-foreground/60 py-8">
                                No events found for current filter and search.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LecturerSchedulePage;
