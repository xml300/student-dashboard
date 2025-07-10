import { NextResponse } from 'next/server';
import { db } from '@/db';
import { attendance } from '@/db/schema';

export async function GET() {
  try {
    const attendanceRecords = await db.query.attendance.findMany();
    return NextResponse.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { scheduleId, date, present } = await req.json();

    await db.insert(attendance).values({
      scheduleId,
      date,
      present,
    });

    return NextResponse.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
