import { NextResponse } from "next/server";
import { Activity } from "@/data/types/types";

export async function GET() {
  const activities: Activity[] = [];
  return NextResponse.json(activities);
}
