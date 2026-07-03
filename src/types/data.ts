// Dummy data for demonstration
export interface ScheduleEvent {
    id: number;
    title: string;
    courseCode: string;
    location: string;
    date: string;
    type: string;
    startTime: string;
    endTime: string;
}


export interface Course {
    id: string;
    title: string;
    name: string;
    description: string;
    credits: number;
    semester: number;
    status: string;
}

export type Coursex = Omit<Course, "recentSessions" | "students"| "attendanceRate"> & {
    students: number;
    attendanceRate: string | null;
}

export interface CourseSubmit extends CourseOverview {
    courseCode: string;
    courseName: string;
    courseDesc: string;
    courseUnit: number;
    semester: number;
    status: string;
}



export interface Device {
    id: number;
    name: string;
    location: string;
    type: string;
    lastSeen: Date;
    status: string;
    model: string;
    owner: string;
    lastUsed: string;
    lastSync: string;
    assignedCourses: string[];
    recentActivity: Activity[];
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
    id: number;
    date: string;
    attendees: number;
    totalStudents: number;
    rate: number;
    sessionDatetime: Date;
}

export interface CourseOverview extends Course {
    lastAttendance: string;
    nextSession: string;
    recentSessions: Session[];
    students: number;
    attendanceRate: string;
    semester: number; // Keeping semester for now as it's used in the UI
    title: string; // Keeping title for now as it's used in the UI
    activeSessionDatetime: Date;
    activeSessionId: number;
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

export interface Activity {
    id: number;
    category: string;
    action: string;
    affectedItem: string | null;
    details: string;
    timestamp: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface AttendanceRecord {
    id: number;
    date: string;
    courseId: string;
    records: Record[];
    session: number;
}

export interface Record {
    id: number;
    studentId: number;
    attendance: number;
    matricNo: string;
    attendanceRecord: number;
    time: string;
}

export interface CourseDisplay {
    id: number;
    courseName: string;
    courseCode: string;
    courseDesc: string;
    courseUnit: number;
    semester: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    students: Student[];
    attendanceRate: number;
    recentSessions: Session[];
    lastAttendance: string;
    nextSession: string;
}

export interface NSession {
    courseId: number;
    lecturerId: number;
    location: number;
    sessionDate: Date;
    sessionEndDate: Date;
    
}