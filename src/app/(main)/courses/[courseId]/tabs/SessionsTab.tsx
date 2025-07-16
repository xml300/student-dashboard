import React from 'react';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { Course } from '@/data/types/types';

const SessionsTab = ({ course }: {course: Course}) => {
  // Sample session data
  const sessions = [
    { date: 'Mar 17, 2025', attendees: 124, totalStudents: 142, rate: '87%' },
    { date: 'Mar 14, 2025', attendees: 131, totalStudents: 142, rate: '92%' },
    { date: 'Mar 10, 2025', attendees: 118, totalStudents: 142, rate: '83%' },
    { date: 'Mar 07, 2025', attendees: 135, totalStudents: 142, rate: '95%' },
    { date: 'Mar 03, 2025', attendees: 128, totalStudents: 142, rate: '90%' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Course Sessions</h2>
        <div className="flex gap-2">
          <button className="bg-primary-accent hover:bg-primary-accent/90 text-white px-4 py-2 rounded-md flex items-center text-sm">
            <PlusIcon className="h-5 w-5 mr-2" />
            Schedule New Session
          </button>
          <button className="bg-card-background border border-border-color text-foreground px-4 py-2 rounded-md flex items-center text-sm hover:bg-foreground/5">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-card-background rounded-lg border border-border-color overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color bg-foreground/5">
              <th className="text-left py-3 px-4 font-medium text-foreground/80">Date</th>
              <th className="text-center py-3 px-4 font-medium text-foreground/80">Attendees</th>
              <th className="text-center py-3 px-4 font-medium text-foreground/80">Attendance Rate</th>
              <th className="text-right py-3 px-4 font-medium text-foreground/80"></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={index} className="border-b border-border-color last:border-0">
                <td className="py-3 px-4">{session.date}</td>
                <td className="py-3 px-4 text-center">{session.attendees} / {session.totalStudents}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${parseFloat(session.rate) >= 90 ? 'bg-green-500/10 text-green-500' : parseFloat(session.rate) >= 80 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                    {session.rate}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link href={`/courses/${course.id}/sessions/${index}`} className="text-primary-accent hover:underline text-sm">
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionsTab;
