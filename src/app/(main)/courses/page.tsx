"use client";
import React, { useState } from 'react';
import { MagnifyingGlassIcon, ChevronRightIcon, EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Card from '@/components/Card';
import AddCourseModal from '@/components/modals/AddCourseModal';
import { CourseOverview } from '@/data/types/types';

interface CourseDisplay extends CourseOverview {
  devices: number;
  status: 'active' | 'archived';
}

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample courses data
  const courses: CourseDisplay[] = [
    {
      id: 'CSC301',
      name: 'Introduction to Database Systems',
      description: 'A comprehensive course on database systems.',
      credits: 3,
      title: 'Introduction to Database Systems',
      semester: 'Spring 2025',
      students: 142,
      devices: 3,
      lastAttendance: 'Mar 17, 2025',
      nextSession: 'Mar 21, 2025 - 10:00 AM',
      attendanceRate: '87%',
      recentSessions: [], // Add empty array for recentSessions
      status: 'active'
    },
    {
      id: 'ENG205',
      name: 'Technical Writing and Communication',
      description: 'A course on technical writing.',
      credits: 3,
      title: 'Technical Writing and Communication',
      semester: 'Spring 2025',
      students: 98,
      devices: 2,
      lastAttendance: 'Mar 19, 2025',
      nextSession: 'Mar 20, 2025 - 2:00 PM',
      attendanceRate: '92%',
      recentSessions: [],
      status: 'active'
    },
    {
      id: 'MATH401',
      name: 'Advanced Calculus',
      description: 'An advanced course in calculus.',
      credits: 4,
      title: 'Advanced Calculus',
      semester: 'Spring 2025',
      students: 64,
      devices: 1,
      lastAttendance: 'Mar 18, 2025',
      nextSession: 'Mar 19, 2025 - 11:30 AM',
      attendanceRate: '79%',
      recentSessions: [],
      status: 'active'
    },
    {
      id: 'PHY302',
      name: 'Quantum Mechanics',
      description: 'An introduction to quantum mechanics.',
      credits: 3,
      title: 'Quantum Mechanics',
      semester: 'Spring 2025',
      students: 53,
      devices: 1,
      lastAttendance: 'Mar 22, 2025',
      nextSession: 'Mar 23, 2025 - 9:00 AM',
      attendanceRate: '84%',
      recentSessions: [],
      status: 'active'
    },
    {
      id: 'BIO101',
      name: 'Introduction to Biology',
      description: 'A foundational course in biology.',
      credits: 3,
      title: 'Introduction to Biology',
      semester: 'Fall 2024',
      students: 156,
      devices: 3,
      lastAttendance: 'N/A',
      nextSession: 'N/A',
      attendanceRate: '83%',
      recentSessions: [],
      status: 'archived'
    }
  ];

  const filteredCourses = courses
    .filter(course => activeTab === 'all' || course.status === activeTab)
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAddCourse = (newCourse: CourseOverview) => {
    console.log('New Course:', newCourse);
    // Here you would typically handle the API call to add the course
  };

  const handleSelectCourse = (courseId: string) => {
    console.log('Selected Course ID:', courseId);
    // Handle the selection logic, e.g., navigate to the course page
  };

  return ( 
      <div className="flex-1 flex flex-col overflow-hidden">
        <AddCourseModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddCourse={handleAddCourse}
          courses={courses}
          onSelectCourse={handleSelectCourse}
        />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">Courses</h1>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent w-full bg-card-background text-foreground"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60 h-5 w-5" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'active' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
                Active
              </button>
              <button 
                onClick={() => setActiveTab('archived')}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'archived' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
                Archived
              </button>
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'all' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
                All
              </button>
            </div>
            
            <div className="flex w-full sm:w-auto">
              <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Course
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <Card key={course.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="p-2">
                  <div className="flex justify-between items-start space-x-2 mb-4">
                    <div>
                      <h2 className="font-bold text-lg text-foreground mb-1">{course.title}</h2>
                      <div className="text-sm text-foreground/80">{course.id} • {course.semester}</div>
                    </div>
                    <button className="text-foreground/60 hover:text-foreground">
                      <EllipsisVerticalIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-foreground/80">Students</div>
                      <div className="font-semibold text-lg">{course.students}</div>
                    </div>
                    <div>
                      <div className="text-foreground/80">Devices</div>
                      <div className="font-semibold text-lg">{course.devices}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm mb-4">
                    <div className="text-foreground/80">Next Session</div>
                    <div className="font-medium">{course.nextSession}</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="font-medium mr-2">Attendance:</div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      parseFloat(course.attendanceRate) >= 90 ? 'bg-green-500/10 text-green-700' : 
                      parseFloat(course.attendanceRate) >= 80 ? 'bg-yellow-500/10 text-yellow-700' : 
                      'bg-red-500/10 text-red-700'
                    }`}>
                      {course.attendanceRate}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-border-color p-4 bg-background flex justify-between items-center">
                  <Link href={`/courses/${course.id}/attendance`} className="text-primary-accent hover:underline text-sm font-medium">
                    Take Attendance
                  </Link>
                  <Link href={`/courses/${course.id}`} className="flex items-center text-primary-accent hover:underline text-sm font-medium">
                    View Details
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
            
            <Card onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-border-color flex flex-col items-center justify-center p-10 text-foreground/60 hover:border-primary-accent hover:text-primary-accent cursor-pointer transition-colors">
              <PlusIcon className="h-8 w-8 mb-2" />
              <div className="font-medium">Add New Course</div>
            </Card>
          </div>
        </div>
      </div> 
  );
};

export default CoursesPage;
