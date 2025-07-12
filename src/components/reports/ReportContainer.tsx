import {
  getAttendanceSummary,
  getCourseComparison,
  getStudentInsights,
} from "@/lib/data/reports"
import ReportSelector from "./ReportSelector";
import AttendanceSummary from "./AttendanceSummary";
import CourseComparison from "./CourseComparison";
import StudentInsights from "./StudentInsights";
import { AttendanceSummaryItem, CourseComparisonItem, StudentInsightItem2 } from "@/data/types/types";

export default async function ReportContainer({
  selectedReport,
  startDate,
  endDate,
  courseId,
  studentId,
}: {
  selectedReport: string;
  startDate?: string;
  endDate?: string;
  courseId?: number;
  studentId?: number;
}) {
  let reportData: AttendanceSummaryItem[] | CourseComparisonItem[] | StudentInsightItem2[] = []; // Initialize with an empty array and explicit type

  switch (selectedReport) {
    case "attendance-summary":
      reportData = await getAttendanceSummary(startDate, endDate, courseId);
      break;
    case "course-comparison":
      reportData = await getCourseComparison(startDate, endDate, courseId);
      break;
    case "student-insights":
      reportData = await getStudentInsights(
        studentId,
        startDate,
        endDate,
        courseId
      );
      break;
    default:
      reportData = [];
  }

  return (
    <div>
      <ReportSelector selectedReport={selectedReport} />
      <div className="mt-8">
        {selectedReport === "attendance-summary" && (
          <AttendanceSummary data={reportData} />
        )}
        {selectedReport === "course-comparison" && (
          <CourseComparison data={reportData} />
        )}
        {selectedReport === "student-insights" && (
          <StudentInsights data={reportData} />
        )}
      </div>
    </div>
  );
}
