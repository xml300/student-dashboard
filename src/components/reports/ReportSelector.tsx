"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ReportSelector({
  selectedReport,
}: {
  selectedReport: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | null>(
    searchParams.get("startDate")
      ? new Date(searchParams.get("startDate") as string)
      : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    searchParams.get("endDate")
      ? new Date(searchParams.get("endDate") as string)
      : null
  );
  const [selectedCourse, setSelectedCourse] = useState<string>(
    searchParams.get("courseId") || ""
  );
  const [selectedStudent, setSelectedStudent] = useState<string>(
    searchParams.get("studentId") || ""
  );

  const [courses, setCourses] = useState<
    { courseId: number; courseCode: string; courseName: string }[]
  >([]);
  const [students, setStudents] = useState<
    { studentId: number; username: string | null; matricNo: string }[]
  >([]);

  useEffect(() => {
    const fetchFiltersData = async () => {
      const fetchedCourses = await fetch("/api/courses").then((request) =>
        request.json()
      );
      const fetchedStudents = await fetch("/api/students").then((req) =>
        req.json()
      );
      console.log(fetchedCourses);
      setCourses(fetchedCourses);
      setStudents(fetchedStudents);
    };
    fetchFiltersData();
  }, []);

  const updateSearchParams = (
    newReport: string,
    newStartDate: Date | null,
    newEndDate: Date | null,
    newCourseId: string,
    newStudentId: string
  ) => {
    const params = new URLSearchParams();
    params.set("report", newReport);
    if (newStartDate) {
      params.set("startDate", newStartDate.toISOString().split("T")[0]);
    }
    if (newEndDate) {
      params.set("endDate", newEndDate.toISOString().split("T")[0]);
    }
    if (newCourseId) {
      params.set("courseId", newCourseId);
    }
    if (newStudentId) {
      params.set("studentId", newStudentId);
    }
    router.push(`?${params.toString()}`);
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newReport = e.target.value;
    updateSearchParams(
      newReport,
      startDate,
      endDate,
      selectedCourse,
      selectedStudent
    );
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    updateSearchParams(
      selectedReport,
      start,
      end,
      selectedCourse,
      selectedStudent
    );
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourseId = e.target.value;
    setSelectedCourse(newCourseId);
    updateSearchParams(
      selectedReport,
      startDate,
      endDate,
      newCourseId,
      selectedStudent
    );
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStudentId = e.target.value;
    setSelectedStudent(newStudentId);
    updateSearchParams(
      selectedReport,
      startDate,
      endDate,
      selectedCourse,
      newStudentId
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="space-y-2">
        <Label htmlFor="report-selector">Select Report</Label>
        <Select value={selectedReport} onValueChange={(value) => handleReportChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}>
          <SelectTrigger id="report-selector">
            <SelectValue placeholder="Select a report" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="attendance-summary">Attendance Summary</SelectItem>
            <SelectItem value="course-comparison">Course Comparison</SelectItem>
            <SelectItem value="student-insights">Student Insights</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date-range">Date Range</Label>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          isClearable
          customInput={<Input id="date-range" placeholder="Select date range" />}
          dateFormat="yyyy/MM/dd"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="course-selector">Select Course</Label>
        <Select value={selectedCourse} onValueChange={(value) => handleCourseChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}>
          <SelectTrigger id="course-selector">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p">All Courses</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course.courseId} value={String(course.courseId)}>
                {course.courseCode} - {course.courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedReport === "student-insights" && (
        <div className="space-y-2">
          <Label htmlFor="student-selector">Select Student</Label>
          <Select value={selectedStudent} onValueChange={(value) => handleStudentChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}>
            <SelectTrigger id="student-selector">
              <SelectValue placeholder="All Students" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="p">All Students</SelectItem>
              {students.map((student) => (
                <SelectItem key={student.studentId} value={String(student.studentId)}>
                  {student.username} ({student.matricNo})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
