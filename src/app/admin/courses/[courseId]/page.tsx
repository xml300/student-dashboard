"use client";
import React, { useState, useEffect } from 'react';
import { UsersIcon, ChevronRightIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import OverviewTab from './tabs/OverviewTab';
import SessionsTab from './tabs/SessionsTab';
import StudentsTab from './tabs/StudentsTab';
import SettingsTab from './tabs/SettingsTab';
import { CourseDisplay } from '@/types/data';


const CourseManagementPage = ({ params }: { params: Promise<{ courseId: string }> }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState<CourseDisplay | null>(null);


  useEffect(() => {
    params.then(p => p.courseId)
      .then(courseId => {
        if (courseId) {
          fetch(`/api/courses/${courseId}`)
            .then(res => res.json())
            .then(data => setCourse(data));
        }
      })
  }, [params]);

  if (!course) {
    return <div>Loading...</div>;
  }

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
      
      <header className="bg-card-background border-b border-border-color p-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Course Management</div>

        </div>
      </header>

      
      <div className="flex-1 overflow-auto p-6 bg-background">
        
        <div className="flex items-center text-sm mb-6">
          <Link href="/admin/courses" className="text-foreground/80 hover:text-primary-accent">Courses</Link>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-foreground/60" />
          <span className="font-medium">{course.id}</span>
        </div>

        
        <div className="bg-card-background rounded-lg border border-border-color p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{course.courseName}</h1>
              <div className="text-sm text-foreground/80">{course.courseCode} • {course.semester}{course.semester == 1 ? 'st': 'nd'} Semester</div>

              <div className="mt-4 flex gap-6">
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 text-primary-accent mr-2" />
                  <span><strong>{course.students.length}</strong> Students</span>
                </div>
                <div className="flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-secondary-accent mr-2" />
                  <span><strong>{(course.attendanceRate * 100).toFixed(2)}%</strong> Attendance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
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

        
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CourseManagementPage;
