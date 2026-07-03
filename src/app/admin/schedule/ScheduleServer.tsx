import React from "react";
import { db } from "@/data/db";
import { lectureSessions, courses } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import LecturerScheduleClient from "./LecturerScheduleClient";


const ScheduleServer = async () => {
  const schedule = await db
    .select({
      id: lectureSessions.id,
      title: courses.courseName,
      date: lectureSessions.sessionDatetime,
      startTime: lectureSessions.sessionDatetime,
      endTime: lectureSessions.sessionDatetime, 
      location: courses.courseName, 
      type: courses.courseCode,
      courseCode: courses.courseCode,
    })
    .from(lectureSessions)
    .leftJoin(courses, eq(lectureSessions.courseId, courses.id));

  const formatted = schedule.map((event) => ({
    ...event,
    id: event.id,
    title: event.title ?? '',
    date: event.date?.toISOString().split('T')[0] ?? '',
    startTime: event.startTime?.toISOString().split('T')[1]?.slice(0,5) ?? '',
    endTime: event.endTime?.toISOString().split('T')[1]?.slice(0,5) ?? '',
    location: event.location || '',
    type: event.type ?? '',
    courseCode: event.courseCode ?? '',
  }));

  return <LecturerScheduleClient initialEvents={formatted} />;
};

export default ScheduleServer;
