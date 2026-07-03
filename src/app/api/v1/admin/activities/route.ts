import { NextResponse } from "next/server";
import { Activity } from "@/types/data";

export async function GET() {
  const activities: Activity[] = [];
  return NextResponse.json(activities);
}
