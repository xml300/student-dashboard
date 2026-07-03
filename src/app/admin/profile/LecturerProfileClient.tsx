"use client";

import { Session, Course } from '@/types/data';
import React from 'react';

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
