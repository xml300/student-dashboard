import { NextRequest, NextResponse } from "next/server";
import {drizzle} from "drizzle-orm/node-postgres";
import { users } from "@/db/schema";

const db = drizzle(process.env.POSTGRES_URL || "");


export async function GET(request: NextRequest) {
    const req = request.url;
    console.log(req);
    const result = await db.insert(users).values({username:"Flow", password: "FEreikog"}).returning();
    return NextResponse.json(JSON.stringify(result));
}