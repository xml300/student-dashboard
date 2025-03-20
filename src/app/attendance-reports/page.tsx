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
  PieChart,
  ListFilter
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

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
    {
      id: "room-utilization",
      name: "Room Utilization",
      description:
        "Analysis of room usage and attendance taking device efficiency",
      lastGenerated: "Mar 10, 2025",
      icon: <PieChart className="text-secondary-accent" size={20} />,
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

  // Sample room utilization data
  const roomUtilizationData = [
    {
      room: "Room 101",
      capacity: 50,
      utilizationRate: 75,
      deviceEfficiency: 98,
    },
    {
      room: "Room 102",
      capacity: 60,
      utilizationRate: 60,
      deviceEfficiency: 95,
    },
    {
      room: "Room 201",
      capacity: 40,
      utilizationRate: 85,
      deviceEfficiency: 99,
    },
    {
      room: "Room 202",
      capacity: 50,
      utilizationRate: 70,
      deviceEfficiency: 97,
    },
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
            <div className="p-4 border-b border-border-color bg-gray-50 flex justify-between items-center">
              <h2 className="font-medium">Attendance Summary Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <ListFilter size={16} className="mr-1" />
                  Filter
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Summary stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Average Attendance Rate
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">84.6%</div>
                  <div className="text-sm text-green-600 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    2.3% increase from last month
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Total Sessions</div>
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Across all courses
                  </div>
                </div>

                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Highest Attendance
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">ENG205</div>
                  <div className="text-sm text-gray-600 mt-1">
                    92% attendance rate
                  </div>
                </div>
              </div>

              {/* Course attendance table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Course
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Course Title
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Attendance Rate
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Students
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Trend
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">
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
                            <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
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
                            <span className="text-green-600">
                              <FontAwesomeIcon
                                icon={faArrowTrendUp}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {course.trend === "down" && (
                            <span className="text-red-600">
                              <FontAwesomeIcon
                                icon={faArrowTrendDown}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {course.trend === "stable" && (
                            <span className="text-gray-600">
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <a
                            href={`/reports/courses/${course.course}`}
                            className="text-primary-accent hover:underline text-sm"
                          >
                            View details
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case "course-comparison":
        return (
          <>
            <div className="p-4 border-b border-border-color bg-gray-50 flex justify-between items-center">
              <h2 className="font-medium">Course Comparison Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <Filter size={16} className="mr-1" />
                  Filter Courses
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Highest Attendance Course
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">ENG205</div>
                  <div className="text-sm text-green-600 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Up from last month
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Lowest Attendance Course
                  </div>
                  <div className="text-2xl font-bold">MATH401</div>
                  <div className="text-sm text-red-600 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Down from last month
                  </div>
                </div>

                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Average Change in Attendance
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">-0.3%</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Compared to last month
                  </div>
                </div>
              </div>

              {/* Course comparison table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Rank
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Course
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Course Title
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Attendance Rate
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
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
                                ? "text-green-600"
                                : course.change < 0
                                ? "text-red-600"
                                : "text-gray-600"
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
            <div className="p-4 border-b border-border-color bg-gray-50 flex justify-between items-center">
              <h2 className="font-medium">Student Insights Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <Filter size={16} className="mr-1" />
                  Filter Students
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Average Student Attendance
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">82%</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Across all students
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Students with &gt; 90% Attendance
                  </div>
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-sm text-green-600 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Increase from last month
                  </div>
                </div>

                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Students Needing Attention (&lt; 75%)
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">15</div>
                  <div className="text-sm text-red-600 mt-1 flex items-center">
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Student Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Student ID
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Course
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Attendance Rate
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Trend
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
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
                            <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
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
                            <span className="text-green-600">
                              <FontAwesomeIcon
                                icon={faArrowTrendUp}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {student.trend === "down" && (
                            <span className="text-red-600">
                              <FontAwesomeIcon
                                icon={faArrowTrendDown}
                                className="inline"
                                size="sm"
                              />
                            </span>
                          )}
                          {student.trend === "stable" && (
                            <span className="text-gray-600">
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

      case "room-utilization":
        return (
          <>
            <div className="p-4 border-b border-border-color bg-gray-50 flex justify-between items-center">
              <h2 className="font-medium">Room Utilization Report</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <Filter size={16} className="mr-1" />
                  Filter Rooms
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-primary-accent">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Highest Utilized Room
                  </div>
                  <div className="text-2xl font-bold text-secondary-accent">
                    Room 201
                  </div>
                  <div className="text-sm text-green-600 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Most in demand
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Lowest Utilized Room
                  </div>
                  <div className="text-2xl font-bold">Room 102</div>
                  <div className="text-sm text-red-600 mt-1 flex items-center">
                    <ArrowRight
                      className="mr-1 transform rotate-45"
                      size={14}
                    />
                    Underutilized
                  </div>
                </div>

                <div className="bg-primary-accent/10 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Average Room Utilization
                  </div>
                  <div className="text-2xl font-bold text-primary-accent">72.5%</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Across all rooms
                  </div>
                </div>
              </div>

              {/* Room utilization table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Room
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Capacity
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Utilization Rate
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Device Efficiency
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomUtilizationData.map((room) => (
                      <tr
                        key={room.room}
                        className="border-b border-border-color last:border-0"
                      >
                        <td className="py-3 px-4 font-medium">{room.room}</td>
                        <td className="py-3 px-4 text-center">
                          {room.capacity}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center">
                            <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  room.utilizationRate >= 80
                                    ? "bg-green-500"
                                    : room.utilizationRate >= 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${room.utilizationRate}%` }}
                              ></div>
                            </div>
                            <span>{room.utilizationRate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {room.deviceEfficiency}%
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
          </>
        );

      default:
        return <div>Select a report to view.</div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-border-color p-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Attendance Reports</div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-64"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Date range selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calendar className="mr-2 text-primary-accent" size={20} />
            <span className="font-medium mr-3">Date Range:</span>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none bg-white border border-border-color rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary-accent"
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronRight
                className="absolute right-3 top-2.5 text-gray-400 transform rotate-90"
                size={16}
              />
            </div>
          </div>

          <button className="flex items-center px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-primary-accent/90">
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
              className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${
                selectedReport === report.id
                  ? "border-primary-accent shadow-sm"
                  : "border-border-color hover:border-primary-accent"
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">{report.icon}</div>
                <div>
                  <h3 className="font-medium">{report.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {report.description}
                  </p>
                  <div className="text-xs text-gray-400 mt-2">
                    Last generated: {report.lastGenerated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report content */}
        <div className="bg-white rounded-lg border border-border-color overflow-hidden mb-6">
          {renderReportContent()}
        </div>

        {/* Recent reports - Keeping this for consistency */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Recently Generated Reports</h2>
            <a
              href="/reports/history"
              className="text-sm text-primary-accent hover:underline"
            >
              View all
            </a>
          </div>

          <div className="bg-white rounded-lg border border-border-color overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Report Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Date Generated
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Generated By
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-color">
                  <td className="py-3 px-4 font-medium">
                    Weekly Attendance Summary
                  </td>
                  <td className="py-3 px-4 text-gray-600">Mar 18, 2025</td>
                  <td className="py-3 px-4">Dr. Sarah Chen</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary-accent hover:underline text-sm mr-3">
                      View
                    </button>
                    <button className="text-gray-500 hover:underline text-sm">
                      Download
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="py-3 px-4 font-medium">
                    CSC301 Student Attendance
                  </td>
                  <td className="py-3 px-4 text-gray-600">Mar 15, 2025</td>
                  <td className="py-3 px-4">Dr. Sarah Chen</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary-accent hover:underline text-sm mr-3">
                      View
                    </button>
                    <button className="text-gray-500 hover:underline text-sm">
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">
                    Room Utilization Analysis
                  </td>
                  <td className="py-3 px-4 text-gray-600">Mar 12, 2025</td>
                  <td className="py-3 px-4">System (Automated)</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary-accent hover:underline text-sm mr-3">
                      View
                    </button>
                    <button className="text-gray-500 hover:underline text-sm">
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
