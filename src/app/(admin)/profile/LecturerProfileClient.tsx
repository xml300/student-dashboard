"use client";

import { Session } from '@/data/types/types';
import React from 'react';

interface Course {
    id: string;
    name: string;
    students: number;
    semester: number;
    description: string;
    credits: number;
    devices: number;
    lastAttendance: string;
    nextSession: string
    recentSessions: Session[];
    status: string;
    attendanceRate: number;

}

interface Lecture {
    id: number;
    name: string;
    department: string;
    email: string;
    phone: string;
    joinDate: string;
    profileImage: string;
    courses: Course[];
    devices: number;
    recentSessions: Session[];
}

export default function LecturerProfileClient({ initialLecturer }: { initialLecturer: Lecture }) {
    return (
        <div>
            <h1>Lecturer Profile</h1>
            <pre>{JSON.stringify(initialLecturer, null, 2)}</pre>
        </div>
    );
}
