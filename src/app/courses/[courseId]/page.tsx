"use client";
import React, { useState } from 'react';
import { Search, Users, ChevronRight, ArrowRight, MoreVertical, BarChart } from 'lucide-react';

const CourseManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample course data
  const course = {
    id: 'CSC301',
    title: 'Introduction to Database Systems',
    semester: 'Spring 2025',
    students: 142,
    lastAttendance: 'Mar 17, 2025',
    nextSession: 'Mar 21, 2025 - 10:00 AM',
    attendanceRate: '87%',
    rooms: [
      { id: 'R101', name: 'Main Lecture Hall', capacity: 150, devices: 2 },
      { id: 'R102', name: 'Lab Room A', capacity: 40, devices: 1 },
    ],
    recentSessions: [
      { date: 'Mar 17, 2025', attendees: 124, totalStudents: 142, rate: '87%' },
      { date: 'Mar 14, 2025', attendees: 131, totalStudents: 142, rate: '92%' },
      { date: 'Mar 10, 2025', attendees: 118, totalStudents: 142, rate: '83%' },
    ]
  };

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-border-color p-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Course Management</div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <a href="#" className="text-gray-500 hover:text-primary-accent">Courses</a>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="font-medium">{course.id}</span>
          </div>
          
          {/* Course header */}
          <div className="bg-white rounded-lg border border-border-color p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <div className="text-sm text-gray-500">{course.id} • {course.semester}</div>
                
                <div className="mt-4 flex gap-6">
                  <div className="flex items-center">
                    <Users size={18} className="text-primary-accent mr-2" />
                    <span><strong>{course.students}</strong> Students</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart size={18} className="text-secondary-accent mr-2" />
                    <span><strong>{course.attendanceRate}</strong> Attendance</span>
                  </div>
                </div>
              </div>
              
              <a href={`/courses/${course.id}/details`} className="bg-primary-accent hover:bg-primary-accent/90 text-white px-4 py-2 rounded-md flex items-center">
                Manage Course
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-border-color mb-6">
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-1 ${activeTab === 'overview' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-gray-500'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('sessions')}
                className={`pb-3 px-1 ${activeTab === 'sessions' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-gray-500'}`}
              >
                Sessions
              </button>
              <button 
                onClick={() => setActiveTab('students')}
                className={`pb-3 px-1 ${activeTab === 'students' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-gray-500'}`}
              >
                Students
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`pb-3 px-1 ${activeTab === 'settings' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-gray-500'}`}
              >
                Settings
              </button>
            </div>
          </div>
          
          {/* Overview content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick stats */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-medium mb-4">Quick Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-border-color">
                    <div className="text-sm text-gray-500 mb-1">Last Attendance</div>
                    <div className="font-medium">{course.lastAttendance}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-border-color">
                    <div className="text-sm text-gray-500 mb-1">Next Session</div>
                    <div className="font-medium">{course.nextSession}</div>
                  </div>
                </div>
                
                <h2 className="text-lg font-medium mt-6 mb-4">Recent Sessions</h2>
                <div className="bg-white rounded-lg border border-border-color overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-color bg-gray-50">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Attendees</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Rate</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.recentSessions.map((session, index) => (
                        <tr key={index} className="border-b border-border-color last:border-0">
                          <td className="py-3 px-4">{session.date}</td>
                          <td className="py-3 px-4 text-center">{session.attendees} / {session.totalStudents}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${parseFloat(session.rate) >= 90 ? 'bg-green-100 text-green-800' : parseFloat(session.rate) >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {session.rate}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <a href={`/courses/${course.id}/sessions/${index}`} className="text-primary-accent hover:underline text-sm">
                              View details
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Rooms section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Assigned Rooms</h2>
                  <button className="text-sm text-primary-accent hover:underline">Manage</button>
                </div>
                
                <div className="space-y-3">
                  {course.rooms.map(room => (
                    <div key={room.id} className="bg-white p-4 rounded-lg border border-border-color">
                      <div className="flex justify-between">
                        <div className="font-medium">{room.name}</div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Room {room.id}</div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Capacity</div>
                          <div>{room.capacity} students</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Devices</div>
                          <div>{room.devices} active</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full border border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-primary-accent hover:text-primary-accent text-sm">
                    + Add another room
                  </button>
                </div>
                
                <div className="mt-6 bg-primary-accent/10 rounded-lg p-4">
                  <h3 className="font-medium text-primary-accent mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-white border border-primary-accent text-primary-accent rounded py-2 text-sm hover:bg-primary-accent/5">
                      Take Attendance Now
                    </button>
                    <button className="w-full bg-white border border-border-color text-foreground rounded py-2 text-sm hover:bg-gray-50">
                      Generate Attendance Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs would be implemented here */}
          {activeTab !== 'overview' && (
            <div className="bg-white border border-border-color rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium text-gray-500">
                {activeTab === 'sessions' && 'Sessions management view'}
                {activeTab === 'students' && 'Students enrollment view'}
                {activeTab === 'settings' && 'Course settings view'}
              </h3>
              <p className="mt-2 text-gray-400">This tab is not part of the current preview</p>
            </div>
          )}
        </div>
      </div> 
  );
};

export default CourseManagementPage;