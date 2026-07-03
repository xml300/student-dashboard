import { db } from '@/db';
import { attendanceRecords, lectureSessions } from '@/db/schema';
import { avg, desc, eq, between } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  const url = new URL(request.url);
  const range = url.searchParams.get("range") || "weekly";

  let days = 7;
  if (range === "monthly") days = 30;
  if (range === "semester") days = 120;

  
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const sessions = await db
    .select({
      sessionId: lectureSessions.sessionId,
      date: lectureSessions.sessionDatetime,
    })
    .from(lectureSessions)
    .where(between(lectureSessions.sessionDatetime, startDate, now))
    .orderBy(desc(lectureSessions.sessionDatetime));

  
  const dayMap: Record<string, number[]> = {};
  for (const session of sessions) {
    const dateStr = session.date ? new Date(session.date).toISOString().slice(0, 10) : "";
    if (!dayMap[dateStr]) dayMap[dateStr] = [];
    
    const rateRow = await db
      .select({ rate: avg(attendanceRecords.attendanceRecord) })
      .from(attendanceRecords)
      .where(eq(attendanceRecords.sessionId, session.sessionId));
    const rateNum = typeof rateRow[0]?.rate === "number" ? rateRow[0].rate : Number(rateRow[0]?.rate) || 0;
    dayMap[dateStr].push(rateNum);
  }

  
  const trend = Object.entries(dayMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, rates]) => ({
      date,
      rate: Math.round((rates.reduce((a, b) => a + b, 0) / rates.length) * 100),
    }));

  return NextResponse.json(trend);
}
