"use client";
import React, { useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { CourseOverview } from '../types';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseOverview[];
  onSelectCourse: (courseId: string) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, courses, onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className="text-3xl font-bold">Select a Course</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default AddCourseModal;
