"use client";

import { useState, useEffect } from "react";
import FilterPanel, { FilterType } from "./FilterPanel";
import ReportDisplay from "./ReportDisplay";
import DataVisualizations from "./DataVisualizations";
import StudentInsights from "./StudentInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/admin/ui/select";
import { Course } from "@/types/data";

interface LecturerReportContainerProps {
  searchParam: { [key: string]: string | string[] | undefined };
}

export interface AttendanceData{
  date: string;
  studentName: string;
  studentId: number;
  matricNo: string;
  status: string;
  scheduledTime: string;
  checkInTime: string;
  notes: string;
}

export interface Summary {
  id: number;
  totalStudents: number;
  totalSessions: number;
  avgAttendance: number;
  totalAbsences: number;
}


export default function LecturerReportContainer({
  searchParam,
}: LecturerReportContainerProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const [filters, setFilters] = useState<FilterType>({} as FilterType);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [summary, setSummary] = useState<Summary>({} as Summary);

  useEffect(() => {
    if (!selectedCourse) return;
    fetch(`/api/reports/${selectedCourse}`)
      .then(res => res.json())
      .then(data => {
        setAttendanceData(data.records || []);
        setSummary(data.summary || {});
      });
  }, [selectedCourse]);

  
  const filteredAttendance = attendanceData.filter((record: AttendanceData) => {
    
    let dateMatch = true;
    if (filters.dateRange && record.date) {
      const today = new Date();
      const recDate = new Date(record.date);
      switch (filters.dateRange) {
        case "today":
          dateMatch = recDate.toDateString() === today.toDateString();
          break;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          dateMatch = recDate.toDateString() === yesterday.toDateString();
          break;
        case "this-week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          dateMatch = recDate >= weekStart && recDate <= today;
          break;
        case "last-week":
          const lastWeekStart = new Date(today);
          lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
          const lastWeekEnd = new Date(lastWeekStart);
          lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
          dateMatch = recDate >= lastWeekStart && recDate <= lastWeekEnd;
          break;
        case "this-month":
          dateMatch = recDate.getMonth() === today.getMonth() && recDate.getFullYear() === today.getFullYear();
          break;
        case "last-month":
          const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
          const lastMonthYear = lastMonth === 11 ? today.getFullYear() - 1 : today.getFullYear();
          dateMatch = recDate.getMonth() === lastMonth && recDate.getFullYear() === lastMonthYear;
          break;
        
        default:
          dateMatch = true;
      }
    }
    
    let studentMatch = true;
    if (filters.student) {
      const search = filters.student.toLowerCase();
      studentMatch = (record.studentName?.toLowerCase().includes(search) || `${record.studentId}`.toLowerCase().includes(search));
    }
    
    let statusMatch = true;
    if (filters.statuses && filters.statuses.length > 0) {
      statusMatch = filters.statuses.includes(record.status);
    }
    return dateMatch && studentMatch && statusMatch;
  });

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        if (data.length > 0) {
          setSelectedCourse((searchParam?.courseId as string) || data[0]?.id);
        }
      });
  }, [searchParam?.courseId]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [selectedCourse, filters]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <FilterPanel onChange={handleFilterChange} filters={filters} />
      </div>
      <div className="lg:col-span-3">
        <div className="mb-4">
          <label
            htmlFor="course-select"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Select Course/Module:
          </label>
          <div className="w-full max-w-xs">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger id="course-select" className="w-full bg-background border border-border-color rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-accent focus:outline-none transition-all">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="bg-card-background border border-border-color rounded-md shadow-lg">
                {courses.length === 0 ? (
                  <SelectItem value="disabled" disabled>No courses available</SelectItem>
                ) : (
                  courses.map((course) => (
                    <SelectItem key={course.id} value={course.id} className="hover:bg-primary-accent/10 focus:bg-primary-accent/20">
                      {course.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <span className="text-gray-500">Loading report...</span>
          </div>
        ) : !selectedCourse ? (
          <div className="flex items-center justify-center h-40">
            <span className="text-gray-400">
              Please select a course to view reports.
            </span>
          </div>
        ) : (
          <Tabs defaultValue="report">
            <TabsList>
              <TabsTrigger value="report">Detailed Report</TabsTrigger>
              <TabsTrigger value="visualizations">
                Data Visualizations
              </TabsTrigger>
              <TabsTrigger value="insights">Student Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="report">
              <ReportDisplay
                courseId={selectedCourse}
                filters={filters}
                attendanceData={filteredAttendance}
                summary={summary}
              />
            </TabsContent>
            <TabsContent value="visualizations">
              <DataVisualizations 
              attendanceData={filteredAttendance} />
            </TabsContent>
            <TabsContent value="insights">
              <StudentInsights attendanceData={filteredAttendance} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
