"use client";
import Table from "../Table";
import { exportToCsv, exportToPdf } from "@/lib/utils/export";

import { CourseComparisonItem } from "@/data/types/types";

type CourseComparisonProps = {
  data: CourseComparisonItem[];
};

export default function CourseComparison({ data }: CourseComparisonProps) {
  const headers = ["Course Code", "Attendance Rate (%)"];
  const rows = data.map((item: CourseComparisonItem) => ({
    courseCode: item.courseCode,
    attendanceRate: item.attendanceRate,
  }));

  const handleExportCsv = () => {
    exportToCsv("course_comparison.csv", data);
  };

  const handleExportPdf = () => {
    const pdfHeaders = ["Course Code", "Attendance Rate (%)"];
    const pdfData = data.map((item: CourseComparisonItem) => [
      item.courseCode,
      item.attendanceRate,
    ]);
    exportToPdf("course_comparison.pdf", "Course Comparison Report", pdfHeaders, pdfData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Course Comparison
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
        emptyMessage="No course comparison data available for the selected filters."
      />
    </div>
  );
}
