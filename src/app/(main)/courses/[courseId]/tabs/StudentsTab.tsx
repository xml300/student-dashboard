import React from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { Course } from '@/data/types/types';

const StudentsTab = ({ course }: {course: Course}) => {
  // Sample student data
  console.log(course);
  const students = [
    { id: 'U2021/305001', name: 'John Doe', attendance: '95%' },
    { id: 'U2021/305002', name: 'Jane Smith', attendance: '88%' },
    { id: 'U2021/305003', name: 'Mike Johnson', attendance: '92%' },
    { id: 'U2021/305004', name: 'Emily Davis', attendance: '76%' },
    { id: 'U2021/305005', name: 'Chris Brown', attendance: '98%' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Enrolled Students ({students.length})</h2>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-64 bg-background"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-foreground/60" />
          </div>
          <button className="bg-primary-accent hover:bg-primary-accent/90 text-white px-4 py-2 rounded-md flex items-center text-sm">
            <PlusIcon className="h-5 w-5 mr-2" />
            Enroll New Student
          </button>
        </div>
      </div>

      <div className="bg-card-background rounded-lg border border-border-color overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color bg-foreground/5">
              <th className="text-left py-3 px-4 font-medium text-foreground/80">Student ID</th>
              <th className="text-left py-3 px-4 font-medium text-foreground/80">Name</th>
              <th className="text-center py-3 px-4 font-medium text-foreground/80">Attendance</th>
              <th className="text-right py-3 px-4 font-medium text-foreground/80"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b border-border-color last:border-0">
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${parseFloat(student.attendance) >= 90 ? 'bg-green-500/10 text-green-500' : parseFloat(student.attendance) >= 80 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                    {student.attendance}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary-accent hover:underline text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTab;
