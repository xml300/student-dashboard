"use client";
import React, { useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { CourseOverview } from '@/data/types/types';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: CourseOverview) => void;
  courses: CourseOverview[];
  onSelectCourse: (courseId: string) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAddCourse, courses, onSelectCourse }) => {
  const [mode, setMode] = useState('create'); // 'create' or 'select'
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseUnit, setCourseUnit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: CourseOverview = {
      id: courseCode,
      name: courseName,
      description: courseDesc,
      credits: parseInt(courseUnit, 10),
      lastAttendance: 'N/A', // Default value
      nextSession: 'N/A', // Default value
      recentSessions: [], // Default empty array
      students: 0, // Default value
      attendanceRate: '0%', // Default value
      semester: 'N/A', // Default value
      title: courseName, // Using courseName as title for now
    };
    onAddCourse(newCourse);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div 
        className={`relative bg-white/10 border border-white/20 rounded-2xl shadow-lg max-w-lg w-full m-4 p-8 text-white transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{mode === 'create' ? 'Create a New Course' : 'Select a Course'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex bg-white/10 rounded-lg p-1">
            <button 
              onClick={() => setMode('create')}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${mode === 'create' ? 'bg-primary-accent text-white' : 'text-white/60 hover:bg-white/10'}`}
            >
              Create New
            </button>
            <button 
              onClick={() => setMode('select')}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${mode === 'select' ? 'bg-primary-accent text-white' : 'text-white/60 hover:bg-white/10'}`}
            >
              Select Existing
            </button>
          </div>
        </div>

        {mode === 'create' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)}
                  className="peer w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary-accent placeholder-transparent"
                  placeholder="Course Name" required
                />
                <label htmlFor="courseName" className="absolute left-4 -top-3.5 text-sm text-white/80 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/80 bg-card-background px-1">Course Name</label>
              </div>
              <div className="relative">
                <input
                  type="text" id="courseCode" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
                  className="peer w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary-accent placeholder-transparent"
                  placeholder="Course Code" required
                />
                <label htmlFor="courseCode" className="absolute left-4 -top-3.5 text-sm text-white/80 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/80 bg-card-background px-1">Course Code</label>
              </div>
            </div>
            <div className="relative">
              <textarea
                id="courseDesc" value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)}
                className="peer w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary-accent placeholder-transparent"
                rows={4} placeholder="Course Description" required
              ></textarea>
              <label htmlFor="courseDesc" className="absolute left-4 -top-3.5 text-sm text-white/80 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/80 bg-card-background px-1">Course Description</label>
            </div>
            <div className="relative">
              <input
                type="number" id="courseUnit" value={courseUnit} onChange={(e) => setCourseUnit(e.target.value)}
                className="peer w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary-accent placeholder-transparent"
                placeholder="Course Unit" required
              />
              <label htmlFor="courseUnit" className="absolute left-4 -top-3.5 text-sm text-white/80 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/80 bg-card-background px-1">Course Unit</label>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-3 text-sm font-semibold bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-transform transform hover:scale-105 shadow-lg">
                Create Course
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary-accent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 h-5 w-5" />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredCourses.map(course => (
                <div 
                  key={course.id} 
                  onClick={() => { onSelectCourse(course.id); onClose(); }}
                  className="p-4 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"
                >
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-white/80">{course.id} • {course.semester}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourseModal;
