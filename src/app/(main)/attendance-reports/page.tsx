"use client";
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChartBarIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Card from "@/components/Card";

const AttendanceReportsPage = () => {
  const [dateRange, setDateRange] = useState("This Month");
  const [selectedReport, setSelectedReport] = useState("attendance-summary");

  const reports = [
    {
      id: "attendance-summary",
      name: "Attendance Summary",
      description: "Overview of attendance rates across all courses",
      lastGenerated: "Mar 18, 2025",
      icon: <ChartBarIcon className="text-primary-accent h-5 w-5" />,
    },
    {
      id: "course-comparison",
      name: "Course Comparison",
      description: "Compare attendance rates between different courses",
      lastGenerated: "Mar 15, 2025",
      icon: <ChartBarIcon className="text-secondary-accent h-5 w-5" />,
    },
    {
      id: "student-insights",
      name: "Student Insights",
      description:
        "Detailed analysis of individual student attendance patterns",
      lastGenerated: "Mar 12, 2025",
      icon: <UserGroupIcon className="text-primary-accent h-5 w-5" />,
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
            <div className="p-4 border-b border-border-color bg-background flex justify-between items-center">
              <h2 className="font-semibold text-lg text-foreground">Attendance Summary Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <FunnelIcon className="h-4 w-4 mr-1" />
                  Filter
                </button>
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Summary stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Students with &gt; 90% Attendance
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">84.6%</div>
                  <div className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowTrendingUpIcon
                      className="mr-1 h-4 w-4"
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
                    Students Needing Attention (&lt; 75%)
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">ENG205</div>
                  <div className="text-sm text-foreground/80 mt-1">
                    92% attendance rate
                  </div>
                </div>
              </div>

              {/* Course attendance table - Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-border-color">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Course Title
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Attendance Rate
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Trend
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card-background divide-y divide-border-color">
                    {courseAttendanceData.map((course) => (
                      <tr
                        key={course.course}
                        className="border-b border-border-color last:border-0"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {course.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {course.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
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
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          {course.students}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          {course.trend === "up" && (
                            <span className="text-green-500">
                              <ArrowTrendingUpIcon className="inline h-4 w-4" />
                            </span>
                          )}
                          {course.trend === "down" && (
                            <span className="text-red-500">
                              <ArrowTrendingDownIcon className="inline h-4 w-4" />
                            </span>
                          )}
                          {course.trend === "stable" && (
                            <span className="text-foreground/60">
                              <MinusIcon className="inline h-4 w-4" />
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/reports/courses/${course.course}`}
                            className="text-primary-accent hover:underline"
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
                  <Card key={course.course} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-foreground">{course.course}</p>
                        <p className="text-sm text-foreground/80">{course.title}</p>
                      </div>
                      <Link
                        href={`/reports/courses/${course.course}`}
                        className="text-primary-accent hover:underline text-sm font-medium"
                      >
                        View
                      </Link>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-color">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/80">Attendance:</span>
                        <span className="font-medium">{course.attendance}%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/80">Students:</span>
                        <span className="font-medium">{course.students}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        );

      case "course-comparison":
        return (
          <>
            <div className="p-4 border-b border-border-color bg-background flex justify-between items-center">
              <h2 className="font-semibold text-lg text-foreground">Course Comparison Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <FunnelIcon className="h-4 w-4 mr-1" />
                  Filter Courses
                </button>
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Highest Attendance Course
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">ENG205</div>
                  <div className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowTrendingUpIcon
                      className="mr-1 h-4 w-4"
                    />
                    Up from last month
                  </div>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4">
                  <div className="text-sm text-foreground/80">
                    Lowest Attendance Course
                  </div>
                  <div className="text-2xl font-bold text-foreground">MATH401</div>
                  <div className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowTrendingDownIcon
                      className="mr-1 h-4 w-4"
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
                <table className="min-w-full divide-y divide-border-color">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Course Title
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Attendance Rate
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Change from Last Month
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card-background divide-y divide-border-color">
                    {courseComparisonData.map((course, index) => (
                      <tr
                        key={course.course}
                        className="border-b border-border-color last:border-0"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {course.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {course.title || "Course Title"}
                        </td>{" "}
                        {/* Fallback for title */}
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          {course.attendanceRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
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
                              <ArrowTrendingUpIcon className="inline h-4 w-4 mr-1" />
                            )}
                            {course.change < 0 && (
                              <ArrowTrendingDownIcon className="inline h-4 w-4 mr-1" />
                            )}
                            {course.change === 0 && (
                              <MinusIcon className="inline h-4 w-4 mr-1" />
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
            <div className="p-4 border-b border-border-color bg-background flex justify-between items-center">
              <h2 className="font-semibold text-lg text-foreground">Student Insights Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <FunnelIcon className="h-4 w-4 mr-1" />
                  Filter Students
                </button>
                <button className="flex items-center text-sm text-foreground/60 hover:text-primary-accent">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
                  <div className="text-2xl font-bold text-foreground">28</div>
                  <div className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowTrendingUpIcon
                      className="mr-1 h-4 w-4"
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
                    <ArrowTrendingDownIcon
                      className="mr-1 h-4 w-4"
                    />
                    Needs review
                  </div>
                </div>
              </div>

              {/* Student insights table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border-color">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Student ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Attendance Rate
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Trend
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-foreground/80 uppercase tracking-wider">
                        Last Session
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card-background divide-y divide-border-color">
                    {studentInsightsData.map((student) => (
                      <tr
                        key={student.studentId}
                        className="border-b border-border-color last:border-0"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {student.student}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {student.studentId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {student.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
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
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          {student.trend === "up" && (
                            <span className="text-green-500">
                              <ArrowTrendingUpIcon className="inline h-4 w-4" />
                            </span>
                          )}
                          {student.trend === "down" && (
                            <span className="text-red-500">
                              <ArrowTrendingDownIcon className="inline h-4 w-4" />
                            </span>
                          )}
                          {student.trend === "stable" && (
                            <span className="text-foreground/60">
                              <MinusIcon className="inline h-4 w-4" />
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
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
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">Attendance Reports</h1>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent w-full bg-card-background text-foreground"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60 h-5 w-5" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center w-full sm:w-auto">
            <CalendarDaysIcon className="mr-2 text-primary-accent h-5 w-5" />
            <span className="font-medium mr-3 text-foreground">Date:</span>
            <div className="relative w-full sm:w-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none w-full bg-card-background border border-border-color rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-accent text-foreground"
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronRightIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 rotate-90 h-4 w-4"
              />
            </div>
          </div>

          <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 text-sm font-medium">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Reports
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {reports.map((report) => (
            <Card
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`cursor-pointer transition-all ${
                selectedReport === report.id
                  ? "border-2 border-primary-accent shadow-lg"
                  : "border border-border-color hover:border-primary-accent"
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">{report.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{report.name}</h3>
                  <p className="text-sm text-foreground/80 mt-1">
                    {report.description}
                  </p>
                  <div className="text-xs text-foreground/60 mt-2">
                    Last generated: {report.lastGenerated}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden mb-8">
          {renderReportContent()}
        </Card>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl text-foreground">Recently Generated Reports</h2>
            <Link
              href="/reports/history"
              className="text-sm text-primary-accent hover:underline font-medium"
            >
              View all
            </Link>
          </div>

          <Card className="overflow-hidden">
            <table className="min-w-full divide-y divide-border-color">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                    Date Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                    Generated By
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-foreground/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card-background divide-y divide-border-color">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    Weekly Attendance Summary
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">Mar 18, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">Dr. Sarah Chen</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-accent hover:underline mr-4">
                      View
                    </button>
                    <button className="text-foreground/60 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    CSC301 Student Attendance
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">Mar 15, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">Dr. Sarah Chen</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-accent hover:underline mr-4">
                      View
                    </button>
                    <button className="text-foreground/60 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReportsPage;
