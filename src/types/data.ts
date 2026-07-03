// Dummy data for demonstration
export interface Course {
    id: string;
    title: string;
    name: string;
    description: string;
    credits: number;
    semester: string;
}

export interface Device {
    id: string;
    name: string;
    location: string;
    type: string;
    lastSeen: Date;
    status: string;
}

export interface Room {
    id: string;
    name: string;
    capacity: number;
    availability: string;
    features: string[];
    building: string;
    type: string;
}

export interface Session {
    date: string;
    attendees: number;
    totalStudents: number;
    rate: string;
}

export interface CourseOverview extends Course {
    lastAttendance: string;
    nextSession: string;
    recentSessions: Session[];
    students: number;
    attendanceRate: string;
    semester: string; // Keeping semester for now as it's used in the UI
    title: string; // Keeping title for now as it's used in the UI
}

export interface AttendanceSummaryItem {
    courseCode: string;
    courseName: string;
    totalStudents: number;
    attendanceRate: number;
}

export interface CourseComparisonItem {
    courseCode: string;
    courseName: string;
    attendanceRate: number;
}

export interface StudentInsightItem {
    studentName: string;
    matricNo: string;
    courseCode: string;
    attendanceRate: number;
    lastSession: string;
    totalSessionsAttended: number;
    totalSessions: number;
}

export interface StudentInsightItem2 {
    studentName: string | null;
    matricNo: string;
    courseCode: string | null;
    attendanceRate: number;
    lastSession: string;
    totalSessionsAttended: number;
    totalSessions: number;
}

export interface Student {
    studentId: number;
    username: string;
    matricNo: string;
}
