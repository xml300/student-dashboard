"use client";
import React, { useState } from "react";
import {
  Search,
  Users,
  ChevronRight,
  ArrowRight,
  BarChart,
  Filter,
  Download,
  Calendar,
  LineChart,
  ListFilter
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const AttendanceReportsPage = () => {
  const [dateRange, setDateRange] = useState("This Month");
  const [selectedReport, setSelectedReport] = useState("attendance-summary");

  // Sample reports data - Let's use Font Awesome icons here for demonstration
  const reports = [
    {
      id: "attendance-summary",
      name: "Attendance Summary",
      description: "Overview of attendance rates across all courses",
      lastGenerated: "Mar 18, 2025",
      icon: <BarChart className="text-primary-accent" size={20} />,
    },
    {
      id: "course-comparison",
      name: "Course Comparison",
      description: "Compare attendance rates between different courses",
      lastGenerated: "Mar 15, 2025",
      icon: <LineChart className="text-secondary-accent" size={20} />,
    },
    {
      id: "student-insights",
      name: "Student Insights",
      description:
        "Detailed analysis of individual student attendance patterns",
      lastGenerated: "Mar 12, 2025",
      icon: <Users className="text-primary-accent" size={20} />,
    },
  ];

  // Sample attendance data (reused for consistency, adapt for other reports as needed)
  const courseAttendanceData = [
    {
      course: "CSC301",
      title: "Introduction to Database Systems",
      attendance: 87,
      students: 142,
      trend: "up",
    },
    {
      course: "ENG205",
      title: "Technical Writing and Communication",
      attendance: 92,
      students: 98,
      trend: "stable",
    },
    {
      course: "MATH401",
      title: "Advanced Calculus",
      attendance: 79,
      students: 64,
      trend: "down",
    },
    {
      course: "PHY302",
      title: "Quantum Mechanics",
      attendance: 84,
      students: 53,
      trend: "up",
    },
    {
      course: "CHEM201",
      title: "Organic Chemistry",
      attendance: 81,
      students: 76,
      trend: "stable",
    },
  ];

  // Sample student insights data
  const studentInsightsData = [
    {
      student: "John Smith",
      studentId: "STU1001",
      course: "CSC301",
      attendanceRate: 95,
      trend: "up",
      lastSession: "Yesterday",
    },
    {
      student: "Alice Johnson",
      studentId: "STU1002",
      course: "ENG205",
      attendanceRate: 88,
      trend: "stable",
      lastSession: "Today",
    },
    {
      student: "Bob Williams",
      studentId: "STU1003",
      course: "MATH401",
      attendanceRate: 72,
      trend: "down",
      lastSession: "2 days ago",
    },
    {
      student: "Emily Brown",
      studentId: "STU1004",
      course: "PHY302",
      attendanceRate: 91,
      trend: "up",
      lastSession: "Yesterday",
    },
    {
      student: "David Lee",
      studentId: "STU1005",
      course: "CHEM201",
      attendanceRate: 85,
      trend: "stable",
      lastSession: "Today",
    },
  ];

  // Sample course comparison data
  const courseComparisonData = [
    { course: "CSC301", title: "", attendanceRate: 87, change: 2.5, rank: 2 },
    { course: "ENG205", title: "", attendanceRate: 92, change: -0.5, rank: 1 },
    { course: "MATH401", title: "", attendanceRate: 79, change: -1.8, rank: 4 },
    { course: "PHY302", title: "", attendanceRate: 84, change: 1.2, rank: 3 },
    { course: "CHEM201", title: "", attendanceRate: 81, change: -2.0, rank: 5 },
  ];


  // Sample date ranges
  const dateRanges = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

  const renderReportContent = () => {
    switch (selectedReport) {
      case "attendance-summary":
        return (
          <>
            <div className="p-4 border-b border-border-color bg-foreground/5 flex justify-between items-center">
              <h2 className="font-medium text-foreground">Attendance Summary Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <ListFilter size={16} className="mr-1" />
                  Filter
                </button>
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>

            <div className="p-6 bg-card-background">
              {/* Summary stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Average Attendance Rate
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">84.6%</div>
                  <div className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    2.3% increase from last month
                  </div>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">Total Sessions</div>
                  <div className="text-2xl font-bold text-foreground">47</div>
                  <div className="text-sm text-foreground/60 mt-1">
                    Across all courses
                  </div>
                </div>

                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Highest Attendance
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">ENG205</div>
                  <div className="text-sm text-foreground/80 mt-1">
                    92% attendance rate
                  </div>
                </div>
              </div>

              {/* Course attendance table - Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full bg-card-background">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Course
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Course Title
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Attendance Rate
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Students
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Trend
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-foreground/80">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseAttendanceData.map((course) => (
                      <tr
                        key={course.course}
                        className="border-b border-border-color last:border-0"
                      >
                        <td className="py-3 px-4 font-medium">
                          {course.course}
                        </td>
                        <td className="py-3 px-4">{course.title}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center">
                            <div className="w-12 bg-foreground/10 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  course.attendance >= 90
                                    ? "bg-green-500"
                                    : course.attendance >= 80
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${course.attendance}%` }}
                              ></div>
                            </div>
                            <span>{course.attendance}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {course.students}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {course.trend === "up" && (
                            <span className="text-green-500">
                              <FontAwesomeIcon
                                icon={faArrowTrendUp}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {course.trend === "down" && (
                            <span className="text-red-500">
                              <FontAwesomeIcon
                                icon={faArrowTrendDown}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {course.trend === "stable" && (
                            <span className="text-foreground/60">
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/reports/courses/${course.course}`}
                            className="text-primary-accent hover:underline text-sm"
                          >
                            View details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Course attendance cards - Mobile */}
              <div className="md:hidden space-y-4">
                {courseAttendanceData.map((course) => (
                  <div key={course.course} className="bg-foreground/5 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{course.course}</p>
                        <p className="text-sm text-foreground/80">{course.title}</p>
                      </div>
                      <Link
                        href={`/reports/courses/${course.course}`}
                        className="text-primary-accent hover:underline text-sm"
                      >
                        View
                      </Link>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-color">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/80">Attendance:</span>
                        <span>{course.attendance}%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/80">Students:</span>
                        <span>{course.students}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "course-comparison":
        return (
          <>
            <div className="p-4 border-b border-border-color bg-foreground/5 flex justify-between items-center">
              <h2 className="font-medium">Course Comparison Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <Filter size={16} className="mr-1" />
                  Filter Courses
                </button>
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Highest Attendance Course
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">ENG205</div>
                  <div className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Up from last month
                  </div>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Lowest Attendance Course
                  </div>
                  <div className="text-2xl font-bold">MATH401</div>
                  <div className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Down from last month
                  </div>
                </div>

                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Average Change in Attendance
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">-0.3%</div>
                  <div className="text-sm text-foreground/60 mt-1">
                    Compared to last month
                  </div>
                </div>
              </div>

              {/* Course comparison table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Rank
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Course
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Course Title
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Attendance Rate
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Change from Last Month
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseComparisonData.map((course, index) => (
                      <tr
                        key={course.course}
                        className="border-b border-border-color last:border-0"
                      >
                        <td className="py-3 px-4 text-center">{index + 1}</td>
                        <td className="py-3 px-4 font-medium">
                          {course.course}
                        </td>
                        <td className="py-3 px-4">
                          {course.title || "Course Title"}
                        </td>{" "}
                        {/* Fallback for title */}
                        <td className="py-3 px-4 text-center">
                          {course.attendanceRate}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={
                              course.change > 0
                                ? "text-green-500"
                                : course.change < 0
                                ? "text-red-500"
                                : "text-foreground/60"
                            }
                          >
                            {course.change > 0 && (
                              <FontAwesomeIcon
                                icon={faArrowTrendUp}
                                className="inline mr-1"
                                size="sm"
                              />
                            )}
                            {course.change < 0 && (
                              <FontAwesomeIcon
                                icon={faArrowTrendDown}
                                className="inline mr-1"
                                size="sm"
                              />
                            )}
                            {course.change === 0 && (
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                className="inline mr-1"
                                size="sm"
                              />
                            )}
                            {course.change}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case "student-insights":
        return (
          <>
            <div className="p-4 border-b border-border-color bg-foreground/5 flex justify-between items-center">
              <h2 className="font-medium">Student Insights Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <Filter size={16} className="mr-1" />
                  Filter Students
                </button>
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Average Student Attendance
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">82%</div>
                  <div className="text-sm text-foreground/60 mt-1">
                    Across all students
                  </div>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Students with &gt; 90% Attendance
                  </div>
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Increase from last month
                  </div>
                </div>

                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Students Needing Attention (&lt; 75%)
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">15</div>
                  <div className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Needs review
                  </div>
                </div>
              </div>

              {/* Student insights table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Student Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Student ID
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/80">
                        Course
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Attendance Rate
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Trend
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-foreground/80">
                        Last Session
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentInsightsData.map((student) => (
                      <tr
                        key={student.studentId}
                        className="border-b border-border-color last:border-0"
                      >
                        <td className="py-3 px-4 font-medium">
                          {student.student}
                        </td>
                        <td className="py-3 px-4">{student.studentId}</td>
                        <td className="py-3 px-4">{student.course}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center">
                            <div className="w-12 bg-foreground/10 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.attendanceRate >= 90
                                    ? "bg-green-500"
                                    : student.attendanceRate >= 80
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${student.attendanceRate}%` }}
                              ></div>
                            </div>
                            <span>{student.attendanceRate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {student.trend === "up" && (
                            <span className="text-green-500">
                              <FontAwesomeIcon
                                icon={faArrowTrendUp}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {student.trend === "down" && (
                            <span className="text-red-500">
                              <FontAwesomeIcon
                                icon={faArrowTrendDown}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {student.trend === "stable" && (
                            <span className="text-foreground/60">
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {student.lastSession}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );


      default:
        return <div>Select a report to view.</div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card-background border-b border-border-color p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="text-lg font-semibold mb-2 sm:mb-0">Attendance Reports</div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-full bg-background"
            />
            <Search
              className="absolute left-3 top-2.5 text-foreground/60"
              size={18}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {/* Date range selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center w-full sm:w-auto">
            <Calendar className="mr-2 text-primary-accent" size={20} />
            <span className="font-medium mr-3">Date:</span>
            <div className="relative w-full sm:w-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none w-full bg-background border border-border-color rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary-accent"
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronRight
                className="absolute right-3 top-2.5 text-foreground/60 transform rotate-90"
                size={16}
              />
            </div>
          </div>

          <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-primary-accent/90">
            <Download size={16} className="mr-2" />
            Export Reports
          </button>
        </div>

        {/* Report types */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`bg-card-background rounded-lg border p-4 cursor-pointer transition-all ${
                selectedReport === report.id
                  ? "border-primary-accent shadow-sm"
                  : "border-border-color hover:border-primary-accent"
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">{report.icon}</div>
                <div>
                  <h3 className="font-medium">{report.name}</h3>
                  <p className="text-sm text-foreground/80 mt-1">
                    {report.description}
                  </p>
                  <div className="text-xs text-foreground/60 mt-2">
                    Last generated: {report.lastGenerated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report content */}
        <div className="bg-card-background rounded-lg border border-border-color overflow-hidden mb-6">
          {renderReportContent()}
        </div>

        {/* Recent reports - Keeping this for consistency */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Recently Generated Reports</h2>
            <Link
              href="/reports/history"
              className="text-sm text-primary-accent hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="bg-card-background rounded-lg border border-border-color overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color bg-foreground/5">
                  <th className="text-left py-3 px-4 font-medium text-foreground/80">
                    Report Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground/80">
                    Date Generated
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground/80">
                    Generated By
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-foreground/80">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-color">
                  <td className="py-3 px-4 font-medium">
                    Weekly Attendance Summary
                  </td>
                  <td className="py-3 px-4 text-foreground/80">Mar 18, 2025</td>
                  <td className="py-3 px-4">Dr. Sarah Chen</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary-accent hover:underline text-sm mr-3">
                      View
                    </button>
                    <button className="text-foreground/60 hover:underline text-sm">
                      Download
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="py-3 px-4 font-medium">
                    CSC301 Student Attendance
                  </td>
                  <td className="py-3 px-4 text-foreground/80">Mar 15, 2025</td>
                  <td className="py-3 px-4">Dr. Sarah Chen</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary-accent hover:underline text-sm mr-3">
                      View
                    </button>
                    <button className="text-foreground/60 hover:underline text-sm">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReportsPage;
