import { NextResponse } from "next/server";
import { db } from "@/data/db";
import { users, students } from "@/data/db/schema";
import { eq } from "drizzle-orm";

async function getStudents() {
  const allStudents = await db
    .select({
      studentId: students.id,
      username: users.username,
      matricNo: students.matricNo,
    })
    .from(students)
    .leftJoin(users, eq(students.userId, users.id));
  return allStudents;
};


export async function GET(){
    const students = await getStudents();
    return NextResponse.json(students);
}
