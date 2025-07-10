"use client";
import React, { useState } from 'react';
import { UsersIcon, ChevronRightIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import OverviewTab from './tabs/OverviewTab';
import SessionsTab from './tabs/SessionsTab';
import StudentsTab from './tabs/StudentsTab';
import SettingsTab from './tabs/SettingsTab';
import { CourseOverview } from '@/data/types/types';

const CourseManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample course data
  const course: CourseOverview = {
    id: 'CSC301',
    name: 'Introduction to Database Systems',
    description: 'A comprehensive course on database systems.',
    credits: 3,
    title: 'Introduction to Database Systems',
    semester: 'Spring 2025',
    students: 142,
    lastAttendance: 'Mar 17, 2025',
    nextSession: 'Mar 21, 2025 - 10:00 AM',
    attendanceRate: '87%',
    recentSessions: [
      { date: 'Mar 17, 2025', attendees: 124, totalStudents: 142, rate: '87%' },
      { date: 'Mar 14, 2025', attendees: 131, totalStudents: 142, rate: '92%' },
      { date: 'Mar 10, 2025', attendees: 118, totalStudents: 142, rate: '83%' },
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab course={course} />;
      case 'sessions':
        return <SessionsTab course={course} />;
      case 'students':
        return <StudentsTab course={course} />;
      case 'settings':
        return <SettingsTab course={course} />;
      default:
        return null;
    }
  };

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card-background border-b border-border-color p-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Course Management</div>
            
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-background">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <Link href="/courses" className="text-foreground/80 hover:text-primary-accent">Courses</Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-foreground/60" />
            <span className="font-medium">{course.id}</span>
          </div>
          
          {/* Course header */}
          <div className="bg-card-background rounded-lg border border-border-color p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <div className="text-sm text-foreground/80">{course.id} • {course.semester}</div>
                
                <div className="mt-4 flex gap-6">
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 text-primary-accent mr-2" />
                    <span><strong>{course.students}</strong> Students</span>
                  </div>
                  <div className="flex items-center">
                    <ChartBarIcon className="h-5 w-5 text-secondary-accent mr-2" />
                    <span><strong>{course.attendanceRate}</strong> Attendance</span>
                  </div>
                </div>
              </div>  
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-border-color mb-6">
            <div className="flex space-x-0">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`p-1 px-2 rounded-none rounded-t-md ${activeTab === 'overview' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-foreground/80'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('sessions')}
                className={`p-1 px-2 rounded-none rounded-t-md ${activeTab === 'sessions' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-foreground/80'}`}
              >
                Sessions
              </button>
              <button 
                onClick={() => setActiveTab('students')}
                className={`p-1 px-2 rounded-none rounded-t-md ${activeTab === 'students' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-foreground/80'}`}
              >
                Students
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`p-1 px-2 rounded-none rounded-t-md ${activeTab === 'settings' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-foreground/80'}`}
              >
                Settings
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      </div> 
  );
};

export default CourseManagementPage;
