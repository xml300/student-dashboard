import { drizzle } from "drizzle-orm/node-postgres";
import { courses } from "@/db/schema";

const db = drizzle(process.env.POSTGRES_URL || "");

// src/db/seed-data.ts

export const courseSeedData = [
  {
    courseName: "Introduction to Programming",
    courseCode: "CS101",
    courseDesc: "A foundational course covering the basics of programming using Python, including variables, control structures, and functions.",
    courseUnit: 3,
  },
  {
    courseName: "Data Structures and Algorithms",
    courseCode: "CS201",
    courseDesc: "An in-depth look at fundamental data structures like arrays, linked lists, stacks, queues, trees, and graphs, along with essential algorithms.",
    courseUnit: 3,
  },
  {
    courseName: "Web Development Fundamentals",
    courseCode: "WEB210",
    courseDesc: "Learn to build modern websites and web applications using HTML, CSS, and JavaScript. Covers front-end frameworks and server-side concepts.",
    courseUnit: 3,
  },
  {
    courseName: "Database Systems",
    courseCode: "CS341",
    courseDesc: "An introduction to the design, use, and implementation of database systems. Topics include the relational model, SQL, and database design.",
    courseUnit: 3,
  },
  {
    courseName: "Operating Systems",
    courseCode: "CS370",
    courseDesc: "Explore the core concepts of modern operating systems, including process management, memory management, file systems, and concurrency.",
    courseUnit: 4,
  },
  {
    courseName: "Discrete Mathematics for Computer Science",
    courseCode: "MATH250",
    courseDesc: "Covers essential mathematical concepts for computer science, including logic, set theory, combinatorics, and graph theory.",
    courseUnit: 3,
  },
];

async function main() {
    console.log('Seeding database...');

    // 1. Delete all existing data to start fresh
    await db.delete(courses);
    console.log('Cleared existing data.');

    const insertedCourses = await db
        .insert(courses)
        .values(courseSeedData)
        .returning(); // .returning() gives us the inserted data back, including the new IDs

    console.log('Inserted courses:', insertedCourses);
    console.log('Seeding complete!');
    process.exit(0); // Exit script successfully
}

main().catch((err) => {
    console.error('Error during seeding:', err);
    process.exit(1);
});