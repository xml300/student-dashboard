"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBars,
  faHouse,
  faBook,
  faChartLine,
  faPhone,
  faGear
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <>
      {/* Separate toggle button that's always visible on mobile */}
      <button
        className={`
          fixed top-16 left-4 z-50 md:hidden
          cursor-pointer px-2 py-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none
        `}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        <FontAwesomeIcon
          className="w-5 h-5 text-gray-600"
          icon={isSidebarOpen ? faArrowLeft : faBars}
        />
      </button>
      
      <aside
        className={`
          bg-white border-r border-gray-200 pt-6
          transition-transform duration-300 ease-in-out
          w-64
          z-20 md:z-10
          fixed md:relative
          min-h-screen
          overflow-y-auto
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }
        `}
      >
        {/* Sidebar content */}
        <div className="px-4 pb-6 md:px-4">
          <div className="mb-4 px-2 py-1 pt-8 md:pt-0">
            <Link
              href="/"
              className="group flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faHouse}
                className="mr-2 h-5 w-5 text-gray-500 transition-colors group-hover:text-blue-600"
              />
              <span className="block text-sm font-medium">Home</span>
            </Link>
            
            <Link
              href="/courses"
              className="group flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faBook}
                className="mr-2 h-5 w-5 text-gray-500 transition-colors group-hover:text-blue-600"
              />
              <span className="block text-sm font-medium">Courses</span>
            </Link>
            
            <Link
              href="/attendance-reports"
              className="group flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faChartLine}
                className="mr-2 h-5 w-5 text-gray-500 transition-colors group-hover:text-blue-600"
              />
              <span className="block text-sm font-medium">Attendance</span>
            </Link>
            
            <Link
              href="/devices"
              className="group flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faPhone}
                className="mr-2 h-5 w-5 text-gray-500 transition-colors group-hover:text-blue-600"
              />
              <span className="block text-sm font-medium">Devices</span>
            </Link>
            
            <Link
              href="/settings"
              className="group flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faGear}
                className="mr-2 h-5 w-5 text-gray-500 transition-colors group-hover:text-blue-600"
              />
              <span className="block text-sm font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;