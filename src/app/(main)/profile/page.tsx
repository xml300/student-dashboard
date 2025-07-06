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
    recentSessions: [
      { id: 'S5023', course: 'CS101', date: 'March 18, 2025', time: '10:00 AM - 11:30 AM', attendance: '112/120', rate: 93 },
      { id: 'S5022', course: 'CS302', date: 'March 17, 2025', time: '2:00 PM - 3:30 PM', attendance: '72/75', rate: 96 },
      { id: 'S5019', course: 'CS450', date: 'March 15, 2025', time: '9:00 AM - 11:00 AM', attendance: '42/45', rate: 93 }
    ]
  };

  // Stats cards for overview tab
  const statsCards = [
    { label: 'Courses', value: lecturer.courses.length, icon: '📚', color: 'bg-primary-accent/10 text-primary-accent' },
    { label: 'Students', value: lecturer.courses.reduce((sum, course) => sum + course.students, 0), icon: '👥', color: 'bg-green-500/10 text-green-500' },
    { label: 'Sessions', value: lecturer.courses.reduce((sum, course) => sum + course.sessions, 0), icon: '🗓️', color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Avg. Attendance', value: `${Math.round(lecturer.courses.reduce((sum, course) => sum + course.attendanceRate, 0) / lecturer.courses.length)}%`, icon: '📊', color: 'bg-yellow-500/10 text-yellow-500' }
  ];

  return (
    <div className="bg-background min-h-screen pb-8">
      {/* Header section */}
      <div className="bg-card-background shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image className="h-16 w-16 rounded-full object-cover" src={lecturer.profileImage} width={64} height={64} alt={lecturer.name} />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-foreground">{lecturer.name}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center mt-1">
                  <p className="text-sm text-foreground/80">{lecturer.department}</p>
                  <span className="hidden sm:block sm:mx-2 text-foreground/60">•</span>
                  <p className="text-sm text-foreground/80">ID: {lecturer.id}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-accent hover:bg-primary-accent/90 w-full justify-center md:w-auto">
                Edit Profile
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-border-color text-sm font-medium rounded-md shadow-sm text-foreground bg-card-background hover:bg-foreground/5 w-full justify-center md:w-auto">
                Set Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-border-color">
          <nav className="-mb-px flex space-x-4 sm:space-x-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-primary-accent text-primary-accent'
                  : 'border-transparent text-foreground/80 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'courses'
                  ? 'border-primary-accent text-primary-accent'
                  : 'border-transparent text-foreground/80 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'attendance'
                  ? 'border-primary-accent text-primary-accent'
                  : 'border-transparent text-foreground/80 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'devices'
                  ? 'border-primary-accent text-primary-accent'
                  : 'border-transparent text-foreground/80 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              Devices
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
                <div key={index} className="bg-card-background rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-foreground/80">{stat.label}</p>
                      <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="bg-card-background rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-foreground mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground/80">Email</p>
                    <p className="mt-1 text-sm text-foreground">{lecturer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/80">Phone</p>
                    <p className="mt-1 text-sm text-foreground">{lecturer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/80">Department</p>
                    <p className="mt-1 text-sm text-foreground">{lecturer.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/80">Joined</p>
                    <p className="mt-1 text-sm text-foreground">{lecturer.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="bg-card-background rounded-lg shadow p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-foreground">Recent Sessions</h2>
                  <button className="text-sm text-primary-accent hover:text-primary-accent/80">View All</button>
                </div>
                <div className="space-y-4">
                  {lecturer.recentSessions.map((session) => (
                    <div key={session.id} className="bg-foreground/5 rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{session.course}</h3>
                          <p className="text-xs text-foreground/80 mt-1">{session.date} • {session.time}</p>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                            {session.rate}% Attendance
                          </div>
                          <p className="text-xs text-foreground/80 mt-1">{session.attendance} Students</p>
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
              <h2 className="text-lg font-medium text-foreground">Your Courses</h2>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-accent hover:bg-primary-accent/90">
                Add New Course
              </button>
            </div>
            <div className="bg-card-background shadow overflow-hidden rounded-lg">
              <ul className="divide-y divide-border-color">
                {lecturer.courses.map((course) => (
                  <li key={course.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-foreground">{course.name}</h3>
                        <div className="flex items-center text-sm text-foreground/80 mt-1">
                          <span>{course.id}</span>
                          <span className="mx-2">•</span>
                          <span>{course.students} Students</span>
                          <span className="mx-2">•</span>
                          <span>{course.sessions} Sessions</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 text-right">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                            {course.attendanceRate}% Attendance
                          </div>
                        </div>
                        <button className="inline-flex items-center px-3 py-1.5 border border-border-color text-sm font-medium rounded-md text-foreground bg-card-background hover:bg-foreground/5">
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
              <h2 className="text-lg font-medium text-foreground mb-2 md:mb-0">Attendance Management</h2>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-accent hover:bg-primary-accent/90">
                  Take Attendance
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-border-color text-sm font-medium rounded-md shadow-sm text-foreground bg-card-background hover:bg-foreground/5">
                  Export Report
                </button>
              </div>
            </div>
            
            <div className="bg-card-background rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-foreground mb-4">Attendance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {lecturer.courses.map((course) => (
                    <div key={course.id} className="bg-foreground/5 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground">{course.name}</h4>
                      <div className="mt-2 relative pt-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Attendance Rate</span>
                          <span>{course.attendanceRate}%</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-foreground/10">
                          <div 
                            style={{ width: `${course.attendanceRate}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-accent"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between text-xs text-foreground/80">
                        <span>{course.students} Students</span>
                        <span>{course.sessions} Sessions</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg leading-6 font-medium text-foreground mb-4">Recent Attendance Records</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border-color">
                      <thead className="bg-foreground/5">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Session</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Date & Time</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Attendance</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-card-background divide-y divide-border-color">
                        {lecturer.recentSessions.map((session) => (
                          <tr key={session.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{session.course}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">{session.date}<br/>{session.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                {session.rate}% ({session.attendance})
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                              <button className="text-primary-accent hover:text-primary-accent/80 mr-3">View</button>
                              <button className="text-foreground/80 hover:text-foreground">Edit</button>
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

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div>
            {/* Devices Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">Your Devices</h2>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-accent hover:bg-primary-accent/90">
                  Add Device
                </button>
              </div>
              <div className="bg-card-background shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-border-color">
                  {lecturer.devices.map((device) => (
                    <li key={device.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-primary-accent/10 rounded-full">
                            <svg className="h-5 w-5 text-primary-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-foreground">{device.name}</h3>
                            <div className="flex items-center text-xs text-foreground/80 mt-1">
                              <span>{device.id}</span>
                              <span className="mx-1">•</span>
                              <span>{device.type}</span>
                              <span className="mx-1">•</span>
                              <span>Last used: {device.lastUsed}</span>
                            </div>
                            <p className="text-xs text-foreground/80 mt-1">Location: {device.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${device.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {device.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                          <button className="ml-4 text-foreground/60 hover:text-foreground">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerProfilePage;
