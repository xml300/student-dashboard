import ReportContainer from "@/components/reports/ReportContainer";

interface PageProps {
  searchParams: Promise<{[key:string]: string}>;
}

export default async function AttendanceReportsPage({
  searchParams,
}: PageProps) {
  const searchParam = await searchParams;
  const selectedReport = searchParam.report || "attendance-summary";
  const startDate = searchParam.startDate;
  const endDate = searchParam.endDate;
  const courseId = searchParam.courseId
    ? parseInt(searchParam.courseId)
    : undefined;
  const studentId = searchParam.studentId
    ? parseInt(searchParam.studentId)
    : undefined;
  

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">
            Attendance Reports
          </h1>
        </div>
        <ReportContainer
          selectedReport={selectedReport}
          startDate={startDate}
          endDate={endDate}
          courseId={courseId}
          studentId={studentId}
        />
      </div>
    </div>
  );
}
