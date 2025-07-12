"use client";
import Table from "../Table";
import { exportToCsv, exportToPdf } from "@/lib/utils/export";

import { AttendanceSummaryItem } from "@/data/types/types";

type AttendanceSummaryProps = {
  data: AttendanceSummaryItem[];
};

export default function AttendanceSummary({ data }: AttendanceSummaryProps) {
  const headers = ["Course Code", "Attendance Rate (%)", "Total Students"];
  const rows = data.map((item: AttendanceSummaryItem) => ({
    courseCode: item.courseCode,
    attendanceRate: item.attendanceRate,
    totalStudents: item.totalStudents,
  }));

  const handleExportCsv = () => {
    exportToCsv("attendance_summary.csv", data);
  };

  const handleExportPdf = () => {
    const pdfHeaders = ["Course Code", "Attendance Rate (%)", "Total Students"];
    const pdfData = data.map((item: AttendanceSummaryItem) => [
      item.courseCode,
      item.attendanceRate,
      item.totalStudents,
    ]);
    exportToPdf("attendance_summary.pdf", "Attendance Summary Report", pdfHeaders, pdfData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Attendance Summary
      </h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleExportCsv}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Export to CSV
        </button>
        <button
          onClick={handleExportPdf}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Export to PDF
        </button>
      </div>
      <Table
        headers={headers}
        rows={rows}
        emptyMessage="No attendance summary data available for the selected filters."
      />
    </div>
  );
}
