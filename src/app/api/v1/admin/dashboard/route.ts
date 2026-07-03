import { db } from "@/data/db";
import { attendanceRecords, authorizedDevices, lecturers, students, users, activities } from "@/data/db/schema";
import { avg, count, countDistinct, eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const dashboardData = (await db.select({ 
        numStudents: countDistinct(students.id),
        attendanceRate: avg(attendanceRecords.attendanceRecord),
     }).from(users)
     .innerJoin(students, eq(students.userId, users.id))
     .leftJoin(attendanceRecords, eq(attendanceRecords.studentId, students.id)))[0];

    const deviceData = (await db.select({
        numDevices: count(authorizedDevices.id)
    }).from(users)
    .innerJoin(lecturers, eq(lecturers.userId, users.id))
    .leftJoin(authorizedDevices, eq(authorizedDevices.userId, lecturers.userId))
    .where(eq(lecturers.id, 1)))[0];
    
  
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

