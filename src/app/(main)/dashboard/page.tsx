"use client"
import {
  AcademicCapIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';


const userName = "RUN/CMP/21/10929";
const attendanceStats = [
  { label: "Total Classes", value: 42, icon: AcademicCapIcon },
  { label: "Attended", value: 39, icon: ClipboardDocumentCheckIcon },
  { label: "Missed", value: 3, icon: CalendarDaysIcon },
  { label: "Attendance Rate", value: "93%", icon: ClockIcon },
];
const attendanceNotifications = [
  { message: "You have an attendance session in 10 minutes (Web Development)", time: "Just now" },
  { message: "Attendance marked for Data Structures", time: "2 hours ago" },
];
const attendanceActivity = [
  { detail: "Marked present in Operating Systems", time: "Today, 9:00 AM" },
  { detail: "Missed class in Database Management", time: "Yesterday, 2:00 PM" },
  { detail: "Marked present in Web Development", time: "Yesterday, 10:00 AM" },
  { detail: "Marked present in Data Structures", time: "2 days ago, 1:00 PM" },
];

import React, { useState, useEffect } from 'react';

type DeviceInfo = {
  name: string;
  id: string;
  lastActive: string;
};

const DashboardPage = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  // Detect authorized device on mount
  useEffect(() => {
    const stored = localStorage.getItem('authorizedDevice');
    if (stored) {
      setDeviceInfo(JSON.parse(stored));
    }
  }, []);

  const handleRemoveDevice = () => {
    localStorage.removeItem('authorizedDevice');
    setDeviceInfo(null);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-card text-foreground p-8 rounded-2xl shadow-lg border border-border text-left">
        <h1 className="text-3xl font-bold mb-1">Attendance Dashboard</h1>
        <p className="text-base font-light mb-6 text-foreground/70">
          Track your attendance and stay up to date with your classes.
        </p>
        {/* Attendance Notifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">Attendance Alerts</h2>
          <ul className="space-y-2">
            {attendanceNotifications.map((n, i) => (
              <li key={i} className="flex justify-between items-center bg-background border border-border rounded-lg px-4 py-2 text-sm">
                <span className="text-foreground/90">{n.message}</span>
                <span className="text-xs text-foreground/60">{n.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Attendance Stats */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {attendanceStats.map((stat) => (
            <div key={stat.label} className="flex-1 bg-background border border-border rounded-xl p-4 flex items-center gap-3 shadow">
              <stat.icon className="h-8 w-8 text-foreground/70" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Registered Device Section */}
        <div className="bg-background border border-border rounded-xl p-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Registered Device</h2>
          {deviceInfo ? (
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-border rounded-full flex items-center justify-center">
                {/* Device Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="3" strokeWidth="1.5"/><rect x="9" y="17" width="6" height="1.5" rx="0.75" fill="currentColor"/></svg>
              </div>
              <div>
                <div className="text-base font-semibold text-foreground">{deviceInfo.name}</div>
                <div className="text-sm text-foreground/70">Last active: {deviceInfo.lastActive}</div>
                <div className="text-xs text-foreground/60 mt-1">Device ID: {deviceInfo.id}</div>
              </div>
              <Link href="/device" className="ml-auto px-3 py-1.5 rounded-md bg-border text-foreground/90 border border-border hover:bg-border/70 transition-colors text-xs font-medium">Manage</Link>
              <button
                onClick={handleRemoveDevice}
                className="ml-2 px-3 py-1.5 rounded-md bg-red-600 text-white border border-red-700 hover:bg-red-700 transition-colors text-xs font-medium"
              >Remove</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-border rounded-full flex items-center justify-center">
                {/* Device Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="3" strokeWidth="1.5"/><rect x="9" y="17" width="6" height="1.5" rx="0.75" fill="currentColor"/></svg>
              </div>
              <div>
                <div className="text-base font-semibold text-foreground/60">No device authorized</div>
                <div className="text-sm text-foreground/50">Authorize your device to mark attendance.</div>
              </div>
              <Link href="/device" className="ml-auto px-3 py-1.5 rounded-md bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 transition-colors text-xs font-medium">Authorize Device</Link>
            </div>
          )}
        </div>
        {/* Attendance Activity */}
        <div className="bg-background border border-border rounded-xl p-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Attendance History</h2>
          <ul className="space-y-3">
            {attendanceActivity.map((act, i) => (
              <li key={i} className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                <span className="font-medium text-foreground/90">{act.detail}</span>
                <span className="text-xs text-foreground/70">{act.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Attendance Shortcuts */}
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/(main)/courses" className="px-4 py-2 rounded-lg bg-border text-foreground border border-border hover:bg-border/70 transition-colors font-medium">View All Courses</Link>
          <Link href="/(main)/attendance" className="px-4 py-2 rounded-lg bg-border text-foreground border border-border hover:bg-border/70 transition-colors font-medium">Take Attendance</Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
