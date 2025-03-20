"use client";
import React, { useState } from 'react';
import { Search, ChevronRight, MoreVertical, Filter, Plus } from 'lucide-react';

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  // Sample courses data
  const courses = [
    {
      id: 'CSC301',
      title: 'Introduction to Database Systems',
      semester: 'Spring 2025',
      students: 142,
      rooms: 2,
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
      rooms: 1,
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
      rooms: 1,
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
      rooms: 1,
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
      rooms: 2,
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
        <header className="bg-white border-b border-border-color p-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Courses</div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Actions bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md ${activeTab === 'active' ? 'bg-primary-accent text-white' : 'bg-white border border-border-color text-gray-600 hover:bg-gray-50'}`}>
                Active
              </button>
              <button 
                onClick={() => setActiveTab('archived')}
                className={`px-4 py-2 rounded-md ${activeTab === 'archived' ? 'bg-primary-accent text-white' : 'bg-white border border-border-color text-gray-600 hover:bg-gray-50'}`}>
                Archived
              </button>
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-primary-accent text-white' : 'bg-white border border-border-color text-gray-600 hover:bg-gray-50'}`}>
                All
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-white border border-border-color rounded-md text-gray-600 hover:bg-gray-50">
                <Filter size={16} className="mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-primary-accent/90">
                <Plus size={16} className="mr-2" />
                Add New Course
              </button>
            </div>
          </div>
          
          {/* Course cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg border border-border-color overflow-hidden hover:border-primary-accent transition-colors">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-bold text-lg mb-1">{course.title}</h2>
                      <div className="text-sm text-gray-500">{course.id} • {course.semester}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-gray-500">Students</div>
                      <div className="font-medium">{course.students}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Rooms</div>
                      <div className="font-medium">{course.rooms}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Devices</div>
                      <div className="font-medium">{course.devices}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Next Session</div>
                    <div className="font-medium">{course.nextSession}</div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="font-medium mr-2">Attendance Rate:</div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      parseFloat(course.attendanceRate) >= 90 ? 'bg-green-100 text-green-800' : 
                      parseFloat(course.attendanceRate) >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.attendanceRate}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-border-color p-4 bg-gray-50 flex justify-between items-center">
                  <a href={`/courses/${course.id}/attendance`} className="text-primary-accent hover:underline text-sm">
                    Take Attendance
                  </a>
                  <a href={`/courses/${course.id}`} className="flex items-center text-primary-accent hover:underline text-sm">
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
            
            {/* Add new course card */}
            <div className="border-2 border-dashed border-border-color rounded-lg flex flex-col items-center justify-center p-10 text-gray-400 hover:border-primary-accent hover:text-primary-accent cursor-pointer">
              <Plus size={32} className="mb-2" />
              <div className="font-medium">Add New Course</div>
            </div>
          </div>
        </div>
      </div> 
  );
};

export default CoursesPage;