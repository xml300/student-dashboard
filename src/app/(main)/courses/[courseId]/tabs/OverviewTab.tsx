import React from 'react';
import { CalendarDaysIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';

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

interface OverviewTabProps {
  course: CourseOverview;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ course }) => {
  return (
    <div className="space-y-6">
      {/* Course Description */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Course Description</h3>
        <p className="text-foreground/70 leading-relaxed">
          {course.courseDesc}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
          <div className="p-3 bg-background rounded-full">
            <CalendarDaysIcon className="h-6 w-6 text-foreground/70" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Next Session</p>
            <p className="text-lg font-semibold text-foreground">{course.nextSession}</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
          <div className="p-3 bg-background rounded-full">
            <ChartBarIcon className="h-6 w-6 text-foreground/70" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Attendance Rate</p>
            <p className="text-lg font-semibold text-foreground">{course.attendanceRate}</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
          <div className="p-3 bg-background rounded-full">
            <UsersIcon className="h-6 w-6 text-foreground/70" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Total Students</p>
            <p className="text-lg font-semibold text-foreground">{course.students}</p>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Recent Sessions</h3>
        <ul className="divide-y divide-border">
          {course.recentSessions.map((session, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="text-foreground font-medium">{session.date}</p>
                <p className="text-sm text-foreground/70">{session.attendees} / {session.totalStudents} students attended</p>
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

export default OverviewTab;
