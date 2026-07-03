"use client";
import React, { useState } from "react";
import {
  CalendarIcon,
  ListBulletIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Card from '@/components/Card';
import { ScheduleEvent } from '@/data/types/types';

interface LecturerScheduleClientProps {
  initialEvents: ScheduleEvent[];
}

const LecturerScheduleClient: React.FC<LecturerScheduleClientProps> = ({ initialEvents }) => {
    const [viewMode, setViewMode] = useState('calendar'); 
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [filterType] = useState('all'); 
    const [searchQuery, setSearchQuery] = useState('');
    const [scheduleEvents] = useState<ScheduleEvent[]>(initialEvents);

    
    const filteredEvents = scheduleEvents.filter((event: ScheduleEvent) => {
        const typeFilter = filterType === 'all' || event.type?.toLowerCase() === filterType;
        const searchFilter = event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                             (event.courseCode && event.courseCode.toLowerCase().includes(searchQuery.toLowerCase()));
        return typeFilter && searchFilter;
    });

    
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay(); 
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

    
    const sortedEventsForList = [...filteredEvents].sort((a, b) => new Date(a.date + 'T' + a.startTime).getTime() - new Date(b.date + 'T' + b.startTime).getTime());

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">Lecturer Schedule</h1>
                        <div className="relative w-full sm:w-72">
                            <input
                                type="text"
                                placeholder="Search schedule..."
                                className="pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent w-full bg-card-background text-foreground"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60 h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${viewMode === 'calendar' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}
                            >
                                <CalendarIcon className="h-5 w-5 mr-2" />
                                Calendar
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${viewMode === 'list' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}
                            >
                                <ListBulletIcon className="h-5 w-5 mr-2" />
                                List
                            </button>
                        </div>
                        <div className="flex space-x-3 w-full sm:w-auto">
                            <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium bg-card-background border border-border-color rounded-lg text-foreground/80 hover:bg-foreground/5">
                                <FunnelIcon className="h-5 w-5 mr-2" />
                                Filter
                            </button>
                            <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90">
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Add Event
                            </button>
                        </div>
                    </div>

                    {viewMode === 'calendar' && (
                        <Card className="overflow-hidden">
                            <div className="p-4 flex justify-between items-center border-b border-border-color">
                                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-foreground/5 text-foreground/80 hover:text-primary-accent transition-colors"><ChevronLeftIcon className="h-5 w-5" /></button>
                                <h2 className="font-semibold text-xl text-foreground">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
                                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-foreground/5 text-foreground/80 hover:text-primary-accent transition-colors"><ChevronRightIcon className="h-5 w-5" /></button>
                            </div>
                            <div className="grid grid-cols-7 border-b border-border-color bg-background">
                                {daysOfWeek.map((day, index) => (
                                    <div key={index} className="p-3 text-center text-sm font-medium text-foreground/80">{day}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7">
                                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                                    <div key={`empty-${i}`} className="min-h-[100px] p-3 border-r border-b border-border-color bg-background"></div>
                                ))}
                                {Array.from({ length: daysInCurrentMonth }, (_, day) => {
                                    const dayNumber = day + 1;
                                    const eventsOnDay = getEventsForDay(dayNumber);
                                    return (
                                        <div key={`day-${dayNumber}`} className={`min-h-[100px] p-3 border-r border-b border-border-color hover:bg-background/5 cursor-pointer transition-colors last:border-r-0`}>
                                            <div className="text-sm font-semibold text-foreground mb-1">{dayNumber}</div>
                                            {eventsOnDay.slice(0, 2).map(event => (
                                                <div key={event.id} className="text-xs bg-primary-accent/10 text-primary-accent px-2 py-0.5 rounded-full mb-1 truncate font-medium" title={event.title}>
                                                    {event.title}
                                                </div>
                                            ))}
                                            {eventsOnDay.length > 2 && (
                                                <div className="text-xs text-foreground/60 mt-1">+{eventsOnDay.length - 2} more</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    )}

                    {viewMode === 'list' && (
                        <div className="space-y-6">
                            {sortedEventsForList.length > 0 ? (
                                sortedEventsForList.map((event) => (
                                    <Card key={event.id} className="p-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                            <div>
                                                <p className="font-bold text-lg text-foreground">{event.title}</p>
                                                <p className="text-sm text-primary-accent font-medium">{event.type}</p>
                                            </div>
                                            <Link href="#" className="text-primary-accent hover:underline text-sm font-medium mt-2 sm:mt-0">View Details</Link>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border-color text-sm">
                                            <div className="flex items-center">
                                                <CalendarDaysIcon className="h-5 w-5 text-foreground/60 mr-2" />
                                                <span className="text-foreground/80">Date:</span>
                                                <span className="ml-1 font-medium text-foreground">{new Date(event.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <ClockIcon className="h-5 w-5 text-foreground/60 mr-2" />
                                                <span className="text-foreground/80">Time:</span>
                                                <span className="ml-1 font-medium text-foreground">{event.startTime} - {event.endTime}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPinIcon className="h-5 w-5 text-foreground/60 mr-2" />
                                                <span className="text-foreground/80">Location:</span>
                                                <span className="ml-1 font-medium text-foreground">{event.location || 'N/A'}</span>
                                            </div>
                                            {event.courseCode && (
                                                <div className="flex items-center">
                                                    <AcademicCapIcon className="h-5 w-5 text-foreground/60 mr-2" />
                                                    <span className="text-foreground/80">Course:</span>
                                                    <span className="ml-1 font-medium text-foreground">{event.courseCode}</span>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card>
                                    <div className="text-center text-foreground/60 py-8">
                                        No events found for current filter and search.
                                    </div>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LecturerScheduleClient;
