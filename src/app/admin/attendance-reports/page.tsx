import LecturerReportContainer from "@/components/admin/reports/lecturer/LecturerReportContainer";

export default async function LecturerReportsPage({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">
              My Class Attendance Reports
            </h1>
            <p className="text-muted-foreground mt-2">View, filter, and export attendance data for your classes. Use the filters and tabs below to explore detailed reports, visualizations, and student insights.</p>
          </div>
        </div>
        <LecturerReportContainer searchParam={await searchParams || {}} />
      </div>
    </div>
  );
}
