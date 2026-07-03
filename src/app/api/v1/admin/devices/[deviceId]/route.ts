import { NextResponse } from "next/server";
import { db } from "@/data/db";
import { authorizedDevices, courseAssignments, courses, lectureSessions, activities, lecturers } from "@/data/db/schema";
import { eq, inArray, desc } from "drizzle-orm";

interface NewActivity {
  event: string;
  timestamp: Date | null;
  status: string; 
}

export async function GET(req: Request, context: { params: Promise<{ deviceId: string }> }) {
  const { deviceId } = await context.params;
  if (!deviceId) {
    return NextResponse.json({ error: "Device ID required" }, { status: 400 });
  }
  try {
    
    const found = await db.select().from(authorizedDevices).where(eq(authorizedDevices.id, Number(deviceId)));
    if (!found.length) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }
    const device = found[0];
    

    
    let assignedCourses: string[] = [];
    if (device.userId) {
      
      const assignments = await db.select({ courseId: courseAssignments.courseId })
        .from(courseAssignments)
        .where(eq(courseAssignments.lecturerId, device.userId));
      if (assignments.length) {
        const courseIds = assignments.map(a => a.courseId).filter((id): id is number => typeof id === 'number');
        
        const courseRows = courseIds.length > 0
          ? await db.select({ name: courses.courseName, code: courses.courseCode })
            .from(courses)
            .where(inArray(courses.id, courseIds))
          : [];
        assignedCourses = courseRows.map(c => `${c.code} - ${c.name}`);
      }
    }
    

    
    let recentActivity: NewActivity[] = [];
    const deviceActivities = await db.select()
      .from(activities)
      .where(eq(activities.affectedItem, device.deviceUUID))
      .orderBy(desc(activities.timestamp))
      .limit(5);
    if (deviceActivities.length) {
      recentActivity = deviceActivities.map(a => ({
        event: a.action,
        timestamp: a.timestamp,
        status: "success",
        details: a.details,
        category: a.category
      }));
    } else if (device.userId) {
      
      const sessions = await db.select({
        event: lectureSessions.sessionDatetime,
        courseId: lectureSessions.courseId,
        sessionId: lectureSessions.id
      })
        .from(lectureSessions)
        .leftJoin(courseAssignments, eq(courseAssignments.courseId, lectureSessions.courseId))
        .leftJoin(lecturers, eq(lecturers.id, courseAssignments.lecturerId))
        .where(eq(lecturers.userId, device.userId))
        .orderBy(desc(lectureSessions.sessionDatetime))
        .limit(5);
      recentActivity = sessions.map(s => ({
        event: `Session ${s.sessionId} for course ${s.courseId}`,
        timestamp: s.event,
        status: "success"
      }));
    }
    

    
    const response = {
      id: device.id,
      name: device.deviceUUID,
      type: device.deviceType || "Tablet",
      model: device.deviceUUID,
      status: device.status || "active",
      lastSync: recentActivity.length ? recentActivity[0].timestamp : "",
      lastUsed: recentActivity.length ? recentActivity[0].timestamp : "",
      assignedCourses,
      recentActivity,
    };
    
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
