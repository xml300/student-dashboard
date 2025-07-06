"use client";
import React, { useState } from 'react';
import { Search, ChevronRight, MoreVertical, Filter, Plus } from 'lucide-react';
import Link from 'next/link';

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  // Sample courses data
  const courses = [
    {
      id: 'CSC301',
      title: 'Introduction to Database Systems',
      semester: 'Spring 2025',
      students: 142,
      devices: 3,
      nextSession: 'Mar 21, 2025 - 10:00 AM',
      attendanceRate: '87%',
      status: 'active'
    },
    {
      id: 'ENG205',
      title: 'Technical Writing and Communication',
      semester: 'Spring 2025',
      students: 98,
      devices: 2,
      nextSession: 'Mar 20, 2025 - 2:00 PM',
      attendanceRate: '92%',
      status: 'active'
    },
    {
      id: 'MATH401',
      title: 'Advanced Calculus',
      semester: 'Spring 2025',
      students: 64,
      devices: 1,
      nextSession: 'Mar 19, 2025 - 11:30 AM',
      attendanceRate: '79%',
      status: 'active'
    },
    {
      id: 'PHY302',
      title: 'Quantum Mechanics',
      semester: 'Spring 2025',
      students: 53,
      devices: 1,
      nextSession: 'Mar 23, 2025 - 9:00 AM',
      attendanceRate: '84%',
      status: 'active'
    },
    {
      id: 'BIO101',
      title: 'Introduction to Biology',
      semester: 'Fall 2024',
      students: 156,
      devices: 3,
      nextSession: 'N/A',
      attendanceRate: '83%',
      status: 'archived'
    }
  ];

  const filteredCourses = courses.filter(course => 
    activeTab === 'all' || course.status === activeTab
  );

  return ( 
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card-background border-b border-border-color p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="text-lg font-semibold text-foreground mb-2 sm:mb-0">Courses</div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-full bg-background text-foreground"
              />
              <Search className="absolute left-3 top-2.5 text-foreground/60" size={18} />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-background">
          {/* Actions bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md ${activeTab === 'active' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}>
                Active
              </button>
              <button 
                onClick={() => setActiveTab('archived')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md ${activeTab === 'archived' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}>
                Archived
              </button>
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md ${activeTab === 'all' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}>
                All
              </button>
            </div>
            
            <div className="flex space-x-3 w-full sm:w-auto">
              <button className="flex items-center justify-center w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-card-background border border-border-color rounded-md text-foreground/80 hover:bg-foreground/5">
                <Filter size={16} className="mr-2" />
                Filter
              </button>
              <button className="flex items-center justify-center w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-primary-accent text-white rounded-md hover:bg-primary-accent/90">
                <Plus size={16} className="mr-2" />
                Add New Course
              </button>
            </div>
          </div>
          
          {/* Course cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div key={course.id} className="flex flex-col justify-between bg-card-background rounded-lg border border-border-color overflow-hidden hover:border-primary-accent transition-colors">
                <div className="p-5">
                  <div className="flex justify-between items-start space-x-2">
                    <div>
                      <h2 className="font-bold text-lg text-foreground mb-1">{course.title}</h2>
                      <div className="text-sm text-foreground/80">{course.id} • {course.semester}</div>
                    </div>
                    <button className="border-none text-foreground/60 hover:text-foreground">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-foreground/80">Students</div>
                      <div className="font-medium">{course.students}</div>
                    </div>
                    <div>
                      <div className="text-foreground/80">Devices</div>
                      <div className="font-medium">{course.devices}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-foreground/80">Next Session</div>
                    <div className="font-medium">{course.nextSession}</div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="font-medium mr-2">Attendance Rate:</div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      parseFloat(course.attendanceRate) >= 90 ? 'bg-green-500/10 text-green-500' : 
                      parseFloat(course.attendanceRate) >= 80 ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {course.attendanceRate}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-border-color p-4 bg-foreground/5 flex justify-between items-center">
                  <Link href={`/courses/${course.id}/attendance`} className="text-primary-accent hover:underline text-sm">
                    Take Attendance
                  </Link>
                  <Link href={`/courses/${course.id}`} className="flex items-center text-primary-accent hover:underline text-sm">
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Add new course card */}
            <div className="border-2 border-dashed border-border-color rounded-lg flex flex-col items-center justify-center p-10 text-foreground/60 hover:border-primary-accent hover:text-primary-accent cursor-pointer">
              <Plus size={32} className="mb-2" />
              <div className="font-medium">Add New Course</div>
            </div>
          </div>
        </div>
      </div> 
  );
};

export default CoursesPage;
