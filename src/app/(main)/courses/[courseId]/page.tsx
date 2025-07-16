'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UsersIcon, ChevronRightIcon, ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import OverviewTab from './tabs/OverviewTab';
import AttendanceRecordsTab from './tabs/AttendanceRecordsTab';
import StudentsTab from './tabs/StudentsTab';

interface CourseOverview {
  courseId: number;
  courseName: string;
  courseCode: string;
  courseDesc: string;
  courseUnit: number;
  title: string;
  semester: string;
  students: number;
  lastAttendance: string;
  nextSession: string;
  attendanceRate: string;
  recentSessions: { date: string; attendees: number; totalStudents: number; rate: string; }[];
}

const CourseManagementPage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState<CourseOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const renderTabContent = () => {
    if (!course) return null; // Should not happen if loading/error handled

    switch (activeTab) {
      case 'overview':
        return <OverviewTab course={course} />;
      case 'attendanceRecords':
        return <AttendanceRecordsTab course={course} />;
      case 'students':
        return <StudentsTab course={course} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-500">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-red-500">{error}</p>
        <Link href="/courses" className="mt-4 inline-flex items-center btn-secondary">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return null; // Should not happen if error is handled
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-foreground">Course Details</div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-background">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6">
          <Link href="/courses" className="text-foreground/70 hover:text-primary-accent">Courses</Link>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-foreground/60" />
          <span className="font-medium text-foreground">{course.courseCode}</span>
        </div>

        {/* Course header */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{course.courseName}</h1>
              <div className="text-sm text-foreground/70">{course.courseCode} • {course.semester}</div>

              <div className="mt-4 flex gap-6">
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 text-primary-accent mr-2" />
                  <span><strong className="text-foreground">{course.students}</strong> Students</span>
                </div>
                <div className="flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-secondary-accent mr-2" />
                  <span><strong className="text-foreground">{course.attendanceRate}</strong> Attendance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex space-x-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`p-2 px-4 rounded-t-md ${activeTab === 'overview' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-foreground/70 hover:text-foreground'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('attendanceRecords')}
              className={`p-2 px-4 rounded-t-md ${activeTab === 'attendanceRecords' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-foreground/70 hover:text-foreground'}`}
            >
              Attendance Records
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`p-2 px-4 rounded-t-md ${activeTab === 'students' ? 'border-b-2 border-primary-accent text-primary-accent font-medium' : 'text-foreground/70 hover:text-foreground'}`}
            >
              Students
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
