import React from 'react';
import { getStudentAttendanceByCourse } from '@/lib/data/reports';
import PageHeading from '@/components/PageHeading';

const StudentDetailsPage = async ({ params }: { params: Promise<{ courseId: string, studentId: string }> }) => {
  const {studentId, courseId} = await params;
  const studentData = await getStudentAttendanceByCourse(studentId, courseId);

  if (!studentData) {
    return <div>Student not found</div>;
  }

  const { student, course, sessions } = studentData;

  return (
    <div>
      <PageHeading title={`${student.username} - ${course.courseName}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card-background p-4 rounded-lg border border-border-color">
          <h3 className="text-lg font-medium mb-2">Student Details</h3>
          <p><strong>Name:</strong> {student.username}</p>
          <p><strong>Matric No:</strong> {student.matricNo}</p>
        </div>
        <div className="bg-card-background p-4 rounded-lg border border-border-color">
          <h3 className="text-lg font-medium mb-2">Course Details</h3>
          <p><strong>Course:</strong> {course.courseName}</p>
          <p><strong>Code:</strong> {course.courseCode}</p>
        </div>
        <div className="bg-card-background p-4 rounded-lg border border-border-color">
          <h3 className="text-lg font-medium mb-2">Attendance Summary</h3>
          <p><strong>Attendance Rate:</strong> {student.attendanceRate ? (Number(student.attendanceRate) * 100).toFixed(2) : 0}%</p>
        </div>
      </div>
      <div className="bg-card-background rounded-lg border border-border-color overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color bg-foreground/5">
              <th className="text-left py-3 px-4 font-medium text-foreground/80">Session Date</th>
              <th className="text-center py-3 px-4 font-medium text-foreground/80">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session: {sessionId: number, sessionDatetime: Date | null, attended: boolean}) => (
              <tr key={session.sessionId} className="border-b border-border-color last:border-0">
                <td className="py-3 px-4">{new Date(session.sessionDatetime || "").toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${session.attended ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {session.attended ? 'Present' : 'Absent'}
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

export default StudentDetailsPage;
