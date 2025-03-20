"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const LecturerProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample lecturer data
  const lecturer = {
    id: 'L1029',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    email: 's.johnson@university.edu',
    phone: '(555) 123-4567',
    joinDate: 'August 15, 2022',
    profileImage: '/api/placeholder/150/150',
    courses: [
      { id: 'CS101', name: 'Introduction to Programming', students: 120, sessions: 24, attendanceRate: 87 },
      { id: 'CS302', name: 'Database Systems', students: 75, sessions: 18, attendanceRate: 92 },
      { id: 'CS450', name: 'Machine Learning', students: 45, sessions: 16, attendanceRate: 95 }
    ],
    devices: [
      { id: 'D2045', name: 'Samsung Galaxy Tab S7', type: 'tablet', lastUsed: '2 hours ago', status: 'active', location: 'Science Building' },
      { id: 'D1078', name: 'iPad Pro 12.9"', type: 'tablet', lastUsed: 'Yesterday', status: 'active', location: 'Main Library' }
    ],
    rooms: [
      { id: 'R201', name: 'Science Building 201', capacity: 150, location: 'Science Building, Floor 2', lastUsed: 'Today' },
      { id: 'R102', name: 'Computer Lab A', capacity: 80, location: 'Technology Center, Floor 1', lastUsed: '2 days ago' },
      { id: 'R305', name: 'Lecture Hall 305', capacity: 200, location: 'Arts Building, Floor 3', lastUsed: 'Last week' }
    ],
    recentSessions: [
      { id: 'S5023', course: 'CS101', date: 'March 18, 2025', time: '10:00 AM - 11:30 AM', room: 'Science Building 201', attendance: '112/120', rate: 93 },
      { id: 'S5022', course: 'CS302', date: 'March 17, 2025', time: '2:00 PM - 3:30 PM', room: 'Computer Lab A', attendance: '72/75', rate: 96 },
      { id: 'S5019', course: 'CS450', date: 'March 15, 2025', time: '9:00 AM - 11:00 AM', room: 'Lecture Hall 305', attendance: '42/45', rate: 93 }
    ]
  };

  // Stats cards for overview tab
  const statsCards = [
    { label: 'Courses', value: lecturer.courses.length, icon: '📚', color: 'bg-blue-100 text-blue-800' },
    { label: 'Students', value: lecturer.courses.reduce((sum, course) => sum + course.students, 0), icon: '👥', color: 'bg-green-100 text-green-800' },
    { label: 'Sessions', value: lecturer.courses.reduce((sum, course) => sum + course.sessions, 0), icon: '🗓️', color: 'bg-purple-100 text-purple-800' },
    { label: 'Avg. Attendance', value: `${Math.round(lecturer.courses.reduce((sum, course) => sum + course.attendanceRate, 0) / lecturer.courses.length)}%`, icon: '📊', color: 'bg-yellow-100 text-yellow-800' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header section */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image className="h-16 w-16 rounded-full object-cover" src={lecturer.profileImage} width={40} height={40} alt={lecturer.name} />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{lecturer.name}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center mt-1">
                  <p className="text-sm text-gray-600">{lecturer.department}</p>
                  <span className="hidden sm:block sm:mx-2 text-gray-400">•</span>
                  <p className="text-sm text-gray-600">ID: {lecturer.id}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Edit Profile
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                Set Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'attendance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'devices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Devices & Rooms
            </button>
          </nav>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {statsCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-sm text-gray-900">{lecturer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="mt-1 text-sm text-gray-900">{lecturer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="mt-1 text-sm text-gray-900">{lecturer.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Joined</p>
                    <p className="mt-1 text-sm text-gray-900">{lecturer.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Recent Sessions</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-500">View All</button>
                </div>
                <div className="space-y-4">
                  {lecturer.recentSessions.map((session) => (
                    <div key={session.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{session.course}</h3>
                          <p className="text-xs text-gray-500 mt-1">{session.date} • {session.time}</p>
                          <p className="text-xs text-gray-500">{session.room}</p>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {session.rate}% Attendance
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{session.attendance} Students</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Your Courses</h2>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Add New Course
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <ul className="divide-y divide-gray-200">
                {lecturer.courses.map((course) => (
                  <li key={course.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>{course.id}</span>
                          <span className="mx-2">•</span>
                          <span>{course.students} Students</span>
                          <span className="mx-2">•</span>
                          <span>{course.sessions} Sessions</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 text-right">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {course.attendanceRate}% Attendance
                          </div>
                        </div>
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Manage
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2 md:mb-0">Attendance Management</h2>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Take Attendance
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                  Export Report
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Attendance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {lecturer.courses.map((course) => (
                    <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900">{course.name}</h4>
                      <div className="mt-2 relative pt-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Attendance Rate</span>
                          <span>{course.attendanceRate}%</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div 
                            style={{ width: `${course.attendanceRate}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between text-xs text-gray-500">
                        <span>{course.students} Students</span>
                        <span>{course.sessions} Sessions</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Attendance Records</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {lecturer.recentSessions.map((session) => (
                          <tr key={session.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.course}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.date}<br/>{session.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.room}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {session.rate}% ({session.attendance})
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                              <button className="text-gray-600 hover:text-gray-900">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Devices & Rooms Tab */}
        {activeTab === 'devices' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Devices Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Your Devices</h2>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Add Device
                </button>
              </div>
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {lecturer.devices.map((device) => (
                    <li key={device.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span>{device.id}</span>
                              <span className="mx-1">•</span>
                              <span>{device.type}</span>
                              <span className="mx-1">•</span>
                              <span>Last used: {device.lastUsed}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Location: {device.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${device.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {device.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                          <button className="ml-4 text-gray-400 hover:text-gray-500">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rooms Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Assigned Rooms</h2>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Request Room
                </button>
              </div>
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {lecturer.rooms.map((room) => (
                    <li key={room.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-yellow-100 rounded-full">
                            <svg className="h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">{room.name}</h3>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span>{room.id}</span>
                              <span className="mx-1">•</span>
                              <span>Capacity: {room.capacity}</span>
                              <span className="mx-1">•</span>
                              <span>Last used: {room.lastUsed}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{room.location}</p>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm text-blue-600 hover:text-blue-500">Schedule</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerProfilePage;