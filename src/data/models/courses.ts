import { eq } from "drizzle-orm";
import { db } from "../db";
import { Course, courseAssignments, courses } from "../db/schema";


export const Courses = {
    get: async () => {
        const allCourses = await db.select().from(courses);
        return allCourses;
    },
    getById: async (id: number) => {
        const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
        return course;
    },
    getByLecturerId: async (lecturerId: number) => {
        const lCourses = await db.select().from(courses).innerJoin(courseAssignments, eq(courseAssignments.courseId, courses.id)).where(eq(courseAssignments.lecturerId, lecturerId));
        return lCourses
    },
    getByCode: async (code: string) => {
        const [course] = await db.select().from(courses).where(eq(courses.courseCode, code)).limit(1);
        return course;
    },
    update: async (id: number, data: Partial<Course>) => {
        const [updatedCourse] = await db.update(courses).set(data).where(eq(courses.id, id)).returning();
        return updatedCourse;
    },
    delete: async (id: number) => {
        const [deletedCourse] = await db.delete(courses).where(eq(courses.id, id)).returning();
        return deletedCourse;
    }
}