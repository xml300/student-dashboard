import React from 'react';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { getCourseById } from '@/lib/data/reports';
import PageHeading from '@/components/PageHeading';

const CourseSessionsPage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const course = await getCourseById((await params).courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return (
    <div>
      <PageHeading title={`${course.courseName} - Sessions`} />
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
            {course.recentSessions.map((session, index) => {
              const rate = session.rate ? Number(session.rate) : 0;
              return (
                <tr key={index} className="border-b border-border-color last:border-0">
                  <td className="py-3 px-4">{session.sessionDatetime ? formatter.format(new Date(session.sessionDatetime)) : 'N/A'}</td>
                  <td className="py-3 px-4 text-center">{session.attendees} / {session.totalStudents}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${rate >= 0.9 ? 'bg-green-500/10 text-green-500' : rate >= 0.7 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                      {(rate * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/courses/${course.courseCode}/sessions/${session.id}`} className="text-primary-accent hover:underline text-sm">
                      View Report
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseSessionsPage;
