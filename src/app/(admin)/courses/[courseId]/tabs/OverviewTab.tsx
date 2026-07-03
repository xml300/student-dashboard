import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Session, CourseDisplay } from '@/data/types/types';

const OverviewTab = ({ course }: { course: CourseDisplay }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  
  const sessionsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const sessions = Array.isArray(course.recentSessions) ? course.recentSessions : [];
  const totalPages = Math.max(1, Math.ceil(sessions.length / sessionsPerPage));
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div className="lg:col-span-2">
        <h2 className="text-lg font-medium mb-4">Quick Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card-background p-4 rounded-lg border border-border-color">
            <div className="text-sm text-foreground/80 mb-1">Last Attendance</div>
            <div className="font-medium">{formatter.format(new Date(course.lastAttendance))}</div>
          </div>
          <div className="bg-card-background p-4 rounded-lg border border-border-color">
            <div className="text-sm text-foreground/80 mb-1">Next Session</div>
            <div className="font-medium">{formatter.format(new Date(course.nextSession))}</div>
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
              {currentSessions.map((session: Session, index: number) => (
                <tr key={index} className="border-b border-border-color last:border-0">
                  <td className="py-3 px-4">{formatter.format(new Date(session.sessionDatetime))}</td>
                  <td className="py-3 px-4 text-center">{session.attendees} / {session.totalStudents}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${session.rate >= 0.9 ? 'bg-green-500/10 text-green-500' : session.rate >= 0.7 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}> 
                      {(session.rate * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/courses/${course.courseCode}/sessions/${session.id}`} className="text-primary-accent hover:underline text-sm flex items-center">
                      View details <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2 p-4">
              <button
                className="px-3 py-1 rounded border border-border-color bg-background text-foreground/80 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2 text-sm">Page {currentPage} of {totalPages}</span>
              <button
                className="px-3 py-1 rounded border border-border-color bg-background text-foreground/80 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <div className="mt-6 bg-primary-accent/10 rounded-lg p-4">
          <h3 className="font-medium text-primary-accent mb-2">Quick Actions</h3>
          <div className="space-y-2 flex flex-col">
            <Link href={`/courses/${course.courseCode}/attendance`} className="text-center w-full bg-card-background border border-primary-accent text-primary-accent rounded py-2 text-sm hover:bg-primary-accent/5">
              Take Attendance Now
            </Link>
            <Link href={"/attendance-reports"} className="text-center w-full bg-card-background border border-border-color text-foreground rounded py-2 text-sm hover:bg-foreground/5">
              Generate Attendance Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
        
};

export default OverviewTab;
