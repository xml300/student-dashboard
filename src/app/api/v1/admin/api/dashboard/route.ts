import { db } from "@/db";
import { attendanceRecords, lecturerDevices, lecturers, students, users } from "@/db/schema";
import { avg, count, countDistinct, eq, desc } from "drizzle-orm";
import { activities } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    const dashboardData = (await db.select({ 
        numStudents: countDistinct(students.studentId),
        attendanceRate: avg(attendanceRecords.attendanceRecord),
     }).from(users)
     .innerJoin(students, eq(students.userId, users.id))
     .leftJoin(attendanceRecords, eq(attendanceRecords.studentId, students.studentId)))[0];

    const deviceData = (await db.select({
        numDevices: count(lecturerDevices.deviceId)
    }).from(users)
    .innerJoin(lecturers, eq(lecturers.userId, users.id))
    .leftJoin(lecturerDevices, eq(lecturerDevices.lecturerId, lecturers.lecturerId))
    .where(eq(lecturers.lecturerId, 1)))[0];
    
  
    const recentActivities = await db.select()
      .from(activities)
      .orderBy(desc(activities.createdAt))
      .limit(10);

    const result = {
      numStudents: dashboardData.numStudents,
      attendanceRecords: dashboardData.attendanceRate,
      numDevices: deviceData.numDevices,
      activities: recentActivities,
    };

    return NextResponse.json(result);
}

