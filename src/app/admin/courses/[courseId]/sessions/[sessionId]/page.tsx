import React from 'react';
import PageHeading from '@/components/PageHeading';
import { LectureSessions } from '@/data/models/lecture-sessions';


interface SessionStudent {
  studentId: number;
  username: string;
  matricNo: string;
  attended: boolean;
}

const SessionDetailsPage = async ({ params }: { params: Promise<{ courseId: string, sessionId: string }> }) => {
  const session = await LectureSessions.getById(Number((await params).sessionId));

  if (!session) {
    return <div>Session not found</div>;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return (
    <div>
      <PageHeading title={`Session Report - ${session.sessionDatetime ? formatter.format(new Date(session.sessionDatetime)) : 'N/A'}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card-background p-4 rounded-lg border border-border-color">
          <h3 className="text-lg font-medium mb-2">Session Details</h3>
          <p><strong>Date:</strong> {session.sessionDatetime ? formatter.format(new Date(session.sessionDatetime)) : 'N/A'}</p>
        </div>
        <div className="bg-card-background p-4 rounded-lg border border-border-color">
          <h3 className="text-lg font-medium mb-2">Attendance Summary</h3>
          <p><strong>Attendees:</strong> {session.attendees} / {session.totalStudents}</p>
          <p><strong>Attendance Rate:</strong> {session.rate ? (Number(session.rate) * 100).toFixed(2) : 0}%</p>
        </div>
      </div>
      <div className="bg-card-background rounded-lg border border-border-color overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color bg-foreground/5">
              <th className="text-left py-3 px-4 font-medium text-foreground/80">Matric No</th>
              <th className="text-center py-3 px-4 font-medium text-foreground/80">Status</th>
            </tr>
          </thead>
          <tbody>
            {session.students.map((student: SessionStudent) => (
              <tr key={student.studentId} className="border-b border-border-color last:border-0">
                <td className="py-3 px-4">{student.matricNo}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${student.attended ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {student.attended ? 'Present' : 'Absent'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionDetailsPage;
