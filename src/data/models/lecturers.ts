import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { courseAssignments, courses, Lecturer, lecturers, users } from "../db/schema";

export const Lecturers = {
    get: async () => {
        const allLecturers = await db.select().from(lecturers).innerJoin(users, eq(lecturers.userId, users.id));
        return allLecturers;
    },
    getById: async (id: number) => {
        const [lecturer] = await db.select().from(lecturers).innerJoin(users, eq(lecturers.userId, users.id)).where(eq(lecturers.id, id)).limit(1);
        return lecturer;
    },
    getByUserId: async (userId: number) => {
        const [lecturer] = await db.select().from(lecturers).innerJoin(users, eq(lecturers.userId, users.id)).where(eq(lecturers.userId, userId)).limit(1);
        return lecturer;
    },
    getCourses: async (id: number) => {
        const lecturerCourses = await db.select().from(courses).innerJoin(courseAssignments, eq(courses.id, courseAssignments.courseId)).where(eq(courseAssignments.lecturerId, id));
        return lecturerCourses;
    },
    assignCourse: async (id: number, courseId: number) => {
        const [course] = await db.insert(courseAssignments).values({ lecturerId: id, courseId }).returning();
        return course;
    },
    unassignCourse: async (id: number, courseId: number) => {
        const [course] = await db.delete(courseAssignments).where(and(eq(courseAssignments.lecturerId, id), eq(courseAssignments.courseId, courseId))).returning();
        return course;
    },
    update: async (id: number, data: Partial<Lecturer>) => {
        const [updatedLecturer] = await db.update(lecturers).set(data).where(eq(lecturers.id, id)).returning();
        return updatedLecturer;
    },
    delete: async (id: number) => {
        const [deletedLecturer] = await db.delete(lecturers).where(eq(lecturers.id, id)).returning();
        return deletedLecturer;
    } 
}