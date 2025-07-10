"use client";

import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={`
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 pt-6
          transition-transform duration-300 ease-in-out
          w-64 flex-shrink-0
          z-40 
          h-full
          overflow-y-auto
          ${isOpen ? "block fixed translate-x-0" : "hidden fixed -translate-x-full"}
          md:block md:relative md:translate-x-0
        `}
      >
        {/* Sidebar content */}
        <div className="px-4 pb-6 md:px-4">
          <div className="mb-4 px-2 py-1 pt-8 md:pt-0">
            <Link
              href="/"
              className="group flex items-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              <HomeIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-300 transition-colors group-hover:text-primary-accent" />
              <span className="block text-sm font-medium">Home</span>
            </Link>

            <Link
              href="/courses"
              className="group flex items-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              <BookOpenIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-300 transition-colors group-hover:text-primary-accent" />
              <span className="block text-sm font-medium">Courses</span>
            </Link>

            <Link
              href="/attendance-reports"
              className="group flex items-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              <ChartBarIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-300 transition-colors group-hover:text-primary-accent" />
              <span className="block text-sm font-medium">Attendance</span>
            </Link>

            <Link
              href="/devices"
              className="group flex items-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              <DevicePhoneMobileIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-300 transition-colors group-hover:text-primary-accent" />
              <span className="block text-sm font-medium">Devices</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
