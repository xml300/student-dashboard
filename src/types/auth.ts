export interface AuthUser {
    id: string;
    name: string;
    email: string;
    roleId: number;
    studentId?: number;
    matricNo?: string;
    lecturerId?: number;
}

export interface SessionUser {
    id: number;
    name: string;
    email: string;
    roleId: number;
    studentId?: number;
    matricNo?: string;
    lecturerId?: number;
}

export enum UserRole {
    STUDENT = 0,
    LECTURER = 1,
    ADMIN = 2
}