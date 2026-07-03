import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Student, User, users, Course, students, courses, lectureSessions, attendanceRecords, studentEnrollments, authorizedDevices } from '../schema';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';



const main = async () => {
    const client = new Pool({
        connectionString: ""
    });
    const db = drizzle(client);

    console.log('Seeding started... 🚀');
    
    const userList: User[] = [];
    const studentList: Student[] = [];
    const saltRounds = 10;

    for (let i = 0; i < 20; i++) {
        const hashedPassword = await bcrypt.hash('password123', saltRounds);
        const newUser = await db.insert(users).values({
            username: faker.internet.username(),
            password: hashedPassword,
            userType: 0,
        }).returning();
        userList.push(newUser[0]);

        const newStudent = await db.insert(students).values({
            userId: newUser[0].id,
            matricNo: `RUN/CMP/${Math.floor(Math.random() * 5) + 19}/${Math.floor(Math.random() * 200) + 10766}`,
        }).returning();
        studentList.push(newStudent[0]);
    }
    console.log('✔ Users, Lecturers, and Students created.');

    const courseList: Course[] = [];
    const courseData = [
        { name: 'Introduction to Computer Science', code: 'CSC101', unit: 3, semester: 1 },
        { name: 'Data Structures and Algorithms', code: 'CSC201', unit: 4, semester: 2 },
        { name: 'Database Management Systems', code: 'CSC305', unit: 3, semester: 1 },
        { name: 'Operating Systems', code: 'CSC302', unit: 3, semester: 2 },
        { name: 'Software Engineering', code: 'CSC401', unit: 4, semester: 1 },
    ];

    for (const course of courseData) {
        const newCourse = await db.insert(courses).values({
            courseName: course.name,
            courseCode: course.code,
            courseDesc: faker.lorem.sentence(),
            courseUnit: course.unit,
            semester: course.semester,
            status: 'Active',
        }).returning();
        courseList.push(newCourse[0]);
    }
    console.log('✔ Courses created.');
    console.log('✔ Lecturers assigned to courses.');

    for (const student of studentList) {
        const coursesToEnroll = faker.helpers.arrayElements(courseList, faker.number.int({ min: 2, max: 4 }));
        for (const course of coursesToEnroll) {
            await db.insert(studentEnrollments).values({
                studentId: student.id,
                courseId: course.id,
                enrollmentStatus: 'Ongoing',
            });
        }
    }
    console.log('✔ Students enrolled in courses.');

    for (const course of courseList) {
        for (let i = 0; i < 5; i++) {
            const newSession = await db.insert(lectureSessions).values({
                courseId: course.id,
                sessionDatetime: faker.date.recent({ days: 30 }),
                duration: faker.number.int({ min: 60, max: 120 }),
            }).returning();

            const enrolledStudents = await db.select()
                .from(studentEnrollments)
                .where(eq(studentEnrollments.courseId, course.id!))
                .innerJoin(students, eq(students.id, studentEnrollments.studentId));

            for (const enrollment of enrolledStudents) {
                await db.insert(attendanceRecords).values({
                    sessionId: newSession[0].id,
                    studentId: enrollment.students.id,
                    attendanceRecord: faker.helpers.arrayElement([0, 1]),
                });
            }
        }
    }
    console.log('✔ Lecture sessions and attendance records created.');

    for (const student of studentList) {
        await db.insert(authorizedDevices).values({
            userId: student.userId,
            deviceUUID: faker.string.uuid(),
            deviceType: faker.helpers.arrayElement(['Laptop', 'Phone']),
            status: 'Authorized',
        });
    }

    console.log('✔ Authorized devices for students and lecturers created.');
    console.log('Seeding finished successfully! 🌱');
    process.exit(0);
};

main().catch((err) => {
    console.error('Error during seeding:', err);
    process.exit(1);
});