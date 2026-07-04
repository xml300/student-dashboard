import { NextResponse } from "next/server";
import { Activities } from "@/data/models/activities";

export async function GET() {
  const activities = await Activities.get();
  return NextResponse.json(activities);
}
