import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { username, password, userType } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  
  const existing = await db.select().from(users).where(eq(users.username, username));
  if (existing.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  
  const hashed = await hash(password, 10);
  
  const id = crypto.randomUUID();
  await db.insert(users).values({
    username,
    password: hashed,
    userType: userType ?? 0,
  });
  return NextResponse.json({ user: { id, username, userType: userType ?? 0 } });
}
