"use client";
import React, { useState } from 'react';
import { Course } from '@/data/types/types';

const CourseList = ({ courses, className }: {courses: Course[], className?: string}) => {
  const [expandedCourse, setExpandedCourse] = useState<number|null>(null);
  
  const toggleExpand = (index: number) => {
    setExpandedCourse(expandedCourse === index ? null : index);
  };

  return (
    <div className={`${className} w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden`}>
      {courses.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {courses.map((course, index) => (
            <div 
              key={index}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              {/* Course header - always visible */}
              <div 
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{course.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{course.credits} Credits</p>
                  </div>
                </div>
                
                <svg 
                  className={`h-5 w-5 text-gray-400 transition-transform ${expandedCourse === index ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Expanded course description */}
              {expandedCourse === index && (
                <div className="px-4 pb-4 pt-1">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">Description</h4>
                    <p className="text-sm text-gray-700">{course.description || "No description available."}</p>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium rounded">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium rounded">
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No courses found matching your criteria. Click &lsquo;Add Course&rsquo; to create one.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;