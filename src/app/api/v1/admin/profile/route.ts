import { NextResponse } from 'next/server';
import { db } from '@/data/db';
import { lecturers, users, courses, courseAssignments, lectureSessions, authorizedDevices, studentEnrollments } from '@/data/db/schema';
import { eq, inArray, desc } from 'drizzle-orm'; 
import { getCurrentUser } from '@/lib/auth';
import { NSession } from '@/types/data';
import { Activities } from '@/data/models/activities';


export async function GET() {
  
  const userSession = await getCurrentUser();
  if(!userSession) return NextResponse.json({message: "Unauthorized"}, {status: 401});

  const lecturerId = userSession.lecturerId;
  const userId = userSession.id;

  if(!lecturerId){
    return NextResponse.json({message: "No Lecturer Assigned"}, {status: 404});
  }
  
  const lecturerRow = await db.select().from(lecturers).where(eq(lecturers.id, lecturerId)).limit(1);
  const lecturer = lecturerRow[0];
  let user = null;
  if (lecturer) {
    const userRow = await db.select().from(users).where(eq(users.id, lecturer.userId)).limit(1);
    user = userRow[0];
  }

  
  const courseRows = await db.select({
    course: courses,
    assignment: courseAssignments,
  })
    .from(courses)
    .innerJoin(courseAssignments, eq(courses.id, courseAssignments.courseId))
    .where(eq(courseAssignments.lecturerId, lecturerId));

  
  const coursesData = await Promise.all(courseRows.map(async ({ course }) => {
    
    const enrollments = await db.select().from(studentEnrollments).where(eq(studentEnrollments.courseId, course.id));
    const students = enrollments.length;
    
    const sessions = await db.select().from(lectureSessions).where(eq(lectureSessions.courseId, course.id));
    
    const attendanceRate = 0;
    return {
      id: course.id,
      name: course.courseName,
      students,
      sessions: sessions.length,
      attendanceRate,
    };
  }));

  
  const deviceRows = await db.select().from(authorizedDevices).where(eq(authorizedDevices.userId, userId));
  const devicesData = deviceRows.map(device => ({
    id: device.id,
    name: device.deviceUUID,
    type: device.deviceType,
    lastUsed: device.updatedAt,
    status: device.status,
    location: '', 
  }));

  
  const courseIds = courseRows.map(({ course }) => course.id);
  const recentSessionsRows = await db.select().from(lectureSessions)
    .where(inArray(lectureSessions.courseId, courseIds))
    .orderBy(desc(lectureSessions.sessionDatetime))
    .limit(5);
  const recentSessions = recentSessionsRows.map(session => ({
    id: session.id,
    course: session.courseId,
    date: session.sessionDatetime,
    time: session.sessionDatetime,
    attendance: 0, 
    rate: 0, 
  }));

  
  const response = {
    id: lecturer.id,
    name: user?.username ?? '',
    department: '', 
    email: '', 
    phone: '', 
    joinDate: lecturer.createdAt,
    profileImage: '/default-profile.png',
    courses: coursesData,
    devices: devicesData,
    recentSessions,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const userSession = await getCurrentUser();
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const lecturerId = userSession.lecturerId;
    const { name } = await request.json(); 

    if(!lecturerId){
      return NextResponse.json({error: 'No Lecturer Assigned'}, {status: 404});
    }

    const lecturerRow = await db.select().from(lecturers).where(eq(lecturers.id, lecturerId)).limit(1);
    const lecturer = lecturerRow[0];

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer not found' }, { status: 404 });
    }

    await db.update(users).set({
      username: name,
    }).where(eq(users.id, lecturer.userId));

    
    await Activities.create({
      category: "User Management",
      action: "Profile updated",
      affectedItem: lecturerId?.toString(),
      details: `Lecturer ${lecturerId} profile updated.`
    });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
