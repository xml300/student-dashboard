import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { CourseOverview, Session } from '@/data/types/types';

const OverviewTab = ({ course }: {course: CourseOverview}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick stats */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-medium mb-4">Quick Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card-background p-4 rounded-lg border border-border-color">
            <div className="text-sm text-foreground/80 mb-1">Last Attendance</div>
            <div className="font-medium">{course.lastAttendance}</div>
          </div>
          <div className="bg-card-background p-4 rounded-lg border border-border-color">
            <div className="text-sm text-foreground/80 mb-1">Next Session</div>
            <div className="font-medium">{course.nextSession}</div>
          </div>
        </div>
        
        <h2 className="text-lg font-medium mt-6 mb-4">Recent Sessions</h2>
        <div className="bg-card-background rounded-lg border border-border-color overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-color bg-foreground/5">
                <th className="text-left py-3 px-4 font-medium text-foreground/80">Date</th>
                <th className="text-center py-3 px-4 font-medium text-foreground/80">Attendees</th>
                <th className="text-center py-3 px-4 font-medium text-foreground/80">Rate</th>
                <th className="text-right py-3 px-4 font-medium text-foreground/80"></th>
              </tr>
            </thead>
            <tbody>
              {course.recentSessions.map((session: Session, index: number) => (
                <tr key={index} className="border-b border-border-color last:border-0">
                  <td className="py-3 px-4">{session.date}</td>
                  <td className="py-3 px-4 text-center">{session.attendees} / {session.totalStudents}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${parseFloat(session.rate) >= 90 ? 'bg-green-500/10 text-green-500' : parseFloat(session.rate) >= 80 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                      {session.rate}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/courses/${course.id}/sessions/${index}`} className="text-primary-accent hover:underline text-sm flex items-center">
                      View details <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <div className="mt-6 bg-primary-accent/10 rounded-lg p-4">
          <h3 className="font-medium text-primary-accent mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-card-background border border-primary-accent text-primary-accent rounded py-2 text-sm hover:bg-primary-accent/5">
              Take Attendance Now
            </button>
            <button className="w-full bg-card-background border border-border-color text-foreground rounded py-2 text-sm hover:bg-foreground/5">
              Generate Attendance Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
