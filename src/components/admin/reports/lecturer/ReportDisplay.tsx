"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { FilterType } from "./FilterPanel";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import jsPDFAutoTable from "jspdf-autotable";
import { AttendanceData, Summary } from "./LecturerReportContainer";
import { api } from "@/lib/api";

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Present":
      return "success";
    case "Late":
      return "warning";
    case "Absent":
      return "destructive";
    case "Excused":
      return "secondary";
    default:
      return "default";
  }
};

interface ReportDisplayProps {
  courseId: string;
  filters: FilterType;
  attendanceData: AttendanceData[];
  summary: Summary;
}


export default function ReportDisplay({ courseId, filters, attendanceData, summary }: ReportDisplayProps) {
  
  const [sessionPage, setSessionPage] = useState<Record<string, number>>({});
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  

  
  const handleExport = (type: "csv" | "xlsx" | "pdf") => {
    
    const header = ["Student ID", ...sessionDates.map(el => new Date(el).toLocaleDateString('en-US', {year: "numeric", month: "long", day: "numeric"}))];
    const rows = studentIds.map(id => [
      studentNames[id],
      id,
      ...sessionDates.map(date => attendanceMatrix[id][date] || "N/A")
    ]);
    if (type === "csv") {
      const csv = [header, ...rows]
        .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "attendance_report.csv";
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === "xlsx") {
      const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance");
      XLSX.writeFile(wb, "attendance_report.xlsx");
    } else if (type === "pdf") {
      const doc = new jsPDF();
      doc.text("Attendance Report", 14, 16);
      
      
      jsPDFAutoTable(doc, { head: [header], body: rows });
      doc.save("attendance_report.pdf");
    }
  };

  
  const formatDateTime = (dateStr: string | Date | undefined) => {
    if (!dateStr) return "N/A";
    const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  
  useEffect(() => {
    setLoading(true);
    setError(null);
    async function fetchReport() {
      try {
        await api.get(`/admin/reports/${courseId}`);
       } catch (err) {
        if(err instanceof Error){
        setError(err.message || "Unknown error");
        }
      }
      setLoading(false);
    }
    if (courseId) fetchReport();
  }, [courseId, filters]);

  
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
      studentMatch = (record.studentName?.toLowerCase().includes(search) || (""+record.studentId).toLowerCase().includes(search));
    }
    
    let statusMatch = true;
    if (filters.statuses && filters.statuses.length > 0) {
      statusMatch = filters.statuses.includes(record.status);
    }
    return dateMatch && studentMatch && statusMatch;
  });

  
  const groupedBySession: Record<string, AttendanceData[]> = {};
  filteredAttendance.forEach((record: AttendanceData) => {
    if (!groupedBySession[record.date]) groupedBySession[record.date] = [];
    groupedBySession[record.date].push(record);
  });

  
  const sessionDates = Object.keys(groupedBySession).sort();
  const studentIds = Array.from(new Set(filteredAttendance.map((r: AttendanceData) => r.studentId)));
  const studentNames: Record<string, string> = {};
  filteredAttendance.forEach((r: AttendanceData) => { studentNames[r.studentId] = r.studentName; });
  const attendanceMatrix: Record<string, Record<string, string>> = {};
  studentIds.forEach(id => { attendanceMatrix[id] = {}; });
  filteredAttendance.forEach((r: AttendanceData) => { attendanceMatrix[r.studentId][r.date] = r.status; });

  

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              <CardTitle>Total Students</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalStudents ?? studentIds.length ?? "-"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-500" />
              <CardTitle>Total Sessions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalSessions ?? sessionDates.length ?? "-"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <CardTitle>Attendance Rate</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {typeof summary.avgAttendance === "number" && !isNaN(summary.avgAttendance)
                ? `${summary.avgAttendance}%`
                : "-"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              <CardTitle>Total Absences</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {typeof summary.totalAbsences === "number" && !isNaN(summary.totalAbsences)
                ? `${summary.totalAbsences}`
                : "-"}
            </div>
          </CardContent>
        </Card>
      </div>
      
      
      
      
      <section>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Session Attendance Details</CardTitle>
              <div className="flex gap-2">
                <button className="btn btn-outline btn-sm" onClick={() => handleExport("csv")}>Export CSV</button>
                <button className="btn btn-outline btn-sm" onClick={() => handleExport("xlsx")}>Export XLSX</button>
                <button className="btn btn-outline btn-sm" onClick={() => handleExport("pdf")}>Export PDF</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">{error}</div>
            ) : filteredAttendance.length === 0 ? (
              <div className="text-center py-8">No attendance data available.</div>
            ) : (
              Object.entries(groupedBySession).map(([sessionDate, records]) => {
                const currentPage = sessionPage[sessionDate] || 1;
                const totalPages = Math.ceil(records.length / pageSize);
                const paginatedRecords = records.slice((currentPage - 1) * pageSize, currentPage * pageSize);
                return (
                <div key={sessionDate} className="mb-8">
                  <div className="font-semibold text-lg mb-2">Session Date: {new Date(sessionDate).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Scheduled Time</TableHead>
                        <TableHead>Check-in Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedRecords.map((record, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{record.matricNo}</TableCell>
                          <TableCell>{formatDateTime(record.scheduledTime)}</TableCell>
                          <TableCell>{formatDateTime(record.checkInTime)}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(record.status)}>
                              {record.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.notes || "N/A"}</TableCell>
                          <TableCell>
                            <button className="btn btn-outline" style={{minWidth: 60}}>
                              Edit
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {totalPages > 1 && (
                    <div className="flex justify-end items-center gap-2 mt-2">
                      <button
                        className="btn btn-sm btn-outline"
                        disabled={currentPage === 1}
                        onClick={() => setSessionPage((prev) => ({ ...prev, [sessionDate]: currentPage - 1 }))}
                      >
                        Previous
                      </button>
                      <span className="px-2 text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="btn btn-sm btn-outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setSessionPage((prev) => ({ ...prev, [sessionDate]: currentPage + 1 }))}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
