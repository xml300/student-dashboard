import { NextResponse } from "next/server";
import { db } from "@/db";
import { lecturerDevices, courseAssignments, courses, lectureSessions, activities } from "@/db/schema";
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
    
    const found = await db.select().from(lecturerDevices).where(eq(lecturerDevices.deviceId, Number(deviceId)));
    if (!found.length) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }
    const device = found[0];
    

    
    let assignedCourses: string[] = [];
    if (device.lecturerId) {
      
      const assignments = await db.select({ courseId: courseAssignments.courseId })
        .from(courseAssignments)
        .where(eq(courseAssignments.lecturerId, device.lecturerId));
      if (assignments.length) {
        const courseIds = assignments.map(a => a.courseId).filter((id): id is number => typeof id === 'number');
        
        const courseRows = courseIds.length > 0
          ? await db.select({ name: courses.courseName, code: courses.courseCode })
            .from(courses)
            .where(inArray(courses.courseId, courseIds))
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
    } else if (device.lecturerId) {
      
      const sessions = await db.select({
        event: lectureSessions.sessionDatetime,
        courseId: lectureSessions.courseId,
        sessionId: lectureSessions.sessionId
      })
        .from(lectureSessions)
        .where(eq(lectureSessions.courseId, device.lecturerId))
        .orderBy(desc(lectureSessions.sessionDatetime))
        .limit(5);
      recentActivity = sessions.map(s => ({
        event: `Session ${s.sessionId} for course ${s.courseId}`,
        timestamp: s.event,
        status: "success"
      }));
    }
    

    
    const response = {
      id: device.deviceId,
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
