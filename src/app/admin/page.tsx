import {
  UserIcon,
  ClipboardDocumentIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Card from "@/components/Card";
import DashboardAttendanceTrendLoader from "./DashboardAttendanceTrendLoader";
import { Activity } from "@/types/data";
import { db } from "@/data/db";
import { countDistinct, avg, eq, count, desc } from "drizzle-orm";
import { activities, students, attendanceRecords, users, lecturers, authorizedDevices } from "@/data/db/schema";

interface DashboardData {
  numStudents: number;
  attendanceRecords: string | null;
  numDevices: number;
  activities: ExtenActivity[];
}
type ExtenActivity = Omit<Activity, 'timestamp'> & {
  timestamp: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

async function getDashboardData(): Promise<DashboardData> {
  const dashboardData = (await db.select({
    numStudents: countDistinct(students.id),
    attendanceRate: avg(attendanceRecords.attendanceRecord),
  }).from(users)
    .innerJoin(students, eq(students.userId, users.id))
    .innerJoin(attendanceRecords, eq(attendanceRecords.studentId, students.id)))[0];

  const deviceData = (await db.select({
    numDevices: count(authorizedDevices.id)
  }).from(users)
    .innerJoin(lecturers, eq(lecturers.userId, users.id))
    .leftJoin(authorizedDevices, eq(authorizedDevices.userId, lecturers.userId))
    .where(eq(lecturers.id, 1)))[0];


  const recentActivities = await db.select()
    .from(activities)
    .orderBy(desc(activities.createdAt))
    .limit(10);

  const result = {
    numStudents: dashboardData.numStudents,
    attendanceRecords: dashboardData.attendanceRate,
    numDevices: deviceData.numDevices,
    activities: recentActivities,
  };

  if (Array.isArray(result.activities)) {
    result.activities = result.activities.map((activity: ExtenActivity) => ({
      ...activity,
      timestamp: activity.timestamp,
    }));
  }

  return result;
}

export default async function HomePage() {
  const data = await getDashboardData();
  const attendanceRate = data.attendanceRecords
    ? (parseFloat(data.attendanceRecords) * 100).toFixed(0)
    : "N/A";


  function getActivityIcon(category: string) {
    switch (category) {
      case "Device Management":
        return <DevicePhoneMobileIcon className="h-5 w-5 text-primary-accent" />;
      case "User Management":
        return <UserIcon className="h-5 w-5 text-green-500" />;
      case "Course Management":
        return <ClipboardDocumentIcon className="h-5 w-5 text-secondary-accent" />;
      case "Reporting":
        return <EyeIcon className="h-5 w-5 text-accent" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-foreground/60" />;
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <Card className="border-l-4 border-primary-accent">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-foreground/80 mb-1">
                  Total Students
                </p>
                <h3 className="text-2xl font-bold">{data.numStudents}</h3>

              </div>
              <div className="p-2 bg-primary-accent/10 rounded-lg">
                <UserIcon className="h-6 w-6 text-primary-accent" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-secondary-accent">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-foreground/80 mb-1">
                  Average Attendance
                </p>
                <h3 className="text-2xl font-bold">{attendanceRate}%</h3>
              </div>
              <div className="p-2 bg-secondary-accent/10 rounded-lg">
                <ClipboardDocumentIcon className="h-6 w-6 text-secondary-accent" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-accent">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-foreground/80 mb-1">
                  Connected Devices
                </p>
                <h3 className="text-2xl font-bold">{data.numDevices}</h3>
                <p className="text-xs text-accent mt-1">
                  All devices online
                </p>
              </div>
              <div className="p-2 bg-accent/10 rounded-lg">
                <DevicePhoneMobileIcon className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">


            <div className="h-64 bg-background rounded flex items-center justify-center">
              <DashboardAttendanceTrendLoader />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
              <Link
                href="/admin/activities"
                className="text-primary-accent hover:underline text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <ul className="divide-y divide-border-color">
              {Array.isArray(data.activities) && data.activities.length > 0 ? (
                data.activities.slice(0, 4).map((activity) => (
                  <li key={activity.id} className="py-3 flex items-start">
                    <div className="p-2 rounded-full mr-4 bg-foreground/10">
                      {getActivityIcon(activity.category)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action} {activity.affectedItem && `for ${activity.affectedItem}`}</p>
                      <p className="text-sm text-foreground/80">
                        {activity.details} • {activity.timestamp instanceof Date ? activity.timestamp.toLocaleString() : activity.timestamp}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-3 text-foreground/60">No recent activities found.</li>
              )}
            </ul>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Classes</h3>
              <Link
                href="/admin/schedule"
                className="text-primary-accent hover:underline text-sm font-medium"
              >
                View schedule
              </Link>
            </div>
            <ul className="divide-y divide-border-color">
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-primary-accent rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">CS</span>
                  </div>
                  <div>
                    <p className="font-medium">Computer Science 202</p>
                    <p className="text-sm text-foreground/80">
                      10:00 AM - 11:30 AM
                    </p>
                  </div>
                </div>
                <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">
                  Ready
                </span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-secondary-accent rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">DB</span>
                  </div>
                  <div>
                    <p className="font-medium">Database Systems</p>
                    <p className="text-sm text-foreground/80">
                      1:00 PM - 2:30 PM
                    </p>
                  </div>
                </div>
                <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full">
                  Device Check
                </span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-accent rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">AI</span>
                  </div>
                  <div>
                    <p className="font-medium">Artificial Intelligence</p>
                    <p className="text-sm text-foreground/80">
                      3:00 PM - 4:30 PM
                    </p>
                  </div>
                </div>
                <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">
                  Ready
                </span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">SE</span>
                  </div>
                  <div>
                    <p className="font-medium">Software Engineering</p>
                    <p className="text-sm text-foreground/80">
                      Tomorrow, 9:00 AM
                    </p>
                  </div>
                </div>
                <span className="bg-blue-500/10 text-blue-500 text-xs px-2 py-1 rounded-full">
                  Upcoming
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
