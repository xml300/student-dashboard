export interface CourseOverview {
  attendanceId: number;
  id: string;
  name: string;
  description: string;
  credits: number;
  lastAttendance: string;
  nextSession: string;
  recentSessions: any[]; // Consider defining a more specific type for sessions if available
  students: number;
  attendanceRate: string;
  semester: number;
  lastSessionId: number;
  title: string;
}
