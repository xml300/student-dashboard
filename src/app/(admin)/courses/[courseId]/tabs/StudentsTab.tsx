import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { CourseDisplay, Student } from '@/data/types/types';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

const StudentsTab = ({ course }: { course: CourseDisplay }) => {
  const allStudents = course.students || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const filteredStudents = allStudents.filter(student =>
    student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Enrolled Students ({allStudents.length})</h2>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-64 bg-background"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
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
             <th className="text-center py-3 px-4 font-medium text-foreground/80">Attendance</th>
              <th className="text-right py-3 px-4 font-medium text-foreground/80"></th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student: Student, index: number) => (
                <tr key={index} className="border-b border-border-color last:border-0">
                  <td className="py-3 px-4">{student.matricNo}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${student.attendanceRate >= 0.9 ? 'bg-green-500/10 text-green-500' : student.attendanceRate >= 0.7 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                      {(student.attendanceRate * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/courses/${course.courseCode}/students/${student.studentId}`} className="text-primary-accent hover:underline text-sm">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-foreground/60">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentsTab;
