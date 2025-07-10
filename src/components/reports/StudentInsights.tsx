"use client";
import Table from "../Table";
import { exportToCsv, exportToPdf } from "@/lib/utils/export";

import { StudentInsightItem } from "@/data/types/types";

type StudentInsightsProps = {
  data: StudentInsightItem[];
};

export default function StudentInsights({ data }: StudentInsightsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Student Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          No student insights data available for the selected filters.
        </p>
      </div>
    );
  }

  const studentName = data[0]?.studentName || "N/A";
  const matricNo = data[0]?.matricNo || "N/A";

  const headers = [
    "Course Code",
    "Attendance Rate (%)",
    "Total Sessions",
    "Sessions Attended",
    "Sessions Missed",
  ];
  const rows = data.map((item: StudentInsightItem) => ({
    courseCode: item.courseCode,
    attendanceRate: item.attendanceRate,
    totalSessions: item.totalSessions,
    totalSessionsAttended: item.totalSessionsAttended,
    sessionsMissed: item.totalSessions - item.totalSessionsAttended,
  }));

  const handleExportCsv = () => {
    exportToCsv("student_insights.csv", data);
  };

  const handleExportPdf = () => {
    const pdfHeaders = [
      "Course Code",
      "Attendance Rate (%)",
      "Total Sessions",
      "Sessions Attended",
      "Sessions Missed",
    ];
    const pdfData = data.map((item: StudentInsightItem) => [
      item.courseCode,
      item.attendanceRate.toString(), // Convert number to string for PDF export
      item.totalSessions,
      item.totalSessionsAttended,
      item.totalSessions - item.totalSessionsAttended,
    ]);
    exportToPdf(
      "student_insights.pdf",
      `Student Insights for ${studentName} (${matricNo})`,
      pdfHeaders,
      pdfData
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Student Insights for {studentName} ({matricNo})
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
        emptyMessage="No student insights data available for the selected filters."
      />
    </div>
  );
}
