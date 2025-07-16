import React from 'react';
import { UserCircleIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

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

// Dummy student data (replace with actual data fetching in a real app)
const dummyStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', phone: '098-765-4321' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '555-123-4567' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', phone: '777-888-9999' },
  { id: 5, name: 'Eve Adams', email: 'eve.a@example.com', phone: '111-222-3333' },
];

interface StudentsTabProps {
  course: CourseOverview;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ course }) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Enrolled Students ({course.students})</h3>
        <ul className="divide-y divide-border">
          {dummyStudents.map((student) => (
            <li key={student.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCircleIcon className="h-8 w-8 text-foreground/70" />
                <div>
                  <p className="text-lg font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-foreground/70">{student.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${student.email}`} className="p-2 rounded-full bg-background text-foreground/90 hover:bg-border transition-colors border border-border">
                  <EnvelopeIcon className="h-5 w-5" />
                </a>
                <a href={`tel:${student.phone}`} className="p-2 rounded-full bg-background text-foreground/90 hover:bg-border transition-colors border border-border">
                  <PhoneIcon className="h-5 w-5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsTab;
