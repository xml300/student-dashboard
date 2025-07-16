import React from 'react';
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

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

interface AttendanceRecordsTabProps {
  course: CourseOverview;
}

const AttendanceRecordsTab: React.FC<AttendanceRecordsTabProps> = ({ course }) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Your Attendance Records</h3>
        <ul className="divide-y divide-border">
          {course.recentSessions.map((session, index) => (
            <li key={index} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-6 w-6 text-foreground/70" />
                <div>
                  <p className="text-lg font-medium text-foreground">{session.date}</p>
                  <p className="text-sm text-foreground/70">
                    You attended {session.attendees} out of {session.totalStudents} students
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-background text-foreground/90 text-xs font-medium rounded-full border border-border">
                {session.rate}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendanceRecordsTab;
